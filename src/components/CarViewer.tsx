"use client";

import { carPartById, carParts, CAR_MODEL_URL, type CarPart } from "@/lib/carModel";
import { prepareCarScene } from "@/lib/prepareCarScene";
import { useI18n } from "@/lib/i18n";
import { getProduct } from "@/lib/products";
import { ContactShadows, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Component, Suspense, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";

useGLTF.preload(CAR_MODEL_URL);

const FOCUS_SECONDS = 0.6;

type Hover = { id: string; x: number; y: number } | null;

class ModelBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function Studio() {
  return (
    <>
      <hemisphereLight args={["#e7eeff", "#2a303c", 0.85]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={2.8} color="#fff4e8" />
      <directionalLight position={[-6, 3.5, 2]} intensity={1.1} color="#d5e2ff" />
      <directionalLight position={[0, 4, -7]} intensity={1.3} />
      <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={14} blur={2.2} far={4} />
    </>
  );
}

function CarModel({
  hoveredId,
  onMeshes,
}: {
  hoveredId: string | null;
  onMeshes: (meshes: THREE.Mesh[]) => void;
}) {
  const gltf = useGLTF(CAR_MODEL_URL);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const meshes = useRef<THREE.Mesh[]>([]);

  useLayoutEffect(() => {
    const found = prepareCarScene(scene);
    meshes.current = found;
    onMeshes(found);
  }, [onMeshes, scene]);

  useFrame(({ clock }) => {
    const pulse = 0.35 + Math.sin(clock.elapsedTime * 5) * 0.15;
    for (const mesh of meshes.current) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        if ("emissiveIntensity" in material) {
          (material as THREE.MeshStandardMaterial).emissiveIntensity =
            mesh.userData.partId === hoveredId ? pulse : 0;
        }
      }
    }
  });

  return <primitive object={scene} dispose={null} />;
}

/**
 * Hover detection uses THREE.Raycaster against the named part meshes.
 * R3F's pointer events use the same raycaster; this pass owns the hover
 * state so moving between two meshes of one part does not flicker.
 */
function PartRaycaster({
  meshes,
  onHover,
}: {
  meshes: THREE.Mesh[];
  onHover: (id: string | null) => void;
}) {
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const { camera, pointer, gl } = useThree();
  const current = useRef<string | null>(null);

  useFrame(() => {
    if (meshes.length === 0) return;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(meshes, false)[0];
    const id = (hit?.object.userData.partId as string | undefined) ?? null;
    gl.domElement.style.cursor = id ? "pointer" : "grab";
    if (id !== current.current) {
      current.current = id;
      onHover(id);
    }
  });

  return null;
}

function CameraRig({
  focus,
  onArrive,
}: {
  focus: CarPart | null;
  onArrive: (part: CarPart) => void;
}) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null;
  const fromPos = useRef(new THREE.Vector3());
  const toPos = useRef(new THREE.Vector3());
  const fromTarget = useRef(new THREE.Vector3());
  const toTarget = useRef(new THREE.Vector3());
  const progress = useRef(1);
  const sent = useRef(false);
  const part = useRef<CarPart | null>(null);

  useLayoutEffect(() => {
    if (!focus || !controls) return;
    part.current = focus;
    fromPos.current.copy(camera.position);
    toPos.current.set(...focus.camera.position);
    fromTarget.current.copy(controls.target);
    toTarget.current.set(...focus.camera.target);
    progress.current = 0;
    sent.current = false;
    controls.enabled = false;
  }, [camera, controls, focus]);

  useFrame((_, delta) => {
    if (!controls || !part.current || progress.current >= 1) return;
    progress.current = Math.min(1, progress.current + delta / FOCUS_SECONDS);
    const eased = 1 - (1 - progress.current) ** 3;
    camera.position.lerpVectors(fromPos.current, toPos.current, eased);
    controls.target.lerpVectors(fromTarget.current, toTarget.current, eased);
    if (progress.current >= 1 && !sent.current) {
      sent.current = true;
      onArrive(part.current);
    }
  });

  return null;
}

function LoadState() {
  const { t } = useI18n();
  const { active, progress } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
      <div className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur">
        {t("viewer.loading")} {Math.round(progress)}%
      </div>
    </div>
  );
}

export function CarViewer() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);
  const [focus, setFocus] = useState<CarPart | null>(null);
  const down = useRef<{ x: number; y: number } | null>(null);
  const navigating = useRef(false);
  const hoveredRef = useRef<string | null>(null);
  hoveredRef.current = hoveredId;

  function focusPart(id: string) {
    if (navigating.current || focus) return;
    const part = carPartById(id);
    if (part) setFocus(part);
  }

  function arrive(part: CarPart) {
    if (navigating.current) return;
    navigating.current = true;
    router.push(`/parts/${part.slug}`);
  }

  const hoveredPart = hoveredId ? carPartById(hoveredId) : undefined;
  const hoveredProduct = hoveredPart ? getProduct(hoveredPart.slug) : undefined;

  return (
    <div
      className="relative h-full w-full"
      onPointerMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      onPointerDown={(event) => {
        down.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        const start = down.current;
        down.current = null;
        if (!start || !hoveredRef.current) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (dx * dx + dy * dy > 25) return;
        focusPart(hoveredRef.current);
      }}
    >
      <ModelBoundary
        fallback={
          <div className="grid h-full place-items-center px-6 text-center text-sm text-white/70">{t("viewer.failed")}</div>
        }
      >
      <Canvas
        camera={{ position: [3.8, 1.55, 4.5], fov: 32 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Studio />
        <Suspense fallback={null}>
          <CarModel hoveredId={hoveredId} onMeshes={setMeshes} />
          <PartRaycaster meshes={meshes} onHover={setHoveredId} />
          <CameraRig focus={focus} onArrive={arrive} />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.9}
          maxPolarAngle={Math.PI / 2 - 0.06}
          minDistance={2.6}
          maxDistance={8}
          target={[0, 0.65, 0]}
        />
      </Canvas>
      </ModelBoundary>

      <LoadState />

      {hoveredProduct && (
        <div
          className="pointer-events-none fixed z-50 rounded-full border border-white/15 bg-black/75 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur"
          style={{ left: cursor.x + 14, top: cursor.y + 14 }}
        >
          {hoveredProduct.name[lang]}
        </div>
      )}

      <aside className="absolute end-3 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">{t("viewer.pick")}</p>
        {carParts.map((part) => {
          const product = getProduct(part.slug);
          const on = hoveredId === part.id || focus?.id === part.id;
          return (
            <button
              key={part.id}
              type="button"
              onPointerUp={(event) => event.stopPropagation()}
              onClick={() => focusPart(part.id)}
              className={`rounded-full border px-3 py-2 text-start text-sm text-white backdrop-blur ${
                on ? "border-[#3dffd2] bg-[#3dffd2]/15" : "border-white/15 bg-black/40 hover:border-white/40"
              }`}
            >
              {product?.name[lang] ?? part.id}
            </button>
          );
        })}
      </aside>

      <div className="absolute inset-x-0 bottom-3 z-10 flex gap-2 overflow-x-auto px-3 pb-[env(safe-area-inset-bottom)] md:hidden">
        {carParts.map((part) => {
          const product = getProduct(part.slug);
          const on = hoveredId === part.id || focus?.id === part.id;
          return (
            <button
              key={part.id}
              type="button"
              onPointerUp={(event) => event.stopPropagation()}
              onClick={() => focusPart(part.id)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs text-white backdrop-blur ${
                on ? "border-[#3dffd2] bg-[#3dffd2]/15" : "border-white/15 bg-black/50"
              }`}
            >
              {product?.name[lang] ?? part.id}
            </button>
          );
        })}
      </div>

      <p className="pointer-events-none absolute bottom-16 start-1/2 z-10 hidden -translate-x-1/2 text-xs text-white/55 md:bottom-4 md:block">
        {t("viewer.drag")}
      </p>
      <a
        href="https://sketchfab.com/3d-models/mazda-rx-7-tuned-74bf6d2d2be84bc084577a7aa5d81f68"
        target="_blank"
        rel="noreferrer"
        className="absolute start-3 bottom-16 z-10 text-[10px] text-white/55 underline decoration-white/20 md:bottom-3"
      >
        Mazda RX-7 Tuned by Naudaff3D
      </a>
    </div>
  );
}

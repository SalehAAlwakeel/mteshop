"use client";

import { CAR_MODEL_URL } from "@/lib/carModel";
import { useI18n } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-pinned aero study.
 * Swap the car by changing CAR_MODEL_URL in src/lib/carModel.ts.
 * Nose is +Z after fit. Camera poses are derived from the fitted bounding box.
 */

type Copy = {
  metrics: [string, string, string];
  body: string;
  cta: string;
};

type Shot = {
  code: string;
  token: string;
  href: string;
  position: THREE.Vector3;
  target: THREE.Vector3;
  anchor: THREE.Vector3;
  en: Copy;
  ar: Copy;
};

const SHOTS: Shot[] = [
  {
    code: "00",
    token: "STANCE",
    href: "/#order",
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    anchor: new THREE.Vector3(),
    en: {
      metrics: ["Reference body · RX-7", "Full profile · CAD", "Carbon fibre or ASA"],
      body: "We scan the car, then draw the kit in CAD. This pass is the whole stance before any single part.",
      cta: "Start an order",
    },
    ar: {
      metrics: ["هيكل مرجعي · RX-7", "منظر كامل · CAD", "كربون أو ASA"],
      body: "نمسح السيارة ثم نرسم الطقم في CAD. هذه اللقطة للوقفة كاملة قبل أي قطعة.",
      cta: "ابدأ الطلب",
    },
  },
  {
    code: "01",
    token: "SPLITTER",
    href: "/parts/front-lip",
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    anchor: new THREE.Vector3(),
    en: {
      metrics: ["Low front plane", "Carbon pre-preg or ASA", "Fitted to the bumper"],
      body: "A front lip that follows the bumper you already have. Printed in sections, or laid in carbon.",
      cta: "View part",
    },
    ar: {
      metrics: ["سطح أمامي منخفض", "كربون أو ASA", "على مقاس الصدام"],
      body: "ليب أمامي يتبع الصدام الموجود. يُطبع على مقاطع، أو يُفرش من الكربون.",
      cta: "عرض القطعة",
    },
  },
  {
    code: "02",
    token: "INTAKE",
    href: "/parts/air-intake",
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    anchor: new THREE.Vector3(),
    en: {
      metrics: ["Nose / hood duct", "Multi-piece print", "ASA · outdoor stable"],
      body: "An intake or snorkel for the bay, split into pieces that print cleanly in ASA.",
      cta: "View part",
    },
    ar: {
      metrics: ["فتحة الغطاء", "عدة قطع", "ASA · ثابتة بالحرارة"],
      body: "مدخل هواء أو سنوركل لحجرة المحرك، مقسوم لقطع تطبع نظيفة من ASA.",
      cta: "عرض القطعة",
    },
  },
  {
    code: "03",
    token: "FLANK",
    href: "/parts/wide-body-kit",
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    anchor: new THREE.Vector3(),
    en: {
      metrics: ["Wide arch + skirt", "Mirrored pair", "Bolt-on mounts"],
      body: "Flared arches and a side skirt drawn on the same scan, so the flank reads as one line.",
      cta: "View part",
    },
    ar: {
      metrics: ["قوس عريض وعتبة", "زوج متماثل", "قواعد تثبيت"],
      body: "أقواس أعرض وعتبة جانبية على نفس المسح، حتى يقرأ الجنب خطاً واحداً.",
      cta: "عرض القطعة",
    },
  },
  {
    code: "04",
    token: "WING",
    href: "/parts/spoiler",
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    anchor: new THREE.Vector3(),
    en: {
      metrics: ["Rear plane", "Uprights + endplates", "Carbon or ASA"],
      body: "A rear wing with mounts made for the deck. Held from the high rear quarter.",
      cta: "View part",
    },
    ar: {
      metrics: ["سطح خلفي", "قوائم وأطراف", "كربون أو ASA"],
      body: "جناح خلفي بقواعد على غطاء الصندوق. اللقطة من الربع الخلفي العلوي.",
      cta: "عرض القطعة",
    },
  },
  {
    code: "05",
    token: "VENTURI",
    href: "/parts/rear-diffuser",
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    anchor: new THREE.Vector3(),
    en: {
      metrics: ["Underbody exit", "Vertical strakes", "Carbon or ASA"],
      body: "A rear diffuser that closes the bumper and sends the air out low.",
      cta: "View part",
    },
    ar: {
      metrics: ["مخرج سفلي", "شرائح عمودية", "كربون أو ASA"],
      body: "دفيوزر يغلق الصدام ويخرج الهواء من الأسفل.",
      cta: "عرض القطعة",
    },
  },
];

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function fitToGround(scene: THREE.Object3D) {
  scene.position.set(0, 0, 0);
  scene.scale.set(1, 1, 1);
  scene.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
  const length = Math.max(size.x, size.z) || 1;
  scene.scale.setScalar(4.6 / length);
  scene.updateMatrixWorld(true);
  const fitted = new THREE.Box3().setFromObject(scene);
  const center = fitted.getCenter(new THREE.Vector3());
  scene.position.x -= center.x;
  scene.position.z -= center.z;
  scene.position.y -= fitted.min.y;
  scene.updateMatrixWorld(true);
}

function restyle(root: THREE.Object3D) {
  const glass = /glass|gkass|window/i;
  const tyre = /tyre/i;
  const lamp = /brake|lamp/i;
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || mesh.userData.aeroSkip) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const label = `${mesh.name} ${mesh.parent?.name ?? ""} ${materials.map((m) => m.name).join(" ")}`;
    materials.forEach((material) => material.dispose());

    let next: THREE.Material;
    if (glass.test(label)) {
      next = new THREE.MeshStandardMaterial({
        color: 0x070707,
        metalness: 0.45,
        roughness: 0.04,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      });
    } else if (tyre.test(label)) {
      next = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.05, roughness: 0.9 });
    } else if (lamp.test(label)) {
      next = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0xffffff,
        emissiveIntensity: 0.35,
        metalness: 0.2,
        roughness: 0.4,
      });
    } else {
      next = new THREE.MeshStandardMaterial({ color: 0x141414, metalness: 0.9, roughness: 0.3 });
    }
    mesh.material = next;

    const position = mesh.geometry.getAttribute("position");
    const triangles = mesh.geometry.index ? mesh.geometry.index.count / 3 : (position?.count ?? 0) / 3;
    if (tyre.test(label) || glass.test(label) || triangles < 80) return;

    if (triangles < 42000) {
      const edges = new THREE.EdgesGeometry(mesh.geometry, 48);
      const lines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.34 }),
      );
      lines.raycast = () => {};
      mesh.add(lines);
      return;
    }

    const shell = new THREE.Mesh(
      mesh.geometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    );
    shell.scale.setScalar(1.012);
    shell.userData.aeroSkip = true;
    shell.raycast = () => {};
    mesh.add(shell);
  });
}

function partMeshes(root: THREE.Object3D, names: string[]) {
  const found: THREE.Mesh[] = [];
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh && !mesh.userData.aeroSkip && names.includes(mesh.name)) found.push(mesh);
  });
  return found;
}

/** A real vertex on the part, so the marker is not the hollow center of the assembly. */
function bestVertex(meshes: THREE.Mesh[], score: (point: THREE.Vector3) => number) {
  const probe = new THREE.Vector3();
  const best = new THREE.Vector3();
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const mesh of meshes) {
    const attr = mesh.geometry.getAttribute("position");
    if (!attr) continue;
    const step = Math.max(1, Math.floor(attr.count / 3500));
    for (let i = 0; i < attr.count; i += step) {
      probe.fromBufferAttribute(attr as THREE.BufferAttribute, i);
      mesh.localToWorld(probe);
      const value = score(probe);
      if (value > bestScore) {
        bestScore = value;
        best.copy(probe);
      }
    }
  }
  return bestScore === Number.NEGATIVE_INFINITY ? null : best;
}

/** Keep the marker on the part, but frame the whole car from that side. */
function frame(shot: Shot, anchor: THREE.Vector3, view: THREE.Vector3, look: THREE.Vector3) {
  shot.anchor.copy(anchor);
  shot.target.copy(look);
  shot.position.copy(look).add(view);
}

function placeShots(scene: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const carbon = partMeshes(scene, ["Object_6"]);
  const body = partMeshes(scene, ["Object_5", "Object_6"]);
  const wing = partMeshes(scene, ["Object_50"]);

  const look = new THREE.Vector3(0, size.y * 0.45, 0);

  const stance = SHOTS[0];
  stance.position.set(center.x + size.x * 1.65, size.y * 1.45, center.z + size.z * 1.35);
  stance.target.copy(look);
  stance.anchor.copy(look);

  const bumper = partMeshes(scene, ["Object_5"]);
  const lip = bestVertex(bumper, (point) =>
    point.z > 2.05 && point.y < 0.28 && Math.abs(point.x) < 0.2 ? point.z * 2 - point.y - Math.abs(point.x) * 4 : -1e6,
  );
  if (lip) frame(SHOTS[1], lip, new THREE.Vector3(size.x * 0.55, size.y * 0.9, size.z * 1.55), look);

  const hood = bestVertex(body, (point) =>
    point.z > 1 && point.z < 1.9 && point.y > 0.6 ? point.y - Math.abs(point.x) * 2 : -1e6,
  );
  if (hood) frame(SHOTS[2], hood, new THREE.Vector3(size.x * 0.2, size.y * 2.6, size.z * 1.4), look);

  const skirt = bestVertex(carbon, (point) =>
    point.x > 0.82 && point.y > 0.18 && point.y < 0.36
      ? point.x * 3 - Math.abs(point.y - 0.26) * 3 - Math.abs(point.z - 0.15)
      : -1e6,
  );
  if (skirt) frame(SHOTS[3], skirt, new THREE.Vector3(size.x * 3.5, size.y * 1.2, size.z * 0.12), look);

  const blade = bestVertex(wing, (point) => point.y - Math.abs(point.x) * 0.15);
  if (blade) frame(SHOTS[4], blade, new THREE.Vector3(-size.x * 1.2, size.y * 1.4, -size.z * 1.5), look);

  const strake = bestVertex(carbon, (point) =>
    point.z < -1.95 && point.y > 0.26 && point.y < 0.4 && Math.abs(point.x) < 0.25
      ? -point.z * 2 - Math.abs(point.x) * 3 - Math.abs(point.y - 0.32) * 4
      : -1e6,
  );
  if (strake) frame(SHOTS[5], strake, new THREE.Vector3(size.x * 0.5, size.y * 1.05, -size.z * 1.6), look);
}

function samplePose(progress: number, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  const last = SHOTS.length - 1;
  const x = Math.min(last, Math.max(0, progress * last));
  const index = Math.min(last - 1, Math.floor(x));
  const blend = x >= last ? 1 : smoothstep(x - index);
  const from = SHOTS[index];
  const to = SHOTS[Math.min(last, index + 1)];
  outPos.lerpVectors(from.position, to.position, blend);
  outTarget.lerpVectors(from.target, to.target, blend);
}

export function AeroShowcase() {
  const { lang } = useI18n();
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const [load, setLoad] = useState(0);
  const [failed, setFailed] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
    const triggerRef = useRef<ScrollTrigger | null>(null);
    const readyRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!stage || !canvas || !track) return;

    let dead = false;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x050505, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 14, 32);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 40);
    const desiredPos = new THREE.Vector3(4.6, 1.9, 6.2);
    const desiredTarget = new THREE.Vector3(0, 0.5, 0);
    const framedPos = new THREE.Vector3();
    const framedTarget = new THREE.Vector3();
    const look = new THREE.Vector3(0, 0.5, 0);
    let pull = 1;
    camera.position.copy(desiredPos);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.55;
    pmrem.dispose();

    scene.add(new THREE.AmbientLight(0xffffff, 0.08));
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(3, 6, 4);
    scene.add(key);
    const rimA = new THREE.DirectionalLight(0xffffff, 2.4);
    rimA.position.set(-5, 3, -3);
    scene.add(rimA);
    const rimB = new THREE.DirectionalLight(0xffffff, 1.5);
    rimB.position.set(4, 1.5, 2);
    scene.add(rimB);

    const grid = new THREE.GridHelper(18, 72, 0xffffff, 0xffffff);
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.14;
      material.depthWrite = false;
    });
    grid.position.y = 0.002;
    scene.add(grid);

    const overlay = new THREE.Scene();
    const ortho = new THREE.OrthographicCamera(0, 1, 0, 1, -1, 1);
    const pointerAttr = new THREE.BufferAttribute(new Float32Array(18), 3);
    const pointerGeom = new THREE.BufferGeometry();
    pointerGeom.setAttribute("position", pointerAttr);
    const pointer = new THREE.LineSegments(
      pointerGeom,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
    );
    pointer.frustumCulled = false;
    overlay.add(pointer);
    renderer.autoClear = false;

    let viewW = 0;
    let viewH = 0;
    const resize = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      viewW = width;
      viewH = height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // Wide screens match the designed frame. A portrait phone is much narrower,
      // so the camera steps back until the whole car fits the horizontal view.
      pull = camera.aspect >= 1.15 ? 1 : Math.min(3.2, 1.35 / camera.aspect);
      const ratioCap = width < 768 ? 2 : 1.5;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, ratioCap));
      renderer.setSize(width, height, false);
      ortho.left = 0;
      ortho.right = width;
      ortho.top = 0;
      ortho.bottom = height;
      ortho.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lockStage = () => {
      if (!coarsePointer) return;
      stage.style.height = "";
      const next = stage.clientHeight;
      if (next) stage.style.height = `${next}px`;
      resize();
    };
    lockStage();
    const onOrient = () => {
      stage.style.height = "";
      requestAnimationFrame(lockStage);
    };
    if (coarsePointer) window.addEventListener("orientationchange", onOrient);

    const loader = new GLTFLoader();
    loader.load(
      CAR_MODEL_URL,
      (gltf) => {
        if (dead) return;
        try {
          fitToGround(gltf.scene);
          restyle(gltf.scene);
          placeShots(gltf.scene);
          scene.add(gltf.scene);
          readyRef.current = true;
          setReady(true);
          setLoad(1);
          requestAnimationFrame(() => trigger.refresh());
        } catch (error) {
          console.error(error);
          setFailed("load");
        }
      },
      (event) => {
        if (dead || !event.total) return;
        setLoad(event.loaded / event.total);
      },
      (error) => {
        if (dead) return;
        console.error(error);
        setFailed("load");
      },
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: reduced ? 0.3 : coarse ? 0.4 : 1.2,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    triggerRef.current = trigger;

    const proj = new THREE.Vector3();
    let frame = 0;
    let last = performance.now();
    let shown = 0;
    let lineOn = false;
    const tick = () => {
      if (dead) return;
      frame = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const progress = progressRef.current;
      if (coarse) shown += (progress - shown) * (1 - Math.exp(-dt * 6));
      else shown = progress;
      if (Math.abs(progress - shown) < 0.0004) shown = progress;
      if (readyRef.current) samplePose(shown, desiredPos, desiredTarget);
      framedTarget.copy(desiredTarget);
      if (pull > 1) framedTarget.y -= 0.85;
      framedPos.copy(desiredPos).sub(desiredTarget).multiplyScalar(pull).add(framedTarget);
      const damp = 1 - Math.exp(-dt * 7);
      camera.position.lerp(framedPos, damp);
      look.lerp(framedTarget, damp);
      camera.lookAt(look);

      const index = Math.round(shown * (SHOTS.length - 1));
      const width = viewW;
      const height = viewH;
      const card = cardRef.current;
      const cx = card ? card.offsetLeft + card.offsetWidth / 2 : 0;
      const cy = card ? card.offsetTop + card.offsetHeight / 2 : 0;
      const halfW = card ? card.offsetWidth / 2 : 1;
      const halfH = card ? card.offsetHeight / 2 : 1;
      const positions = pointerAttr.array as Float32Array;
      const shot = SHOTS[index];
      if (shot && readyRef.current && width && height) {
        proj.copy(shot.anchor).project(camera);
        const visible = proj.z < 1;
        const x = Math.round((proj.x * 0.5 + 0.5) * width);
        const y = Math.round((-proj.y * 0.5 + 0.5) * height);
        const dx = x - cx;
        const dy = y - cy;
        const scale = Math.min(halfW / Math.abs(dx || 0.001), halfH / Math.abs(dy || 0.001));
        const ex = Math.round(cx + dx * scale);
        const ey = Math.round(cy + dy * scale);
        if (visible && scale < 0.9) lineOn = true;
        else if (!visible || scale > 0.99) lineOn = false;
        positions[0] = x;
        positions[1] = y;
        positions[2] = 0;
        positions[3] = lineOn ? ex : x;
        positions[4] = lineOn ? ey : y;
        positions[5] = 0;
        positions[6] = x - 7;
        positions[7] = y;
        positions[8] = 0;
        positions[9] = x + 7;
        positions[10] = y;
        positions[11] = 0;
        positions[12] = x;
        positions[13] = y - 7;
        positions[14] = 0;
        positions[15] = x;
        positions[16] = y + 7;
        positions[17] = 0;
        pointer.visible = visible;
      }
      pointerAttr.needsUpdate = true;

      if (onScreen) {
        renderer.clear(true, true, true);
        renderer.render(scene, camera);
        renderer.clearDepth();
        renderer.render(overlay, ortho);
      }
      if (index !== activeRef) {
        activeRef = index;
        setActive(index);
      }
    };
    let activeRef = 0;
    let onScreen = true;
    const visibility = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
    });
    visibility.observe(stage);
    tick();

    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      trigger.kill();
      triggerRef.current = null;
      observer.disconnect();
      window.removeEventListener("orientationchange", onOrient);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else material?.dispose();
      });
      scene.environment?.dispose();
      pointerGeom.dispose();
      (pointer.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  const shot = SHOTS[active];
  const copy = lang === "ar" ? shot.ar : shot.en;

  const goTo = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const progress = index / (SHOTS.length - 1);
    const top = trigger.start + (trigger.end - trigger.start) * progress;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section ref={trackRef} className="relative h-[520vh] bg-[#050505] text-white md:h-[640vh]">
      <div
        ref={stageRef}
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden sm:top-[4.5rem] sm:h-[calc(100svh-4.5rem)]"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ touchAction: "pan-y" }} />

        <div className="pointer-events-none absolute start-4 top-3 z-30 sm:start-6 sm:top-6">
          <p className="font-mono text-[11px] tracking-[0.15em] text-white/70 uppercase">MTE / AERO</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-white/40 uppercase">RX-7 reference</p>
        </div>

        <div className="absolute start-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center sm:start-5 sm:gap-1">
          <span className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/15" />
          {SHOTS.map((item, index) => (
            <button
              key={item.code}
              type="button"
              aria-label={item.token}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
              className="relative z-10 grid h-11 w-11 place-items-center"
            >
              <span
                className="h-px bg-white transition-[width,opacity] duration-300"
                style={{ width: index === active ? 22 : 12, opacity: index === active ? 1 : 0.35 }}
              />
            </button>
          ))}
        </div>

        <article
          ref={cardRef}
          className="absolute end-3 bottom-[max(7.25rem,env(safe-area-inset-bottom))] z-30 w-[min(17rem,calc(100%-3.5rem))] border border-white/20 bg-black/55 p-3 backdrop-blur-sm sm:end-6 sm:bottom-auto sm:top-1/2 sm:w-64 sm:-translate-y-1/2"
        >
          <p className="font-mono text-[11px] tracking-[0.15em] text-white uppercase">
            [ {shot.code} // {shot.token} ]
          </p>
          <ul className="mt-2 space-y-1">
            {copy.metrics.map((metric) => (
              <li key={metric} className="font-mono text-[11px] leading-snug text-white/75">
                {metric}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] leading-snug text-white/80">{copy.body}</p>
          <Link
            href={shot.href}
            className="mt-3 inline-flex border border-white/40 px-2.5 py-1 font-mono text-[11px] tracking-[0.15em] text-white uppercase"
          >
            {copy.cta}
          </Link>
        </article>

        <p
          className="pointer-events-none absolute start-4 top-14 z-30 font-mono text-[11px] tracking-[0.15em] text-white/45 uppercase sm:top-auto sm:bottom-8 sm:left-1/2 sm:start-auto sm:-translate-x-1/2"
          style={{ opacity: active === 0 && ready ? 1 : 0 }}
        >
          {lang === "ar" ? "مرّر" : "Scroll"}
        </p>

        <a
          href="https://sketchfab.com/3d-models/mazda-rx-7-tuned-74bf6d2d2be84bc084577a7aa5d81f68"
          target="_blank"
          rel="noreferrer"
          className="absolute start-4 top-[4.75rem] z-30 max-w-[11rem] font-mono text-[10px] leading-snug tracking-[0.12em] text-white/35 uppercase sm:top-auto sm:bottom-3 sm:left-1/2 sm:start-auto sm:max-w-none sm:-translate-x-1/2"
        >
          Mazda RX-7 Tuned by Naudaff3D
        </a>

        {!ready && !failed && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-[#050505]">
            <p className="font-mono text-[11px] tracking-[0.15em] text-white/70 uppercase">
              {lang === "ar" ? "تحميل" : "Loading"} {Math.round(load * 100)}%
            </p>
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-[#050505] px-6">
            <p className="max-w-md text-center font-mono text-[11px] leading-relaxed tracking-[0.15em] text-white/70 uppercase">
              {lang === "ar" ? "تعذر تحميل النموذج" : "Model failed to load"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

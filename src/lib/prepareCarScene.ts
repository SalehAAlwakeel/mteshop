import { matchCarPart } from "@/lib/carModel";
import * as THREE from "three";

const TARGET_LENGTH = 4.6;

/** Center the model and scale it to a consistent size so the camera presets fit. */
function fitToGround(scene: THREE.Object3D) {
  scene.position.set(0, 0, 0);
  scene.scale.set(1, 1, 1);
  scene.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
  const length = Math.max(size.x, size.z) || 1;
  scene.scale.setScalar(TARGET_LENGTH / length);
  scene.updateMatrixWorld(true);
  const fitted = new THREE.Box3().setFromObject(scene);
  const center = fitted.getCenter(new THREE.Vector3());
  scene.position.x -= center.x;
  scene.position.z -= center.z;
  scene.position.y -= fitted.min.y;
  scene.updateMatrixWorld(true);
}

function partFromChain(obj: THREE.Object3D) {
  let current: THREE.Object3D | null = obj;
  while (current) {
    const part = matchCarPart(current.name || "");
    if (part) return part;
    current = current.parent;
  }
  return undefined;
}

function tagMesh(mesh: THREE.Mesh, partId: string) {
  mesh.userData.partId = partId;
  const mark = (material: THREE.Material) => {
    const next = material.clone() as THREE.MeshStandardMaterial;
    if ("emissive" in next) {
      next.emissive = new THREE.Color("#3dffd2");
      next.emissiveIntensity = 0;
    }
    return next;
  };
  mesh.material = Array.isArray(mesh.material) ? mesh.material.map(mark) : mark(mesh.material);
}

function regionFor(xN: number, yN: number, zN: number) {
  if (zN > 0.84 && yN < 0.42) return "front_lip";
  if (zN < 0.18 && yN < 0.45) return "diffuser";
  if (Math.abs(xN) > 0.76 && yN < 0.4 && zN > 0.2 && zN < 0.8) return "side_skirt";
  if (Math.abs(xN) < 0.32 && yN > 0.58 && zN > 0.5 && zN < 0.8) return "air_intake";
  if (Math.abs(xN) > 0.58 && yN >= 0.28 && yN < 0.75 && zN > 0.12 && zN < 0.88) return "wide_body";
  return null;
}

/** The RX-7 carbon body is one mesh. Split it so each aero area can be hovered on its own. */
function splitCarbonShell(mesh: THREE.Mesh, found: THREE.Mesh[]) {
  const geo = mesh.geometry as THREE.BufferGeometry;
  const pos = geo.getAttribute("position");
  if (!pos) return;
  let index = geo.getIndex();
  if (!index) {
    const count = pos.count;
    const array = new Uint32Array(count);
    for (let i = 0; i < count; i += 1) array[i] = i;
    index = new THREE.BufferAttribute(array, 1);
    geo.setIndex(index);
  }

  mesh.updateWorldMatrix(true, false);
  const box = new THREE.Box3().setFromObject(mesh);
  const size = box.getSize(new THREE.Vector3());
  if (size.x === 0 || size.y === 0 || size.z === 0) return;
  const midX = (box.min.x + box.max.x) / 2;

  const buckets = new Map<string, number[]>();
  const rest: number[] = [];
  const point = new THREE.Vector3();
  const triangles = index.count / 3;
  for (let tri = 0; tri < triangles; tri += 1) {
    const a = index.getX(tri * 3);
    const b = index.getX(tri * 3 + 1);
    const c = index.getX(tri * 3 + 2);
    point.fromBufferAttribute(pos, a);
    const bPoint = new THREE.Vector3().fromBufferAttribute(pos, b);
    const cPoint = new THREE.Vector3().fromBufferAttribute(pos, c);
    point.add(bPoint).add(cPoint).multiplyScalar(1 / 3);
    point.applyMatrix4(mesh.matrixWorld);
    const xN = (point.x - midX) / (size.x * 0.5);
    const yN = (point.y - box.min.y) / size.y;
    const zN = (point.z - box.min.z) / size.z;
    const region = regionFor(xN, yN, zN);
    if (!region) {
      rest.push(a, b, c);
      continue;
    }
    const list = buckets.get(region) ?? [];
    list.push(a, b, c);
    buckets.set(region, list);
  }

  const parent = mesh.parent;
  if (!parent) return;
  for (const [partId, indices] of buckets) {
    if (indices.length === 0) continue;
    const partGeo = new THREE.BufferGeometry();
    for (const name of Object.keys(geo.attributes)) {
      partGeo.setAttribute(name, geo.getAttribute(name));
    }
    partGeo.setIndex(indices);
    const partMesh = new THREE.Mesh(partGeo, mesh.material);
    partMesh.name = `Part_${partId}`;
    partMesh.position.copy(mesh.position);
    partMesh.quaternion.copy(mesh.quaternion);
    partMesh.scale.copy(mesh.scale);
    tagMesh(partMesh, partId);
    parent.add(partMesh);
    found.push(partMesh);
  }

  if (rest.length > 0) geo.setIndex(rest);
  else mesh.visible = false;
}

function findMesh(scene: THREE.Object3D, name: string) {
  let found: THREE.Mesh | null = null;
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh && mesh.name === name) found = mesh;
  });
  return found;
}

export function prepareCarScene(scene: THREE.Object3D) {
  fitToGround(scene);
  const found: THREE.Mesh[] = [];
  const carbon = findMesh(scene, "Object_6");
  if (carbon) splitCarbonShell(carbon, found);
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || mesh.userData.partId) return;
    const part = partFromChain(mesh);
    if (!part) return;
    tagMesh(mesh, part.id);
    found.push(mesh);
  });
  return found;
}

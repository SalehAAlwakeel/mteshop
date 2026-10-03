/**
 * Builds public/models/car.glb — a stylized coupe with separately named parts.
 * Re-run after editing: node scripts/build-car-glb.mjs
 *
 * Mesh names the site looks for (see src/lib/carModel.ts):
 *   Part_Spoiler, Part_FrontLip, Part_SideSkirt, Part_WideBody, Part_AirIntake, Part_Diffuser
 * Anything named Body_* is the car itself and is not clickable.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, "..", "public", "models", "car.glb");

const paint = new THREE.MeshStandardMaterial({
  color: "#3c4558",
  metalness: 0.62,
  roughness: 0.28,
});
const carbon = new THREE.MeshStandardMaterial({
  color: "#6d7586",
  metalness: 0.4,
  roughness: 0.42,
});
const glass = new THREE.MeshStandardMaterial({
  color: "#9fd8ff",
  metalness: 0.1,
  roughness: 0.05,
  transparent: true,
  opacity: 0.38,
});
const rubber = new THREE.MeshStandardMaterial({ color: "#121212", metalness: 0.05, roughness: 0.92 });
const alloy = new THREE.MeshStandardMaterial({ color: "#d5d8e0", metalness: 0.86, roughness: 0.22 });
const lamp = new THREE.MeshStandardMaterial({
  color: "#fff4e5",
  emissive: "#ffe6c4",
  emissiveIntensity: 1.4,
  roughness: 0.35,
});
const tail = new THREE.MeshStandardMaterial({
  color: "#ff3b3b",
  emissive: "#ff1f1f",
  emissiveIntensity: 1.5,
  roughness: 0.4,
});

const root = new THREE.Group();
root.name = "Car";

function add(mesh) {
  root.add(mesh);
  return mesh;
}

function extrude(shape, width, material, name) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 20,
  });
  geo.translate(0, 0, -width / 2);
  geo.rotateY(-Math.PI / 2);
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, material);
  mesh.name = name;
  return mesh;
}

const body = new THREE.Shape();
body.moveTo(-2.2, 0.34);
body.lineTo(-2.08, 0.62);
body.bezierCurveTo(-1.85, 0.84, -1.35, 0.8, -0.9, 0.86);
body.lineTo(-0.58, 0.9);
body.bezierCurveTo(-0.22, 1.08, -0.12, 1.48, 0.38, 1.4);
body.bezierCurveTo(0.88, 1.32, 1.08, 1.02, 1.4, 0.88);
body.lineTo(1.95, 0.74);
body.bezierCurveTo(2.18, 0.68, 2.3, 0.52, 2.2, 0.38);
body.lineTo(2.02, 0.32);
body.lineTo(-2.2, 0.34);
add(extrude(body, 1.7, paint, "Body"));

const cabin = new THREE.Shape();
cabin.moveTo(-0.48, 0.92);
cabin.bezierCurveTo(-0.12, 1.12, -0.02, 1.5, 0.42, 1.4);
cabin.bezierCurveTo(0.82, 1.3, 0.98, 1.05, 1.15, 0.94);
cabin.lineTo(-0.48, 0.92);
const glassMesh = extrude(cabin, 1.42, glass, "Body_Glass");
glassMesh.scale.set(1.06, 1.03, 1.01);
add(glassMesh);

function wheel(x, z) {
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.24, 28), rubber);
  tire.rotation.z = Math.PI / 2;
  tire.name = "Body_Tire";
  tire.position.set(x, 0.34, z);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.25, 18), alloy);
  rim.rotation.z = Math.PI / 2;
  rim.name = "Body_Rim";
  rim.position.set(x, 0.34, z);
  add(tire);
  add(rim);
}
wheel(0.92, 1.32);
wheel(-0.92, 1.32);
wheel(0.92, -1.28);
wheel(-0.92, -1.28);

function arch(x, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.18, 0.7), carbon);
  mesh.name = "Part_WideBody";
  mesh.position.set(Math.sign(x) * 0.9, 0.46, z);
  add(mesh);
}
arch(1, 1.32);
arch(-1, 1.32);
arch(1, -1.28);
arch(-1, -1.28);

for (const x of [1.02, -1.02]) {
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 1.7), carbon);
  skirt.name = "Part_SideSkirt";
  skirt.position.set(x, 0.22, 0.02);
  add(skirt);
}

const lip = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.08, 0.22), carbon);
lip.name = "Part_FrontLip";
lip.position.set(0, 0.32, 2.12);
add(lip);

const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.12, 0.62), carbon);
scoop.name = "Part_AirIntake";
scoop.position.set(0, 0.96, 1.2);
scoop.rotation.x = -0.2;
add(scoop);

const blade = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.07, 0.34), carbon);
blade.name = "Part_Spoiler";
blade.position.set(0, 1.2, -2.02);
blade.rotation.x = -0.35;
add(blade);
for (const x of [-0.48, 0.48]) {
  const upright = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.38, 0.1), carbon);
  upright.name = "Part_Spoiler";
  upright.position.set(x, 1.02, -1.9);
  add(upright);
}

const plate = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.04, 0.46), carbon);
plate.name = "Part_Diffuser";
plate.position.set(0, 0.1, -2.02);
add(plate);
for (let i = 0; i < 7; i += 1) {
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.18, 0.4), carbon);
  fin.name = "Part_Diffuser";
  fin.position.set(-0.42 + i * 0.14, 0.18, -2.02);
  add(fin);
}

for (const x of [-0.55, 0.55]) {
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.06), lamp);
  head.name = "Body_Lamp";
  head.position.set(x, 0.58, 2.12);
  add(head);
  const rear = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.05), tail);
  rear.name = "Body_Lamp";
  rear.position.set(x, 0.7, -2.08);
  add(rear);
}

const scene = new THREE.Scene();
scene.name = "StudioCar";
scene.add(root);

const box = new THREE.Box3().setFromObject(root);
const center = box.getCenter(new THREE.Vector3());
root.position.x -= center.x;
root.position.z -= center.z;
root.position.y -= box.min.y;

// Node has Blob but not FileReader, which GLTFExporter uses for the binary chunk.
globalThis.FileReader = class FileReader {
  result = null;
  onloadend = null;
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      this.onloadend?.();
    });
  }
};

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, { binary: true });
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, Buffer.from(glb));

const fitted = new THREE.Box3().setFromObject(root);
const names = new Set();
root.traverse((obj) => {
  if (obj.name) names.add(obj.name);
});
console.log("wrote", outFile, "bytes", glb.byteLength);
console.log("bounds", fitted.min.toArray().map((n) => n.toFixed(2)), fitted.max.toArray().map((n) => n.toFixed(2)));
console.log("names", [...names].join(", "));

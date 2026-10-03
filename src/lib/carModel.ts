/**
 * 3D car on the homepage.
 *
 * Swap the model:
 *   1. Export a compressed .glb from Blender (Draco if you want smaller files).
 *   2. Replace `CAR_MODEL_URL` — put the file in `public/` and point this at it.
 *   3. Name each clickable object in Blender, then list those names in `meshNames`.
 *      A mesh matches when its name includes any string here (case-insensitive).
 *      Example Blender names: Part_Spoiler, Part_FrontLip, Part_SideSkirt.
 *
 * The homepage model is the Mazda RX-7 in `public/models/rx7/`.
 * Wing, front splitter, and rear pieces are separate nodes. The carbon shell
 * is one mesh; `prepareCarScene` splits it into the other clickable areas.
 */

export const CAR_MODEL_URL = "/models/rx7/scene.gltf";

export type CarPart = {
  id: string;
  /** Product slug and /parts/[slug] route. */
  slug: string;
  /** Match THREE.Mesh.name. Add every name your GLB uses for this part. */
  meshNames: string[];
  /** Camera pose after the part is clicked. Position and look-at target, in meters. */
  camera: {
    position: [number, number, number];
    target: [number, number, number];
  };
};

export const carParts: CarPart[] = [
  {
    id: "spoiler",
    slug: "spoiler",
    meshNames: ["Part_Spoiler", "spoiler", "Wing", "Carbon_Fiber_Wing"],
    camera: { position: [0.9, 1.7, -3.5], target: [0, 1.05, -1.6] },
  },
  {
    id: "front_lip",
    slug: "front-lip",
    meshNames: ["Part_FrontLip", "front_lip", "frontlip", "Cube.003", "Object_19", "Object_20"],
    camera: { position: [0.4, 0.7, 3.6], target: [0, 0.28, 1.8] },
  },
  {
    id: "side_skirt",
    slug: "side-skirts",
    meshNames: ["Part_SideSkirt", "side_skirt", "sideskirt"],
    camera: { position: [3.5, 0.85, 0.3], target: [0.6, 0.35, 0] },
  },
  {
    id: "wide_body",
    slug: "wide-body-kit",
    meshNames: ["Part_WideBody", "wide_body", "widebody"],
    camera: { position: [3.6, 1.35, 2.6], target: [0, 0.55, 0.2] },
  },
  {
    id: "air_intake",
    slug: "air-intake",
    meshNames: ["Part_AirIntake", "air_intake", "intake"],
    camera: { position: [1.1, 2.15, 2.5], target: [0, 0.9, 0.8] },
  },
  {
    id: "diffuser",
    slug: "rear-diffuser",
    meshNames: ["Part_Diffuser", "diffuser", "Object_16", "Object_17"],
    camera: { position: [0.55, 0.6, -3.4], target: [0, 0.28, -1.7] },
  },
];

export function matchCarPart(meshName: string) {
  const name = meshName.toLowerCase();
  return carParts.find((part) => part.meshNames.some((token) => name.includes(token.toLowerCase())));
}

export function carPartBySlug(slug: string) {
  return carParts.find((part) => part.slug === slug);
}

export function carPartById(id: string) {
  return carParts.find((part) => part.id === id);
}

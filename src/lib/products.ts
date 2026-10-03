export type Lang = "en" | "ar";
export type Category = "3d-printing" | "carbon-fiber" | "laser" | "custom";

export type Copy = Record<Lang, string>;

export type ProductOption = {
  id: string;
  name: Copy;
  values: { id: string; label: Copy; priceDelta?: number }[];
};

export type Product = {
  slug: string;
  sku: string;
  category: Category;
  name: Copy;
  short: Copy;
  description: Copy;
  price: number;
  fromPrice?: boolean;
  leadTimeDays: number;
  featured?: boolean;
  madeToOrder?: boolean;
  bestseller?: boolean;
  options?: ProductOption[];
  specs: { label: Copy; value: Copy }[];
  includes: Copy[];
};

export const categories: { id: Category | "all"; label: Copy }[] = [
  { id: "all", label: { en: "Car parts", ar: "قطع السيارات" } },
];

const material = {
  label: { en: "Material", ar: "المادة" },
  asa: { en: "Carbon fiber, or 3D printed ASA", ar: "ألياف كربون، أو طباعة ASA" },
  caps: { en: "Carbon fiber, or 3D printed ASA", ar: "ألياف كربون، أو طباعة ASA" },
};

export const products: Product[] = [
  {
    slug: "wide-body-kit",
    sku: "MTE-CAR-WB",
    category: "3d-printing",
    name: { en: "Wide body kit", ar: "طقم هيكل عريض" },
    short: {
      en: "Flared arches and extended body lines, engineered to your car.",
      ar: "أقواس أعرض وخطوط هيكل ممتدة، تُصنع على مقاس سيارتك.",
    },
    description: {
      en: "Model-specific widebody styling. We shape the kit around the make and model you choose.",
      ar: "توسيع هيكل حسب الموديل. نفصّل الطقم على الشركة والموديل الذي تختاره.",
    },
    price: 0,
    leadTimeDays: 14,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.asa }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
  {
    slug: "spoiler",
    sku: "MTE-CAR-SPL",
    category: "3d-printing",
    name: { en: "Spoiler", ar: "جناح خلفي" },
    short: {
      en: "A rear wing made for the look of your car.",
      ar: "جناح خلفي يُصنع لمظهر سيارتك.",
    },
    description: {
      en: "Custom rear spoilers and wings, printed light and finished for the vehicle you select.",
      ar: "أجنحة خلفية حسب الطلب، خفيفة وتُجهّز للسيارة التي تحددها.",
    },
    price: 0,
    leadTimeDays: 10,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.asa }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
  {
    slug: "side-skirts",
    sku: "MTE-CAR-SKT",
    category: "3d-printing",
    name: { en: "Side skirts", ar: "عتبات جانبية" },
    short: {
      en: "Side skirts and mounts adapted to your car.",
      ar: "عتبات جانبية وقطع تثبيت تناسب سيارتك.",
    },
    description: {
      en: "Aerodynamic side skirts with mounting details matched to the chosen vehicle.",
      ar: "عتبات جانبية مع تفاصيل التثبيت حسب السيارة المختارة.",
    },
    price: 0,
    leadTimeDays: 10,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.asa }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
  {
    slug: "front-lip",
    sku: "MTE-CAR-LIP",
    category: "3d-printing",
    name: { en: "Front lip", ar: "ليب أمامي" },
    short: {
      en: "A low front lip, printed in sections for your bumper.",
      ar: "ليب أمامي منخفض، يُطبع على مقاطع تناسب الصدام.",
    },
    description: {
      en: "Low-profile front-lip styling, split into sections so it can be printed and fitted to your car.",
      ar: "ليب أمامي بارتفاع منخفض، مقسّم إلى مقاطع حتى يُطبع ويُركّب على سيارتك.",
    },
    price: 0,
    leadTimeDays: 10,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.asa }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
  {
    slug: "rear-diffuser",
    sku: "MTE-CAR-DIF",
    category: "3d-printing",
    name: { en: "Rear diffuser", ar: "دفيوزر خلفي" },
    short: {
      en: "A rear diffuser shaped for your bumper.",
      ar: "دفيوزر خلفي يُشكَّل على صدام سيارتك.",
    },
    description: {
      en: "Rear diffuser with aero surfaces and mounts made for the car you choose.",
      ar: "دفيوزر خلفي بأسطح هوائية وتثبيت يُصنع للسيارة التي تختارها.",
    },
    price: 0,
    leadTimeDays: 10,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.asa }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
  {
    slug: "wheel-caps",
    sku: "MTE-CAR-CAP",
    category: "3d-printing",
    name: { en: "Illuminated wheel caps", ar: "أغطية جنوط مضيئة" },
    short: {
      en: "Center caps with room for a lit emblem.",
      ar: "أغطية وسط الجنط مع مكان لشعار مضيء.",
    },
    description: {
      en: "Custom wheel-center caps with space for an illuminated emblem.",
      ar: "أغطية وسط الجنط حسب الطلب، مع فراغ لشعار مضيء.",
    },
    price: 0,
    leadTimeDays: 7,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.caps }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
  {
    slug: "air-intake",
    sku: "MTE-CAR-INT",
    category: "3d-printing",
    name: { en: "Air intake", ar: "مدخل هواء" },
    short: {
      en: "A multi-piece intake or snorkel for your engine bay.",
      ar: "مدخل هواء أو سنوركل من عدة قطع لحجرة المحرك.",
    },
    description: {
      en: "Printed intake and snorkel parts, split into pieces that fit a printer and then your car.",
      ar: "قطع مدخل هواء وسنوركل مطبوعة، مقسّمة حتى تُطبع ثم تُركّب على سيارتك.",
    },
    price: 0,
    leadTimeDays: 10,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.asa }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
  {
    slug: "interior",
    sku: "MTE-CAR-CAB",
    category: "3d-printing",
    name: { en: "Interior", ar: "الداخلية" },
    short: {
      en: "Carbon trim for the wheel, dash, console, and seats, made for your car.",
      ar: "تشطيب كربون للمقود والطبلون والكونسول والمقاعد، يُصنع لسيارتك.",
    },
    description: {
      en: "Steering wheel, dashboard, center console, and seats in carbon fiber, shaped to the car you choose.",
      ar: "مقود وطبلون وكونسول ومقاعد بتفاصيل ألياف الكربون، تُفصَّل على السيارة التي تختارها.",
    },
    price: 0,
    leadTimeDays: 14,
    featured: true,
    madeToOrder: true,
    specs: [{ label: material.label, value: material.asa }],
    includes: [{ en: "Fitment for the car you choose", ar: "تفصيل على السيارة التي تختارها" }],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

export function priceWithOptions(product: Product, selected: Record<string, string>) {
  let price = product.price;
  for (const option of product.options ?? []) {
    const valueId = selected[option.id] ?? option.values[0]?.id;
    const value = option.values.find((v) => v.id === valueId);
    price += value?.priceDelta ?? 0;
  }
  return Math.max(0, price);
}

export function defaultOptions(product: Product): Record<string, string> {
  const selected: Record<string, string> = {};
  for (const option of product.options ?? []) {
    selected[option.id] = option.values[0].id;
  }
  return selected;
}

export function optionLabels(product: Product, selected: Record<string, string>) {
  return (product.options ?? []).map((option) => {
    const value = option.values.find((v) => v.id === (selected[option.id] ?? option.values[0].id));
    return {
      name: option.name,
      value: value?.label ?? { en: "", ar: "" },
    };
  });
}

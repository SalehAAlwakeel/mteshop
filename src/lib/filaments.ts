import type { Copy } from "./products";

export type PrintFilament = {
  id: string;
  name: string;
  composition: Copy;
  colors: Copy[];
};

export const filamentColors: Record<string, Copy> = {
  black: { en: "Black", ar: "أسود" },
  white: { en: "White", ar: "أبيض" },
  grey: { en: "Grey", ar: "رمادي" },
  natural: { en: "Natural", ar: "طبيعي" },
  red: { en: "Red", ar: "أحمر" },
  blue: { en: "Blue", ar: "أزرق" },
  orange: { en: "Orange", ar: "برتقالي" },
  green: { en: "Green", ar: "أخضر" },
  yellow: { en: "Yellow", ar: "أصفر" },
  clear: { en: "Clear", ar: "شفاف" },
};

export const printFilaments: PrintFilament[] = [
  {
    id: "pla",
    name: "PLA",
    composition: {
      en: "Polylactic acid",
      ar: "حمض البوليلاكتيك",
    },
    colors: [
      filamentColors.black,
      filamentColors.white,
      filamentColors.grey,
      filamentColors.natural,
      filamentColors.red,
      filamentColors.blue,
      filamentColors.orange,
      filamentColors.green,
      filamentColors.yellow,
    ],
  },
  {
    id: "pla-plus",
    name: "PLA+",
    composition: {
      en: "Toughened polylactic acid",
      ar: "حمض بوليلاكتيك مقوّى",
    },
    colors: [
      filamentColors.black,
      filamentColors.white,
      filamentColors.grey,
      filamentColors.red,
      filamentColors.blue,
    ],
  },
  {
    id: "petg",
    name: "PETG",
    composition: {
      en: "Polyethylene terephthalate glycol",
      ar: "بولي إيثيلين تيريفثالات جلايكول",
    },
    colors: [
      filamentColors.black,
      filamentColors.white,
      filamentColors.grey,
      filamentColors.natural,
      filamentColors.red,
      filamentColors.blue,
      filamentColors.orange,
      filamentColors.clear,
    ],
  },
  {
    id: "cpe",
    name: "CPE",
    composition: {
      en: "Copolyester",
      ar: "كوبوليستر",
    },
    colors: [filamentColors.black, filamentColors.white, filamentColors.grey, filamentColors.natural],
  },
  {
    id: "abs",
    name: "ABS",
    composition: {
      en: "Acrylonitrile butadiene styrene",
      ar: "أكريلونيتريل بوتادين ستايرين",
    },
    colors: [
      filamentColors.black,
      filamentColors.white,
      filamentColors.grey,
      filamentColors.red,
      filamentColors.blue,
    ],
  },
  {
    id: "asa",
    name: "ASA",
    composition: {
      en: "Acrylonitrile styrene acrylate",
      ar: "أكريلونيتريل ستايرين أكريلات",
    },
    colors: [filamentColors.black, filamentColors.white, filamentColors.grey],
  },
  {
    id: "tpu",
    name: "TPU",
    composition: {
      en: "Thermoplastic polyurethane",
      ar: "بولي يوريثان حراري",
    },
    colors: [filamentColors.black, filamentColors.white, filamentColors.red, filamentColors.orange],
  },
  {
    id: "pla-cf",
    name: "PLA/CF",
    composition: {
      en: "PLA with carbon fiber",
      ar: "PLA مع ألياف الكربون",
    },
    colors: [filamentColors.black],
  },
  {
    id: "abs-cf",
    name: "ABS/CF",
    composition: {
      en: "ABS with carbon fiber",
      ar: "ABS مع ألياف الكربون",
    },
    colors: [filamentColors.black],
  },
  {
    id: "pps",
    name: "PPS",
    composition: {
      en: "Polyphenylene sulfide",
      ar: "كبريتيد البولي فينيلين",
    },
    colors: [filamentColors.natural, filamentColors.black],
  },
  {
    id: "pa",
    name: "PA",
    composition: {
      en: "Polyamide",
      ar: "بولي أميد",
    },
    colors: [filamentColors.black, filamentColors.natural],
  },
];

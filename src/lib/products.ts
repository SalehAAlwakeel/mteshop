export type Lang = "en" | "ar";
export type Category = "3d-printing" | "carbon-fiber" | "laser";

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
  { id: "all", label: { en: "All work", ar: "كل الأعمال" } },
  { id: "3d-printing", label: { en: "3D printing", ar: "طباعة ثلاثية الأبعاد" } },
  { id: "carbon-fiber", label: { en: "Carbon fiber", ar: "ألياف الكربون" } },
  { id: "laser", label: { en: "Laser", ar: "ليزر" } },
];

export const products: Product[] = [
  {
    slug: "custom-fdm-print",
    sku: "MTE-3D-FDM",
    category: "3d-printing",
    name: { en: "Custom FDM print", ar: "طباعة FDM حسب الطلب" },
    short: {
      en: "Functional parts in PLA, PETG, or ABS — uploaded files welcome.",
      ar: "قطع وظيفية من PLA أو PETG أو ABS — نقبل ملفاتك مباشرة.",
    },
    description: {
      en: "Send an STL, 3MF, or STEP file and we print on calibrated FDM machines in Riyadh. Ideal for jigs, housings, brackets, and iteration-speed prototypes. We check wall thickness, orientation, and infill before we start so you are not paying for a failed part.",
      ar: "أرسل ملف STL أو 3MF أو STEP ونطبعه على طابعات FDM معايرة في الرياض. مناسب للمركبات، الأغلفة، الحوامل، والنماذج الأولية السريعة. نراجع السماكة والاتجاه والكثافة قبل البدء حتى لا تدفع مقابل قطعة فاشلة.",
    },
    price: 85,
    fromPrice: true,
    leadTimeDays: 3,
    featured: true,
    madeToOrder: true,
    options: [
      {
        id: "material",
        name: { en: "Material", ar: "المادة" },
        values: [
          { id: "pla", label: { en: "PLA", ar: "PLA" } },
          { id: "pla-plus", label: { en: "PLA+", ar: "PLA+" } },
          { id: "petg", label: { en: "PETG", ar: "PETG" } },
          { id: "cpe", label: { en: "CPE", ar: "CPE" } },
          { id: "abs", label: { en: "ABS", ar: "ABS" } },
          { id: "asa", label: { en: "ASA", ar: "ASA" } },
          { id: "tpu", label: { en: "TPU", ar: "TPU" } },
          { id: "pla-cf", label: { en: "PLA/CF", ar: "PLA/CF" } },
          { id: "abs-cf", label: { en: "ABS/CF", ar: "ABS/CF" } },
          { id: "pps", label: { en: "PPS", ar: "PPS" } },
          { id: "pa", label: { en: "PA", ar: "PA" } },
        ],
      },
      {
        id: "color",
        name: { en: "Color", ar: "اللون" },
        values: [
          { id: "black", label: { en: "Black", ar: "أسود" } },
          { id: "white", label: { en: "White", ar: "أبيض" } },
          { id: "grey", label: { en: "Grey", ar: "رمادي" } },
          { id: "natural", label: { en: "Natural", ar: "طبيعي" } },
          { id: "red", label: { en: "Red", ar: "أحمر" } },
          { id: "blue", label: { en: "Blue", ar: "أزرق" } },
          { id: "orange", label: { en: "Orange", ar: "برتقالي" } },
          { id: "green", label: { en: "Green", ar: "أخضر" } },
          { id: "yellow", label: { en: "Yellow", ar: "أصفر" } },
          { id: "clear", label: { en: "Clear", ar: "شفاف" } },
        ],
      },
    ],
    specs: [],
    includes: [
      { en: "Printability review", ar: "مراجعة قابلية الطباعة" },
      { en: "Support removal & light sanding", ar: "إزالة الدعم وتنعيم خفيف" },
      { en: "VAT invoice", ar: "فاتورة ضريبية" },
    ],
  },
  {
    slug: "resin-prototype",
    sku: "MTE-3D-SLA",
    category: "3d-printing",
    name: { en: "Resin prototype", ar: "نموذج أولي راتنجي" },
    short: {
      en: "High-detail SLA for jewelry masters, dental mocks, and crisp housings.",
      ar: "طباعة راتنج عالية التفاصيل لقوالب المجوهرات والنماذج الطبية والأغلفة الدقيقة.",
    },
    description: {
      en: "MSLA resin printing with 50 micron layers. We offer standard grey, tough, and castable-style resins. Perfect when FDM layer lines would show on a client-facing model.",
      ar: "طباعة راتنج بدقة ٥٠ ميكرون. نوفر راتنج رمادي قياسي، ومتين، وقابل للصب. الخيار الصحيح عندما لا تناسب خطوط FDM نموذجاً يُعرض للعميل.",
    },
    price: 140,
    fromPrice: true,
    leadTimeDays: 4,
    featured: true,
    madeToOrder: true,
    options: [
      {
        id: "resin",
        name: { en: "Resin", ar: "الراتنج" },
        values: [
          { id: "standard", label: { en: "Standard grey", ar: "رمادي قياسي" } },
          { id: "tough", label: { en: "Tough +45", ar: "متين ‎+٤٥" }, priceDelta: 45 },
          { id: "clear", label: { en: "Clear +30", ar: "شفاف ‎+٣٠" }, priceDelta: 30 },
        ],
      },
    ],
    specs: [
      { label: { en: "Layer height", ar: "ارتفاع الطبقة" }, value: { en: "50 μm", ar: "٥٠ ميكرون" } },
      { label: { en: "Post-process", ar: "المعالجة" }, value: { en: "Wash, UV cure, support cleanup", ar: "غسيل، معالجة UV، تنظيف الدعم" } },
    ],
    includes: [
      { en: "Cured, support-free delivery", ar: "تسليم معالج وخالٍ من الدعم" },
      { en: "Dimensional check", ar: "فحص أبعاد" },
    ],
  },
  {
    slug: "architectural-model",
    sku: "MTE-3D-ARCH",
    category: "3d-printing",
    name: { en: "Architectural scale model", ar: "مجسم معماري مقياسي" },
    short: {
      en: "Presentation models for villas, towers, and masterplans in Riyadh.",
      ar: "مجسمات عرض للفلل والأبراج والمخططات في الرياض.",
    },
    description: {
      en: "We translate CAD or drawings into a display-ready massing model. Base plate, landscaping mass, and optional lighting channel. Built for developer presentations and municipality reviews.",
      ar: "نحوّل ملفات CAD أو المخططات إلى مجسم جاهز للعرض. قاعدة، كتل تنسيق، وقناة إضاءة اختيارية. مناسب لعروض المطورين ومراجعات الأمانة.",
    },
    price: 890,
    fromPrice: true,
    leadTimeDays: 10,
    featured: true,
    madeToOrder: true,
    options: [
      {
        id: "scale",
        name: { en: "Scale", ar: "المقياس" },
        values: [
          { id: "200", label: { en: "1:200", ar: "١:٢٠٠" } },
          { id: "100", label: { en: "1:100 +400", ar: "١:١٠٠ ‎+٤٠٠" }, priceDelta: 400 },
          { id: "50", label: { en: "1:50 +1200", ar: "١:٥٠ ‎+١٢٠٠" }, priceDelta: 1200 },
        ],
      },
    ],
    specs: [
      { label: { en: "Finish", ar: "التشطيب" }, value: { en: "Primed white or sanded grey", ar: "أبيض ممهّد أو رمادي منعم" } },
    ],
    includes: [
      { en: "Design review call", ar: "مكالمة مراجعة تصميم" },
      { en: "Rigid base", ar: "قاعدة صلبة" },
    ],
  },
  {
    slug: "functional-bracket-set",
    sku: "MTE-3D-BRK",
    category: "3d-printing",
    name: { en: "Functional bracket set", ar: "طقم حوامل وظيفية" },
    short: {
      en: "A pack of four PETG machine brackets — shop-floor ready.",
      ar: "طقم أربعة حوامل آلات من PETG جاهزة لورشة العمل.",
    },
    description: {
      en: "A proven bracket family we keep on the printer: 90° corner, slotted rail, sensor mount, and cable clamp. PETG for heat and impact. Swap colours if you need visual coding on the line.",
      ar: "عائلة حوامل مجرّبة نطبعها باستمرار: زاوية ٩٠°، سكة مشقوقة، حامل حسّاس، ومشبك كابل. PETG للحرارة والصدمات. يمكن تغيير الألوان لترميز خط الإنتاج.",
    },
    price: 165,
    leadTimeDays: 2,
    bestseller: true,
    options: [
      {
        id: "color",
        name: { en: "Color", ar: "اللون" },
        values: [
          { id: "black", label: { en: "Machine black", ar: "أسود آلات" } },
          { id: "orange", label: { en: "Safety orange", ar: "برتقالي سلامة" } },
          { id: "white", label: { en: "White", ar: "أبيض" } },
        ],
      },
    ],
    specs: [
      { label: { en: "Material", ar: "المادة" }, value: { en: "PETG, 40% infill", ar: "PETG، تعبئة ٤٠٪" } },
      { label: { en: "Qty", ar: "الكمية" }, value: { en: "4 pieces", ar: "٤ قطع" } },
    ],
    includes: [
      { en: "M4 clearance holes", ar: "فتحات M4" },
      { en: "Deburred edges", ar: "حواف منزوعة النتوءات" },
    ],
  },
  {
    slug: "printed-souvenirs",
    sku: "MTE-3D-SVN",
    category: "3d-printing",
    name: { en: "3D printed souvenirs", ar: "تذكارات مطبوعة ثلاثياً" },
    short: {
      en: "Small gifts and keepsakes — keychains, desk models, and name pieces.",
      ar: "هدايا وتذكارات صغيرة — سلاسل مفاتيح، مجسمات مكتب، وقطع بأسماء.",
    },
    description: {
      en: "Printed souvenirs for events, offices, and gifts in Riyadh. Choose a keychain, a desk model, or a name piece. We print in PLA or resin, then clean the supports so the gift is ready to hand over.",
      ar: "تذكارات مطبوعة للفعاليات والمكاتب والهدايا في الرياض. اختر سلسلة مفاتيح أو مجسم مكتب أو قطعة باسم. نطبع بـ PLA أو الراتنج ثم ننظف الدعم حتى تكون الهدية جاهزة للتسليم.",
    },
    price: 35,
    fromPrice: true,
    leadTimeDays: 3,
    featured: true,
    madeToOrder: true,
    options: [
      {
        id: "piece",
        name: { en: "Piece", ar: "القطعة" },
        values: [
          { id: "keychain", label: { en: "Keychain", ar: "سلسلة مفاتيح" } },
          { id: "desk", label: { en: "Desk model +25", ar: "مجسم مكتب ‎+٢٥" }, priceDelta: 25 },
          { id: "name", label: { en: "Name piece +15", ar: "قطعة باسم ‎+١٥" }, priceDelta: 15 },
        ],
      },
      {
        id: "color",
        name: { en: "Color", ar: "اللون" },
        values: [
          { id: "black", label: { en: "Black", ar: "أسود" } },
          { id: "white", label: { en: "White", ar: "أبيض" } },
          { id: "sand", label: { en: "Sand", ar: "رملي" } },
          { id: "green", label: { en: "Green", ar: "أخضر" } },
        ],
      },
    ],
    specs: [
      { label: { en: "Process", ar: "العملية" }, value: { en: "FDM or resin", ar: "FDM أو راتنج" } },
    ],
    includes: [
      { en: "Support cleanup", ar: "تنظيف الدعم" },
      { en: "Gift-ready finish", ar: "تشطيب جاهز للإهداء" },
    ],
  },
  {
    slug: "car-parts",
    sku: "MTE-3D-CAR",
    category: "3d-printing",
    name: { en: "Car parts", ar: "قطع سيارات" },
    short: {
      en: "Printed clips, vents, knobs, and brackets made to fit a vehicle.",
      ar: "مشابك وفتحات ومقابض وحوامل مطبوعة لتناسب السيارة.",
    },
    description: {
      en: "Functional car parts printed in PETG, ABS, ASA, or nylon. Send a sample, a photo, or a file for clips, vent surrounds, knobs, and interior brackets. We check the fit before the full run.",
      ar: "قطع سيارات وظيفية مطبوعة من PETG أو ABS أو ASA أو نايلون. أرسل عينة أو صورة أو ملفاً للمشابك وحواف الفتحات والمقابض وحوامل الداخلية. نراجع المقاس قبل التشغيل الكامل.",
    },
    price: 95,
    fromPrice: true,
    leadTimeDays: 4,
    featured: true,
    madeToOrder: true,
    options: [
      {
        id: "material",
        name: { en: "Material", ar: "المادة" },
        values: [
          { id: "petg", label: { en: "PETG", ar: "PETG" } },
          { id: "abs", label: { en: "ABS", ar: "ABS" } },
          { id: "asa", label: { en: "ASA", ar: "ASA" } },
          { id: "pa", label: { en: "PA", ar: "PA" } },
        ],
      },
      {
        id: "part",
        name: { en: "Part", ar: "القطعة" },
        values: [
          { id: "clip", label: { en: "Clip or bracket", ar: "مشبك أو حامل" } },
          { id: "vent", label: { en: "Vent or trim +40", ar: "فتحة أو تشطيب ‎+٤٠" }, priceDelta: 40 },
          { id: "knob", label: { en: "Knob +25", ar: "مقبض ‎+٢٥" }, priceDelta: 25 },
        ],
      },
    ],
    specs: [
      { label: { en: "Fit", ar: "المقاس" }, value: { en: "Checked against your sample or file", ar: "يُراجع على عينتك أو ملفك" } },
    ],
    includes: [
      { en: "Fit check", ar: "فحص المقاس" },
      { en: "Support removal", ar: "إزالة الدعم" },
    ],
  },
  {
    slug: "carbon-custom-panel",
    sku: "MTE-CF-PNL",
    category: "carbon-fiber",
    name: { en: "Custom carbon panel", ar: "لوحة كربون حسب الطلب" },
    short: {
      en: "Twill or plain-weave wet layup, vacuum bagged, trimmed to your DXF.",
      ar: "نسيج مبروم أو سادة، كيس تفريغ، قص حسب ملف DXF.",
    },
    description: {
      en: "We lay 3K carbon over a mould or flat caul, vacuum bag, and post-cure. Edges can be CNC or laser-trimmed depending on thickness. Used for interiors, drone decks, and automotive inserts around Riyadh workshops.",
      ar: "نفرش كربون 3K على قالب أو سطح مستوٍ، ثم كيس تفريغ ومعالجة لاحقة. الحواف تُقص CNC أو ليزر حسب السماكة. يُستخدم للداخلية، ومنصات الدرون، وإدخالات السيارات في ورش الرياض.",
    },
    price: 650,
    fromPrice: true,
    leadTimeDays: 8,
    featured: true,
    madeToOrder: true,
    options: [
      {
        id: "weave",
        name: { en: "Weave", ar: "النسيج" },
        values: [
          { id: "twill", label: { en: "2×2 twill", ar: "مبروم ٢×٢" } },
          { id: "plain", label: { en: "Plain weave", ar: "سادة" } },
          { id: "forge", label: { en: "Forged-look +180", ar: "مظهر مطروق ‎+١٨٠" }, priceDelta: 180 },
        ],
      },
      {
        id: "finish",
        name: { en: "Finish", ar: "التشطيب" },
        values: [
          { id: "gloss", label: { en: "High gloss", ar: "لامع عالي" } },
          { id: "satin", label: { en: "Satin +40", ar: "ساتان ‎+٤٠" }, priceDelta: 40 },
          { id: "matte", label: { en: "Matte +60", ar: "مطفي ‎+٦٠" }, priceDelta: 60 },
        ],
      },
    ],
    specs: [
      { label: { en: "Typical size", ar: "الحجم المعتاد" }, value: { en: "Up to 600 × 400 mm", ar: "حتى ٦٠٠ × ٤٠٠ مم" } },
      { label: { en: "Plies", ar: "الطبقات" }, value: { en: "3–6 ply", ar: "٣–٦ طبقات" } },
    ],
    includes: [
      { en: "Edge sealing", ar: "عزل الحواف" },
      { en: "Photo report before ship", ar: "تقرير صور قبل الشحن" },
    ],
  },
  {
    slug: "carbon-phone-case",
    sku: "MTE-CF-CASE",
    category: "carbon-fiber",
    name: { en: "Carbon fiber phone case", ar: "غلاف جوال من ألياف الكربون" },
    short: {
      en: "Real twill carbon shell, not a printed sticker. MagSafe-friendly options.",
      ar: "هيكل كربون مبروم حقيقي وليس ملصقاً. خيارات متوافقة مع MagSafe.",
    },
    description: {
      en: "A slim real-carbon aramid-backed case. Weave is aligned, edges are polished, and the interior is flocked so it does not scuff the phone. Made in small batches in Riyadh.",
      ar: "غلاف نحيف من كربون حقيقي بدعم أراميد. النسيج محاذى، الحواف ملمّعة، والداخل مخمل حتى لا يخدش الجوال. يُصنع على دفعات صغيرة في الرياض.",
    },
    price: 219,
    leadTimeDays: 5,
    featured: true,
    bestseller: true,
    options: [
      {
        id: "model",
        name: { en: "Model", ar: "الموديل" },
        values: [
          { id: "iphone-16", label: { en: "iPhone 16 / 16 Pro", ar: "آيفون ١٦ / ١٦ برو" } },
          { id: "iphone-15", label: { en: "iPhone 15 / 15 Pro", ar: "آيفون ١٥ / ١٥ برو" } },
          { id: "s24", label: { en: "Galaxy S24 / S25", ar: "جالكسي S24 / S25" } },
        ],
      },
      {
        id: "magsafe",
        name: { en: "MagSafe ring", ar: "حلقة MagSafe" },
        values: [
          { id: "no", label: { en: "No", ar: "بدون" } },
          { id: "yes", label: { en: "Add MagSafe +35", ar: "إضافة MagSafe ‎+٣٥" }, priceDelta: 35 },
        ],
      },
    ],
    specs: [
      { label: { en: "Weight", ar: "الوزن" }, value: { en: "~22 g", ar: "حوالي ٢٢ جم" } },
      { label: { en: "Material", ar: "المادة" }, value: { en: "3K twill + aramid", ar: "مبروم 3K + أراميد" } },
    ],
    includes: [
      { en: "Microfibre pouch", ar: "كيس مايكروفايبر" },
      { en: "Care card", ar: "بطاقة عناية" },
    ],
  },
  {
    slug: "carbon-drone-arms",
    sku: "MTE-CF-DRN",
    category: "carbon-fiber",
    name: { en: "Carbon drone arms", ar: "أذرع درون كربون" },
    short: {
      en: "Stiff 3K arms, cut and finished as a matched set of four.",
      ar: "أذرع 3K صلبة، مقصوصة ومشطّبة كطقم متطابق من أربعة.",
    },
    description: {
      en: "Matched quadcopter arms from plate carbon. We can follow your DXF or a common 5–7 inch layout. Holes are drilled, edges chamfered, and each arm is weighed so the set stays balanced.",
      ar: "أذرع رباعية من صفيحة كربون متطابقة. نعمل حسب DXF أو تخطيط شائع ٥–٧ إنش. تُثقب الفتحات وتُشطف الحواف ويُوزن كل ذراع ليبقى الطقم متزناً.",
    },
    price: 420,
    leadTimeDays: 6,
    madeToOrder: true,
    options: [
      {
        id: "size",
        name: { en: "Frame class", ar: "فئة الإطار" },
        values: [
          { id: "5in", label: { en: "5 inch", ar: "٥ إنش" } },
          { id: "7in", label: { en: "7 inch +80", ar: "٧ إنش ‎+٨٠" }, priceDelta: 80 },
        ],
      },
    ],
    specs: [
      { label: { en: "Thickness", ar: "السماكة" }, value: { en: "4 mm plate", ar: "صفيحة ٤ مم" } },
    ],
    includes: [
      { en: "Set of 4", ar: "طقم من ٤" },
      { en: "Balance sheet", ar: "ورقة أوزان" },
    ],
  },
  {
    slug: "carbon-sheet-300",
    sku: "MTE-CF-SHT",
    category: "carbon-fiber",
    name: { en: "Carbon sheet 300×200", ar: "صفيحة كربون ٣٠٠×٢٠٠" },
    short: {
      en: "Gloss twill plate you can mill, drill, or send back for laser trim.",
      ar: "صفيحة مبرومة لامعة يمكن تفريزها أو ثقبها أو إعادة قصها بالليزر.",
    },
    description: {
      en: "A stock 300 × 200 mm carbon plate in 1.5, 2, or 3 mm. Gloss both sides. We keep these on the shelf for workshops that need material today.",
      ar: "صفيحة كربون ٣٠٠ × ٢٠٠ مم بسماكة ١٫٥ أو ٢ أو ٣ مم. لامعة من الوجهين. متوفرة في الورشة لمن يحتاج مادة اليوم.",
    },
    price: 310,
    leadTimeDays: 1,
    options: [
      {
        id: "thickness",
        name: { en: "Thickness", ar: "السماكة" },
        values: [
          { id: "1.5", label: { en: "1.5 mm", ar: "١٫٥ مم" } },
          { id: "2", label: { en: "2 mm +40", ar: "٢ مم ‎+٤٠" }, priceDelta: 40 },
          { id: "3", label: { en: "3 mm +90", ar: "٣ مم ‎+٩٠" }, priceDelta: 90 },
        ],
      },
    ],
    specs: [
      { label: { en: "Size", ar: "المقاس" }, value: { en: "300 × 200 mm", ar: "٣٠٠ × ٢٠٠ مم" } },
      { label: { en: "Weave", ar: "النسيج" }, value: { en: "2×2 twill, 3K", ar: "مبروم ٢×٢، 3K" } },
    ],
    includes: [
      { en: "Protective film", ar: "فيلم حماية" },
      { en: "Same-day Riyadh pickup", ar: "استلام في الرياض في نفس اليوم" },
    ],
  },
  {
    slug: "acrylic-logo-sign",
    sku: "MTE-LZ-SGN",
    category: "laser",
    name: { en: "Acrylic logo sign", ar: "لافتة شعار أكريليك" },
    short: {
      en: "Cut, engraved, or layered brand signage for offices and storefronts.",
      ar: "لافتات شعار مقصوصة أو محفورة أو متعددة الطبقات للمكاتب والواجهات.",
    },
    description: {
      en: "We cut your vector logo from cast acrylic, optionally engrave a back plate, and offer standoff mounts. Popular with Riyadh clinics, fit-outs, and events. Send AI, SVG, DXF, or a high-res PNG.",
      ar: "نقص شعارك المتجه من أكريليك مصبوب، مع خيار حفر لوحة خلفية، وثبّات مباعدة. شائع في عيادات الرياض والتشطيبات والفعاليات. أرسل AI أو SVG أو DXF أو PNG عالي الدقة.",
    },
    price: 185,
    fromPrice: true,
    leadTimeDays: 3,
    featured: true,
    bestseller: true,
    madeToOrder: true,
    options: [
      {
        id: "size",
        name: { en: "Width", ar: "العرض" },
        values: [
          { id: "40", label: { en: "40 cm", ar: "٤٠ سم" } },
          { id: "60", label: { en: "60 cm +90", ar: "٦٠ سم ‎+٩٠" }, priceDelta: 90 },
          { id: "90", label: { en: "90 cm +210", ar: "٩٠ سم ‎+٢١٠" }, priceDelta: 210 },
        ],
      },
      {
        id: "color",
        name: { en: "Acrylic", ar: "الأكريليك" },
        values: [
          { id: "clear", label: { en: "Clear", ar: "شفاف" } },
          { id: "black", label: { en: "Black", ar: "أسود" } },
          { id: "gold", label: { en: "Mirror gold +55", ar: "ذهبي مرآة ‎+٥٥" }, priceDelta: 55 },
          { id: "white", label: { en: "White", ar: "أبيض" } },
        ],
      },
    ],
    specs: [
      { label: { en: "Thickness", ar: "السماكة" }, value: { en: "5 mm cast acrylic", ar: "أكريليك مصبوب ٥ مم" } },
    ],
    includes: [
      { en: "Vector cleanup", ar: "تنظيف الملف المتجه" },
      { en: "Standoff hardware optional", ar: "ثبّات مباعدة اختيارية" },
    ],
  },
  {
    slug: "wood-name-plaque",
    sku: "MTE-LZ-WD",
    category: "laser",
    name: { en: "Engraved wood plaque", ar: "لوحة خشب محفورة" },
    short: {
      en: "Gifts, desk names, and Quranic ayah plates on walnut or oak.",
      ar: "هدايا، أسماء مكاتب، وألواح آيات على جوز أو سنديان.",
    },
    description: {
      en: "Laser-engraved solid wood with a clean edge and optional Arabic calligraphy layout. We proof the file on WhatsApp before cutting so the diacritics sit correctly.",
      ar: "خشب صلب محفور بالليزر بحافة نظيفة وتخطيط خط عربي اختياري. نعرض الملف على واتساب قبل القص حتى توضع التشكيلات بشكل صحيح.",
    },
    price: 95,
    leadTimeDays: 2,
    featured: true,
    options: [
      {
        id: "wood",
        name: { en: "Wood", ar: "الخشب" },
        values: [
          { id: "oak", label: { en: "Oak", ar: "سنديان" } },
          { id: "walnut", label: { en: "Walnut +25", ar: "جوز ‎+٢٥" }, priceDelta: 25 },
          { id: "bamboo", label: { en: "Bamboo", ar: "خيزران" } },
        ],
      },
    ],
    specs: [
      { label: { en: "Size", ar: "المقاس" }, value: { en: "20 × 12 cm default", ar: "٢٠ × ١٢ سم افتراضياً" } },
    ],
    includes: [
      { en: "Layout proof", ar: "إثبات تخطيط" },
      { en: "Gift wrap on request", ar: "تغليف هدية عند الطلب" },
    ],
  },
  {
    slug: "corporate-gift-set",
    sku: "MTE-LZ-GFT",
    category: "laser",
    name: { en: "Corporate gift set", ar: "طقم هدايا شركات" },
    short: {
      en: "Branded notebook, pen sleeve, and coaster — one logo, one run.",
      ar: "دفتر بشعار، غلاف قلم، وكوستر — شعار واحد، تشغيل واحد.",
    },
    description: {
      en: "A three-piece laser-branded set for onboarding packs and VIP visitors. We keep the logo consistent across leatherette, wood, and kraft. Minimum 10 sets, priced per set.",
      ar: "طقم من ثلاث قطع بشعار ليزر لباقات التوظيف وكبار الزوار. نوحّد الشعار على الجلد والخشب والكرانت. الحد الأدنى ١٠ أطقم، والسعر للطقم.",
    },
    price: 145,
    leadTimeDays: 7,
    madeToOrder: true,
    options: [
      {
        id: "qty",
        name: { en: "Run size", ar: "حجم التشغيل" },
        values: [
          { id: "10", label: { en: "10 sets (listed price)", ar: "١٠ أطقم (السعر الظاهر)" } },
          { id: "25", label: { en: "25 sets, −10 SAR each", ar: "٢٥ طقم، ‎−١٠ ريال لكل" }, priceDelta: -10 },
          { id: "50", label: { en: "50 sets, −20 SAR each", ar: "٥٠ طقم، ‎−٢٠ ريال لكل" }, priceDelta: -20 },
        ],
      },
    ],
    specs: [
      { label: { en: "MOQ", ar: "الحد الأدنى" }, value: { en: "10 sets", ar: "١٠ أطقم" } },
    ],
    includes: [
      { en: "Logo proof", ar: "إثبات شعار" },
      { en: "Kraft sleeve", ar: "غلاف كرافت" },
    ],
  },
  {
    slug: "metal-card-engrave",
    sku: "MTE-LZ-MTL",
    category: "laser",
    name: { en: "Metal card engraving", ar: "حفر بطاقة معدنية" },
    short: {
      en: "Black stainless or brass cards — NFC optional, deep mark guaranteed.",
      ar: "بطاقات ستانلس أسود أو نحاس — NFC اختياري، ووسم عميق مضمون.",
    },
    description: {
      en: "Fiber-laser marking on metal visiting cards. We can add a QR to your WhatsApp or map pin. A sharp alternative to printed cards that wilt in a Riyadh summer.",
      ar: "وسم بليزر فايبر على بطاقات معدنية. يمكن إضافة QR إلى واتساب أو موقع الخريطة. بديل حاد للبطاقات المطبوعة التي تتلف في صيف الرياض.",
    },
    price: 79,
    leadTimeDays: 3,
    options: [
      {
        id: "metal",
        name: { en: "Metal", ar: "المعدن" },
        values: [
          { id: "black", label: { en: "Black stainless", ar: "ستانلس أسود" } },
          { id: "brass", label: { en: "Brass +15", ar: "نحاس ‎+١٥" }, priceDelta: 15 },
        ],
      },
    ],
    specs: [
      { label: { en: "Size", ar: "المقاس" }, value: { en: "85.6 × 54 mm", ar: "٨٥٫٦ × ٥٤ مم" } },
    ],
    includes: [
      { en: "Both sides", ar: "الوجهان" },
      { en: "Soft case", ar: "محفظة ناعمة" },
    ],
  },
  {
    slug: "metal-laser-cut",
    sku: "MTE-LZ-MET",
    category: "laser",
    name: { en: "Laser cutting on metal", ar: "قص ليزر على المعدن" },
    short: {
      en: "Fiber-cut stainless, brass, and aluminum from your DXF.",
      ar: "قص فايبر لستانلس والنحاس والألمنيوم من ملف DXF.",
    },
    description: {
      en: "Sheet-metal parts cut on a fiber laser: signs, panels, brackets, and decorative screens. Send a DXF or SVG. We deburr the edges so the part is ready to mount.",
      ar: "قطع صفائح معدنية على ليزر فايبر: لافتات، ألواح، حوامل، وشاشات زخرفية. أرسل DXF أو SVG. نزيل النتوءات حتى تكون القطعة جاهزة للتركيب.",
    },
    price: 160,
    fromPrice: true,
    leadTimeDays: 4,
    featured: true,
    madeToOrder: true,
    options: [
      {
        id: "metal",
        name: { en: "Metal", ar: "المعدن" },
        values: [
          { id: "stainless", label: { en: "Stainless", ar: "ستانلس" } },
          { id: "brass", label: { en: "Brass +40", ar: "نحاس ‎+٤٠" }, priceDelta: 40 },
          { id: "aluminum", label: { en: "Aluminum", ar: "ألمنيوم" } },
        ],
      },
      {
        id: "thickness",
        name: { en: "Thickness", ar: "السماكة" },
        values: [
          { id: "0.8", label: { en: "0.8 mm", ar: "٠٫٨ مم" } },
          { id: "1.5", label: { en: "1.5 mm +30", ar: "١٫٥ مم ‎+٣٠" }, priceDelta: 30 },
          { id: "2", label: { en: "2 mm +55", ar: "٢ مم ‎+٥٥" }, priceDelta: 55 },
        ],
      },
    ],
    specs: [
      { label: { en: "Process", ar: "العملية" }, value: { en: "Fiber laser cut", ar: "قص ليزر فايبر" } },
    ],
    includes: [
      { en: "Deburred edges", ar: "حواف منزوعة النتوءات" },
      { en: "Vector check", ar: "مراجعة الملف المتجه" },
    ],
  },
  {
    slug: "custom-laser-cut",
    sku: "MTE-LZ-CUT",
    category: "laser",
    name: { en: "Custom laser cut", ar: "قص ليزر حسب الطلب" },
    short: {
      en: "Acrylic, MDF, plywood, leather, and felt — priced from a simple part.",
      ar: "أكريليك، MDF، خشب رقائقي، جلد، ولباد — السعر يبدأ من قطعة بسيطة.",
    },
    description: {
      en: "Upload DXF or SVG and tell us the material. We nest, kerf-compensate, and cut on a ventilated CO₂ bed. Good for gaskets, stencils, model kits, and display risers.",
      ar: "ارفع DXF أو SVG وحدد المادة. نرتب القص ونعوّض عرض الشعاع ونقطع على سرير CO₂. مناسب للجوانات، والاستنسل، وأطقم المجسمات، وحوامل العرض.",
    },
    price: 70,
    fromPrice: true,
    leadTimeDays: 2,
    madeToOrder: true,
    featured: true,
    options: [
      {
        id: "material",
        name: { en: "Material", ar: "المادة" },
        values: [
          { id: "mdf", label: { en: "3mm MDF", ar: "MDF ٣ مم" } },
          { id: "ply", label: { en: "4mm plywood +15", ar: "خشب رقائقي ٤ مم ‎+١٥" }, priceDelta: 15 },
          { id: "acrylic", label: { en: "3mm acrylic +25", ar: "أكريليك ٣ مم ‎+٢٥" }, priceDelta: 25 },
          { id: "leather", label: { en: "Leather +30", ar: "جلد ‎+٣٠" }, priceDelta: 30 },
        ],
      },
    ],
    specs: [
      { label: { en: "Bed", ar: "السرير" }, value: { en: "900 × 600 mm", ar: "٩٠٠ × ٦٠٠ مم" } },
    ],
    includes: [
      { en: "Kerf compensation", ar: "تعويض عرض القص" },
      { en: "Protective paper left on acrylic", ar: "إبقاء ورق الحماية على الأكريليك" },
    ],
  },
  {
    slug: "leather-engrave",
    sku: "MTE-LZ-LTH",
    category: "laser",
    name: { en: "Leather engraving", ar: "حفر على الجلد" },
    short: {
      en: "Wallets, notebook covers, and key tags with a brand or name.",
      ar: "محافظ، أغلفة دفاتر، وعلامات مفاتيح بشعار أو اسم.",
    },
    description: {
      en: "Bring the item or buy from our small leather range. We test-fire on scrap so Arabic names and logos sit at the right depth — not burnt, not ghosted.",
      ar: "أحضر القطعة أو اشترِ من مجموعتنا الجلدية الصغيرة. نختبر على قصاصات حتى يستقر الاسم العربي أو الشعار بالعمق الصحيح — دون حرق أو شبح باهت.",
    },
    price: 110,
    leadTimeDays: 2,
    options: [
      {
        id: "item",
        name: { en: "Item", ar: "القطعة" },
        values: [
          { id: "wallet", label: { en: "Wallet", ar: "محفظة" } },
          { id: "notebook", label: { en: "Notebook cover +20", ar: "غلاف دفتر ‎+٢٠" }, priceDelta: 20 },
          { id: "tag", label: { en: "Key tag −30", ar: "علامة مفاتيح ‎−٣٠" }, priceDelta: -30 },
        ],
      },
    ],
    specs: [
      { label: { en: "Leather", ar: "الجلد" }, value: { en: "Vegetable tan or leatherette", ar: "دباغة نباتية أو جلد صناعي" } },
    ],
    includes: [
      { en: "Test fire", ar: "طلقة اختبار" },
      { en: "Proof on WhatsApp", ar: "إثبات على واتساب" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products.filter((p) => p.slug !== slug && p.category === current.category).slice(0, limit);
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

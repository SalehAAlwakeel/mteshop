"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

const dictionary = {
  nav: {
    shop: { en: "Shop", ar: "المتجر" },
    services: { en: "Services", ar: "الخدمات" },
    quote: { en: "Get a quote", ar: "اطلب عرض سعر" },
    about: { en: "About", ar: "من نحن" },
    contact: { en: "Contact", ar: "تواصل" },
    cart: { en: "Cart", ar: "السلة" },
  },
  hero: {
    kicker: { en: "Riyadh fabrication studio", ar: "استوديو تصنيع في الرياض" },
    title: {
      en: "Print it. Lay it up. Cut it. Delivered in the Kingdom.",
      ar: "نطبع. نفرش الكربون. نقص بالليزر. ونسلّم في المملكة.",
    },
    body: {
      en: "MTE makes 3D printed parts, real carbon fiber, and laser-cut or engraved work from our office in Al Mursalat, Riyadh. Upload a file, pick a catalog piece, or walk in.",
      ar: "إم تي إي تصنع قطعاً مطبوعة ثلاثياً، وألياف كربون حقيقية، وأعمال قص وحفر بالليزر من مكتبنا في حي المرسلات بالرياض. ارفع ملفاً، اختر من الكتالوج، أو زرنا.",
    },
    shop: { en: "Shop parts", ar: "تسوق القطع" },
    quote: { en: "Send a file", ar: "أرسل ملفاً" },
    pickup: { en: "Same-week pickup in Riyadh", ar: "استلام في الرياض خلال الأسبوع" },
  },
  trust: {
    vat: { en: "15% VAT invoices", ar: "فواتير ضريبة ١٥٪" },
    files: { en: "STL · STEP · DXF · SVG", ar: "STL · STEP · DXF · SVG" },
    hours: { en: "Sun–Thu workshop hours", ar: "ساعات الورشة الأحد–الخميس" },
    ksa: { en: "Ship across Saudi Arabia", ar: "شحن لجميع مناطق المملكة" },
  },
  services: {
    title: { en: "Three benches. One shop.", ar: "ثلاث منصات. ورشة واحدة." },
    body: {
      en: "Most jobs in Riyadh bounce between a printer, a composites table, and a laser. We keep all three under one roof so a bracket, a carbon cover, and a nameplate can ship together.",
      ar: "معظم الأعمال في الرياض تنتقل بين طابعة وطاولة كومبوزيت وليزر. نجمع الثلاثة في سقف واحد حتى يُشحن الحامل وغطاء الكربون واللوحة معاً.",
    },
    printTitle: { en: "3D printing", ar: "طباعة ثلاثية الأبعاد" },
    printBody: {
      en: "FDM and resin. Prototypes, jigs, architectural massing, and short-run housings with a printability check before we start.",
      ar: "FDM وراتنج. نماذج أولية، مركبات، كتل معمارية، وأغلفة بكميات صغيرة مع فحص قابلية الطباعة قبل البدء.",
    },
    carbonTitle: { en: "Carbon fiber", ar: "ألياف الكربون" },
    carbonBody: {
      en: "Wet layup, vacuum bag, plate cutting. Real 3K twill — not hydro-dip. Panels, drone parts, cases, and interior trim.",
      ar: "فرش رطب، كيس تفريغ، وقص صفائح. نسيج 3K حقيقي وليس غمس مائي. ألواح، قطع درون، أغلفة، وتقليم داخلي.",
    },
    laserTitle: { en: "Laser cut & engrave", ar: "قص وحفر بالليزر" },
    laserBody: {
      en: "CO₂ and fiber. Acrylic signage, wood gifts, leather, MDF kits, and metal cards. Vector cleanup included.",
      ar: "CO₂ وفايبر. لافتات أكريليك، هدايا خشب، جلد، أطقم MDF، وبطاقات معدنية. تنظيف الملف المتجه مشمول.",
    },
    more: { en: "See the process", ar: "شاهد الآلية" },
    materialsTitle: { en: "Print materials", ar: "مواد الطباعة" },
    composition: { en: "Made of", ar: "ممّا تتكوّن" },
    colors: { en: "Colors", ar: "الألوان" },
  },
  featured: {
    kicker: { en: "Ready to order", ar: "جاهز للطلب" },
    title: { en: "Catalog pieces and made-to-order work", ar: "قطع كتالوج وأعمال حسب الطلب" },
    body: {
      en: "Add a finished product to cart, or start from a custom print, panel, or cut.",
      ar: "أضف منتجاً جاهزاً للسلة، أو ابدأ من طباعة أو لوحة أو قص حسب الطلب.",
    },
    all: { en: "Open the shop", ar: "افتح المتجر" },
    from: { en: "From", ar: "من" },
  },
  process: {
    title: { en: "How a job moves through MTE", ar: "كيف يتحرك العمل في إم تي إي" },
    s1t: { en: "1 · File or visit", ar: "١ · ملف أو زيارة" },
    s1b: {
      en: "Upload STL, STEP, DXF, SVG, or walk into the Al Mursalat office with a sample.",
      ar: "ارفع STL أو STEP أو DXF أو SVG، أو زر المكتب في حي المرسلات بعينة.",
    },
    s2t: { en: "2 · Engineer", ar: "٢ · هندسة" },
    s2b: {
      en: "We check thickness, kerf, fibre direction, and supports. You get a WhatsApp proof and a firm SAR quote.",
      ar: "نراجع السماكة وعرض القص واتجاه الألياف والدعم. تصلك مسودة واتساب وعرض سعر بالريال.",
    },
    s3t: { en: "3 · Fabricate", ar: "٣ · تصنيع" },
    s3b: {
      en: "Print, layup, or laser. Photos before packing. Rush slots when the bed is free.",
      ar: "طباعة أو فرش أو ليزر. صور قبل التغليف. مواعيد مستعجلة عندما يفرغ السرير.",
    },
    s4t: { en: "4 · Deliver", ar: "٤ · تسليم" },
    s4b: {
      en: "Pickup in Riyadh, city courier, or Kingdom-wide shipping. VAT invoice with every order.",
      ar: "استلام في الرياض، مندوب المدينة، أو شحن لجميع المناطق. فاتورة ضريبية مع كل طلب.",
    },
  },
  materials: {
    title: { en: "On the racks this week", ar: "على الرفوف هذا الأسبوع" },
    body: {
      en: "If you need a material we do not list, ask. We source locally in Riyadh first.",
      ar: "إن احتجت مادة غير مدرجة، اسأل. نبحث محلياً في الرياض أولاً.",
    },
  },
  cta: {
    title: { en: "Bring the file. We’ll make the part.", ar: "أحضر الملف. نصنع القطعة." },
    body: {
      en: "Most quotes go out the same business day. WhatsApp is the fastest path — the shop line is on every page.",
      ar: "معظم عروض الأسعار تخرج في نفس يوم العمل. واتساب هو الأسرع — رقم الورشة في كل صفحة.",
    },
    quote: { en: "Start a quote", ar: "ابدأ عرض سعر" },
    whatsapp: { en: "WhatsApp the shop", ar: "واتساب الورشة" },
  },
  shop: {
    kicker: { en: "MTE shop", ar: "متجر إم تي إي" },
    title: { en: "Order fabrication from Riyadh", ar: "اطلب التصنيع من الرياض" },
    body: {
      en: "Catalog pieces ship or pick up fast. Custom work is confirmed after we review the file.",
      ar: "قطع الكتالوج تُشحن أو تُستلم بسرعة. الأعمال المخصصة تُؤكد بعد مراجعة الملف.",
    },
    search: { en: "Search parts, materials, gifts…", ar: "ابحث عن قطع، مواد، هدايا…" },
    empty: { en: "Nothing matches. Try another category.", ar: "لا توجد نتائج. جرّب تصنيفاً آخر." },
    vat: { en: "Prices include 15% VAT", ar: "الأسعار تشمل ضريبة ١٥٪" },
  },
  product: {
    add: { en: "Add to cart", ar: "أضف إلى السلة" },
    added: { en: "Added", ar: "تمت الإضافة" },
    lead: { en: "Typical lead time", ar: "مدة التنفيذ المعتادة" },
    days: { en: "days", ar: "أيام" },
    from: { en: "From", ar: "من" },
    sku: { en: "SKU", ar: "رمز" },
    includes: { en: "Included", ar: "مشمول" },
    specs: { en: "Specs", ar: "المواصفات" },
    related: { en: "From the same bench", ar: "من نفس المنصة" },
    made: { en: "Made to order in Riyadh", ar: "يُصنع حسب الطلب في الرياض" },
    quoteNote: {
      en: "Upload your file on the quote page if the part is larger or denser than a desktop piece.",
      ar: "ارفع ملفك في صفحة العرض إذا كانت القطعة أكبر أو أكثف من قطعة مكتبية.",
    },
  },
  cart: {
    title: { en: "Cart", ar: "السلة" },
    empty: { en: "Your cart is empty.", ar: "سلتك فارغة." },
    shop: { en: "Browse the shop", ar: "تصفح المتجر" },
    checkout: { en: "Send quote", ar: "أرسل عرض سعر" },
    subtotal: { en: "Subtotal (incl. VAT)", ar: "المجموع (شامل الضريبة)" },
    remove: { en: "Remove", ar: "حذف" },
    qty: { en: "Qty", ar: "الكمية" },
  },
  checkout: {
    title: { en: "Send a quote", ar: "أرسل عرض سعر" },
    body: {
      en: "We email this cart to the shop as a quote. The workshop replies with timing and a confirmed price.",
      ar: "نرسل هذه السلة بالبريد إلى الورشة كعرض سعر. ترد الورشة بالموعد والسعر المؤكد.",
    },
    details: { en: "Your details", ar: "بياناتك" },
    name: { en: "Full name", ar: "الاسم الكامل" },
    phone: { en: "Mobile (05…)", ar: "الجوال (٠٥…)" },
    email: { en: "Email", ar: "البريد" },
    city: { en: "City", ar: "المدينة" },
    district: { en: "District", ar: "الحي" },
    address: { en: "Street & notes", ar: "الشارع والملاحظات" },
    notes: { en: "Order notes / file names", ar: "ملاحظات الطلب / أسماء الملفات" },
    delivery: { en: "Delivery", ar: "التسليم" },
    pickup: { en: "Pickup — Al Mursalat, Riyadh", ar: "استلام — حي المرسلات، الرياض" },
    riyadh: { en: "Riyadh courier", ar: "مندوب الرياض" },
    ksa: { en: "Ship in Saudi Arabia", ar: "شحن داخل المملكة" },
    free: { en: "Free over 400 SAR", ar: "مجاني فوق ٤٠٠ ريال" },
    payment: { en: "Payment", ar: "الدفع" },
    whatsappPay: { en: "Confirm on WhatsApp", ar: "تأكيد عبر واتساب" },
    bank: { en: "Bank transfer (IBAN on confirmation)", ar: "تحويل بنكي (الآيبان عند التأكيد)" },
    mada: { en: "Mada / Apple Pay link", ar: "رابط مدى / آبل باي" },
    cod: { en: "Cash on delivery (Riyadh)", ar: "الدفع عند الاستلام (الرياض)" },
    place: { en: "Send quote", ar: "أرسل عرض سعر" },
    summary: { en: "Order summary", ar: "ملخص الطلب" },
    shipping: { en: "Shipping", ar: "الشحن" },
    vat: { en: "VAT 15% (included)", ar: "ضريبة ١٥٪ (مشمولة)" },
    total: { en: "Total", ar: "الإجمالي" },
    required: { en: "Please fill name and a Saudi mobile number.", ar: "يرجى إدخال الاسم ورقم جوال سعودي." },
  },
  success: {
    title: { en: "Quote ready", ar: "عرض السعر جاهز" },
    body: {
      en: "Your email app opened with this quote addressed to sales@mteksa.com. Send that message so the shop can reply.",
      ar: "فُتح تطبيق البريد برسالة عرض السعر إلى sales@mteksa.com. أرسل الرسالة حتى ترد الورشة.",
    },
    id: { en: "Quote", ar: "عرض" },
    whatsapp: { en: "Message the shop", ar: "راسل الورشة" },
    again: { en: "Back to shop", ar: "العودة للمتجر" },
  },
  quote: {
    kicker: { en: "Custom work", ar: "عمل مخصص" },
    title: { en: "Send a file. Get a SAR quote.", ar: "أرسل ملفاً. احصل على عرض بالريال." },
    body: {
      en: "Tell us the process, material, and deadline. Attach names of STL / STEP / DXF / SVG / AI files — then WhatsApp the actual files to the shop line.",
      ar: "حدد العملية والمادة والموعد. اذكر أسماء ملفات STL / STEP / DXF / SVG / AI ثم أرسل الملفات نفسها على واتساب الورشة.",
    },
    service: { en: "Service", ar: "الخدمة" },
    material: { en: "Material / colour", ar: "المادة / اللون" },
    qty: { en: "Quantity", ar: "الكمية" },
    deadline: { en: "Need it by", ar: "المطلوب قبل" },
    details: { en: "What should we make?", ar: "ماذا نصنع؟" },
    files: { en: "Reference files", ar: "ملفات مرجعية" },
    drop: { en: "Drop files or browse", ar: "أفلت الملفات أو استعراض" },
    send: { en: "Send quote on WhatsApp", ar: "أرسل العرض على واتساب" },
    name: { en: "Name", ar: "الاسم" },
    phone: { en: "Mobile", ar: "الجوال" },
  },
  about: {
    kicker: { en: "The shop", ar: "الورشة" },
    title: { en: "A fabrication bench built for Riyadh lead times.", ar: "منصة تصنيع مبنية لمواعيد الرياض." },
    p1: {
      en: "MTE started because prototype work in the city was split across three vendors: someone with a printer, someone with a laser, and someone who would touch carbon. Jobs slipped. Files got lost. We put the three processes in one office in Al Mursalat.",
      ar: "بدأت إم تي إي لأن عمل النماذج في المدينة كان يتوزع على ثلاثة موردين: من يملك طابعة، ومن يملك ليزراً، ومن يلمس الكربون. كانت المواعيد تفلت والملفات تضيع. جمعنا العمليات الثلاث في مكتب واحد بحي المرسلات.",
    },
    p2: {
      en: "We invoice with VAT, we speak Arabic and English on the bench, and we would rather refuse a file than print a part that will warp in 45° storage.",
      ar: "نصدر فواتير بضريبة القيمة المضافة، ونتحدث العربية والإنجليزية في الورشة، ونفضّل رفض ملف على طباعة قطعة ستلتوي في تخزين ٤٥ درجة.",
    },
    visit: { en: "Visit the shop", ar: "زر الورشة" },
  },
  contact: {
    title: { en: "Talk to the shop", ar: "تحدث مع الورشة" },
    body: {
      en: "WhatsApp is monitored during workshop hours. For drawings over 20 MB, send a Drive or Dropbox link.",
      ar: "واتساب يُتابع في ساعات الورشة. للرسوم الأكبر من ٢٠ ميجا أرسل رابط درايف أو دروبوكس.",
    },
    formTitle: { en: "Message", ar: "رسالة" },
    message: { en: "How can we help?", ar: "كيف نساعدك؟" },
    send: { en: "Send on WhatsApp", ar: "أرسل عبر واتساب" },
    map: { en: "Open in Google Maps", ar: "افتح في خرائط جوجل" },
    office: { en: "Our office", ar: "مكتبنا" },
  },
  faq: {
    title: { en: "Before you send the file", ar: "قبل أن ترسل الملف" },
    q1: { en: "Do prices include VAT?", ar: "هل الأسعار تشمل الضريبة؟" },
    a1: {
      en: "Yes. Catalog prices include 15% VAT. Checkout shows the VAT portion on the invoice summary.",
      ar: "نعم. أسعار الكتالوج تشمل ضريبة ١٥٪. تظهر حصة الضريبة في ملخص الفاتورة عند إتمام الطلب.",
    },
    q2: { en: "Can I pay with Mada?", ar: "هل يمكن الدفع بمدى؟" },
    a2: {
      en: "Yes. After we confirm the order on WhatsApp we send a Mada / Apple Pay link, or an IBAN for transfer. Cash on delivery is available inside Riyadh.",
      ar: "نعم. بعد تأكيد الطلب على واتساب نرسل رابط مدى / آبل باي أو آيبان للتحويل. الدفع عند الاستلام متاح داخل الرياض.",
    },
    q3: { en: "What files do you accept?", ar: "ما الملفات المقبولة؟" },
    a3: {
      en: "3D: STL, 3MF, STEP, IGES. Laser: DXF, SVG, AI, PDF with vectors. Carbon: DXF plus a photo of the mould or car panel if you have one.",
      ar: "ثلاثي الأبعاد: STL و3MF وSTEP وIGES. ليزر: DXF وSVG وAI وPDF متجه. كربون: DXF مع صورة للقالب أو لوحة السيارة إن وُجدت.",
    },
    q4: { en: "Do you ship outside Riyadh?", ar: "هل تشحنون خارج الرياض؟" },
    a4: {
      en: "Yes, across Saudi Arabia. Pickup is free at our Al Mursalat office. Riyadh courier and KSA shipping are calculated at checkout — free over 400 SAR.",
      ar: "نعم، لجميع مناطق المملكة. الاستلام مجاني من مكتب حي المرسلات. مندوب الرياض والشحن يُحسبان عند إتمام الطلب — مجاني فوق ٤٠٠ ريال.",
    },
  },
  footer: {
    blurb: {
      en: "3D printing, carbon fiber parts, laser cutting and engraving. Fabricated in Riyadh.",
      ar: "طباعة ثلاثية الأبعاد، قطع ألياف الكربون، قص وحفر بالليزر. يُصنع في الرياض.",
    },
    shop: { en: "Shop", ar: "المتجر" },
    company: { en: "Company", ar: "الشركة" },
    legal: { en: "Legal", ar: "قانوني" },
    privacy: { en: "Privacy", ar: "الخصوصية" },
    terms: { en: "Terms", ar: "الشروط" },
    rights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  },
  legal: {
    privacyTitle: { en: "Privacy policy", ar: "سياسة الخصوصية" },
    termsTitle: { en: "Terms of sale", ar: "شروط البيع" },
  },
  notFound: {
    title: { en: "This page was not fabricated.", ar: "هذه الصفحة لم تُصنع." },
    body: { en: "Try the shop or send a quote instead.", ar: "جرّب المتجر أو أرسل عرض سعر." },
  },
  common: {
    language: { en: "العربية", ar: "English" },
    openMenu: { en: "Open menu", ar: "افتح القائمة" },
    close: { en: "Close", ar: "إغلاق" },
    whatsapp: { en: "WhatsApp", ar: "واتساب" },
    themeLight: { en: "Switch to light mode", ar: "التبديل إلى الوضع الفاتح" },
    themeDark: { en: "Switch to dark mode", ar: "التبديل إلى الوضع الداكن" },
  },
} as const;

type Dict = typeof dictionary;

type Path =
  | {
      [K in keyof Dict]: Dict[K] extends Record<Lang, string>
        ? K
        : {
            [P in keyof Dict[K]]: Dict[K][P] extends Record<Lang, string> ? `${K & string}.${P & string}` : never;
          }[keyof Dict[K]];
    }[keyof Dict];

type NestedPath = Path;

export function translate(lang: Lang, key: NestedPath): string {
  const [group, item] = key.split(".") as [keyof Dict, string];
  const groupValue = dictionary[group] as Record<string, Record<Lang, string>>;
  return groupValue[item][lang];
}

type I18nContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: NestedPath) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("mte-lang");
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("mte-lang", next);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang,
      t: (key) => translate(lang, key),
    }),
    [lang, setLang, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

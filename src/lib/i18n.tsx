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
    shop: { en: "Car parts", ar: "قطع السيارات" },
    services: { en: "Services", ar: "الخدمات" },
    quote: { en: "Get a quote", ar: "اطلب عرض سعر" },
    about: { en: "About", ar: "من نحن" },
    contact: { en: "Contact", ar: "تواصل" },
    cart: { en: "Cart", ar: "السلة" },
  },
  car: {
    kicker: { en: "Your car", ar: "سيارتك" },
    title: { en: "Make, model, year, material, then the parts.", ar: "الشركة، ثم الموديل، ثم السنة، ثم المادة، ثم القطع." },
    body: {
      en: "Tell us the car, the material, and the parts. We email the request to the shop.",
      ar: "حدّد السيارة والمادة والقطع. نرسل الطلب إلى بريد الورشة.",
    },
    howKicker: { en: "How it works", ar: "كيف نعمل" },
    howTitle: {
      en: "We scan the car, design it in CAD, then you choose the material.",
      ar: "نمسح السيارة، نصممها في CAD، ثم تختار المادة.",
    },
    s1t: { en: "1 · Scan", ar: "١ · المسح" },
    s1b: {
      en: "We scan your car in the shop so the part follows the real body.",
      ar: "نمسح سيارتك في الورشة حتى تتبع القطعة الهيكل الحقيقي.",
    },
    s2t: { en: "2 · CAD", ar: "٢ · التصميم" },
    s2b: {
      en: "We design the part in CAD for the make, model, and year you choose.",
      ar: "نصمم القطعة في CAD على الشركة والموديل والسنة التي تختارها.",
    },
    s3t: { en: "3 · Material", ar: "٣ · المادة" },
    s3b: {
      en: "You choose real carbon fiber, or 3D printed ASA. ASA is the outdoor print plastic: it keeps its colour in the sun and stays stable in Riyadh heat.",
      ar: "تختار ألياف كربون حقيقية، أو طباعة ثلاثية الأبعاد من ASA. مادة ASA هي بلاستيك الطباعة الخارجي: تحافظ على لونها تحت الشمس وتثبت في حرارة الرياض.",
    },
    look: { en: "The parts", ar: "القطع" },
    customLabel: { en: "Custom part (optional)", ar: "قطعة حسب الطلب (اختياري)" },
    customBody: {
      en: "Describe a piece that is not in the list. Leave this blank if the parts above are enough.",
      ar: "صِف قطعة غير موجودة في القائمة. اترك الحقل فارغاً إذا كانت القطع أعلاه كافية.",
    },
    customPlaceholder: {
      en: "Example: a vented bonnet for a 1994 RX-7, or a bracket that is not in the list.",
      ar: "مثال: غطاء محرك بفتحات لسيارة RX-7 موديل 1994، أو قاعدة تثبيت غير موجودة في القائمة.",
    },
    photos: { en: "Photos (optional)", ar: "صور (اختياري)" },
    photosHint: {
      en: "Add pictures of the part or the car. They are sent with the quote email.",
      ar: "أضف صور القطعة أو السيارة. تُرسل مع بريد الطلب.",
    },
    photosAdd: { en: "Add photos", ar: "أضف صوراً" },
    photosLimit: { en: "You can add up to 4 photos.", ar: "يمكنك إضافة ٤ صور كحد أقصى." },
    make: { en: "Make", ar: "الشركة" },
    model: { en: "Model", ar: "الموديل" },
    year: { en: "Year", ar: "السنة" },
    choose: { en: "Choose", ar: "اختر" },
    parts: { en: "Parts you want", ar: "القطع التي تريدها" },
    material: { en: "Material", ar: "المادة" },
    carbon: { en: "Carbon fiber", ar: "ألياف كربون" },
    carbonHint: { en: "Real carbon layup, shaped to your car.", ar: "فرش كربون حقيقي، يُشكَّل على سيارتك." },
    print: { en: "3D printed ASA", ar: "طباعة ثلاثية الأبعاد ASA" },
    printHint: {
      en: "ASA is the outdoor filament. It resists UV and holds up in Saudi heat. We do not print body parts in PLA or ABS.",
      ar: "ASA هي خامة الطباعة الصحيحة للخارج. تقاوم الشمس وتتحمل حرارة المملكة. لا نطبع قطع الهيكل من PLA أو ABS.",
    },
    send: { en: "Send to the shop", ar: "أرسل إلى الورشة" },
    required: {
      en: "Choose a make, a model, a year, a material, at least one part or a note or a photo, your name, and a Saudi mobile.",
      ar: "اختر الشركة والموديل والسنة والمادة وقطعة أو وصفاً أو صورة، ثم الاسم ورقم جوال سعودي.",
    },
  },
  hero: {
    kicker: { en: "Car parts in Riyadh", ar: "قطع سيارات في الرياض" },
    title: {
      en: "Choose your car. Pick the parts.",
      ar: "اختر سيارتك. ثم اختر القطع.",
    },
    body: {
      en: "Wide body kits, spoilers, side skirts, front lips, rear diffusers, illuminated wheel caps, air intakes, and interiors. We scan the car, design the part in CAD, then build it in carbon fiber or 3D printed ASA.",
      ar: "أطقم هيكل عريض، أجنحة، عتبات جانبية، ليب أمامي، دفيوزر خلفي، أغطية جنوط مضيئة، مداخل هواء، وداخلية. نمسح السيارة، نصمم القطعة في CAD، ثم نصنعها من ألياف الكربون أو بطباعة ASA.",
    },
    shop: { en: "Order parts", ar: "اطلب القطع" },
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
      ar: "طباعة عادية وطباعة ناعمة عالية التفاصيل. نماذج أولية، مركبات، كتل معمارية، وأغلفة بكميات صغيرة مع فحص قابلية الطباعة قبل البدء.",
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
      ar: "نراجع السماكة وعرض القص واتجاه الألياف والدعم. تصلك مسودة واتساب وعرض سعر.",
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
      en: "Write your name and mobile. We email the quote to the shop, and the workshop replies on WhatsApp.",
      ar: "اكتب اسمك وجوالك. نرسل عرض السعر إلى بريد الورشة، وترد الورشة عبر واتساب.",
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
    title: { en: "Quote sent", ar: "أُرسل عرض السعر" },
    body: {
      en: "Your quote was emailed to sales@mteksa.com. The shop will reply on WhatsApp.",
      ar: "أُرسل عرض السعر إلى sales@mteksa.com. ترد الورشة عبر واتساب.",
    },
    bodyMail: {
      en: "Your email app opened with this quote addressed to sales@mteksa.com. Send that message so the shop can reply on WhatsApp.",
      ar: "فُتح تطبيق البريد برسالة عرض السعر إلى sales@mteksa.com. أرسل الرسالة حتى ترد الورشة عبر واتساب.",
    },
    id: { en: "Quote", ar: "عرض" },
    whatsapp: { en: "Message the shop", ar: "راسل الورشة" },
    again: { en: "Back to shop", ar: "العودة للمتجر" },
  },
  quote: {
    kicker: { en: "Custom work", ar: "عمل مخصص" },
    title: { en: "Send a file. Get a SAR quote.", ar: "أرسل ملفاً. احصل على عرض سعر." },
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
    title: { en: "We scan the car, design the part, and build it in Riyadh.", ar: "نمسح السيارة، نصمم القطعة، ونصنعها في الرياض." },
    p1: {
      en: "Every part starts on your car. We scan the body in the shop, then design the spoiler, diffuser, lip, skirts, or wide body in CAD for that make, model, and year.",
      ar: "كل قطعة تبدأ من سيارتك. نمسح الهيكل في الورشة، ثم نصمم الجناح أو الدفيوزر أو الليب أو العتبات أو طقم الهيكل في CAD على الشركة والموديل والسنة.",
    },
    p2: {
      en: "After the design, you choose the material: real carbon fiber, or 3D printed ASA. ASA is the outdoor printing plastic. It holds colour in the sun and stays stable in Riyadh heat, so it is what we print instead of PLA or ABS.",
      ar: "بعد التصميم تختار المادة: ألياف كربون حقيقية، أو طباعة ثلاثية الأبعاد من ASA. ASA هي بلاستيك الطباعة الخارجي. تحافظ على لونها تحت الشمس وتثبت في حرارة الرياض، لذلك نطبع بها بدل PLA أو ABS.",
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
      en: "Printed car parts, made in Riyadh for the vehicle you choose.",
      ar: "قطع سيارات مطبوعة، تُصنع في الرياض للسيارة التي تختارها.",
    },
    shop: { en: "Car parts", ar: "قطع السيارات" },
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
  viewer: {
    loading: { en: "Loading the car", ar: "جارٍ تحميل السيارة" },
    drag: { en: "Drag to look around", ar: "اسحب لتدوير السيارة" },
    pick: { en: "Parts", ar: "القطع" },
    failed: { en: "The car model could not load.", ar: "تعذر تحميل نموذج السيارة." },
    partKicker: { en: "Car part", ar: "قطعة سيارة" },
    order: { en: "Order this part", ar: "اطلب هذه القطعة" },
    back: { en: "Back to the car", ar: "العودة إلى السيارة" },
  },
  common: {
    language: { en: "العربية", ar: "English" },
    openMenu: { en: "Open menu", ar: "افتح القائمة" },
    close: { en: "Close", ar: "إغلاق" },
    whatsapp: { en: "WhatsApp", ar: "واتساب" },
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

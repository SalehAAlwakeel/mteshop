export const site = {
  name: "MTE",
  legalName: "Mechatronics Tech Engineering",
  tagline: {
    en: "3D printing · Carbon fiber · Laser",
    ar: "طباعة ثلاثية الأبعاد · ألياف الكربون · ليزر",
  },
  url: "https://mteksa.shop",
  email: "sales@mteksa.com",
  phones: {
    en: {
      display: "+966592662000",
      tel: "+966592662000",
      whatsapp: "966592662000",
    },
    ar: {
      display: "+966552522913",
      tel: "+966552522913",
      whatsapp: "966552522913",
    },
  },
  vatNumber: "310000000000003",
  crNumber: "1010000000",
  city: {
    en: "Riyadh, Saudi Arabia",
    ar: "الرياض، المملكة العربية السعودية",
  },
  address: {
    en: "RHMA2523, 2523 Al Imam Saud Ibn Abdul Aziz Branch Rd, 8027, Al Mursalat, Riyadh 12463",
    ar: "RHMA2523، ٢٥٢٣ طريق الإمام سعود بن عبدالعزيز الفرعي، ٨٠٢٧، حي المرسلات، الرياض ١٢٤٦٣",
  },
  hours: {
    en: "Sun–Thu 9:00–18:00 · Sat 10:00–16:00 · Friday closed",
    ar: "الأحد–الخميس ٩:٠٠–١٨:٠٠ · السبت ١٠:٠٠–١٦:٠٠ · الجمعة مغلق",
  },
  mapsQuery:
    "RHMA2523, 2523 Al Imam Saud Ibn Abdul Aziz Branch Rd, 8027, حي المرسلات, Riyadh 12463",
  /** Google’s pin for RHMA2523 / building 2523, additional 8027, Al Mursalat. */
  map: {
    lat: 24.7550449,
    lng: 46.6818997,
  },
  vatRate: 0.15,
  shipping: {
    riyadh: 35,
    ksa: 55,
    freeFrom: 400,
  },
} as const;

export function mapsLink() {
  const { lat, lng } = site.map;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function mapsEmbed(lang: "en" | "ar") {
  const { lat, lng } = site.map;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=18&hl=${lang}&output=embed`;
}

export function whatsappLink(text?: string, lang: "en" | "ar" = "en") {
  const encoded = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.phones[lang].whatsapp}${encoded}`;
}

"use client";

import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { Reveal } from "@/components/Reveal";
import { printFilaments } from "@/lib/filaments";
import { useI18n } from "@/lib/i18n";

const blocks = [
  {
    id: "print",
    title: "services.printTitle" as const,
    body: "services.printBody" as const,
    pointsEn: [
      "FDM up to 300 mm cube — PLA, PLA+, PETG, CPE, ABS, ASA, TPU, PLA/CF, ABS/CF, PPS, PA",
      "MSLA resin at 50 μm for presentation parts",
      "Orientation, infill, and support review before we bill",
      "Short runs of jigs and housings for Riyadh workshops",
    ],
    pointsAr: [
      "FDM حتى مكعب ٣٠٠ مم — PLA وPLA+ وPETG وCPE وABS وASA وTPU وPLA/CF وABS/CF وPPS وPA",
      "طباعة ناعمة عالية التفاصيل للنماذج التي تُعرض على العميل",
      "مراجعة الاتجاه والكثافة والدعم قبل الفوترة",
      "تشغيلات قصيرة للمركبات والأغلفة لورش الرياض",
    ],
  },
  {
    id: "carbon",
    title: "services.carbonTitle" as const,
    body: "services.carbonBody" as const,
    pointsEn: [
      "3K twill, plain weave, and forged-look wet layup",
      "Vacuum bag and post-cure for interior and drone parts",
      "Plate cutting for arms, decks, and brackets",
      "Edge sealing and gloss / satin / matte finish",
    ],
    pointsAr: [
      "فرش رطب بنسيج 3K مبروم أو سادة أو مظهر مطروق",
      "كيس تفريغ ومعالجة لاحقة لقطع الداخلية والدرون",
      "قص صفائح للأذرع والمنصات والحوامل",
      "عزل حواف وتشطيب لامع / ساتان / مطفي",
    ],
  },
  {
    id: "laser",
    title: "services.laserTitle" as const,
    body: "services.laserBody" as const,
    pointsEn: [
      "CO₂ bed 900 × 600 mm — acrylic, wood, MDF, leather, felt",
      "Fiber marking on stainless and brass cards",
      "Vector cleanup and Arabic layout proofs on WhatsApp",
      "Signage, gifts, gaskets, and model kits",
    ],
    pointsAr: [
      "سرير CO₂ ٩٠٠ × ٦٠٠ مم — أكريليك، خشب، MDF، جلد، لباد",
      "وسم فايبر على بطاقات ستانلس ونحاس",
      "تنظيف المتجه وإثبات الخط العربي على واتساب",
      "لافتات، هدايا، جوانات، وأطقم مجسمات",
    ],
  },
];

export default function ServicesPage() {
  const { t, lang } = useI18n();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-laser">{t("nav.services")}</p>
      <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold">{t("services.title")}</h1>
      <p className="mt-4 max-w-2xl text-mute">{t("services.body")}</p>

      <div className="mt-12 space-y-8">
        {blocks.map((block, i) => (
          <Reveal key={block.id}>
            <GlowCard lift={false} className="scroll-mt-24 rounded-[2rem] p-8 md:p-10">
              <article id={block.id}>
                <p className="text-laser">0{i + 1}</p>
                <h2 className="font-display mt-2 text-3xl">{t(block.title)}</h2>
                <p className="mt-3 max-w-2xl text-mute">{t(block.body)}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(lang === "ar" ? block.pointsAr : block.pointsEn).map((point) => (
                    <li key={point}>
                      <GlowCard className="rounded-2xl px-4 py-3 text-sm">{point}</GlowCard>
                    </li>
                  ))}
                </ul>
                {block.id === "print" && (
                  <div className="mt-10">
                    <h3 className="font-display text-2xl">{t("services.materialsTitle")}</h3>
                    <div className="mt-5 overflow-hidden rounded-3xl border border-line">
                      <div className="hidden grid-cols-[140px_1fr_1fr] bg-wash px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-mute sm:grid">
                        <span>{lang === "ar" ? "المادة" : "Material"}</span>
                        <span>{t("services.composition")}</span>
                        <span>{t("services.colors")}</span>
                      </div>
                      <ul className="divide-y divide-line">
                        {printFilaments.map((filament) => (
                          <li
                            key={filament.id}
                            className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr_1fr] sm:items-start"
                          >
                            <p className="font-semibold text-laser">{filament.name}</p>
                            <p className="text-sm text-mute">
                              <span className="me-2 font-medium text-paper sm:hidden">{t("services.composition")}: </span>
                              {filament.composition[lang]}
                            </p>
                            <p className="text-sm text-mute">
                              <span className="me-2 font-medium text-paper sm:hidden">{t("services.colors")}: </span>
                              {filament.colors.map((color) => color[lang]).join(" · ")}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button href="/quote">{t("nav.quote")}</Button>
        <Button href="/shop" variant="ghost">
          {t("nav.shop")}
        </Button>
      </div>
    </div>
  );
}

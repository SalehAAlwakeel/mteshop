"use client";

import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function TermsPage() {
  const { lang } = useI18n();
  const ar = lang === "ar";

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 leading-8 text-mute">
      <h1 className="font-display text-4xl font-semibold text-paper">
        {ar ? "شروط البيع" : "Terms of sale"}
      </h1>
      <p className="mt-6">
        {ar
          ? "أسعار الكتالوج بالريال السعودي وتشمل ضريبة القيمة المضافة ١٥٪. الأعمال حسب الطلب تبدأ من السعر الظاهر، ويُؤكد السعر النهائي بعد مراجعة الملف."
          : "Catalog prices are in Saudi Riyal and include 15% VAT. Made-to-order lines start at the listed amount; the final price is confirmed after we review your file."}
      </p>
      <p className="mt-4">
        {ar
          ? "يبدأ التصنيع بعد تأكيد الطلب والدفع أو الاتفاق على الدفع عند الاستلام داخل الرياض. مدة التنفيذ تقديرية وتعتمد على ازدحام السرير والمادة."
          : "Fabrication starts after we confirm the order and payment, or agree cash-on-delivery inside Riyadh. Lead times are estimates and depend on bed load and material."}
      </p>
      <p className="mt-4">
        {ar
          ? "القطع المطبوعة ثلاثياً والكربون والليزر تُصنع حسب ملفك. راجع المسودة. بعد الموافقة على المسودة، إعادة العمل بسبب تغيير التصميم تُفوتر من جديد."
          : "Printed, carbon, and laser parts are made to your file. Review the proof. After you approve a proof, design-change rework is billed as a new job."}
      </p>
      <p className="mt-4">
        {ar
          ? `القانون الواجب هو أنظمة المملكة العربية السعودية، والمحكمة المختصة في الرياض. ${site.legalName}.`
          : `These terms are governed by the laws of the Kingdom of Saudi Arabia, with venue in Riyadh. ${site.legalName}.`}
      </p>
    </article>
  );
}

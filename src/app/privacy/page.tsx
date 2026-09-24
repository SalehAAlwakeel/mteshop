"use client";

import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function PrivacyPage() {
  const { lang } = useI18n();
  const ar = lang === "ar";

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 leading-8 text-mute">
      <h1 className="font-display text-4xl font-semibold text-paper">
        {ar ? "سياسة الخصوصية" : "Privacy policy"}
      </h1>
      <p className="mt-6">
        {ar
          ? `تجمع ${site.legalName} الاسم والجوال والبريد وملف الطلب حتى نتمكن من تصنيع القطعة وإصدار فاتورة ضريبية والتواصل عبر واتساب. لا نبيع بياناتك. تُحفظ الطلبات على جهازك في المتصفح، وتُرسل تفاصيل الطلب إلى واتساب الورشة عندما تختار ذلك.`
          : `${site.legalName} collects your name, mobile number, email, and order details so we can fabricate the part, issue a VAT invoice, and reach you on WhatsApp. We do not sell your data. Orders are stored on your device in the browser and sent to the shop WhatsApp line when you choose to submit.`}
      </p>
      <p className="mt-4">
        {ar
          ? "الملفات التي ترفع أسماءها في نموذج العرض تُذكر في رسالة واتساب فقط ولا تُرفع إلى خادمنا في هذا الإصدار. أرسل الملف الفعلي على واتساب."
          : "File names you attach on the quote form are listed in the WhatsApp message only; this launch version does not upload the binary to our server. Send the actual file on WhatsApp."}
      </p>
      <p className="mt-4">
        {ar ? `للتعديل أو الحذف راسل ${site.email}.` : `To correct or delete data, email ${site.email}.`}
      </p>
    </article>
  );
}

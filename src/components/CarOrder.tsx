"use client";

import { Button } from "@/components/Button";
import { ProductVisual } from "@/components/ProductVisual";
import { carMakes, carYears } from "@/lib/cars";
import { useI18n } from "@/lib/i18n";
import { createOrderId, quoteMailto, sendQuoteEmail, type Order } from "@/lib/orders";
import { products } from "@/lib/products";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

const saudiPhone = /^(05|5|\+9665|9665)\d{8}$/;
const photoTypes = /^image\/(jpeg|png|webp)$/;
const maxPhotos = 4;

type Photo = { id: string; url: string; file: File };

async function compressPhoto(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.72));
  if (!blob) return file;
  const name = file.name.replace(/\.\w+$/, "") || "photo";
  return new File([blob], `${name}.jpg`, { type: "image/jpeg" });
}

export function CarOrder({ initialPart = "" }: { initialPart?: string }) {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [makeId, setMakeId] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [finish, setFinish] = useState("");
  const [otherMake, setOtherMake] = useState("");
  const [picked, setPicked] = useState<string[]>(() =>
    products.some((product) => product.slug === initialPart) ? [initialPart] : [],
  );
  const [custom, setCustom] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const make = carMakes.find((item) => item.id === makeId);
  const models = make?.models ?? [];
  const makeName = makeId === "other" ? otherMake.trim() : make ? make[lang] : "";
  const modelName = model.trim();

  const selectedProducts = useMemo(
    () => products.filter((product) => picked.includes(product.slug)),
    [picked],
  );

  function toggle(slug: string) {
    setPicked((current) =>
      current.includes(slug) ? current.filter((id) => id !== slug) : [...current, slug],
    );
  }

  function addPhotos(list: FileList | null) {
    if (!list) return;
    const incoming = [...list].filter((file) => photoTypes.test(file.type));
    const room = maxPhotos - photos.length;
    if (incoming.length > room) setError(t("car.photosLimit"));
    const chosen = incoming.slice(0, Math.max(0, room));
    setPhotos((current) => [
      ...current,
      ...chosen.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        url: URL.createObjectURL(file),
        file,
      })),
    ]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.url);
      return current.filter((item) => item.id !== id);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const mobile = phone.replaceAll(" ", "");
    const customText = custom.trim();
    if (
      !makeName ||
      !modelName ||
      !year ||
      !finish ||
      (selectedProducts.length === 0 && !customText && photos.length === 0) ||
      !name.trim() ||
      !saudiPhone.test(mobile)
    ) {
      setError(t("car.required"));
      return;
    }
    const finishEn = finish === "carbon" ? "Carbon fiber" : "3D printed ASA";
    const photoOnly = photos.length > 0 && selectedProducts.length === 0 && !customText;
    const order: Order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      lang,
      customer: {
        name: name.trim(),
        phone: mobile,
        email: "",
        city: "",
        district: "",
        address: "",
        notes: [
          `Vehicle: ${makeName} ${modelName} ${year}`,
          `Material: ${finishEn}`,
          customText ? `Custom part: ${customText}` : photoOnly ? "Custom part: see attached photos" : "",
          photos.length ? `Photos: ${photos.length} attached` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      },
      delivery: "pickup",
      payment: "whatsapp",
      items: [
        ...selectedProducts.map((product) => ({
          id: product.slug,
          slug: product.slug,
          sku: product.sku,
          name: product.name,
          unitPrice: 0,
          qty: 1,
          options: [],
          category: product.category,
        })),
        ...(customText || photoOnly
          ? [
              {
                id: "custom-part",
                slug: "custom-part",
                sku: "MTE-CAR-CUSTOM",
                name: { en: "Custom part", ar: "قطعة حسب الطلب" },
                unitPrice: 0,
                qty: 1,
                options: [],
                category: "custom",
              },
            ]
          : []),
      ],
      shipping: 0,
      subtotal: 0,
      total: 0,
    };
    window.localStorage.setItem("mte-last-order", JSON.stringify(order));
    setSending(true);
    try {
      const files = await Promise.all(photos.map((photo) => compressPhoto(photo.file)));
      const sent = await sendQuoteEmail(order, files);
      if (!sent) {
        const mail = document.createElement("a");
        mail.href = quoteMailto(order);
        mail.click();
      }
      router.push(`/checkout/success?id=${order.id}&sent=${sent ? "email" : "mailapp"}`);
    } catch {
      const mail = document.createElement("a");
      mail.href = quoteMailto(order);
      mail.click();
      router.push(`/checkout/success?id=${order.id}&sent=mailapp`);
    }
  }

  const field =
    "w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-laser";

  const steps = [
    { title: t("car.s1t"), body: t("car.s1b") },
    { title: t("car.s2t"), body: t("car.s2b") },
    { title: t("car.s3t"), body: t("car.s3b") },
  ];

  return (
    <div>
      <section id="how" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("car.howKicker")}</p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">{t("car.howTitle")}</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-3xl border border-line bg-panel p-5">
              <p className="font-medium">{step.title}</p>
              <p className="mt-2 text-sm leading-7 text-mute">{step.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("car.look")}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const on = picked.includes(product.slug);
            return (
              <button
                key={product.slug}
                type="button"
                onClick={() => toggle(product.slug)}
                className={`overflow-hidden rounded-3xl border bg-panel text-start ${on ? "border-laser" : "border-line"}`}
              >
                <div className="relative aspect-4/3">
                  <ProductVisual seed={product.slug} alt={product.name[lang]} className="h-full w-full" />
                </div>
                <span className="block p-4">
                  <span className="font-medium">{product.name[lang]}</span>
                  <span className="mt-1 block text-sm leading-6 text-mute">{product.short[lang]}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

    <form id="order" onSubmit={submit} className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-laser">{t("car.kicker")}</p>
      <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">{t("car.title")}</h2>
      <p className="mt-3 text-mute">{t("car.body")}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">{t("car.make")}</span>
          <select
            className={field}
            value={makeId}
            onChange={(e) => {
              setMakeId(e.target.value);
              setModel("");
            }}
            required
          >
            <option value="">{t("car.choose")}</option>
            {carMakes.map((item) => (
              <option key={item.id} value={item.id}>
                {item[lang]}
              </option>
            ))}
          </select>
        </label>
        {makeId === "other" ? (
          <label className="block text-sm">
            <span className="mb-2 block font-medium">{t("car.make")}</span>
            <input className={field} value={otherMake} onChange={(e) => setOtherMake(e.target.value)} required />
          </label>
        ) : (
          <label className="block text-sm">
            <span className="mb-2 block font-medium">{t("car.model")}</span>
            <select className={field} value={model} onChange={(e) => setModel(e.target.value)} required disabled={!makeId}>
              <option value="">{t("car.choose")}</option>
              {models.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        )}
        {makeId === "other" && (
          <label className="block text-sm sm:col-span-3">
            <span className="mb-2 block font-medium">{t("car.model")}</span>
            <input className={field} value={model} onChange={(e) => setModel(e.target.value)} required />
          </label>
        )}
        <label className="block text-sm">
          <span className="mb-2 block font-medium">{t("car.year")}</span>
          <select className={field} value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">{t("car.choose")}</option>
            {carYears.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold">{t("car.material")}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="cursor-pointer rounded-2xl border border-line px-4 py-3 text-sm has-[:checked]:border-laser">
            <span className="flex items-start gap-3">
              <input type="radio" name="finish" className="mt-1" value="carbon" checked={finish === "carbon"} onChange={() => setFinish("carbon")} required />
              <span>
                <span className="font-medium">{t("car.carbon")}</span>
                <span className="mt-1 block text-mute">{t("car.carbonHint")}</span>
              </span>
            </span>
          </label>
          <label className="cursor-pointer rounded-2xl border border-line px-4 py-3 text-sm has-[:checked]:border-laser">
            <span className="flex items-start gap-3">
              <input type="radio" name="finish" className="mt-1" value="asa" checked={finish === "asa"} onChange={() => setFinish("asa")} required />
              <span>
                <span className="font-medium">{t("car.print")}</span>
                <span className="mt-1 block text-mute">{t("car.printHint")}</span>
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold">{t("car.parts")}</legend>
        <div className="mt-3 grid gap-2">
          {products.map((product) => (
            <label key={product.slug} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line px-4 py-3 text-sm has-[:checked]:border-laser">
              <input
                type="checkbox"
                className="mt-1"
                checked={picked.includes(product.slug)}
                onChange={() => toggle(product.slug)}
              />
              <span>
                <span className="font-medium">{product.name[lang]}</span>
                <span className="mt-1 block text-mute">{product.short[lang]}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label className="block text-sm">
          <span className="font-medium">{t("car.customLabel")}</span>
          <span className="mt-1 block text-mute">{t("car.customBody")}</span>
          <textarea
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            rows={4}
            placeholder={t("car.customPlaceholder")}
            className={`${field} mt-3`}
          />
        </label>
        <div className="mt-4">
          <p className="text-sm font-medium">{t("car.photos")}</p>
          <p className="mt-1 text-sm text-mute">{t("car.photosHint")}</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={(e) => addPhotos(e.target.files)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-3 rounded-2xl border border-line px-4 py-3 text-sm hover:border-laser"
          >
            {t("car.photosAdd")}
          </button>
          {photos.length > 0 && (
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {photos.map((photo) => (
                <li key={photo.id} className="relative overflow-hidden rounded-2xl border border-line">
                  <img src={photo.url} alt="" className="aspect-square w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    aria-label={t("common.close")}
                    className="absolute top-1 end-1 grid h-7 w-7 place-items-center rounded-full bg-ink/80 text-sm"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <input className={field} placeholder={t("checkout.name")} value={name} onChange={(e) => setName(e.target.value)} required />
        <input className={field} placeholder={t("checkout.phone")} value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      {error && <p className="mt-4 text-sm text-ember">{error}</p>}
      <Button type="submit" className="mt-6" disabled={sending}>
        {t("car.send")}
      </Button>
    </form>
    </div>
  );
}

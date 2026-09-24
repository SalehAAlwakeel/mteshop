"use client";

import { Button } from "@/components/Button";
import { formatSar } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import type { Order } from "@/lib/orders";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessInner() {
  const { t, lang } = useI18n();
  const params = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("mte-last-order");
    if (!raw) return;
    const parsed = JSON.parse(raw) as Order;
    const id = params.get("id");
    if (!id || parsed.id === id) setOrder(parsed);
  }, [params]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-laser">{t("success.id")}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold">{t("success.title")}</h1>
      {order && (
        <p className="mt-3 font-mono text-sand">
          {order.id} · {formatSar(order.total, lang)}
        </p>
      )}
      <p className="mt-4 text-mute">{t("success.body")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/shop" variant="ghost">
          {t("success.again")}
        </Button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}

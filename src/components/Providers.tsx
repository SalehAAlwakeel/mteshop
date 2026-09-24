"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OfficeMap } from "@/components/OfficeMap";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <OfficeMap />
        <Footer />
        <WhatsAppButton />
      </I18nProvider>
    </ThemeProvider>
  );
}

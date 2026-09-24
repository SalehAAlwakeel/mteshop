import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Outfit, Syne } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const ibm = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const title = "MTE — Mechatronics Tech Engineering | 3D printing, carbon fiber & laser in Riyadh";
const description =
  "Order 3D printed parts, carbon fiber fabrication, and laser cutting & engraving from Mechatronics Tech Engineering (MTE) in Riyadh, Saudi Arabia.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s · MTE Riyadh",
  },
  description,
  keywords: [
    "3D printing Riyadh",
    "carbon fiber Saudi Arabia",
    "laser cutting Riyadh",
    "laser engraving",
    "طباعة ثلاثية الأبعاد الرياض",
    "ألياف الكربون",
    "قص ليزر الرياض",
  ],
  openGraph: {
    title,
    description,
    locale: "en_SA",
    alternateLocale: "ar_SA",
    type: "website",
    siteName: "MTE",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  image: `${site.url}/opengraph-image`,
  url: site.url,
  telephone: site.phoneTel,
  email: site.email,
  currenciesAccepted: "SAR",
  paymentAccepted: "Cash, Bank Transfer, Mada, Apple Pay",
  address: {
    "@type": "PostalAddress",
    streetAddress: "RHMA2523, 2523 Al Imam Saud Ibn Abdul Aziz Branch Rd, 8027, Al Mursalat",
    addressLocality: "Riyadh",
    postalCode: "12463",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.754,
    longitude: 46.682,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  areaServed: "SA",
  priceRange: "$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${syne.variable} ${ibm.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="carbon min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("mte-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.classList.toggle("light",t==="light");document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

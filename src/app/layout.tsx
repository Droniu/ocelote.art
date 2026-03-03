import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar/Navbar";

import { Montserrat } from "next/font/google";

const siteUrl = "https://ocelote.art";
const siteDescription =
  "ocelote.art - fotografia portretowa i eventowa w okolicach Wrocławia";

export const metadata: Metadata = {
  title: {
    default: "ocelote.art",
    template: "%s | ocelote.art",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ocelote.art",
    description: siteDescription,
    url: siteUrl,
    siteName: "ocelote.art",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ocelote.art",
    description: siteDescription,
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/favicon-dark.png",
        href: "/images/favicon-dark.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/favicon-light.png",
        href: "/images/favicon-light.png",
      },
    ],
  },
};
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#000000",
};

const brutel = localFont({
  src: [
    {
      path: "../../public/fonts/Brutel-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Brutel-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-brutel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${brutel.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "ocelote.art",
              description: siteDescription,
              url: siteUrl,
              image: `${siteUrl}/images/favicon-light.png`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Wrocław",
                addressCountry: "PL",
              },
              priceRange: "$$",
              serviceType: ["Portrait Photography", "Event Photography"],
            }),
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import "@/styles/fonts.css";
import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar/Navbar";

import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "ocelote.art",
  description:
    "ocelote.art - fotografia potretowa i eventowa w okolicach Wrocławia",
};
export const viewport: Viewport = {
  viewportFit: "cover",
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
    <html lang="en" className={`${brutel.variable} ${montserrat.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

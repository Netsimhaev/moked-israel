import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo, Rubik } from "next/font/google";
import "./globals.css";

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["500", "700"],
  variable: "--font-frank-ruhl",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500"],
  variable: "--font-heebo",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "המוקד — מנעולים חכמים וכספות, שירות ישראלי ישיר",
  description:
    "מנעולים חכמים וכספות שנבחרו ונבדקו על ידינו, עם התקנה ארצית ואחריות מורחבת — הכל תחת קורת גג אחת.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frankRuhl.variable} ${heebo.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

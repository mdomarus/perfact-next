import { SITE_NAME } from "@/lib/constants";
import ContentfulImage from "@/lib/contentful-image";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Header() {
  return (
    <header className="py-8 flex items-center gap-4">
      <Link
        href="/"
        className="text-2xl font-bold flex items-center logo gap-2"
      >
        <ContentfulImage
          src={"/images/perfact-logo-vector-mini.svg"}
          alt="Logo Perfact"
          width={50}
          height={50}
        />
        <span className="hidden md:contents">Fundacja </span> Perfact
      </Link>
      <Link href="/aktualnosci">Aktualności</Link>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 py-16 text-right">
      &copy;{` 2023 - ${new Date().getFullYear()} ${SITE_NAME}`}
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="container mx-auto px-4">
        <Header />
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}

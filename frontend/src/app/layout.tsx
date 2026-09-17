import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Chakra_Petch, Russo_One } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClientOnly } from "@/components/layout/ClientOnly";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteUrl } from "@/lib/siteUrl";
import JsonLd from "@/components/seo/JsonLd";

const SearchOverlay = dynamic(() => import("@/components/modals/SearchOverlay"), { ssr: false });
const SuperModal = dynamic(() => import("@/components/modals/SuperModal"), { ssr: false });
const NotificationModal = dynamic(() => import("@/components/modals/NotificationModal"), { ssr: false });
const RatingModal = dynamic(() => import("@/components/modals/RatingModalWrapper"), { ssr: false });

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "Orbe Nerd — Lançamentos de Filmes, Séries, Animes e Jogos",
    template: "%s | Orbe Nerd",
  },
  description:
    "Acompanhe lançamentos e estreias de filmes, séries, animes e jogos. Calendário por mês, o que estreia hoje, promoções e busca unificada — tudo num hub nerd em português.",
  keywords: [
    "lançamentos de filmes",
    "estreias cinema",
    "séries novas",
    "animes da temporada",
    "jogos que vão lançar",
    "calendário de lançamentos",
    "próximos lançamentos",
    "o que estreia hoje",
    "hub nerd",
    "cultura pop",
    "filmes",
    "séries",
    "animes",
    "jogos",
  ],
  authors: [{ name: "Orbe Nerd" }],
  creator: "Orbe Nerd",
  publisher: "Orbe Nerd",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Orbe Nerd — Lançamentos de Filmes, Séries, Animes e Jogos",
    description:
      "Calendário de estreias nerd: filmes no cinema e streaming, séries, animes da temporada e jogos por mês.",
    url: siteUrl,
    siteName: "Orbe Nerd",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbe Nerd — Lançamentos de Filmes, Séries, Animes e Jogos",
    description:
      "Acompanhe estreias e lançamentos nerd: calendário por mês, busca e promoções de games.",
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'text/markdown': `${siteUrl}/llms.txt`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${chakraPetch.variable} ${russoOne.variable} font-sans antialiased`}
      >
        <AppProvider>
          <TooltipProvider delayDuration={300}>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
              <ClientOnly>
                <Header />
                <main className="pt-16 min-h-screen">
                  {children}
                </main>
                <Footer />
                <SearchOverlay />
                <SuperModal />
                <NotificationModal />
                <RatingModal />
              </ClientOnly>
            </div>
          </TooltipProvider>
        </AppProvider>
      </body>
    </html>
  );
}

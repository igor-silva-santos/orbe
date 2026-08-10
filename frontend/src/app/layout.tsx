import type { Metadata } from "next";
import { Chakra_Petch, Russo_One } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/modals/SearchOverlay";
import SuperModal from "@/components/modals/SuperModal";
import NotificationModal from "@/components/modals/NotificationModal";
import RatingModal from "@/components/modals/RatingModalWrapper";
import { ClientOnly } from "@/components/layout/ClientOnly";

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

export const metadata: Metadata = {
  title: "Orbe Nerd - Hub de Estreias",
  description: "O seu hub de estreias nerd. Acompanhe lançamentos de filmes, séries, animes e jogos em um só lugar.",
  keywords: "filmes, séries, animes, jogos, lançamentos, estreias, hub nerd",
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
  metadataBase: new URL('https://orbenerd.com'),
  openGraph: {
    title: "Orbe Nerd - Hub de Estreias",
    description: "O seu hub de estreias nerd para filmes, séries, animes e jogos.",
    url: "https://orbenerd.com",
    siteName: "Orbe Nerd",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbe Nerd - Hub de Estreias",
    description: "O seu hub de estreias nerd para filmes, séries, animes e jogos.",
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
      <body
        className={`${chakraPetch.variable} ${russoOne.variable} font-sans antialiased`}
      >
        <AppProvider>
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
        </AppProvider>
      </body>
    </html>
  );
}

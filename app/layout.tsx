import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/config';
import { OGP_DEFAULT_IMAGE } from '@/lib/og-images';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: true,
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  adjustFontFallback: true,
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-noto-serif-jp',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: 'website',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.siteName,
    locale: 'ja_JP',
    images: [
      {
        ...OGP_DEFAULT_IMAGE,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [OGP_DEFAULT_IMAGE.url],
    site: SITE_CONFIG.twitter,
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-visual',
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.siteName,
  legalName: SITE_CONFIG.legalName,
  alternateName: [...SITE_CONFIG.alternateNames],
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/images/ogp/ogp-default.png`,
  description: SITE_CONFIG.description,
  sameAs: [SITE_CONFIG.twitterUrl],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.siteName,
  url: SITE_CONFIG.url,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body
        className="min-h-screen w-full max-w-full overflow-x-clip bg-white text-[#0a0a0a] antialiased"
        style={{ fontFamily: "var(--font-inter), var(--font-noto-sans-jp), 'Helvetica Neue', Arial, 'Hiragino Sans', sans-serif" }}
      >
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main id="site-main" className="w-full min-w-0 max-w-full flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

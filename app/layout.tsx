import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlanoEvento — Editor de planos para eventos y ferias",
  description:
    "Ubicá el predio, arrastrá stands, baños y salidas desde una biblioteca pensada para ferias, y exportá un PDF a escala real para la municipalidad.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26'%3E%3Crect x='2' y='2' width='22' height='22' fill='none' stroke='%231C2430' stroke-width='2'/%3E%3Cpath d='M13 5L15.4 12.6L13 21L10.6 12.6L13 5Z' fill='%23C2410C'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

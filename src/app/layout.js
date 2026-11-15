import "./globals.css";

export const metadata = {
  title: "VESPERA | Onlayn Mağaza",
  description: "Seçilmiş kolleksiya və sürətli çatdırılma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "search-pokemon-fm-tech",
  description: "Search Pokémon by name with GraphQL and Next.js."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

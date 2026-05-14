import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { Providers } from "@/lib/providers";

export const metadata: Metadata = {
  title: "JARVIS Command Center",
  description: "Futuristic control dashboard for your AI operations."
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-jarvis-bg antialiased [font-family:'Sora','Avenir_Next','Segoe_UI',sans-serif]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

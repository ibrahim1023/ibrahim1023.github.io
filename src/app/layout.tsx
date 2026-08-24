import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SkipLink } from "@/components/a11y/SkipLink";
import { identity } from "@/content/portfolioContent";

import "@/styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: identity.name,
  description: identity.framing,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}

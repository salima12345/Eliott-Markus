import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/lib/themes";
import Header from "@/components/layout/header";
import ApolloWrapper from "@/components/ApolloWrapper";

export const metadata: Metadata = {
  title: "Eliott and Markus | Agence de communication B2B à Paris",
  description:
    "Eliott and Markus est une agence dédiée à la communication des organisations de services professionnels. Le meilleur de la communication et du branding au service de votre marque et de son influence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className="min-h-screen min-w-full max-w-[1440px] font-gilroy overflow-x-hidden scrollbar-hide"
      >
        <ApolloWrapper> {/* Wrap content in ApolloWrapper */}
          <ThemeProvider>
            <div className="flex flex-col min-h-screen transition-colors duration-200">
              <Header />
              <SmoothScroll>
                <main className="flex-grow">{children}</main>
              </SmoothScroll>
            </div>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}

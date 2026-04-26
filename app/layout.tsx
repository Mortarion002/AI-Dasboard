import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { getOperatorProfile } from "@/lib/db";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIOps Command | Core Systems",
  description: "Production-quality AI SaaS dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = getOperatorProfile();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} dark antialiased h-full`}>
      <body className="h-full flex overflow-hidden bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Topbar profile={profile} />
              <main className="flex-1 overflow-y-auto bg-background">
                {children}
              </main>
            </div>
            <CommandPalette />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

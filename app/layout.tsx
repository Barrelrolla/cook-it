import "./globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { Manrope, Fraunces, Roboto, Hurricane } from "next/font/google";
import { VercelMetrics } from "./vercelMetrics";
import { ThemeContextProvider } from "barrelrolla-ui";
import "@/utils/extensions";
import { getTranslations } from "next-intl/server";

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  preload: false,
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  preload: false,
});

export const hurricane = Hurricane({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hurricane",
  preload: false,
});

export const roboto = Roboto({
  weight: "500",
  variable: "--font-roboto",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Global");

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: t("brand-name"),
    description: t("metadata-description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const darkMode = cookieStore.get("darkMode")?.value ?? "";

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} ${hurricane.variable} ${roboto.variable} h-full antialiased ${darkMode}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const setTheme = () => {
              const savedDarkMode = localStorage.getItem("darkMode");
              const savedTheme = localStorage.getItem("theme");
              if (!savedDarkMode) localStorage.setItem("darkMode", "system");
              const { classList, dataset } = document.documentElement;
              if (savedTheme) dataset.theme = savedTheme;
              if (!savedTheme) {
                dataset.theme = "green";
                localStorage.setItem("theme", "green");
              }
              if (savedDarkMode === "system" || !savedDarkMode) {
                const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (isDark) {
                  classList.add("dark");
                  document.cookie = 'darkMode=dark';
                }
              } else if (savedDarkMode === "dark") {
                classList.add("dark");
                document.cookie = 'darkMode=dark';
              }
            };
            setTheme();`,
          }}
        />
      </head>
      <NextIntlClientProvider>
        <ThemeContextProvider>
          <body
            style={{
              margin:
                "0px calc(0px - var(--floating-ui-scrollbar-width)) 0px 0px",
            }}
          >
            {children}
          </body>
        </ThemeContextProvider>
      </NextIntlClientProvider>
      <VercelMetrics />
    </html>
  );
}

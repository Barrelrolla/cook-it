import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Fraunces, Lobster } from "next/font/google";
import { ThemeContextProvider } from "@barrelrolla/react-components-library";

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

export const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
  preload: false,
});

export const metadata: Metadata = {
  title: "Cookit",
  description: "The next-gen cooking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} ${lobster.variable} h-full antialiased`}
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
              if (savedDarkMode === "system" || !savedDarkMode) {
                const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (isDark) classList.add("dark");
              } else if (savedDarkMode === "dark") {
                classList.add("dark");
              }
            };
            setTheme();`,
          }}
        />
      </head>
      <ThemeContextProvider>
        <body>{children}</body>
      </ThemeContextProvider>
    </html>
  );
}

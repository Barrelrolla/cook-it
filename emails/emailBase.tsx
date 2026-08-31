import { PropsWithChildren } from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Font,
  Button,
  Img,
} from "react-email";
import tailwindConfig from "./tailwind.config";

export default function EmailBase({
  preview,
  children,
}: { preview: string } & PropsWithChildren) {
  return (
    <Html>
      <Tailwind config={tailwindConfig}>
        <Head>
          <Font
            fontFamily="Hurricane"
            fallbackFontFamily={"Georgia"}
            fontWeight={400}
            fontStyle="normal"
            webFont={{
              url: "https://fonts.gstatic.com/s/hurricane/v9/pe0sMIuULZxTolZ5YldCBfe_.woff2",
              format: "woff2",
            }}
          />
          <Font
            fontFamily="Fraunces"
            fallbackFontFamily={"Georgia"}
            fontWeight={400}
            fontStyle="normal"
            webFont={{
              url: "https://fonts.gstatic.com/s/fraunces/v38/6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7iQcIfJD58ngz1Yc7qv8.woff2",
              format: "woff2",
            }}
          />
          <Font
            fontFamily="Manrope"
            fallbackFontFamily={"Verdana"}
            fontWeight={400}
            fontStyle="normal"
            webFont={{
              url: "https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FN_C-bk.woff2",
              format: "woff2",
            }}
          />
        </Head>
        <Body>
          <Preview>{preview}</Preview>
          <Container className="rounded-sm bg-main dark:bg-main-dark text-bg-main-content dark:text-bg-main-content-dark mb-10 p-8 max-w-160">
            <Img className="h-18" src={"https://garndish.com/logo.png"} />
            <Section>{children}</Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function EmailButton({
  color,
  url,
  children,
}: { color?: "primary" | "error"; url: string } & PropsWithChildren) {
  const primary =
    "px-4 py-2 rounded-sm bg-primary-content dark:bg-primary-content-dark text-primary dark:text-primary-dark";
  const error =
    "px-4 py-2 rounded-sm bg-error-content dark:bg-error-content-dark text-error dark:text-error-dark";
  return (
    <Button className={color === "error" ? error : primary} href={url}>
      {children}
    </Button>
  );
}

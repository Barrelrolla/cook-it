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
import { BRAND_NAME } from "@/utils/constants";
import { PropsWithChildren } from "react";

export default function EmailBase({ children }: PropsWithChildren) {
  return (
    <Html>
      <Tailwind config={tailwindConfig}>
        <Head>
          <Font
            fontFamily="Hurricane"
            fallbackFontFamily={"cursive"}
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
            fallbackFontFamily={"Arial"}
            fontWeight={400}
            fontStyle="normal"
            webFont={{
              url: "https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FN_C-bk.woff2",
              format: "woff2",
            }}
          />
        </Head>
        <Body>
          <Preview>{`${BRAND_NAME} password reset.`}</Preview>
          <Container className="rounded-sm bg-main dark:bg-main-dark text-bg-main-content dark:text-bg-main-content-dark mb-10 p-8 max-w-160">
            <Img
              className="h-18"
              src={
                "https://res.cloudinary.com/dkvc3cs7o/image/upload/v1784429447/logo_irxicr.png"
              }
            />
            <Section>{children}</Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function EmailButton({
  url,
  children,
}: { url: string } & PropsWithChildren) {
  return (
    <Button
      className="px-4 py-2 rounded-sm bg-primary-content dark:bg-primary-content-dark text-primary dark:text-primary-dark"
      href={url}
    >
      {children}
    </Button>
  );
}

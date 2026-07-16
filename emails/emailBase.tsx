import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Font,
  Img,
  Button,
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
        <Body className="bg-main dark:bg-main-dark text-bg-main-content dark:text-bg-main-content-dark">
          <Preview>{`${BRAND_NAME} password reset.`}</Preview>
          <Container className="mb-10 p-8">
            <Text className="font-logo text-4xl">
              <span className="text-primary-content">
                <Img
                  src="https://i.ibb.co/hx88KG88/logo.jpg"
                  className="size-8"
                  style={{ display: "inline" }}
                />
              </span>
              {BRAND_NAME}
            </Text>
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

import { BRAND_NAME } from "@/utils/constants";
import EmailBase, { EmailButton } from "./emailBase";

type Props = {
  name: string;
  url: string;
};

export default function VerificationEmail({ name, url }: Props) {
  return (
    <EmailBase>
      <h1 className="font-heading">{`Welcome to ${BRAND_NAME}, ${name}`}</h1>
      <p>
        Thanks for joining the {BRAND_NAME} community! Just click the button
        below to verify your email and you can start saving and sharing recipes!
      </p>
      <EmailButton url={url}>Verify email</EmailButton>
    </EmailBase>
  );
}

VerificationEmail.PreviewProps = {
  name: "John Smith",
  url: "#",
};

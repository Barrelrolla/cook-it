import { BRAND_NAME } from "@/utils/constants";
import EmailBase, { EmailButton } from "./emailBase";

export default function PasswordReset({ url }: { url: string }) {
  return (
    <EmailBase>
      <h1 className="font-heading">{`Forgotten your ${BRAND_NAME} password?`}</h1>
      <p>
        A password reset was requested for this account. If you didn&apos;t
        request one, please ignore this email. If you did, click the button
        below to choose a new password.
      </p>
      <EmailButton url={url}>Reset Password</EmailButton>
    </EmailBase>
  );
}

PasswordReset.PreviewProps = {
  url: "#",
};

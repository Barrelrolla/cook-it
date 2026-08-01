import { BRAND_NAME } from "@/utils/constants";
import EmailBase, { EmailButton } from "./emailBase";

export default function DeleteAccount({
  user,
  url,
}: {
  user: string;
  url: string;
}) {
  return (
    <EmailBase>
      <h1 className="font-heading">{`Delete your ${BRAND_NAME} account?`}</h1>
      <p>{`Sorry to see you go, ${user}! If you're certain you want to proceed with deleting your account, click the button below:`}</p>
      <EmailButton color="error" url={url}>
        Delete account
      </EmailButton>
    </EmailBase>
  );
}

DeleteAccount.PreviewProps = {
  name: "John doe",
  url: "#",
};

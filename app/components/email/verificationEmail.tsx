import { User } from "better-auth";

export default function VerificationEmail({
  user,
  url,
}: {
  user: User;
  url: string;
}) {
  return (
    <div>
      <h1>{`Welcome to Garndish, ${user.name}`}</h1>
      <p>Please follow the link to verify your email</p>
      <a href={url}>Verify</a>
    </div>
  );
}

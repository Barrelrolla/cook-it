export default function PasswordReset({ url }: { url: string }) {
  return (
    <div>
      <h1>Forgot your password?</h1>
      <p>Please follow the link to reset it.</p>
      <a href={url}>Reset password</a>
    </div>
  );
}

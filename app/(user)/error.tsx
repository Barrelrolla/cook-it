"use client";
export default function ErrorPage({ error }: { error: { message: string } }) {
  return (
    <div>
      Something went wrong. <br />
      {error.message}
    </div>
  );
}

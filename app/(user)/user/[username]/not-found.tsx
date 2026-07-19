"use client";

import Link from "next/link";
import { Anchor } from "@barrelrolla/react-components-library";

export default function UserNotFound() {
  return (
    <main>
      We couldn&apos;t find that user. Go back to the{" "}
      <Anchor as={Link} href="/">
        Home page
      </Anchor>
    </main>
  );
}

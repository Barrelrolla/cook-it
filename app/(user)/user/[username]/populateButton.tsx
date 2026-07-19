"use client";

import { populate } from "@/db/populate";
import { Button } from "@barrelrolla/react-components-library";
import { useRouter } from "next/navigation";

export default function PopulateButton() {
  const router = useRouter();
  return (
    <Button
      className="m-4"
      onClick={() => {
        populate();
        router.refresh();
      }}
    >
      populate
    </Button>
  );
}

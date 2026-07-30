"use client";

import { Anchor } from "@barrelrolla/react-components-library";
import Link from "next/link";

export default function SettingNotFound() {
  return (
    <p>
      Invalid settings category. View{" "}
      <Anchor as={Link} href={"/settings"}>
        Settings
      </Anchor>
    </p>
  );
}

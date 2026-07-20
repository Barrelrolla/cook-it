import Image from "next/image";
import logoLight from "@/public/logo-light.svg";
import logoDark from "@/public/logo-dark.svg";
import { BRAND_NAME } from "@/utils/constants";

export default function ComingSoonPage() {
  return (
    <main className="flex flex-col justify-center min-h-[70vh]!">
      <Image
        className="block dark:hidden"
        src={logoLight}
        alt={`${BRAND_NAME} logo`}
        priority
      />
      <Image
        className="hidden dark:block"
        src={logoDark}
        alt={`${BRAND_NAME} logo`}
        priority
      />
      <h1 className="font-heading text-6xl text-center text-primary-content">
        Coming soon
      </h1>
    </main>
  );
}

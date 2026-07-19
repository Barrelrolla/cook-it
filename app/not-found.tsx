import { Suspense } from "react";
import MainNavbar from "./components/navbar/mainNavbar";

export default function NotFound() {
  return (
    <>
      <Suspense>
        <MainNavbar />
      </Suspense>
      <main className="mt-22">Page not found</main>
    </>
  );
}

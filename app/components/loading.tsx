import { Spinner } from "barrelrolla-ui";

export default function Loading() {
  return (
    <main className="flex justify-center items-center h-[calc(100vh-88px)]">
      <Spinner className="text-9xl" />
    </main>
  );
}

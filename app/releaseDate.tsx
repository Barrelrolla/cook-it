"use client";

export default function ReleaseDate() {
  const date = new Date(Date.UTC(2026, 8, 1));
  const formattedDate = new Intl.DateTimeFormat(navigator.language, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "GMT",
  }).format(date);
  return (
    <p
      className="w-full text-center mt-8 text-xl text-primary"
      suppressHydrationWarning
    >
      {formattedDate}
    </p>
  );
}

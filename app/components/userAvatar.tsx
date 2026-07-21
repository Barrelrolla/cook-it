import Image from "next/image";

export default function UserAvatar({
  className,
  avatarUrl,
  name,
}: {
  className?: string;
  avatarUrl: string;
  name: string;
}) {
  return (
    <div
      className={
        "relative rounded-full overflow-clip size-10 border border-main-content/(--border-transparency) " +
        className
      }
    >
      <Image
        src={avatarUrl}
        alt={`${name}'s avatar`}
        height={200}
        width={200}
        loading="eager"
      />
    </div>
  );
}

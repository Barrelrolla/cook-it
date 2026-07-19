import Image from "next/image";

export default function UserAvatar({
  className,
  avatarUrl,
  displayName,
}: {
  className?: string;
  avatarUrl: string;
  displayName: string;
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
        alt={`${displayName}'s avatar`}
        fill
        sizes="10vw"
      />
    </div>
  );
}

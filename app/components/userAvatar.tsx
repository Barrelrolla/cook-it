import { useTranslations } from "next-intl";
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
  const t = useTranslations("Navbar");
  return (
    <div
      className={
        "rounded-full overflow-clip size-10 border border-main-content/(--border-transparency) " +
        className
      }
    >
      <Image
        src={avatarUrl}
        alt={t("user-avatar", { name })}
        height={200}
        width={200}
        loading="eager"
      />
    </div>
  );
}

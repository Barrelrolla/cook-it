import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function UserAvatar({
  className,
  avatarUrl,
  name,
}: {
  className?: string;
  avatarUrl: string;
  name: string;
}) {
  const t = await getTranslations("Navbar");
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

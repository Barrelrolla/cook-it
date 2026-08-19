import slug from "slug";
import { nanoid } from "nanoid";
import { generateSignature } from "@/app/actions/imageActions";
import { getTranslations } from "next-intl/server";

export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = process.env.NODE_ENV === "production";

export async function delay(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function getUniqueRecipeSlug(baseSlug: string) {
  return `${slug(baseSlug)}-${nanoid(6)}`;
}

export async function uploadUserAvatar(username: string, image: File) {
  const folderName = IS_DEV ? "cook-it/user-avatars" : "garndish/user-avatars";
  const imageName = `${username}-avatar`;
  return await uploadImage(imageName, folderName, image);
}

async function uploadImage(name: string, folder: string, file: File) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const public_id = name;
  const paramsToSign = {
    timestamp,
    folder,
    public_id,
  };
  const { signature } = await generateSignature(paramsToSign);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", folder);
  formData.append("public_id", public_id);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  return await res.json();
}

type TimeTranslator = Awaited<ReturnType<typeof getTranslations<"RecipePage">>>;

export function formatCookTime(
  t: TimeTranslator,
  totalMinutes: number,
): string {
  if (!totalMinutes || totalMinutes <= 0) return t("minutes", { count: 0 });

  const MINUTES_IN_HOUR = 60;
  const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;

  const days = Math.floor(totalMinutes / MINUTES_IN_DAY);
  const remainingAfterDays = totalMinutes % MINUTES_IN_DAY;

  const hours = Math.floor(remainingAfterDays / MINUTES_IN_HOUR);
  const minutes = remainingAfterDays % MINUTES_IN_HOUR;

  const parts: string[] = [];

  if (days > 0) parts.push(t("days", { count: days }));
  if (hours > 0) parts.push(t("hours", { count: hours }));
  if (minutes > 0) parts.push(t("minutes", { count: minutes }));

  return parts.join(" ");
}

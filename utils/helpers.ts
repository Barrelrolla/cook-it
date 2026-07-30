import slug from "slug";
import { nanoid } from "nanoid";
import { generateSignature } from "@/app/actions/imageActions";

export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = process.env.NODE_ENV === "production";

export function getUniqueRecipeSlug(baseSlug: string) {
  return `${slug(baseSlug)}-${nanoid(6)}`;
}

export async function uploadUserAvatar(username: string, image: File) {
  const folderName = IS_DEV ? "cook-it/user-avatars" : "garndish/user-avatars";
  return await uploadImage(username, folderName, image);
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

"use client";
import { ChangeEvent, useState, useTransition } from "react";
import { user as userSchema } from "@/db/schemas/auth-schema";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@barrelrolla/react-components-library";
import Image from "next/image";
import { PiPencilFill, PiXCircleFill } from "react-icons/pi";
import { ImageFileSchema } from "@/utils/validationSchemas";
import { uploadUserAvatar } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth/authClient";
import SettingsForm from "../../settingsForm";
import { useTranslations } from "next-intl";

export default function ProfilePictureForm({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();
  const tGlobal = useTranslations("Global");
  const tProfile = useTranslations("Settings.Profile");
  const t = useTranslations("Settings.Profile.Picture");

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) {
      return;
    }

    setIsChanged(false);
    setImageError("");
    if (!selectedImage) {
      return;
    }

    const data = ImageFileSchema.safeParse(selectedImage);

    if (data.error) {
      if (data.error.issues.length > 0) {
        setImageError(data.error.issues[0].message);
      } else {
        setImageError(data.error.message);
      }
      return;
    }

    URL.revokeObjectURL(image);
    const previewUrl = URL.createObjectURL(selectedImage);
    setImage(previewUrl);
    setFile(selectedImage);
  }

  async function saveData() {
    try {
      let uploadedImageUrl = "";
      if (file && user.username) {
        try {
          const uploadedImageData = await uploadUserAvatar(user.username, file);
          if (uploadedImageData.secure_url) {
            uploadedImageUrl = uploadedImageData.secure_url;
          } else {
            setImageError(tGlobal("something-went-wrong"));
            return;
          }
        } catch {
          setImageError(tGlobal("something-went-wrong"));
        }
      }

      if (uploadedImageUrl) {
        const split = uploadedImageUrl.split("upload/");
        const transofrmedImageUrl = `${split[0]}upload/c_auto,g_auto,h_400,w_400/${split[1]}`;
        await authClient.updateUser({
          image: transofrmedImageUrl,
        });
      }

      setImage("");
      setFile(null);
      setIsChanged(true);
      router.refresh();
    } catch {
      throw new Error(tGlobal("something-went-wrong"));
    }
  }

  const handleFormAction = () => {
    startTransition(async () => {
      await saveData();
    });
  };

  return (
    <SettingsForm
      label={tProfile("picture")}
      isLoading={isPending}
      formAction={handleFormAction}
      isActionDisabled={false}
      showBack
    >
      <p className="text-sm mb-4">{t("choose-picture")}</p>
      <div className="relative w-fit">
        <Tooltip isLabel>
          <TooltipTrigger>
            <Button
              disabled={isPending}
              as="label"
              aria-label={t("pick-image")}
              htmlFor="file-select"
              tabIndex={0}
              className="absolute -top-2 -right-2"
              size="sm"
              radius="pill"
              color="primary"
              startIcon={<PiPencilFill />}
            />
          </TooltipTrigger>
          <TooltipContent>{t("pick-image")}</TooltipContent>
        </Tooltip>
        <Image
          className="rounded-containers w-[94vw] max-w-50 h-50 object-cover"
          src={image || user.image || ""}
          width={200}
          height={200}
          loading="eager"
          alt={t("user-avatar", { name: user.name })}
        />
        <input
          onChange={handleImageChange}
          id="file-select"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {image && (
          <Tooltip>
            <TooltipTrigger>
              <Button
                disabled={isPending}
                as="label"
                aria-label={t("cancel")}
                tabIndex={0}
                onClick={() => {
                  setImage("");
                }}
                className="absolute -bottom-2 -right-2"
                size="sm"
                radius="pill"
                color="error"
                startIcon={<PiXCircleFill />}
              />
            </TooltipTrigger>
            <TooltipContent>{t("cancel")}</TooltipContent>
          </Tooltip>
        )}
      </div>
      {imageError && <p className="text-error text-sm">{imageError}</p>}
      {isChanged && (
        <p className="text-success text-sm">{t("photo-changed")}</p>
      )}
    </SettingsForm>
  );
}

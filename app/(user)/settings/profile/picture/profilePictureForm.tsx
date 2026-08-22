"use client";
import { useState, useTransition } from "react";
import { user as userSchema } from "@/db/schemas/auth-schema";
import { IS_DEV, uploadUserAvatar } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth/authClient";
import SettingsForm from "../../settingsForm";
import { useTranslations } from "next-intl";
import ImagePicker from "@/app/components/imagePicker";

export default function ProfilePictureForm({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const tGlobal = useTranslations("Global");
  const tProfile = useTranslations("Settings.Profile");
  const t = useTranslations("Settings.Profile.Picture");

  async function saveData() {
    try {
      let uploadedImageUrl = "";
      if (file && user.username) {
        try {
          const uploadedImageData = await uploadUserAvatar(user.username, file);
          if (uploadedImageData.secure_url) {
            uploadedImageUrl = uploadedImageData.secure_url;
          } else {
            setError(tGlobal("something-went-wrong"));
            return;
          }
        } catch (err) {
          if (IS_DEV) {
            console.error(err);
          }
          setError(tGlobal("something-went-wrong"));
        }
      }

      if (uploadedImageUrl) {
        const split = uploadedImageUrl.split("upload/");
        const transofrmedImageUrl = `${split[0]}upload/c_auto,g_auto,h_400,w_400/${split[1]}`;
        await authClient.updateUser({
          image: transofrmedImageUrl,
        });
      }

      setFile(null);
      setIsChanged(true);
      router.refresh();
    } catch (err) {
      if (IS_DEV) {
        console.error(err);
      }
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
      <ImagePicker
        isPending={isPending}
        pickImageLabel={t("pick-image")}
        imageUrl={user.image || ""}
        imageAlt={t("user-avatar", { name: user.name })}
        cancelLabel={t("cancel")}
        setIsChanged={setIsChanged}
        setFile={setFile}
      />
      {error && <p className="text-error text-sm">{error}</p>}
      {isChanged && (
        <p className="text-success text-sm">{t("photo-changed")}</p>
      )}
    </SettingsForm>
  );
}

"use client";

import {
  ImageFileSchema,
  permissiveDisplayNameSchema,
} from "@/utils/validationSchemas";
import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@barrelrolla/react-components-library";
import Image from "next/image";
import { ChangeEvent, useState, useTransition } from "react";
import { PiPencilFill, PiXCircleFill } from "react-icons/pi";
import z from "zod";
import SettingsBase from "../settingsBase";
import { SOMETHING_WENT_WRONG } from "@/utils/constants";
import { authClient } from "@/auth/authClient";
import { useRouter } from "next/navigation";
import { uploadUserAvatar } from "@/utils/helpers";
import Loading from "@/app/components/loading";

export default function ProfileSettings() {
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const { data, isPending, error } = authClient.useSession();

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  const user = data.user;

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) {
      return;
    }

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

  async function saveData(formData: FormData) {
    const enteredName = formData.get("name")?.toString() || "";
    setNameError("");
    setName(enteredName);

    try {
      const Name = z.object({ name: permissiveDisplayNameSchema });
      const name = Name.safeParse({
        name: enteredName,
      });

      if (enteredName && name.error) {
        if (name.error.issues.length > 0) {
          setNameError(name.error.issues[0].message);
        } else {
          setNameError(name.error.message);
        }
        return;
      }

      let uploadedImageUrl = "";
      if (file && user.username) {
        try {
          const uploadedImageData = await uploadUserAvatar(user.username, file);
          if (uploadedImageData.secure_url) {
            uploadedImageUrl = uploadedImageData.secure_url;
          } else {
            setImageError(SOMETHING_WENT_WRONG);
            return;
          }
        } catch {
          setImageError(SOMETHING_WENT_WRONG);
        }
      }

      const updatedUserData: Record<string, unknown> = {};
      if (name.data?.name) {
        updatedUserData.name = name.data.name;
      }
      if (uploadedImageUrl) {
        const split = uploadedImageUrl.split("upload/");
        const transofrmedImageUrl = `${split[0]}upload/c_auto,g_auto,h_400,w_400/${split[1]}`;
        updatedUserData.image = transofrmedImageUrl;
      }

      if (Object.keys(updatedUserData).length > 0) {
        await authClient.updateUser(updatedUserData);
      }

      setImage("");
      setName("");
      setFile(null);
      router.refresh();
    } catch {
      throw new Error(SOMETHING_WENT_WRONG);
    }
  }

  const handleFormAction = (formData: FormData) => {
    startTransition(async () => {
      await saveData(formData);
    });
  };

  return (
    <SettingsBase
      formAction={handleFormAction}
      label="Profile"
      isLoading={isLoading}
    >
      {user.image && (
        <div className="relative w-fit">
          <p className="text-sm">Avatar</p>
          <Tooltip>
            <TooltipTrigger>
              <Button
                disabled={isLoading}
                as="label"
                aria-label="pick image"
                htmlFor="file-select"
                tabIndex={0}
                className="absolute top-4 -right-2"
                size="sm"
                radius="pill"
                color="primary"
                startIcon={<PiPencilFill />}
              />
            </TooltipTrigger>
            <TooltipContent>Pick new image</TooltipContent>
          </Tooltip>
          <Image
            className="rounded-containers w-[94vw] max-w-50 h-50 object-cover"
            src={image || user.image}
            width={200}
            height={200}
            loading="eager"
            alt={`${user.name}'s avatar`}
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
                  disabled={isLoading}
                  as="label"
                  aria-label="revert image"
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
              <TooltipContent>Cancel</TooltipContent>
            </Tooltip>
          )}
        </div>
      )}
      {imageError && <p className="text-error-content">{imageError}</p>}
      <div className="flex mt-8">
        <Input
          disabled={isLoading}
          id="name"
          name="name"
          tabIndex={0}
          defaultValue={name}
          autoComplete="name"
          label="Display name"
          placeholder={user.name}
        />
      </div>
      {nameError && <p className="text-error-content">{nameError}</p>}
    </SettingsBase>
  );
}

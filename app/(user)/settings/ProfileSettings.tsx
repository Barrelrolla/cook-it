"use client";

import { user as userSchema } from "@/db/schemas/auth-schema";
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
import { ChangeEvent, useState } from "react";
import { PiFloppyDiskBold, PiPencilFill, PiXCircleFill } from "react-icons/pi";
import z from "zod";
import SettingsBase from "./SettingsBase";

export default function ProfileSettings({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  }

  function saveData(formData: FormData) {
    const enteredName = formData.get("name")?.toString() || "";
    setNameError("");
    setName(enteredName);
    setIsLoading(true);

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
    }

    // upload image to cloudinary

    const data: Record<string, unknown> = {};
    if (name.data) {
      data.name = name.data.name;
    }
    if (image) {
      data.image = image;
    }

    // update user
    console.log(data);

    setIsLoading(false);
  }

  return (
    <SettingsBase formAction={saveData} label="Profile">
      {user.image && (
        <div className="relative w-fit">
          <p>Avatar</p>
          <Tooltip>
            <TooltipTrigger>
              <Button
                as="label"
                aria-label="pick image"
                htmlFor="file-select"
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
                  as="label"
                  aria-label="revert image"
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
      <Button
        wrapperClassName="w-full flex justify-end"
        color="primary"
        className="mt-4"
        startIcon={<PiFloppyDiskBold />}
        loading={isLoading}
      >
        Save
      </Button>
    </SettingsBase>
  );
}

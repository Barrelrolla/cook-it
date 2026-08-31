"use client";

import Image from "next/image";
import { PiPencilFill, PiXCircleFill } from "react-icons/pi";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "barrelrolla-ui";
import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { createImageFileValidation } from "@/utils/validationSchemas";

type ImagePickerProps = {
  isPending: boolean;
  pickImageLabel: string;
  imageUrl: string;
  imageAlt: string;
  cancelLabel: string;
  setIsChanged?: (changed: boolean) => void;
  setFile: (file: File) => void;
  width?: number;
  height?: number;
};
export default function ImagePicker({
  isPending,
  pickImageLabel,
  imageUrl,
  imageAlt,
  cancelLabel,
  setIsChanged,
  setFile,
  width = 200,
  height = 200,
}: ImagePickerProps) {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const tValidation = useTranslations("Validation");

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) {
      return;
    }

    if (setIsChanged) {
      setIsChanged(false);
    }
    setError("");
    if (!selectedImage) {
      return;
    }

    const data =
      createImageFileValidation(tValidation).safeParse(selectedImage);

    if (data.error) {
      if (data.error.issues.length > 0) {
        setError(data.error.issues[0].message);
      } else {
        setError(data.error.message);
      }
      return;
    }

    URL.revokeObjectURL(image);
    const previewUrl = URL.createObjectURL(selectedImage);
    setImage(previewUrl);
    setFile(selectedImage);
  }

  return (
    <>
      <div className="relative w-fit">
        <Tooltip color="primary" isLabel>
          <TooltipTrigger>
            <Button
              disabled={isPending}
              as="label"
              aria-label={pickImageLabel}
              htmlFor="file-select"
              tabIndex={0}
              className="absolute -top-2 -right-2"
              size="sm"
              radius="pill"
              color="primary"
              startIcon={<PiPencilFill />}
            />
          </TooltipTrigger>
          <TooltipContent>{pickImageLabel}</TooltipContent>
        </Tooltip>
        <Image
          className="rounded-containers w-[94vw] object-cover"
          style={{ width: width, maxWidth: "100%", height: height }}
          src={image || imageUrl}
          height={width}
          width={height}
          loading="eager"
          alt={imageAlt}
        />
        <input
          onChange={handleImageChange}
          id="file-select"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {image && (
          <Tooltip color="error">
            <TooltipTrigger>
              <Button
                disabled={isPending}
                as="label"
                aria-label={cancelLabel}
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
            <TooltipContent>{cancelLabel}</TooltipContent>
          </Tooltip>
        )}
      </div>
      {error && <p className="text-error text-sm">{error}</p>}
    </>
  );
}

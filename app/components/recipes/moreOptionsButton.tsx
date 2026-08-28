"use client";

import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownList,
  DropdownListItem,
  DropdownTrigger,
} from "@barrelrolla/react-components-library";
import {
  PiDotsThreeVerticalBold,
  PiPencilSimpleLine,
  PiTrash,
} from "react-icons/pi";
import DestructiveModal from "../destructiveModal";
import { useState } from "react";
import { deleteRecipe } from "@/app/actions/recipeActions";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type MoreOptionsButtonProps = {
  recipeId: string;
  recipeSlug: string;
  title: string;
};

export default function MoreOptionsButton({
  title,
  recipeId,
  recipeSlug,
}: MoreOptionsButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("RecipePage");

  function onDeleteConfirm() {
    deleteRecipe(recipeId);
    router.refresh();
  }

  return (
    <>
      <DestructiveModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        action={onDeleteConfirm}
        title={t("delete-title", { name: title })}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            aria-label={t("more-options")}
            size="sm"
            color="main"
            variant="ghost"
            className="m-1 absolute bottom-0 right-0 z-20"
            startIcon={<PiDotsThreeVerticalBold />}
          />
        </DropdownTrigger>
        <DropdownContent closeButtonAriaLabel={t("close")}>
          <DropdownList>
            <DropdownListItem
              className="justify-start"
              onClick={() => {
                router.push(`/recipes/${recipeSlug}/edit`);
              }}
            >
              <PiPencilSimpleLine />
              {t("edit-button")}
            </DropdownListItem>
            <DropdownListItem
              onClick={() => setIsModalOpen(true)}
              color="error"
              className="justify-start text-error"
            >
              <PiTrash />
              {t("delete-button")}
            </DropdownListItem>
          </DropdownList>
        </DropdownContent>
      </Dropdown>
    </>
  );
}

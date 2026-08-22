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

type MoreOptionsButtonProps = {
  editLabel: string;
  deleteLabel: string;
  deleteTitle: string;
  recipeId: string;
};

export default function MoreOptionsButton({
  editLabel,
  deleteLabel,
  deleteTitle,
  recipeId,
}: MoreOptionsButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
        title={deleteTitle}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            size="sm"
            color="main"
            variant="ghost"
            className="m-1 absolute bottom-0 right-0 z-20"
            startIcon={<PiDotsThreeVerticalBold />}
          />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownList>
            <DropdownListItem className="justify-start">
              <PiPencilSimpleLine />
              {editLabel}
            </DropdownListItem>
            <DropdownListItem
              onClick={() => setIsModalOpen(true)}
              color="error"
              className="justify-start text-error"
            >
              <PiTrash />
              {deleteLabel}
            </DropdownListItem>
          </DropdownList>
        </DropdownContent>
      </Dropdown>
    </>
  );
}

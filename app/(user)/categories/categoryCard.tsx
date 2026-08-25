"use client";

import { recipeCategoryEnum } from "@/db/schemas/recipe-schema";
import {
  Card,
  CardImageContainer,
  CardInteract,
  CardSection,
  CardTitle,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  category,
}: {
  category: (typeof recipeCategoryEnum.enumValues)[number];
}) {
  const t = useTranslations("Recipes.Categories");
  return (
    <Card>
      <CardInteract as={Link} href={`/categories/${category}`}>
        <CardSection>
          <CardImageContainer className="h-40 w-full">
            <Image
              className="object-cover h-full w-full"
              src={`/categories/${category}.png`}
              alt={t("img-alt", { category })}
              width={300}
              height={150}
            />
          </CardImageContainer>
          <CardTitle className="line-clamp-1 font-heading">
            {t(category)}
          </CardTitle>
        </CardSection>
      </CardInteract>
    </Card>
  );
}

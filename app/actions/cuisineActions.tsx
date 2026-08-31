"use server";

import { db } from "@/db";
import { IS_DEV } from "@/utils/helpers";

export type Cuisine = NonNullable<
  Awaited<ReturnType<typeof getAllCuisines>>
>[number];

export async function getAllCuisines() {
  try {
    return await db.query.cuisineTable.findMany();
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}

export async function getCuisineId(name: string) {
  if (!name) {
    return null;
  }

  try {
    return await db.query.cuisineTable.findFirst({
      where: (cuisine, { eq }) => eq(cuisine.name, name),
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}

"use server";

import { db } from "@/db";

export type Cuisine = NonNullable<
  Awaited<ReturnType<typeof getAllCuisines>>
>[number];

export async function getAllCuisines() {
  try {
    return await db.query.cuisineTable.findMany();
  } catch {
    return null;
  }
}

export async function getCuisineId(name: string) {
  try {
    return await db.query.cuisineTable.findFirst({
      where: (cuisine, { eq }) => eq(cuisine.name, name),
    });
  } catch {
    return null;
  }
}

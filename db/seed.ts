"use server";

import { auth } from "@/auth/auth";
import { db } from ".";
import { cuisineTable, recipeTable } from "./schemas/recipe-schema";
import { getUniqueRecipeSlug } from "@/utils/helpers";
import { sql } from "drizzle-orm";

export async function seed() {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
  const { user } = await auth.api.createUser({
    body: {
      email: "chetkara@gmail.com",
      name: "Julian",
      data: {
        username: "barrelrolla",
        displayUsername: "Barrelrolla",
        emailVerified: true,
        image:
          "https://res.cloudinary.com/dkvc3cs7o/image/upload/c_auto,g_auto,h_400,w_400/v1785421900/cook-it/user-avatars/barrelrolla-avatar.webp",
      },
      password: "Pass123$",
      role: "admin",
    },
  });
  console.log("added user", user.name);

  const cuisines = await db
    .insert(cuisineTable)
    .values([
      { name: "Albanian" },
      { name: "Austrian" },
      { name: "Belgian" },
      { name: "British" },
      { name: "Bulgarian" },
      { name: "Croatian" },
      { name: "Czech" },
      { name: "Danish" },
      { name: "Dutch" },
      { name: "Finnish" },
      { name: "French" },
      { name: "German" },
      { name: "Greek" },
      { name: "Hungarian" },
      { name: "Irish" },
      { name: "Italian" },
      { name: "Norwegian" },
      { name: "Polish" },
      { name: "Portugese" },
      { name: "Romanian" },
      { name: "Serbian" },
      { name: "Spanish" },
      { name: "Swedish" },
      { name: "Swiss" },
      { name: "Ukrainian" },
      { name: "Egyptean" },
      { name: "Israeli" },
      { name: "Lebanese" },
      { name: "Moroccan" },
      { name: "Palestinian" },
      { name: "Persian" },
      { name: "Syrian" },
      { name: "Turkish" },
      { name: "Indian" },
      { name: "Pakistani" },
      { name: "Bangladeshi" },
      { name: "Sri Lankan" },
      { name: "Nepalese" },
      { name: "Chinese" },
      { name: "Japanese" },
      { name: "Korean" },
      { name: "Mongolian" },
      { name: "Filipino" },
      { name: "Indonesian" },
      { name: "Malaysian" },
      { name: "Singaporean" },
      { name: "Thai" },
      { name: "Vietnamese" },
      { name: "American" },
      { name: "Canadian" },
      { name: "Caribbean" },
      { name: "Cuban" },
      { name: "Mexican" },
      { name: "Peruvian" },
      { name: "Ehiopian" },
      { name: "South African" },
      { name: "Nigerian" },
      { name: "Tunisian" },
    ])
    .returning();

  console.log("added cuisinges");

  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Creamy Mushroom Pasta"),
    title: "Creamy Mushroom Pasta",
    authorId: user.id,
    imageUrl: "/creamy-mushroom-pasta.png",
    category: "dinner",
    cuisineId: cuisines[15].id,
    description:
      "A rich and comforting pasta dish made with golden mushrooms, garlic, Parmesan, and a silky cream sauce. Ready in under 30 minutes, making it perfect for a cozy weeknight dinner.",
    prepTime: 10,
    cookTime: 20,
    difficulty: "easy",
    instructions: [
      "Bring a large pot of salted water to a boil. Cook the pasta according to the package instructions until al dente, then reserve about 1/2 cup of pasta water before draining.",
      "While the pasta cooks, clean the mushrooms and slice them evenly. Mince the garlic and grate the Parmesan.",
      "Heat olive oil in a large skillet over medium-high heat. Add the mushrooms and cook for 5-7 minutes until golden brown and most of their moisture has evaporated.",
      "Reduce the heat to medium and add the butter and minced garlic. Cook for about 30 seconds, until the garlic becomes fragrant.",
      "Pour in the heavy cream and bring it to a gentle simmer. Stir in the Parmesan and cook for 2-3 minutes until the sauce thickens.",
      "Add the drained pasta to the skillet and toss until evenly coated. Add a splash of reserved pasta water if the sauce is too thick.",
      "Season with salt and freshly ground black pepper. Serve immediately with additional Parmesan and fresh parsley.",
    ],
    ingredients: [
      "300 g pasta",
      "250 g cremini mushrooms",
      "3 cloves garlic",
      "2 tbsp olive oil",
      "1 tbsp butter",
      "200 ml heavy cream",
      "60 g Parmesan cheese",
      "1/2 tsp salt",
      "1/4 tsp black pepper",
      "2 tbsp fresh parsley",
    ],
    servings: 4,
    diet: [],
  });

  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Rainbow Buddha Bowl"),
    title: "Rainbow Buddha Bowl",
    authorId: user.id,
    imageUrl: "/rainbow-buddha-bowl.png",
    category: "lunch",
    cuisineId: cuisines[49].id,
    description:
      "A colorful and satisfying grain bowl packed with roasted chickpeas, fresh vegetables, avocado, and a creamy tahini dressing.",
    prepTime: 15,
    cookTime: 25,
    difficulty: "easy",
    instructions: [
      "Preheat the oven to 200°C. Drain and rinse the chickpeas, then pat them dry with a clean kitchen towel.",
      "Toss the chickpeas with olive oil, paprika, cumin, salt, and pepper. Spread them on a baking sheet and roast for 20-25 minutes until golden and crispy.",
      "Cook the rice according to the package instructions. Once cooked, fluff with a fork and set aside.",
      "Prepare the vegetables while the rice and chickpeas cook. Slice the avocado, halve the cherry tomatoes, grate the carrot, and thinly slice the cucumber.",
      "Make the dressing by whisking together tahini, lemon juice, olive oil, garlic, and enough water to reach a smooth pouring consistency.",
      "Divide the rice between serving bowls. Arrange the roasted chickpeas and vegetables over the rice.",
      "Drizzle with tahini dressing and finish with fresh parsley and sesame seeds.",
    ],
    ingredients: [
      "200 g cooked rice",
      "1 can (400 g) chickpeas",
      "1 carrot",
      "1/2 cucumber",
      "150 g cherry tomatoes",
      "1 avocado",
      "2 tbsp olive oil",
      "1/2 tsp paprika",
      "1/2 tsp ground cumin",
      "1 tbsp sesame seeds",
      "2 tbsp fresh parsley",
      "2 tbsp tahini",
      "1 tbsp lemon juice",
      "1 small garlic clove",
      "Salt to taste",
      "Black pepper to taste",
    ],
    servings: 2,
    diet: ["vegan", "vegetarian"],
  });

  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Honey Garlic Salmon"),
    title: "Honey Garlic Salmon",
    authorId: user.id,
    imageUrl: "/honey-garlic-salmon.png",
    category: "dinner",
    cuisineId: cuisines[39].id,
    description:
      "Tender salmon fillets glazed with a sweet and savory honey garlic sauce. A quick dinner with crisp edges, a caramelized glaze, and plenty of flavor.",
    prepTime: 10,
    cookTime: 15,
    difficulty: "medium",
    instructions: [
      "Pat the salmon fillets dry with paper towels and season both sides lightly with salt and black pepper.",
      "In a small bowl, whisk together honey, soy sauce, minced garlic, lemon juice, and smoked paprika.",
      "Heat the olive oil in a large skillet over medium-high heat. Place the salmon skin-side up and cook for 3-4 minutes until golden brown.",
      "Carefully flip the salmon and cook for another 2 minutes.",
      "Pour the honey garlic sauce into the skillet. Reduce the heat to medium and spoon the sauce over the salmon as it simmers.",
      "Cook for another 4-6 minutes, occasionally basting the salmon, until it is cooked through and the glaze has thickened.",
      "Remove from the heat and garnish with sliced spring onion and sesame seeds. Serve immediately with rice or roasted vegetables.",
    ],
    ingredients: [
      "2 salmon fillets",
      "2 tbsp honey",
      "2 tbsp soy sauce",
      "3 cloves garlic",
      "1 tbsp lemon juice",
      "1/2 tsp smoked paprika",
      "1 tbsp olive oil",
      "1 spring onion",
      "1 tsp sesame seeds",
      "Salt to taste",
      "Black pepper to taste",
    ],
    servings: 2,
  });

  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Chocolate Lava Cake"),
    title: "Chocolate Lava Cake",
    authorId: user.id,
    imageUrl: "/chocolate-lava-cake.png",
    category: "dessert",
    cuisineId: cuisines[10].id,
    description:
      "Individual chocolate cakes with a soft, molten center. These decadent desserts are surprisingly simple to prepare and are best served warm with vanilla ice cream.",
    prepTime: 20,
    cookTime: 12,
    difficulty: "hard",
    instructions: [
      "Preheat the oven to 200°C. Butter four small ramekins and dust the insides lightly with cocoa powder.",
      "Melt the dark chocolate and butter together in a heatproof bowl over a pan of gently simmering water. Stir until completely smooth, then remove from the heat.",
      "In a separate bowl, whisk the eggs, egg yolks, and sugar for 2-3 minutes until pale and slightly thickened.",
      "Slowly whisk the melted chocolate mixture into the egg mixture until smooth.",
      "Sift in the flour and salt. Fold gently until just combined, taking care not to overmix.",
      "Divide the batter evenly between the prepared ramekins and place them on a baking sheet.",
      "Bake for 10-12 minutes. The edges should be set while the centers remain slightly soft and jiggly.",
      "Let the cakes rest for 1 minute, then carefully invert each ramekin onto a serving plate.",
      "Serve immediately with vanilla ice cream, fresh berries, or a dusting of powdered sugar.",
    ],
    ingredients: [
      "120 g dark chocolate",
      "100 g butter",
      "2 large eggs",
      "2 egg yolks",
      "50 g granulated sugar",
      "40 g all-purpose flour",
      "1/4 tsp salt",
      "1 tsp cocoa powder",
      "Vanilla ice cream for serving",
      "Fresh berries for serving",
    ],
    servings: 4,
  });

  console.log("added recipes");
}

seed();

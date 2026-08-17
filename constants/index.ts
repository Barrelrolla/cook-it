import { getTranslations } from "next-intl/server";

export type SettingsCategory =
  "profile" | "account" | "connections" | "appearance" | "data";
export const SETTINGS_CATEGORIES: SettingsCategory[] = [
  "profile",
  "account",
  "connections",
  "appearance",
  "data",
];

export type NavLink = "recipes" | "categories";
export const NAV_LINKS: NavLink[] = ["recipes", "categories"];

type SettingsCategoryTranslation = Awaited<
  ReturnType<typeof getTranslations<"Settings.Categories">>
>;

export function formatSettingsCategory(
  t: SettingsCategoryTranslation,
  category: SettingsCategory,
): string {
  return t(category) ?? category;
}

export async function formatNavLink(link: NavLink): Promise<string> {
  const t = await getTranslations("Navbar.Links");
  return t(link) ?? link;
}

export const SIGNIN_PARAM = "signin";
export const SIGNUP_PARAM = "signup";
export const RESET_PASSWORD_PARAM = "reset-password";
export const CHOOSE_DISPLAY_NAME_PARAM = "choose-username";

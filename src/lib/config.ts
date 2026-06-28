/**
 * Central place for brand + launch configuration.
 * As the project grows into the full storefront + admin dashboard,
 * shared constants live here.
 */

export const BRAND = {
  name: "Mekhas",
  tagline: "Pure, aromatic spice powders — ground for your kitchen.",
  email: "youskincareofficial@gmail.com",
} as const;

/** Target launch date (local time). Update as plans firm up. */
export const LAUNCH_DATE = new Date("2026-08-01T09:00:00");

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
] as const;

import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

const products = [
  {
    name: "Turmeric (Haldi) Powder",
    description:
      "Stone-ground from sun-dried single-origin turmeric roots, with a deep golden colour and high curcumin content. Earthy, warm, and essential to everyday cooking.",
    priceCents: 599,
    compareAtCents: 799,
    category: "Ground Spices",
    stock: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80",
    featured: true,
    comingSoon: false,
    published: true,
  },
  {
    name: "Kashmiri Red Chilli Powder",
    description:
      "A vivid, fragrant chilli powder prized for rich red colour and gentle heat. Adds bold depth to curries and marinades without overpowering.",
    priceCents: 699,
    category: "Ground Spices",
    stock: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?auto=format&fit=crop&w=900&q=80",
    featured: true,
    comingSoon: false,
    published: true,
  },
  {
    name: "Coriander (Dhania) Powder",
    description:
      "Freshly milled from whole coriander seeds for a citrusy, nutty aroma. A versatile base spice that brings balance to almost any dish.",
    priceCents: 499,
    category: "Ground Spices",
    stock: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1599909533730-f9ba0a3f7f5c?auto=format&fit=crop&w=900&q=80",
    featured: false,
    comingSoon: false,
    published: true,
  },
  {
    name: "Garam Masala",
    description:
      "A warming house blend of hand-roasted cardamom, cinnamon, cloves, and black pepper, ground fresh for a fragrant finishing spice.",
    priceCents: 899,
    compareAtCents: 1099,
    category: "Spice Blends",
    stock: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
    featured: true,
    comingSoon: true,
    published: true,
  },
  {
    name: "Cumin (Jeera) Powder",
    description:
      "Toasted and ground whole cumin seeds with a deep, smoky warmth. The backbone of countless spice blends and tempering.",
    priceCents: 549,
    category: "Ground Spices",
    stock: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=900&q=80",
    featured: false,
    comingSoon: true,
    published: true,
  },
  {
    name: "Black Pepper Powder",
    description:
      "Coarsely ground Malabar black peppercorns with a sharp, woody bite. Freshly milled to lock in the pungent aroma.",
    priceCents: 999,
    category: "Ground Spices",
    stock: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=900&q=80",
    featured: false,
    comingSoon: true,
    published: true,
  },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("Seeding products…");
  for (const p of products) {
    const slug = slugify(p.name);
    await prisma.product.upsert({
      where: { slug },
      update: { ...p, slug },
      create: { ...p, slug },
    });
    console.log(`  ✓ ${p.name}${p.comingSoon ? " (Coming Soon)" : ""}`);
  }
  const count = await prisma.product.count();
  console.log(`Done. ${count} products in the catalog.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

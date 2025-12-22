function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categories = [
  { id: "all", name: "All" },
  { id: "leather", name: "Leather" },
  { id: "textile", name: "Textile" },
  { id: "pvc", name: "PVC" },
  { id: "natural-leather", name: "Natural leather" },
  { id: "photo", name: "Photo" },
];

// Tags differ by category 
const tagsByCategory = {
  all: ["All", "Beige", "Brown", "Green", "Red", "Others"],
  leather: ["All", "Beige", "Brown", "Black", "Grey", "Others"],
  textile: ["All", "Denim", "Woven", "Knitted", "Pattern", "Others"],
  pvc: ["All", "Matte", "Glossy", "Embossed", "Pattern", "Others"],
  "natural-leather": ["All", "Grain", "Suede", "Nubuck", "Others"],
  photo: ["All", "People", "Nature", "Urban", "Abstract", "Others"],
};

function makeMaterial({ categoryId, name, tag, code, image }) {
  return {
    id: `${categoryId}-${slugify(name)}-${slugify(tag)}-${code}`,
    categoryId,
    name,
    tag,
    code,
    image:
      image ||
      `https://picsum.photos/seed/${encodeURIComponent(
        `${categoryId}-${name}-${tag}-${code}`
      )}/300/220`,
  };
}

// Create a reasonable set
const materials = [];
const sampleCodes = ["C 123", "C 221", "C 090", "C 777", "C 145", "C 502"];

for (const c of categories.filter((x) => x.id !== "all")) {
  const tags = tagsByCategory[c.id].filter((t) => t !== "All");
  for (let i = 0; i < 18; i++) {
    const tag = tags[i % tags.length];
    materials.push(
      makeMaterial({
        categoryId: c.id,
        name: `${c.name} Material ${i + 1}`,
        tag,
        code: sampleCodes[i % sampleCodes.length],
      })
    );
  }
}

export { categories, tagsByCategory, materials };

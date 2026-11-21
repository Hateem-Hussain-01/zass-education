// Zass Education — examination boards.
// The five boards the site covers (founder's order, 22 Nov 2026).
// Paper counts on board pages are computed from the real catalogue —
// a board with no papers yet shows as "coming soon", never with
// invented numbers.

export interface Board {
  slug: string;
  name: string;
  short: string;
  description: string;
}

export const BOARDS: Board[] = [
  {
    slug: "cambridge-international",
    name: "Cambridge International",
    short: "Cambridge",
    description:
      "Cambridge International AS & A Level and O Level — past papers, mark schemes and grade thresholds.",
  },
  {
    slug: "aqa-gcse",
    name: "AQA GCSE",
    short: "AQA GCSE",
    description:
      "AQA GCSE past papers — question papers and mark schemes. Coming soon.",
  },
  {
    slug: "oxfordaqa",
    name: "OxfordAQA",
    short: "OxfordAQA",
    description:
      "OxfordAQA International GCSE and A Level past papers. Coming soon.",
  },
  {
    slug: "oxford-education",
    name: "Oxford Education",
    short: "Oxford Education",
    description: "Oxford Education examination board past papers. Coming soon.",
  },
  {
    slug: "ib-diploma-programme",
    name: "IB Diploma Programme",
    short: "IB Diploma",
    description:
      "International Baccalaureate Diploma Programme past papers. Coming soon.",
  },
];

export function boardBySlug(slug: string): Board | undefined {
  return BOARDS.find((b) => b.slug === slug);
}

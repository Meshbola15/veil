import { riskByIcon } from "@/data/constants";
import type { FlaggedIngredient } from "@/types";

export const mockFlaggedIngredients: FlaggedIngredient[] = [
  {
    id: "ing_octinoxate",
    name: "Octinoxate",
    aliases: ["Ethylhexyl methoxycinnamate", "OMC"],
    concernLevel: "high",
    role: "UV filter",
    reason:
      "A chemical UV filter flagged for profiles limiting hormone-active or reef-harming sunscreen actives.",
    tags: [
      riskByIcon("reef-harm"),
      riskByIcon("endocrine-disruptor"),
      riskByIcon("allergen"),
      riskByIcon("pollutant"),
    ],
    whatIsIt: [
      "Octinoxate is one of the most widely used chemical UV filters, mainly absorbing UVB rays. It's found in many sunscreens and daily cosmetics with SPF.",
      "Some lab studies suggest it has weak hormone-like (estrogenic) activity, though evidence of meaningful effects in people is limited and still debated. It can also cause irritation or allergic reactions in sensitive skin.",
      "It's an environmental concern too — linked to coral reef damage, which is why it's restricted in places like Hawaii and Palau. Worth knowing about if you prefer mineral-only sun protection.",
    ],
    supportingLinks: [
      {
        name: "EWG - 2024",
        title: "Octinoxate in sunscreen",
        url: "https://www.ewg.org/sunscreen/",
      },
      {
        name: "ECHA - 2023",
        title: "Octinoxate substance record",
        url: "https://echa.europa.eu/",
      },
      {
        name: "PubMed - 2024",
        title: "Octinoxate endocrine activity review",
        url: "https://pubmed.ncbi.nlm.nih.gov/",
      },
    ],
    riskToPets: [
      {
        species: "cat",
        tier: "caution",
        reason:
          "If a cat grooms freshly applied product off skin, chemical UV filters can cause drooling or mild stomach upset. Let it fully absorb before contact.",
      },
      {
        species: "dog",
        tier: "safe",
        reason:
          "Low risk at normal topical use — just don't let them lick large amounts off the skin.",
      },
    ],
  },
  {
    id: "ing_octocrylene",
    name: "Octocrylene",
    concernLevel: "high",
    role: "UV filter",
    reason:
      "Often paired with other UV filters; flagged when your profile prefers mineral-only sun protection.",
    tags: [
      riskByIcon("reef-harm"),
      riskByIcon("allergen"),
      riskByIcon("pollutant"),
    ],
    whatIsIt: [
      "Octocrylene is a chemical UV filter that protects against UVB and short UVA, and is often used to stabilize other filters so they last longer on the skin.",
      "It can trigger photoallergic reactions in some people. There's also ongoing discussion about whether it can form trace benzophenone over time, and a reef-safety debate similar to other chemical filters — the science isn't fully settled.",
    ],
    supportingLinks: [
      {
        name: "EWG - 2024",
        title: "Octocrylene in sunscreen",
        url: "https://www.ewg.org/sunscreen/",
      },
      {
        name: "ECHA - 2023",
        title: "Octocrylene substance record",
        url: "https://echa.europa.eu/",
      },
    ],
    riskToPets: [
      {
        species: "cat",
        tier: "caution",
        reason:
          "Can cause mild mouth or stomach irritation if a cat grooms it off treated skin. Allow it to absorb first.",
      },
      {
        species: "dog",
        tier: "safe",
        reason: "Low risk at normal topical use.",
      },
    ],
  },
  {
    id: "ing_paraffinum",
    name: "Paraffinum liquidum",
    aliases: ["Mineral oil", "Liquid paraffin"],
    concernLevel: "moderate",
    role: "emollient",
    reason:
      "Locks in moisture well, but it's occlusive and petroleum-derived — fine for many people, worth noting for acne-prone skin.",
    tags: [riskByIcon("comedogenic"), riskByIcon("pollutant")],
    whatIsIt: [
      "Paraffinum liquidum is a highly refined mineral oil that sits on the skin's surface to slow water loss, keeping skin feeling soft and hydrated.",
      "Cosmetic-grade mineral oil is purified and generally considered safe and non-irritating. The main considerations are that it's occlusive — which can feel heavy or be unwelcome for acne-prone skin — and that it's petroleum-derived, which some people avoid on sustainability grounds.",
    ],
    supportingLinks: [
      {
        name: "EWG - 2024",
        title: "Mineral oil safety profile",
        url: "https://www.ewg.org/skindeep/",
      },
      {
        name: "CIR - 2023",
        title: "Mineral oil assessment",
        url: "https://www.cir-safety.org/",
      },
    ],
    riskToPets: [
      {
        species: "cat",
        tier: "caution",
        reason:
          "Grooming a lot of it off fur or skin can upset the stomach, and swallowing large amounts carries a small aspiration risk.",
      },
      {
        species: "dog",
        tier: "safe",
        reason:
          "Mineral oil has low toxicity and isn't a concern at normal topical use.",
      },
    ],
  },
  {
    id: "ing_phenoxyethanol",
    name: "Phenoxyethanol",
    concernLevel: "moderate",
    role: "preservative",
    reason:
      "A widely used preservative; can irritate or trigger allergies in some skin, and exposure can add up across products.",
    tags: [
      riskByIcon("endocrine-disruptor"),
      riskByIcon("allergen"),
      riskByIcon("irritant"),
      riskByIcon("pollutant"),
    ],
    whatIsIt: [
      "Phenoxyethanol is a common preservative used to stop microorganisms from growing in cosmetics. The EU, UK, and Australia cap it at 1% of a product; it isn't regulated the same way in the US or Canada.",
      "Some researchers have questioned whether that 1% limit is conservative enough — especially for leave-on products used on babies, or when several products containing it are used daily and the exposure adds up.",
      "It can trigger allergic reactions or skin irritation in some people, and direct eye contact is best avoided. A few studies have looked at possible effects on development, organ function, fertility, and the endocrine system with repeated high exposure, though the evidence isn't settled and more research is needed.",
      "Its manufacturing is energy-intensive and considered polluting, which is why some organic certifications exclude it. For most people at regulated levels it's considered acceptable — worth knowing about rather than alarming.",
    ],
    supportingLinks: [
      {
        name: "ECHA - 2023",
        title: "2-phenoxyethanol substance record",
        url: "https://echa.europa.eu/",
      },
      {
        name: "EWG - 2024",
        title: "Phenoxyethanol safety profile",
        url: "https://www.ewg.org/skindeep/",
      },
      {
        name: "CIR - 2023",
        title: "Phenoxyethanol assessment",
        url: "https://www.cir-safety.org/",
      },
    ],
    riskToPets: [
      {
        species: "cat",
        tier: "caution",
        reason:
          "Cats are more sensitive to preservative solvents; it can irritate the mouth or stomach if ingested through grooming.",
      },
      {
        species: "dog",
        tier: "safe",
        reason: "Low risk at the levels used in cosmetics.",
      },
      {
        species: "bird",
        tier: "caution",
        reason:
          "Birds have very sensitive airways — keep them out of rooms where solvent-containing products are applied until dry.",
      },
    ],
  },
  {
    id: "ing_acrylates_copolymer",
    name: "Acrylates/Methacrylate Copolymer",
    concernLevel: "low",
    role: "film former",
    reason:
      "Forms a smooth film for even application and water resistance — low concern for skin, with a minor environmental footnote.",
    tags: [riskByIcon("microplastic"), riskByIcon("pollutant")],
    whatIsIt: [
      "This is a synthetic polymer that forms a thin, flexible film on the skin, helping products spread evenly, feel smooth, and resist water or sweat.",
      "It's considered low concern for skin, with little irritation risk. The main note is environmental: synthetic film-forming polymers are part of the broader microplastics discussion for waterways.",
    ],
    supportingLinks: [
      {
        name: "EWG - 2024",
        title: "Acrylates copolymer profile",
        url: "https://www.ewg.org/skindeep/",
      },
    ],
    riskToPets: [
      {
        species: "cat",
        tier: "safe",
        reason: "An inert film former; not a known toxicity concern for cats.",
      },
      { species: "dog", tier: "safe", reason: "Inert and low risk for dogs." },
    ],
  },
  {
    id: "ing_texture_group",
    name: "Carbomer, Ceteareth-25, Dimethicone",
    aliases: ["Carbomer", "Ceteareth-25", "Dimethicone"],
    concernLevel: "low",
    role: "texture & feel",
    reason:
      "Thickener, emulsifier, and silicone that give the product its texture and slip — all low concern for most skin.",
    tags: [riskByIcon("microplastic")],
    whatIsIt: [
      "These three work together on texture: carbomer thickens and gels the formula, ceteareth-25 helps oil and water stay mixed, and dimethicone is a silicone that adds slip and a smooth, soft finish.",
      "All are considered low concern for most skin. Dimethicone is mildly occlusive but generally inert and non-irritating.",
    ],
    supportingLinks: [
      {
        name: "EWG - 2024",
        title: "Dimethicone profile",
        url: "https://www.ewg.org/skindeep/",
      },
      {
        name: "CIR - 2023",
        title: "Carbomer / ceteareth assessment",
        url: "https://www.cir-safety.org/",
      },
    ],
    riskToPets: [
      {
        species: "cat",
        tier: "safe",
        reason:
          "Thickeners and silicones here are inert and low risk for cats.",
      },
      { species: "dog", tier: "safe", reason: "Inert and low risk for dogs." },
    ],
  },
];

export function getFlaggedIngredient(params: {
  id?: string | null;
  name?: string | null;
}): FlaggedIngredient | undefined {
  const { id, name } = params;

  if (id) {
    const byId = mockFlaggedIngredients.find((item) => item.id === id);
    if (byId) return byId;
  }

  if (name) {
    const decoded = decodeURIComponent(name);
    return mockFlaggedIngredients.find(
      (item) =>
        item.name === decoded ||
        item.aliases?.some((alias) => alias === decoded),
    );
  }

  return undefined;
}

export {
  mockScan,
  mockSearchResults,
  filterMockSearchResults,
} from "./mockProducts";

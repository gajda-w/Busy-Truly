type Artwork = {
  readonly src: string;
  readonly alt: string;
  readonly sizes: string;
};

/** A wrap image contains the spine and back; frontPanel selects its visible front. */
export type BookArtwork =
  | (Artwork & { readonly kind: "front" })
  | (Artwork & {
      readonly kind: "wrap";
      readonly width: number;
      readonly height: number;
      readonly frontPanel: {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
      };
    });

export type Book = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly motifs: readonly string[];
  readonly decoration: "sparkles" | "moon";
  readonly bindingColor: string;
  readonly artwork: BookArtwork;
  readonly purchaseUrl?: string;
  readonly playlistUrl?: string;
};

export const books = [
  {
    id: "skradzione-szepty",
    label: "01 — BEGIN THE STORY",
    title: "Skradzione Szepty",
    subtitle: "Tom I: Wezwana",
    description:
      "Every secret has a voice. Not every voice should be heard. Step into a world of hidden magic, dangerous discoveries, and connections that defy the boundaries between the known and the unknown.",
    motifs: [
      "Hidden magic and whispered secrets.",
      "Dangerous discoveries and the boundary between the known and the unknown.",
      "Extraordinary connections and choices with far-reaching consequences.",
    ],
    decoration: "sparkles",
    bindingColor: "#182b22",
    artwork: {
      kind: "front",
      src: "/images/skradzione-szepty.jpeg",
      alt: "Authentic cover of Skradzione Szepty. Tom I: Wezwana",
      sizes: "440px",
    },
  },
  {
    id: "krolowa-wiedzm",
    label: "02 — CONTINUE THE JOURNEY",
    title: "Królowa Wiedźm",
    subtitle: "The continuation of Skradzione Szepty",
    description:
      "Some destinies are inherited. Others must be fought for. The story continues in Królowa Wiedźm, where magic brings responsibility, alliances carry a price, and choices can change the fate of many.",
    motifs: [
      "Empathy, shared emotions, and bonds with magical creatures.",
      "Power, responsibility, and the consequences of extraordinary abilities.",
      "Kingdoms, alliances, loyalty, and trust.",
    ],
    decoration: "moon",
    bindingColor: "#102c42",
    artwork: {
      kind: "wrap",
      src: "/images/krolowa-wiedzm-wrap.jpeg",
      alt: "Original Królowa Wiedźm cover artwork, front panel",
      sizes: "1029px",
      width: 1029,
      height: 508,
      frontPanel: { x: 537, y: 31, width: 280, height: 448 },
    },
  },
] as const satisfies readonly Book[];

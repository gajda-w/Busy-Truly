import Image from "next/image";
import { Feather } from "lucide-react";
import { siteLinks } from "@/config/site";
import { DistantStar } from "@/components/ui/distant-star";
import { GoldFrame } from "@/components/ui/gold-frame";
import ui from "@/components/ui/primitives.module.css";
import styles from "./author-section.module.css";

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

export function AuthorSection() {
  return (
    <section
      className={`${ui.section} ${styles.section}`}
      aria-labelledby="author-title"
      data-reference="zKmj2KjGb"
    >
      <GoldFrame className={styles.frame}>
        <div className={styles.portrait}>
          <Image
            src="/images/kt-writz.jpeg"
            alt="K.T. Writz reading Skradzione Szepty outdoors"
            fill
            sizes="280px"
          />
        </div>
      </GoldFrame>
      <div className={styles.invitation}>
        <Feather className={ui.gold} size={28} strokeWidth={1} aria-hidden="true" />
        <p className={ui.label}>NOTES FROM BEHIND THE PAGES</p>
        <h2 className={`${ui.heading} ${styles.title}`} id="author-title">
          A little closer to the author.
        </h2>
        <p className={styles.description}>
          Join me on Substack for personal essays, writing notes, creative discoveries, and thoughts
          from behind the pages. A quieter space for readers who want to follow the person behind
          the stories.
        </p>
        <a className={ui.pill} href={siteLinks.substack}>
          Read on Substack
        </a>
        <button className={`${ui.pill} ${styles.instagram}`} disabled>
          <InstagramIcon />
          Instagram — profile link coming soon
        </button>
      </div>
      <DistantStar className={styles.starOne} />
      <DistantStar className={styles.starTwo} />
    </section>
  );
}

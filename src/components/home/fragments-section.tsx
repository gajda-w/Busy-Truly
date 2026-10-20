import { Quote } from "lucide-react";
import { DistantStar } from "@/components/ui/distant-star";
import ui from "@/components/ui/primitives.module.css";
import styles from "./fragments-section.module.css";

export function FragmentsSection() {
  return (
    <section
      className={`${ui.section} ${styles.section}`}
      aria-labelledby="fragments-title"
      data-reference="c4voA_zhO"
    >
      <Quote className={ui.gold} size={36} strokeWidth={1} aria-hidden="true" />
      <p className={ui.label}>LITERARY FRAGMENTS</p>
      <h2 className={`${ui.heading} ${styles.title}`} id="fragments-title">
        Words that linger long after the last page.
      </h2>
      <p>An author-approved excerpt will appear here.</p>
      <p className={ui.label}>Skradzione Szepty / Królowa Wiedźm</p>
      <DistantStar className={styles.starOne} />
      <DistantStar className={styles.starTwo} />
      <DistantStar className={styles.starThree} />
    </section>
  );
}

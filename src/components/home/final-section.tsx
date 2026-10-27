import { siteLinks } from "@/config/site";
import ui from "@/components/ui/primitives.module.css";
import styles from "./final-section.module.css";

export function FinalSection() {
  return (
    <section
      className={`${ui.section} ${styles.section}`}
      aria-labelledby="final-title"
      data-reference="TBX_HDutQ"
    >
      <p className={ui.label}>03 — THE FINAL PART</p>
      <h2 className={`${ui.heading} ${styles.title}`} id="final-title">
        The story has one more chapter.
      </h2>
      <p className={styles.description}>
        The third and final part of the story that began with Skradzione Szepty and continued in
        Królowa Wiedźm is in preparation.
      </p>
      <a className={`${ui.pill} ${styles.updates}`} href={siteLinks.substack}>
        Follow updates on Substack
      </a>
    </section>
  );
}

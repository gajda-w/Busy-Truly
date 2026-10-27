import { Orbit, Sparkles } from "lucide-react";
import { DistantStar } from "@/components/ui/distant-star";
import ui from "@/components/ui/primitives.module.css";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section
      className={`${ui.section} ${styles.section}`}
      aria-labelledby="opening-title"
      data-reference="xE3mBe93u"
    >
      <Orbit className={styles.orbit} size={56} strokeWidth={1} aria-hidden="true" />
      <p className={`${ui.label} ${styles.eyebrow}`}>THE WORLDS OF K.T. WRITZ</p>
      <h1 className={styles.title} id="opening-title">
        <span className={styles.titleText}>
          Some worlds are not meant to be discovered. Others will never let you go.
        </span>
      </h1>
      <p className={styles.description}>
        Enter the worlds of K.T. Writz, where ancient magic awakens, kingdoms collide, and the most
        dangerous secrets are the ones we carry within ourselves.
      </p>
      <div className={styles.actions}>
        <a className={ui.pill} href="#books">
          Explore the Books
        </a>
      </div>
      <Sparkles
        className={`${styles.constellation} ${styles.constellationLeft}`}
        size={36}
        strokeWidth={1}
        aria-hidden="true"
      />
      <Sparkles
        className={`${styles.constellation} ${styles.constellationRight}`}
        size={48}
        strokeWidth={1}
        aria-hidden="true"
      />
      <div className={styles.arc} aria-hidden="true" />
      <DistantStar className={`${styles.star} ${styles.starOne}`} />
      <DistantStar className={`${styles.star} ${styles.starTwo}`} />
      <DistantStar className={`${styles.star} ${styles.starThree}`} />
    </section>
  );
}

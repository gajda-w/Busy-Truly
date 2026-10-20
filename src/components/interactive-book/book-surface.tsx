import type { CSSProperties, ReactNode } from "react";
import { siteIdentity } from "@/config/site";
import { useBookMotion } from "./use-book-motion";
import styles from "./interactive-book.module.css";

type BookSurfaceProps = {
  children: ReactNode;
  title: string;
  bindingColor: string;
  reveal?: boolean;
};

/** The six joined faces of the book; spans keep the trigger's button content valid. */
export function BookSurface({ children, title, bindingColor, reveal = false }: BookSurfaceProps) {
  const { sceneRef, surfaceRef } = useBookMotion(reveal);

  return (
    <span
      ref={sceneRef}
      className={styles.scene}
      style={{ "--binding-color": bindingColor } as CSSProperties}
    >
      <span ref={surfaceRef} className={styles.rotator}>
        <span className={styles.surface}>{children}</span>
        <span className={styles.back} aria-hidden="true">
          <span className={styles.backOrnament}>✦</span>
          <span className={styles.backAuthor} data-lettering={siteIdentity.wordmark} />
          <span className={styles.backTitle} data-lettering={title} />
          <span className={styles.backOrnament}>✦</span>
        </span>
        <span className={styles.spine} aria-hidden="true">
          <span className={styles.spineTitle} data-lettering={title} />
          <span className={styles.spineAuthor} data-lettering={siteIdentity.wordmark} />
        </span>
        <span className={styles.pagesRight} aria-hidden="true" />
        <span className={styles.pagesTop} aria-hidden="true" />
        <span className={styles.pagesBottom} aria-hidden="true" />
      </span>
    </span>
  );
}

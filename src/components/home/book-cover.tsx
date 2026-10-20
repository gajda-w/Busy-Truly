import Image from "next/image";
import type { BookArtwork } from "@/content/books";
import styles from "./book-cover.module.css";

export function BookCover({ artwork }: { artwork: BookArtwork }) {
  if (artwork.kind === "front") {
    return (
      <span className={styles.cover}>
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes={artwork.sizes}
          className={styles.frontImage}
        />
      </span>
    );
  }

  const { frontPanel } = artwork;
  // Scale the full spread relative to its front panel, then offset the panel into view.
  const percent = (value: number, dimension: number) =>
    `${((value / dimension) * 100).toFixed(6)}%`;

  return (
    <span
      className={`${styles.cover} ${styles.wrap}`}
      style={{ aspectRatio: `${frontPanel.width} / ${frontPanel.height}` }}
    >
      <Image
        src={artwork.src}
        alt={artwork.alt}
        width={artwork.width}
        height={artwork.height}
        sizes={artwork.sizes}
        className={styles.wrapImage}
        style={{
          left: percent(-frontPanel.x, frontPanel.width),
          top: percent(-frontPanel.y, frontPanel.height),
          width: percent(artwork.width, frontPanel.width),
          height: percent(artwork.height, frontPanel.height),
        }}
      />
    </span>
  );
}

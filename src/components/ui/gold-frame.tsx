import type { ReactNode } from "react";
import styles from "./gold-frame.module.css";

export function GoldFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.frame} ${className}`}>
      {children}
      <div className={styles.ornaments} aria-hidden="true">
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
          <svg
            key={corner}
            className={`${styles.corner} ${styles[corner]}`}
            viewBox="0 0 56 56"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 42V12a7 7 0 0 1 7-7h30" />
            <path d="M7 32C-1 21 3 8 15 8c10 0 13 12 6 16-5 3-10-3-6-6M32 7C21-1 8 3 8 15c0 10 12 13 16 6 3-5-3-10-6-6" />
            <path d="M12 12c9 1 18 10 20 20-10-2-19-11-20-20ZM20 20l13 13" />
          </svg>
        ))}
        {["top", "bottom"].map((edge) => (
          <svg
            key={edge}
            className={`${styles.crest} ${styles[edge]}`}
            viewBox="0 0 80 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m40 3 5 9-5 9-5-9 5-9ZM35 12c-7-9-15-9-19-3-3 5 4 8 6 4M45 12c7-9 15-9 19-3 3 5-4 8-6 4M4 12h12m48 0h12" />
          </svg>
        ))}
      </div>
    </div>
  );
}

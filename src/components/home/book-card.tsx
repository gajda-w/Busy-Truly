import { Moon, Sparkles } from "lucide-react";
import type { Book } from "@/content/books";
import { InteractiveBook } from "@/components/interactive-book/interactive-book";
import ui from "@/components/ui/primitives.module.css";
import { BookCover } from "./book-cover";
import styles from "./book-card.module.css";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className={styles.card} aria-labelledby={`${book.id}-title`}>
      <p className={`${ui.label} ${styles.text}`}>{book.label}</p>
      {book.decoration === "sparkles" ? (
        <Sparkles className={ui.gold} size={26} strokeWidth={1} aria-hidden="true" />
      ) : (
        <Moon size={28} strokeWidth={1} aria-hidden="true" />
      )}
      <InteractiveBook title={book.title} bindingColor={book.bindingColor}>
        <BookCover artwork={book.artwork} />
      </InteractiveBook>
      <h3 className={`${ui.heading} ${styles.text}`} id={`${book.id}-title`}>
        {book.title}
      </h3>
      <p className={styles.text}>{book.subtitle}</p>
      <p className={styles.text}>{book.description}</p>
      {book.purchaseUrl ? (
        <a className={`${ui.pill} ${styles.purchase}`} href={book.purchaseUrl}>
          Buy the Book
        </a>
      ) : (
        <>
          <button
            className={`${ui.pill} ${styles.purchase}`}
            disabled
            aria-describedby={`${book.id}-shop-status`}
          >
            Buy the Book
          </button>
          <p
            className={`${ui.label} ${styles.text} ${styles.status}`}
            id={`${book.id}-shop-status`}
          >
            Purchase link to be added.
          </p>
        </>
      )}
    </article>
  );
}

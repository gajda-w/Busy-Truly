import { books } from "@/content/books";
import ui from "@/components/ui/primitives.module.css";
import { BookCard } from "./book-card";
import styles from "./books-section.module.css";

export function BooksSection() {
  return (
    <section
      id="books"
      className={`${ui.section} ${styles.section}`}
      aria-labelledby="books-title"
      data-reference="jgsoTYEUV"
    >
      <p className={`${ui.label} ${styles.eyebrow}`}>01 / 02 — ONE CONTINUING NARRATIVE</p>
      <h2 className={`${ui.heading} ${styles.title}`} id="books-title">
        Begin with a whisper. Follow it into the deep.
      </h2>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </section>
  );
}

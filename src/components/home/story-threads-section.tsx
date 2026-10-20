import { books, type Book } from "@/content/books";
import ui from "@/components/ui/primitives.module.css";
import styles from "./story-threads-section.module.css";

export function StoryThreadsSection() {
  return (
    <section
      className={`${ui.section} ${styles.section}`}
      aria-labelledby="threads-title"
      data-reference="BBpoP28CQ"
    >
      <p className={ui.label}>THREADS THROUGH THE STORY</p>
      <h2 className={ui.heading} id="threads-title">
        The magic beneath the surface.
      </h2>
      <p className={styles.description}>
        Mystery, emotional bonds, and the consequences of choice connect Skradzione Szepty with its
        continuation, Królowa Wiedźm.
      </p>
      <div className={styles.grid}>
        {books.map((book: Book) => (
          <article className={styles.thread} key={book.id}>
            <h3 className={`${ui.heading} ${styles.title}`}>{book.title}</h3>
            <ul className={styles.motifs}>
              {book.motifs.map((motif) => (
                <li key={motif}>{motif}</li>
              ))}
            </ul>
            {book.playlistUrl ? (
              <a className={`${ui.pill} ${ui.outline}`} href={book.playlistUrl}>
                Spotify — {book.title}
              </a>
            ) : (
              <>
                <button
                  className={`${ui.pill} ${ui.outline}`}
                  disabled
                  aria-describedby={`${book.id}-playlist-status`}
                >
                  Spotify — {book.title}
                </button>
                <p className={`${ui.label} ${styles.status}`} id={`${book.id}-playlist-status`}>
                  Playlist link to be added.
                </p>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

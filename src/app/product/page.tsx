import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookCover } from "@/components/home/book-cover";
import { BookLink } from "@/components/interactive-book/book-link";
import ui from "@/components/ui/primitives.module.css";
import { siteIdentity } from "@/config/site";
import { books } from "@/content/books";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Books — ${siteIdentity.name}`,
  description: "Explore Skradzione Szepty and Królowa Wiedźm. Find your next story by K.T. Writz.",
};

export default function ProductsPage() {
  return (
    <>
      <div className={styles.intro}>
        <p className={ui.label}>THE WORLDS OF K.T. WRITZ</p>
        <h1 className={styles.title}>Find your next story.</h1>
        <p>Two books. One world of magic, secrets, and extraordinary connections.</p>
      </div>
      <div className={styles.grid}>
        {books.map((book) => (
          <article
            className={styles.card}
            key={book.id}
            aria-labelledby={`${book.id}-title`}
            data-backdrop={book.backdrop}
          >
            <p className={ui.label}>{book.label}</p>
            <BookLink
              title={book.title}
              bindingColor={book.bindingColor}
              href={`/product/${book.id}`}
            >
              <BookCover artwork={book.artwork} />
            </BookLink>
            <div className={styles.details}>
              <h2 className={ui.heading} id={`${book.id}-title`}>
                <Link href={`/product/${book.id}`}>{book.title}</Link>
              </h2>
              <p>{book.subtitle}</p>
            </div>
            <Link className={styles.discover} href={`/product/${book.id}`}>
              Discover the book <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BookCover } from "@/components/home/book-cover";
import { InteractiveBook } from "@/components/interactive-book/interactive-book";
import ui from "@/components/ui/primitives.module.css";
import { siteIdentity } from "@/config/site";
import { books, type Book } from "@/content/books";
import styles from "./page.module.css";

type ProductPageProps = { params: Promise<{ slug: string }> };

function getBook(slug: string): Book {
  const book = books.find((book) => book.id === slug);
  if (!book) notFound();
  return book;
}

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const book = getBook((await params).slug);
  return {
    title: `${book.title} — ${siteIdentity.name}`,
    description: book.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const book = getBook((await params).slug);

  return (
    <>
      <Link className={styles.back} href="/product">
        <ArrowLeft size={18} aria-hidden="true" /> All books
      </Link>
      <article className={styles.product} aria-labelledby="book-title">
        <div className={styles.artwork} data-backdrop={book.backdrop}>
          <InteractiveBook title={book.title} bindingColor={book.bindingColor}>
            <BookCover artwork={book.artwork} />
          </InteractiveBook>
          <p className={ui.label}>SELECT THE COVER TO EXPLORE</p>
        </div>
        <div className={styles.details}>
          <p className={ui.label}>{book.label}</p>
          <h1 className={styles.title} id="book-title">
            {book.title}
          </h1>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <p>By {siteIdentity.name}</p>
          <p>{book.description}</p>
          <div className={styles.purchase}>
            {book.purchaseUrl ? (
              <a className={ui.pill} href={book.purchaseUrl}>
                Buy the Book
              </a>
            ) : (
              <>
                <button className={ui.pill} disabled aria-describedby="shop-status">
                  Buy the Book
                </button>
                <p className={ui.label} id="shop-status">
                  Purchase link to be added.
                </p>
              </>
            )}
          </div>
          <section className={styles.motifs} aria-labelledby="motifs-title">
            <h2 id="motifs-title">Within these pages</h2>
            <ul>
              {book.motifs.map((motif) => (
                <li key={motif}>{motif}</li>
              ))}
            </ul>
            {book.playlistUrl && (
              <a className={ui.pill} href={book.playlistUrl}>
                Spotify — {book.title}
              </a>
            )}
          </section>
        </div>
      </article>
    </>
  );
}

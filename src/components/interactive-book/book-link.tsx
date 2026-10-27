"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { BookSurface } from "./book-surface";
import styles from "./interactive-book.module.css";

export function BookLink({
  children,
  title,
  bindingColor,
  href,
}: {
  children: ReactNode;
  title: string;
  bindingColor: string;
  href: string;
}) {
  return (
    <Link
      className={`${styles.trigger} ${styles.link}`}
      href={href}
      aria-label={`Discover ${title}`}
    >
      <BookSurface title={title} bindingColor={bindingColor}>
        {children}
      </BookSurface>
    </Link>
  );
}

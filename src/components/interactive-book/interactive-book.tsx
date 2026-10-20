"use client";

import { useId, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";
import { BookSurface } from "./book-surface";
import { useBookPreview } from "./use-book-preview";
import styles from "./interactive-book.module.css";

type InteractiveBookProps = {
  /** Cover artwork must use phrasing content (for example, a span and an Image). */
  children: ReactNode;
  title: string;
  bindingColor?: string;
};

export function InteractiveBook({
  children,
  title,
  bindingColor = "#182b22",
}: InteractiveBookProps) {
  const { isOpen, triggerRef, dialogRef, previewRef, openPreview, closePreview } = useBookPreview();
  const titleId = useId();
  const dialogId = useId();

  return (
    <>
      <button
        ref={triggerRef}
        className={styles.trigger}
        type="button"
        aria-label={`Take a closer look at ${title}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={openPreview}
      >
        <BookSurface title={title} bindingColor={bindingColor}>
          {children}
        </BookSurface>
        <span className={styles.expand} aria-hidden="true">
          <Maximize2 size={16} />
        </span>
      </button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        className={styles.dialog}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePreview();
        }}
      >
        {isOpen && (
          <>
            <button
              className={styles.close}
              type="button"
              aria-label="Close cover preview"
              onClick={closePreview}
              autoFocus
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            <div className={styles.preview}>
              <div ref={previewRef} className={styles.previewCard}>
                <BookSurface title={title} bindingColor={bindingColor} reveal>
                  {children}
                </BookSurface>
              </div>
              <p id={titleId} className={styles.caption}>
                {title}
              </p>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}

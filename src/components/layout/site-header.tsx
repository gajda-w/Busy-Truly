import Link from "next/link";
import { siteIdentity, siteLinks } from "@/config/site";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>
      <header className={styles.header} data-reference="ncA3elSyZ">
        <Link className={styles.brand} href="/">
          {siteIdentity.wordmark}
        </Link>
        <nav className={styles.navigation} aria-label="Main navigation">
          <Link href="/product">Books</Link>
          <a href={siteLinks.substack}>Read on Substack</a>
        </nav>
      </header>
    </>
  );
}

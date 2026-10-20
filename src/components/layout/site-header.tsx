import { siteIdentity, siteLinks } from "@/config/site";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>
      <header className={styles.header} data-reference="ncA3elSyZ">
        <a className={styles.brand} href="#">
          {siteIdentity.wordmark}
        </a>
        <a className={styles.substack} href={siteLinks.substack}>
          Read on Substack
        </a>
      </header>
    </>
  );
}

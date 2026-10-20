import { siteIdentity, siteLinks } from "@/config/site";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-reference="zsmeWYjA_">
      <p>© 2026 {siteIdentity.name}</p>
      <a href={siteLinks.substack}>A little closer to the author. Substack</a>
    </footer>
  );
}

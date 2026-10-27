import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import styles from "./layout.module.css";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className={styles.main} id="main">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

import { AuthorSection } from "@/components/home/author-section";
import { BooksSection } from "@/components/home/books-section";
import { FinalSection } from "@/components/home/final-section";
import { FragmentsSection } from "@/components/home/fragments-section";
import { HeroSection } from "@/components/home/hero-section";
import { StoryThreadsSection } from "@/components/home/story-threads-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.main} id="main">
        <HeroSection />
        <BooksSection />
        <StoryThreadsSection />
        <AuthorSection />
        <FragmentsSection />
        <FinalSection />
      </main>
      <SiteFooter />
    </>
  );
}

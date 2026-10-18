import Image from "next/image";
import type { ReactNode } from "react";
import { Feather, Moon, Orbit, Quote, Sparkles, Star } from "lucide-react";

const substack = "https://ktwritz.substack.com";

function Instagram() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><path d="M17.5 6.5h.01" /></svg>;
}

const books = [
  {
    id: "skradzione-szepty",
    label: "01 — BEGIN THE STORY",
    title: "Skradzione Szepty",
    subtitle: "Tom I: Wezwana",
    description:
      "Every secret has a voice. Not every voice should be heard. Step into a world of hidden magic, dangerous discoveries, and connections that defy the boundaries between the known and the unknown.",
    motifs: [
      "Hidden magic and whispered secrets.",
      "Dangerous discoveries and the boundary between the known and the unknown.",
      "Extraordinary connections and choices with far-reaching consequences.",
    ],
  },
  {
    id: "krolowa-wiedzm",
    label: "02 — CONTINUE THE JOURNEY",
    title: "Królowa Wiedźm",
    subtitle: "The continuation of Skradzione Szepty",
    description:
      "Some destinies are inherited. Others must be fought for. The story continues in Królowa Wiedźm, where magic brings responsibility, alliances carry a price, and choices can change the fate of many.",
    motifs: [
      "Empathy, shared emotions, and bonds with magical creatures.",
      "Power, responsibility, and the consequences of extraordinary abilities.",
      "Kingdoms, alliances, loyalty, and trust.",
    ],
  },
];

function DistantStar({ className }: { className: string }) {
  return <Star className={`distant-star ${className}`} strokeWidth={1} aria-hidden="true" />;
}

function GoldFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`gold-frame ${className}`}>
      {children}
      <div className="frame-ornaments" aria-hidden="true">
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
          <svg key={corner} className={`frame-corner frame-corner-${corner}`} viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 42V12a7 7 0 0 1 7-7h30" />
            <path d="M7 32C-1 21 3 8 15 8c10 0 13 12 6 16-5 3-10-3-6-6M32 7C21-1 8 3 8 15c0 10 12 13 16 6 3-5-3-10-6-6" />
            <path d="M12 12c9 1 18 10 20 20-10-2-19-11-20-20ZM20 20l13 13" />
          </svg>
        ))}
        {["top", "bottom"].map((edge) => (
          <svg key={edge} className={`frame-crest frame-crest-${edge}`} viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m40 3 5 9-5 9-5-9 5-9ZM35 12c-7-9-15-9-19-3-3 5 4 8 6 4M45 12c7-9 15-9 19-3 3 5-4 8-6 4M4 12h12m48 0h12" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead" data-reference="ncA3elSyZ">
        <a className="brand" href="#">K.T. WRITZ</a>
        <a href={substack}>Read on Substack</a>
      </header>

      <main id="main">
        <section className="opening" aria-labelledby="opening-title" data-reference="xE3mBe93u">
          <Orbit className="opening-orbit" size={56} strokeWidth={1} aria-hidden="true" />
          <p className="label">THE WORLDS OF K.T. WRITZ</p>
          <h1 id="opening-title">Some worlds are not meant to be discovered. Others will never let you go.</h1>
          <p className="opening-description">
            Enter the worlds of K.T. Writz, where ancient magic awakens, kingdoms collide, and the most dangerous secrets are the ones we carry within ourselves.
          </p>
          <div className="opening-actions"><a className="pill" href="#books">Explore the Books</a></div>
          <Sparkles className="constellation constellation-left" size={36} strokeWidth={1} aria-hidden="true" />
          <Sparkles className="constellation constellation-right" size={48} strokeWidth={1} aria-hidden="true" />
          <div className="celestial-arc" aria-hidden="true" />
          <DistantStar className="opening-star-one" />
          <DistantStar className="opening-star-two" />
          <DistantStar className="opening-star-three" />
        </section>

        <section id="books" className="books-section" aria-labelledby="books-title" data-reference="jgsoTYEUV">
          <p className="label">01 / 02 — ONE CONTINUING NARRATIVE</p>
          <h2 id="books-title">Begin with a whisper. Follow it into the deep.</h2>
          <div className="books-grid">
            {books.map((book, index) => (
              <article className="book" key={book.id} aria-labelledby={`${book.id}-title`}>
                <p className="label">{book.label}</p>
                {index === 0 ? <Sparkles className="gold" size={26} strokeWidth={1} aria-hidden="true" /> : <Moon size={28} strokeWidth={1} aria-hidden="true" />}
                <GoldFrame>
                  <div className={`book-cover ${index === 1 ? "wrap-cover" : ""}`}>
                    {index === 0 ? (
                      <Image src="/images/skradzione-szepty.jpeg" alt="Authentic cover of Skradzione Szepty. Tom I: Wezwana" fill sizes="280px" loading="eager" className="cover-image" />
                    ) : (
                      <Image src="/images/krolowa-wiedzm-wrap.jpeg" alt="Original Królowa Wiedźm cover artwork, front panel" width={1029} height={508} sizes="1029px" loading="eager" className="wrap-image" />
                    )}
                  </div>
                </GoldFrame>
                <h2 id={`${book.id}-title`}>{book.title}</h2>
                <p>{book.subtitle}</p>
                <p>{book.description}</p>
                <button className="pill" disabled aria-describedby={`${book.id}-shop-status`}>Buy the Book</button>
                <p className="label book-status" id={`${book.id}-shop-status`}>Purchase link to be added.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="threads-section" aria-labelledby="threads-title" data-reference="BBpoP28CQ">
          <p className="label">THREADS THROUGH THE STORY</p>
          <h2 id="threads-title">The magic beneath the surface.</h2>
          <p className="threads-description">Mystery, emotional bonds, and the consequences of choice connect Skradzione Szepty with its continuation, Królowa Wiedźm.</p>
          <div className="threads-grid">
            {books.map((book) => (
              <article className="thread" key={book.id}>
                <h2>{book.title}</h2>
                <ul>{book.motifs.map((motif) => <li key={motif}>{motif}</li>)}</ul>
                <button className="pill pill-outline" disabled aria-describedby={`${book.id}-playlist-status`}>Spotify — {book.title}</button>
                <p className="label" id={`${book.id}-playlist-status`}>Playlist link to be added.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="author-section" aria-labelledby="author-title" data-reference="zKmj2KjGb">
          <GoldFrame className="author-frame">
            <div className="author-portrait"><Image src="/images/kt-writz.jpeg" alt="K.T. Writz reading Skradzione Szepty outdoors" fill sizes="280px" loading="eager" /></div>
          </GoldFrame>
          <div className="author-invitation">
            <Feather className="gold" size={28} strokeWidth={1} aria-hidden="true" />
            <p className="label">NOTES FROM BEHIND THE PAGES</p>
            <h2 id="author-title">A little closer to the author.</h2>
            <p>Join me on Substack for personal essays, writing notes, creative discoveries, and thoughts from behind the pages. A quieter space for readers who want to follow the person behind the stories.</p>
            <a className="pill" href={substack}>Read on Substack</a>
            <button className="pill instagram-pill" disabled><Instagram />Instagram — profile link coming soon</button>
          </div>
          <DistantStar className="author-star-one" />
          <DistantStar className="author-star-two" />
        </section>

        <section className="fragments-section" aria-labelledby="fragments-title" data-reference="c4voA_zhO">
          <Quote className="gold" size={36} strokeWidth={1} aria-hidden="true" />
          <p className="label">LITERARY FRAGMENTS</p>
          <h2 id="fragments-title">Words that linger long after the last page.</h2>
          <p>An author-approved excerpt will appear here.</p>
          <p className="label">Skradzione Szepty / Królowa Wiedźm</p>
          <DistantStar className="fragments-star-one" />
          <DistantStar className="fragments-star-two" />
          <DistantStar className="fragments-star-three" />
        </section>

        <section className="final-section" aria-labelledby="final-title" data-reference="TBX_HDutQ">
          <p className="label">03 — THE FINAL PART</p>
          <h2 id="final-title">The story has one more chapter.</h2>
          <p className="final-description">The third and final part of the story that began with Skradzione Szepty and continued in Królowa Wiedźm is in preparation.</p>
          <a className="pill" href={substack}>Follow updates on Substack</a>
        </section>
      </main>

      <footer className="footer" data-reference="zsmeWYjA_">
        <p>© 2026 K.T. Writz</p>
        <a href={substack}>A little closer to the author. Substack</a>
      </footer>
    </>
  );
}

# Busy Truly — K.T. Writz

Strona autorki odtworzona z projektu Framera w Next.js App Router, React i TypeScript.
Treści, grafiki i fonty są lokalne. Strona jest generowana statycznie; JavaScript
obsługuje interaktywne książki i ich podglądy.

## Uruchomienie

Wymagany Node.js 24 (`.nvmrc`) i npm. Repozytorium używa jednego pliku
`package-lock.json`; zależności instalujemy bez zmiany zapisanych wersji:

```sh
nvm use
npm ci
npm run dev
```

Strona działa pod adresem <http://localhost:3000>.

```sh
npm run build
npm start
```

## Komendy

| Komenda                   | Zastosowanie                                                     |
| ------------------------- | ---------------------------------------------------------------- |
| `npm run check`           | Lint bez ostrzeżeń, formatowanie i sprawdzenie typów             |
| `npm run format`          | Formatowanie kodu i dokumentacji przez Prettier                  |
| `npm run lint:fix`        | Automatyczne poprawki ESLinta                                    |
| `npm run typecheck`       | Wygenerowanie typów Next.js i sprawdzenie TypeScript             |
| `npm run build`           | Produkcyjny build strony                                         |
| `npm run test:e2e`        | Testy zachowania, dostępności i wyglądu na produkcyjnym buildzie |
| `npm run test:e2e:update` | Proponowane nowe zrzuty po świadomej zmianie wyglądu             |

Przed pierwszym uruchomieniem testów wykonaj `npx playwright install chromium firefox webkit`.
Opis scenariuszy, platformy zrzutów i przeglądania wyników: [tests/README.md](tests/README.md).
CI uruchamia sprawdzenia i testy zachowania na Linuxie, a porównania zrzutów na macOS.

## Gdzie wprowadzać zmiany

| Miejsce                            | Odpowiedzialność                                                        |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `src/app/`                         | Kompozycja strony, metadata, lokalne fonty, globalny reset i typografia |
| `src/content/books.ts`             | Treść książek, grafiki, kadrowanie, oprawa i opcjonalne linki           |
| `src/config/site.ts`               | Tożsamość autorki i wspólne odnośniki                                   |
| `src/components/home/`             | Serwerowe sekcje strony i karty książek                                 |
| `src/components/layout/`           | Nagłówek i stopka                                                       |
| `src/components/ui/`               | Wspólne ornamenty i style wizualne                                      |
| `src/components/interactive-book/` | Geometria 3D, ruch i cykl życia podglądu                                |
| `tests/`                           | Testy przeglądarkowe i aktualne punkty odniesienia wyglądu              |
| `reference/`                       | Historyczne materiały migracji z Framera                                |

Zmiana kolejności książek nie zmienia przypisanych do nich grafik ani kolorów.
Aby dodać książkę, uzupełnij rekord zgodny z typem `Book` oraz lokalną grafikę.
Wariant `front` przedstawia samą przednią okładkę. Wariant `wrap` opisuje pełną
rozkładówkę; `frontPanel` wybiera jej przedni panel we współrzędnych oryginalnej grafiki.
`purchaseUrl` i `playlistUrl` uruchamiają odpowiednie odnośniki; bez nich strona pokazuje
nieaktywne przyciski z informacją o brakującym linku.

Komponenty pozostają serwerowe poza granicą `InteractiveBook`. Style sekcji mieszkają
w CSS Modules obok komponentów. Wspólne kolory i fonty są zmiennymi CSS; szczegółowe
wymiary ornamentów i geometrii pozostają lokalne. Reguły dla ludzi i agentów oraz
wymagane sprawdzenia opisuje [AGENTS.md](AGENTS.md).

Zależności bezpośrednie mają przypięte wersje. Aktualizując Next.js, aktualizuj też
`eslint-config-next`; typy Node powinny odpowiadać Node 24. TypeScript 6 jest świadomym
wyborem: parser używany przez obecną konfigurację ESLinta nie obsługuje API TypeScript 7.
`next-env.d.ts` i `.next/` generuje Next.js i nie są śledzone w Git.

Stan narzędzi z 20.10.2026: Next.js wspiera ESLint 10, ale część jego pluginów nadal
deklaruje starszy zakres peer dependencies, więc npm wypisuje ostrzeżenia przy instalacji.
Pełny `npm audit` zgłasza także podatność `braces` w zależnościach developerskich ESLinta,
bez dostępnej zgodnej poprawki. `npm audit --omit=dev` nie zgłasza podatności.
Nie stosuj automatycznie `npm audit fix --force`: proponowany downgrade konfiguracji
do Next.js 14 nie pasuje do tego projektu.

## Interaktywne książki

Każda książka jest bryłą 3D z okładkami, grzbietem i blokiem kartek. Ruch wskaźnika
przechyla książkę; kliknięcie, Enter, Spacja lub dotknięcie otwiera natywny dialog.
Otwarcie łączy przelot ze sprężystym obrotem 360°. Zamknięcie animuje powrót, również
gdy otwieranie jeszcze trwa. Esc, przycisk zamknięcia i kliknięcie tła zamykają podgląd,
przywracają fokus i poprzednie ustawienie przewijania strony.

`prefers-reduced-motion` pomija ruch, zachowując statyczną bryłę. Włączenie tej
preferencji w trakcie animacji zatrzymuje również przelot. Dotyk nie blokuje pionowego
przewijania ani powiększania gestem. Tył książki jest dekoracyjnym rewersem.

Inspiracja pierwotnej interakcji: [Pokémon Cards CSS Holographic Effect — Simon Goellner](https://poke-holo.simey.me/).
Obecna implementacja nie zawiera holograficznego połysku, zewnętrznych tekstur
ani biblioteki animacji.

## Źródło projektu i historyczne pomiary

Źródło: [projekt Busy Truly we Framerze](https://framer.com/projects/Busy-Truly--Ol8ito2ZoDC51AVlzs2a).
Nie modyfikujemy oryginału. Eksporty struktury, stylów i wzorcowy zrzut 1200 px
z 18.10.2026 znajdują się w `reference/`. Atrybuty `data-reference` wskazują warstwy źródła.
Framer zawierał tylko wariant Desktop 1200 px; responsywność poniżej 1000 px dodano w CSS.

Pierwotne porównanie pełnych zrzutów wykazało 96,81% SSIM w skali szarości, okno 7×7.
Nie skalowano ani nie przesuwano obrazów; różnicę wysokości 1 px uzupełniono tłem.
Wysokość źródła wynosiła 5146 px, implementacji 5145 px. To historyczny pomiar
podobieństwa obrazu, nie wynik aktualnych testów ani gwarancja zgodności zachowania.
Obecne porównania wizualne korzystają z oddzielnych zrzutów w `tests/`.

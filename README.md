# Busy Truly — K.T. Writz

Samodzielne odtworzenie projektu Framera w Next.js App Router i TypeScript.

## Uruchomienie

Wymagany Node.js 24 lub nowszy (plik `.nvmrc`).

```sh
nvm use
npm install
npm run dev
```

Otwórz http://localhost:3000.

```sh
npm run build
npm start
```

## Źródło i wierność

Projekt: https://framer.com/projects/Busy-Truly--Ol8ito2ZoDC51AVlzs2a

Oryginalne fonty, kolory, gradienty, treści, okładki, kadrowanie, ikony Lucide, odstępy i układ zostały przeniesione do kodu. Grafiki i fonty są lokalne; strona nie wymaga połączenia z Framerem. Oryginał zawiera tylko breakpoint Desktop 1200 px. Responsywność poniżej 1000 px została dodana w CSS.

`reference/` zawiera odczyt struktury i stylów Framera oraz zrzut wzorcowy 1200 px z 18.10.2026. Atrybuty `data-reference` w sekcjach wskazują odpowiadające im warstwy.

Przyciski zakupu, Spotify i Instagrama nie miały linków w źródle. Zachowano ich wygląd i komunikaty, oznaczając je jako nieaktywne. Odnośniki do Substack i przewijanie do książek działają.

## Dalsza praca z Codexem

Otwórz ten folder w VS Code. Integracja `framer` jest zainstalowana lokalnie. Do odczytu oryginału użyj powyższego linku i skilla `framer`; nie modyfikuj projektu źródłowego.

## Interaktywne okładki

Obie książki są bryłami 3D z przednią i tylną okładką, grzbietem z tytułem oraz blokiem kartek widocznym z prawej strony, u góry i na dole. Złote ramki wokół książek zostały usunięte; ramka portretu autorki pozostała. Kolor oprawy jest dopasowany do danej książki (`bindingColor`), a grubość ustawia zmienna CSS `--book-depth`. Tył pozostaje dekoracyjnym rewersem, który można później zastąpić właściwą grafiką.

Książki reagują na pozycję kursora, przechylając się w 3D. Grafiki są wyświetlane bez holograficznego połysku, faktury ani refleksów. Kliknięcie (lub Enter/Spacja po ustawieniu fokusu) otwiera powiększony podgląd na przyciemnionym tle. Esc, przycisk zamknięcia lub kliknięcie tła zamykają podgląd i przywracają fokus do okładki. Na ekranach dotykowych dotknięcie otwiera podgląd; przewijanie pionowe i powiększanie gestem pozostają dostępne. Ustawienie `prefers-reduced-motion` wyłącza ruch, zachowując statyczny widok książki pod kątem.

Implementacja: `src/app/holographic-book.tsx` i `src/app/holographic-book.module.css`. Wizualna inspiracja: [Pokémon Cards CSS Holographic Effect — Simon Goellner](https://poke-holo.simey.me/). Własna implementacja w React i CSS, bez dodatkowych zależności i pobierania zewnętrznych tekstur.

Każde otwarcie okładki wykonuje pełny obrót 360° z wygaszaną sprężyną, wraz z powiększeniem i przelotem z miejsca okładki na środek ekranu. Zamknięcie animuje powrót na miejsce; szybkie zamknięcie w trakcie przelotu płynnie odwraca ruch. Podczas obrotu widać dekoracyjny rewers z nazwiskiem autorki i tytułem książki. Ograniczenie animacji w systemie pomija także obrót i przeloty.

## Weryfikacja wersji bazowej

Porównanie pełnych zrzutów przy szerokości 1200 px: **96,81% SSIM** w skali szarości, okno 7×7. Nie skalowano ani nie przesuwano obrazów; różnicę wysokości 1 px uzupełniono kolorem tła. Wysokość źródła: 5146 px, implementacji: 5145 px. To miara podobieństwa obrazu desktop, a nie gwarancja identycznego zachowania na każdym urządzeniu. Zrzuty i surowe wyniki są w `reference/`.

Sprawdzono ładowanie wszystkich 3 grafik, odnośniki do Substack, kotwicę książek oraz brak poziomego przepełnienia przy 390 i 768 px. Mobilny układ jest adaptacją; we Framerze nie było osobnego wariantu mobilnego.

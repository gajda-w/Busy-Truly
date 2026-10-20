import { useLayoutEffect, useRef, useState } from "react";

type PreviewPhase = "closed" | "opening" | "open" | "closing";
type Bounds = Pick<DOMRectReadOnly, "left" | "top" | "width" | "height">;

const OPEN_FLIGHT: KeyframeAnimationOptions = {
  duration: 900,
  easing: "cubic-bezier(.22, 1, .36, 1)",
};
const CLOSE_FLIGHT: KeyframeAnimationOptions = {
  duration: 420,
  easing: "cubic-bezier(.4, 0, .2, 1)",
  fill: "both",
};

function cancelFlight(animation: Animation | null) {
  if (!animation) return;
  animation.onfinish = null;
  animation.cancel();
}

/** Maps a centered preview onto a cover's viewport bounds. */
function flightTransform(cover: Bounds, preview: Bounds) {
  const x = cover.left + cover.width / 2 - preview.left - preview.width / 2;
  const y = cover.top + cover.height / 2 - preview.top - preview.height / 2;
  return `translate3d(${x}px, ${y}px, 0) scale(${cover.width / preview.width}, ${cover.height / preview.height})`;
}

/** Owns the native modal, reversible flight, focus return and scroll lock. */
export function useBookPreview() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const origin = useRef<DOMRect | null>(null);
  const flight = useRef<Animation | null>(null);
  const phase = useRef<PreviewPhase>("closed");
  const [isOpen, setIsOpen] = useState(false);

  function openPreview() {
    if (phase.current !== "closed" || !triggerRef.current) return;
    origin.current = triggerRef.current.getBoundingClientRect();
    phase.current = "opening";
    setIsOpen(true);
  }

  function closePreview() {
    if (phase.current === "closed" || phase.current === "closing") return;
    phase.current = "closing";
    const card = previewRef.current;
    const trigger = triggerRef.current;
    const modal = dialogRef.current;
    if (
      !card ||
      !trigger ||
      !modal ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsOpen(false);
      return;
    }

    // Read the in-flight transform before cancelling; measure the base bounds after.
    // This lets Escape reverse an unfinished opening without a visible jump.
    const from = getComputedStyle(card).transform;
    cancelFlight(flight.current);
    const destination = trigger.getBoundingClientRect();
    const bounds = card.getBoundingClientRect();
    flight.current = card.animate(
      [{ transform: from }, { transform: flightTransform(destination, bounds) }],
      CLOSE_FLIGHT,
    );
    modal.dataset.closing = "true";
    flight.current.onfinish = () => setIsOpen(false);
  }

  useLayoutEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    const modal = dialogRef.current;
    const card = previewRef.current;
    if (!modal || !card) return;

    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.body.style.overflow = "hidden";
    modal.showModal();
    delete modal.dataset.closing;

    if (origin.current && !reducedMotion.matches) {
      phase.current = "opening";
      flight.current = card.animate(
        [
          { transform: flightTransform(origin.current, card.getBoundingClientRect()) },
          { transform: "translate3d(0, 0, 0) scale(1)" },
        ],
        OPEN_FLIGHT,
      );
      flight.current.onfinish = () => {
        phase.current = "open";
        flight.current = null;
      };
    } else {
      phase.current = "open";
    }

    function changeMotion() {
      if (!reducedMotion.matches) return;
      cancelFlight(flight.current);
      flight.current = null;
      if (phase.current === "closing") {
        setIsOpen(false);
      } else {
        phase.current = "open";
      }
    }

    reducedMotion.addEventListener("change", changeMotion);
    return () => {
      reducedMotion.removeEventListener("change", changeMotion);
      cancelFlight(flight.current);
      flight.current = null;
      phase.current = "closed";
      modal.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return { isOpen, triggerRef, dialogRef, previewRef, openPreview, closePreview };
}

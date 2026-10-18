"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";
import styles from "./holographic-book.module.css";

function HoloSurface({ children, title, reveal = false }: { children: ReactNode; title: string; reveal?: boolean }) {
  const scene = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const area = scene.current!;
    const card = surface.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // A separate rotation channel lets the opening turn and pointer tilt coexist.
    let current = [50, 50, 0, reveal && !motion.matches ? -360 : 0];
    let target = [50, 50, 0, 0];
    let spinVelocity = 0;
    let frame = 0;
    let previous = 0;

    function paint() {
      const [pointerX, pointerY, pointerActivity, spin] = current;
      const angle = spin * Math.PI / 180;
      const x = pointerX + Math.sin(angle) * 35;
      const y = pointerY + Math.sin(angle * 2) * 20;
      const activity = Math.max(pointerActivity, Math.min(1, Math.abs(spin) / 20));
      card.style.setProperty("--rotate-x", `${(50 - y) / 3.5}deg`);
      card.style.setProperty("--rotate-y", `${(x - 50) / 3}deg`);
      card.style.setProperty("--spin", `${spin}deg`);
      card.style.setProperty("--lift", `${activity * -5}px`);
      card.style.setProperty("--scale", `${1 + activity * 0.025}`);
    }

    function animate(time: number) {
      const elapsed = previous ? Math.min(time - previous, 64) : 16;
      previous = time;
      const blend = 1 - Math.exp(-elapsed / (target[2] ? 65 : 110));
      // Integrate the opening spring in small steps, including on slower displays.
      const steps = Math.ceil(elapsed / 8);
      const step = elapsed / steps / (1000 / 60);
      for (let i = 0; i < steps; i++) {
        spinVelocity += -current[3] * 0.033 * step;
        spinVelocity *= Math.pow(0.55, step);
        current[3] += spinVelocity * step;
      }
      current = current.map((value, index) => index === 3 ? value : value + (target[index] - value) * blend);
      const settled = Math.abs(spinVelocity) < 0.005 && current.every((value, index) => Math.abs(value - target[index]) < 0.005);
      if (settled) current = [...target];
      paint();
      frame = settled ? 0 : requestAnimationFrame(animate);
      if (settled) previous = 0;
    }

    function start() {
      if (!frame) frame = requestAnimationFrame(animate);
    }

    function move(event: PointerEvent) {
      if (motion.matches || !event.isPrimary) return;
      // Measure the stationary scene so rotation never feeds back into pointer coordinates.
      const bounds = area.getBoundingClientRect();
      target = [
        Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100)),
        Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100)),
        1,
        0,
      ];
      start();
    }

    function reset() {
      target = [50, 50, 0, 0];
      start();
    }

    function release(event: PointerEvent) {
      if (event.pointerType !== "mouse") reset();
    }

    function changeMotion() {
      if (motion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
        spinVelocity = 0;
        current = target = [50, 50, 0, 0];
        paint();
      }
    }

    area.addEventListener("pointerenter", move);
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", reset);
    area.addEventListener("pointercancel", reset);
    area.addEventListener("pointerup", release);
    window.addEventListener("blur", reset);
    motion.addEventListener("change", changeMotion);
    if (reveal && !motion.matches) {
      paint();
      start();
    }
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointerenter", move);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", reset);
      area.removeEventListener("pointercancel", reset);
      area.removeEventListener("pointerup", release);
      window.removeEventListener("blur", reset);
      motion.removeEventListener("change", changeMotion);
    };
  }, [reveal]);

  return (
    <div ref={scene} className={styles.scene}>
      <div ref={surface} className={styles.rotator}>
        <div className={styles.surface}>
          {children}
        </div>
        <div className={styles.back} aria-hidden="true">
          <span className={styles.backOrnament}>✦</span>
          <span className={styles.backAuthor}>K.T. WRITZ</span>
          <span className={styles.backTitle}>{title}</span>
          <span className={styles.backOrnament}>✦</span>
        </div>
      </div>
    </div>
  );
}

export function HolographicBook({ children, title }: { children: ReactNode; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const origin = useRef<DOMRect | null>(null);
  const flight = useRef<Animation | null>(null);
  const closing = useRef(false);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogId = useId();

  function openPreview() {
    origin.current = trigger.current!.getBoundingClientRect();
    setOpen(true);
  }

  function closePreview() {
    if (closing.current) return;
    const card = preview.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false);
      return;
    }
    closing.current = true;
    // Freeze an unfinished flight before reversing it, so a quick Esc never jumps.
    const from = getComputedStyle(card).transform;
    flight.current?.cancel();
    const destination = trigger.current!.getBoundingClientRect();
    const bounds = card.getBoundingClientRect();
    flight.current = card.animate([
      { transform: from },
      { transform: flightTransform(destination, bounds) },
    ], { duration: 420, easing: "cubic-bezier(.4, 0, .2, 1)", fill: "both" });
    dialog.current!.dataset.closing = "true";
    flight.current.onfinish = () => setOpen(false);
  }

  useLayoutEffect(() => {
    if (!open) return;
    const modal = dialog.current!;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.showModal();
    closing.current = false;
    delete modal.dataset.closing;
    const card = preview.current!;
    if (origin.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flight.current = card.animate([
        { transform: flightTransform(origin.current, card.getBoundingClientRect()) },
        { transform: "translate3d(0, 0, 0) scale(1)" },
      ], { duration: 900, easing: "cubic-bezier(.22, 1, .36, 1)" });
    }
    return () => {
      flight.current?.cancel();
      flight.current = null;
      modal.close();
      document.body.style.overflow = overflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <div
        ref={trigger}
        className={styles.trigger}
        role="button"
        tabIndex={0}
        aria-label={`Take a closer look at ${title}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={openPreview}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPreview();
          }
        }}
      >
        <HoloSurface title={title}>{children}</HoloSurface>
        <span className={styles.expand} aria-hidden="true"><Maximize2 size={16} /></span>
      </div>
      <dialog
        ref={dialog}
        id={dialogId}
        className={styles.dialog}
        aria-labelledby={titleId}
        onCancel={(event) => { event.preventDefault(); closePreview(); }}
        onClick={(event) => { if (event.target === event.currentTarget) closePreview(); }}
      >
        {open && (
          <>
            <button className={styles.close} type="button" aria-label="Close cover preview" onClick={closePreview} autoFocus>
              <X size={24} strokeWidth={1.5} />
            </button>
            <div className={styles.preview}>
              <div ref={preview} className={styles.previewCard}>
                <HoloSurface title={title} reveal>{children}</HoloSurface>
              </div>
              <p id={titleId} className={styles.caption}>{title}</p>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}

function flightTransform(from: DOMRect, to: DOMRect) {
  const x = from.left + from.width / 2 - to.left - to.width / 2;
  const y = from.top + from.height / 2 - to.top - to.height / 2;
  return `translate3d(${x}px, ${y}px, 0) scale(${from.width / to.width}, ${from.height / to.height})`;
}

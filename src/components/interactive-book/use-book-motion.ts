import { useLayoutEffect, useRef } from "react";

type PointerPosition = {
  x: number;
  y: number;
  activity: number;
};

const RESTING_POINTER: PointerPosition = { x: 50, y: 50, activity: 0 };
const OPENING_TURN = -360;
const SETTLED_THRESHOLD = 0.005;
const SPRING = {
  stiffness: 0.033,
  damping: 0.55,
  maximumStepMs: 8,
  maximumFrameMs: 64,
  referenceFrameMs: 1000 / 60,
};

/** Keeps pointer tilt and the opening turn in independent motion channels. */
export function useBookMotion(reveal: boolean) {
  const sceneRef = useRef<HTMLSpanElement>(null);
  const surfaceRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const surface = surfaceRef.current;
    if (!scene || !surface) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointer = { ...RESTING_POINTER };
    let target = { ...RESTING_POINTER };
    let spin = reveal && !reducedMotion.matches ? OPENING_TURN : 0;
    let spinVelocity = 0;
    let frame = 0;
    let previousTime = 0;

    function paint() {
      const angle = (spin * Math.PI) / 180;
      const x = pointer.x + Math.sin(angle) * 35;
      const y = pointer.y + Math.sin(angle * 2) * 20;
      const activity = Math.max(pointer.activity, Math.min(1, Math.abs(spin) / 20));
      surface!.style.setProperty("--rotate-x", `${(50 - y) / 4}deg`);
      surface!.style.setProperty("--rotate-y", `${(x - 50) / 1.4}deg`);
      surface!.style.setProperty("--spin", `${spin}deg`);
      surface!.style.setProperty("--lift", `${activity * -5}px`);
      surface!.style.setProperty("--scale", `${1 + activity * 0.025}`);
    }

    function animate(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, SPRING.maximumFrameMs) : 16;
      previousTime = time;
      const blend = 1 - Math.exp(-elapsed / (target.activity ? 65 : 110));

      // Small integration steps preserve the spring on slower displays.
      const steps = Math.ceil(elapsed / SPRING.maximumStepMs);
      const step = elapsed / steps / SPRING.referenceFrameMs;
      for (let index = 0; index < steps; index++) {
        spinVelocity += -spin * SPRING.stiffness * step;
        spinVelocity *= Math.pow(SPRING.damping, step);
        spin += spinVelocity * step;
      }
      pointer.x += (target.x - pointer.x) * blend;
      pointer.y += (target.y - pointer.y) * blend;
      pointer.activity += (target.activity - pointer.activity) * blend;

      const settled =
        Math.abs(spinVelocity) < SETTLED_THRESHOLD &&
        Math.abs(spin) < SETTLED_THRESHOLD &&
        Math.abs(pointer.x - target.x) < SETTLED_THRESHOLD &&
        Math.abs(pointer.y - target.y) < SETTLED_THRESHOLD &&
        Math.abs(pointer.activity - target.activity) < SETTLED_THRESHOLD;
      if (settled) {
        pointer = { ...target };
        spin = 0;
      }
      paint();
      frame = settled ? 0 : requestAnimationFrame(animate);
      if (settled) previousTime = 0;
    }

    function start() {
      if (!frame) frame = requestAnimationFrame(animate);
    }

    function move(event: PointerEvent) {
      if (reducedMotion.matches || !event.isPrimary) return;
      // Measure the stationary scene; measuring its rotating child causes feedback.
      const bounds = scene!.getBoundingClientRect();
      target = {
        x: Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)),
        y: Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)),
        activity: 1,
      };
      start();
    }

    function reset() {
      if (reducedMotion.matches) return;
      target = { ...RESTING_POINTER };
      start();
    }

    function release(event: PointerEvent) {
      if (event.pointerType !== "mouse") reset();
    }

    function changeMotion() {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      spin = 0;
      spinVelocity = 0;
      pointer = { ...RESTING_POINTER };
      target = { ...RESTING_POINTER };
      paint();
    }

    scene.addEventListener("pointerenter", move);
    scene.addEventListener("pointermove", move);
    scene.addEventListener("pointerleave", reset);
    scene.addEventListener("pointercancel", reset);
    scene.addEventListener("pointerup", release);
    window.addEventListener("blur", reset);
    reducedMotion.addEventListener("change", changeMotion);
    if (reveal && !reducedMotion.matches) {
      paint();
      start();
    }

    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("pointerenter", move);
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", reset);
      scene.removeEventListener("pointercancel", reset);
      scene.removeEventListener("pointerup", release);
      window.removeEventListener("blur", reset);
      reducedMotion.removeEventListener("change", changeMotion);
    };
  }, [reveal]);

  return { sceneRef, surfaceRef };
}

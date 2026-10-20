import { Star } from "lucide-react";
import styles from "./distant-star.module.css";

export function DistantStar({ className = "" }: { className?: string }) {
  return <Star className={`${styles.star} ${className}`} strokeWidth={1} aria-hidden="true" />;
}

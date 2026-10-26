import { APP_NAME } from "@/lib/brand";
import { LogoMark } from "./LogoMark";

/** Wordmark Respiro in blu + piccola ondina sotto il testo. */
export function Logo({ size = 32, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {showText && (
        <span className="relative inline-flex flex-col leading-none">
          <span className="font-display text-base font-semibold tracking-tight text-accent-700 sm:text-[1.05rem]">
            {APP_NAME}
          </span>
          <svg
            width="52"
            height="6"
            viewBox="0 0 52 6"
            fill="none"
            aria-hidden
            className="mt-0.5 text-sky-400"
          >
            <path
              d="M1 3.2 C8 0.6, 12 5.4, 18 3.2 C24 1, 28 5.2, 34 3.2 C40 1.2, 44 5, 51 2.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
      )}
    </span>
  );
}

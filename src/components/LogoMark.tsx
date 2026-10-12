/** Marchio Respiro: cerchio blu con piccola ondina. */
export function LogoMark({
  size = 32,
  className = "shrink-0",
}: {
  size?: number;
  className?: string;
}) {
  const gid = "respiroMarkGrad";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={gid} x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="0.55" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill={`url(#${gid})`} />
      {/* Ondina centrale */}
      <path
        d="M8 16.5 C11 12.5, 13 20.5, 16 16.5 C19 12.5, 21 20.5, 24 16.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

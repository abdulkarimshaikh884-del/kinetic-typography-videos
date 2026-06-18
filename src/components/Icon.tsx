import React from "react";

type IconProps = { size?: number; color?: string; stroke?: number };

// A small library of crisp line icons used on the tool cards.
const paths: Record<string, React.ReactNode> = {
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  rocket: (
    <>
      <path d="M12 2c3 2 5 6 5 10l-5 4-5-4c0-4 2-8 5-10z" />
      <circle cx="12" cy="9" r="2" />
      <path d="M7 16c-2 1-3 4-3 6 2 0 5-1 6-3M17 16c2 1 3 4 3 6-2 0-5-1-6-3" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.6" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3z" />
    </>
  ),
  audio: (
    <>
      <path d="M3 12h2l2-6 3 14 3-18 3 12 2-2h3" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.5 15.5M14.5 12.5 20 20M8.5 8.5 12 12" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9z" />
      <path d="M10.5 21a2 2 0 0 0 3 0" />
    </>
  ),
  play: <path d="M7 4v16l13-8z" />,
  spark: (
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
  ),
};

export const Icon: React.FC<IconProps & { name: string }> = ({
  name,
  size = 80,
  color = "#fff",
  stroke = 1.8,
}) => {
  const filled = name === "bolt" || name === "play" || name === "spark";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
};

interface LogoProps {
  size?: number;
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="XGames Logo"
    >
      {/* Fundo Preto Fosco com Borda Seca */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="7"
        fill="#09090b"
        stroke="#222226"
        strokeWidth="1.5"
      />

      {/* Cantoneiras HUD em Verde Neon */}
      <path
        d="M6 10V6H10"
        stroke="#00e676"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M34 30V34H30"
        stroke="#00e676"
        strokeWidth="1.5"
        strokeLinecap="square"
      />

      {/* Lâmina Principal em Branco Puro */}
      <path
        d="M10.5 10H15.8L29.5 30H24.2L10.5 10Z"
        fill="#fafafa"
      />

      {/* Lâmina Cruzada em Verde Neon Sólido (Corte Técnico) */}
      <path
        d="M29.5 10H24.5L20.5 15.8L23.1 19.6L29.5 10Z"
        fill="#00e676"
      />
      <path
        d="M10.5 30H15.5L19.5 24.2L16.9 20.4L10.5 30Z"
        fill="#00e676"
      />
    </svg>
  );
}

export function ModulexLogo({ width = 140 }: { width?: number }) {
  // Maintain aspect ratio: viewBox is 420 x 72
  const height = Math.round((width / 420) * 72)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 72"
      width={width}
      height={height}
      aria-label="Modulex"
      role="img"
      style={{ display: 'block' }}
    >
      {/*
        Wordmark: "module" in dark navy + "x" in Modulex orange #F47920
        Typeface approximated as a geometric humanist sans (similar to Futura / Nunito)
        using SVG text with system fallbacks — crisp at all sizes.
      */}
      <text
        x="0"
        y="56"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="62"
        fontWeight="300"
        letterSpacing="-1"
        fill="#1a1a2e"
      >
        module
      </text>
      <text
        x="313"
        y="56"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="62"
        fontWeight="300"
        letterSpacing="-1"
        fill="#F47920"
      >
        x
      </text>
    </svg>
  )
}

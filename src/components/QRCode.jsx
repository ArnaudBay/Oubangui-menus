export default function QRCode({ size = 180, url = 'oubanguihotel.com/menu' }) {
  const M = 33
  const cell = size / M

  const isDark = (r, c) => {
    const inFinder = (r < 7 && c < 7) || (r < 7 && c >= M - 7) || (r >= M - 7 && c < 7)
    const onBorder =
      ((r === 0 || r === 6) && c < 7) || ((c === 0 || c === 6) && r < 7) ||
      ((r === 0 || r === 6) && c >= M - 7 && c < M) || ((c === M - 7 || c === M - 1) && r < 7) ||
      ((r === M - 7 || r === M - 1) && c < 7) || ((c === 0 || c === 6) && r >= M - 7)
    const inFill =
      (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
      (r >= 2 && r <= 4 && c >= M - 5 && c <= M - 3) ||
      (r >= M - 5 && r <= M - 3 && c >= 2 && c <= 4)
    const timing =
      (r === 6 && c >= 8 && c <= M - 9 && c % 2 === 0) ||
      (c === 6 && r >= 8 && r <= M - 9 && r % 2 === 0)
    const data = !inFinder && !timing
      ? ((r * 13 + c * 7 + (r ^ c) * 5 + (r * c) % 3) % 7 < 3)
      : false
    return onBorder || inFill || timing || data
  }

  const cells = []
  for (let r = 0; r < M; r++)
    for (let c = 0; c < M; c++)
      if (isDark(r, c)) cells.push([r, c])

  const cx = size / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`QR Code vers ${url}`}
    >
      <rect width={size} height={size} fill="white" rx="8" />
      {cells.map(([r, c]) => (
        <rect
          key={`${r}-${c}`}
          x={c * cell + 0.5}
          y={r * cell + 0.5}
          width={cell - 1}
          height={cell - 1}
          rx="1.5"
          fill="#1e3a8a"
        />
      ))}
      {/* Logo overlay */}
      <rect x={cx - 18} y={cx - 18} width={36} height={36} rx={8} fill="#1e3a8a" />
      <text
        x={cx}
        y={cx + 8}
        textAnchor="middle"
        fill="white"
        fontSize={20}
        fontWeight="bold"
        fontFamily="Georgia, serif"
      >
        O
      </text>
    </svg>
  )
}

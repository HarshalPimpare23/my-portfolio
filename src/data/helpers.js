export function createArtwork({
  title,
  subtitle,
  start = "#8b5cf6",
  end = "#22d3ee",
  glow = "#ffffff",
}) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
        <radialGradient id="shine" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${glow}" stop-opacity="0.7" />
          <stop offset="100%" stop-color="${glow}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" rx="48" fill="#0f0f0f" />
      <rect x="42" y="42" width="1116" height="716" rx="40" fill="url(#bg)" opacity="0.17" />
      <circle cx="940" cy="210" r="190" fill="url(#shine)" opacity="0.55" />
      <circle cx="260" cy="620" r="220" fill="url(#shine)" opacity="0.25" />
      <rect x="110" y="120" width="320" height="20" rx="10" fill="rgba(255,255,255,0.22)" />
      <rect x="110" y="160" width="250" height="18" rx="9" fill="rgba(255,255,255,0.14)" />
      <rect x="110" y="610" width="450" height="20" rx="10" fill="rgba(255,255,255,0.16)" />
      <rect x="110" y="646" width="280" height="18" rx="9" fill="rgba(255,255,255,0.1)" />
      <text x="110" y="350" fill="#ffffff" font-family="Space Grotesk, Arial, sans-serif" font-size="72" font-weight="700">${title}</text>
      <text x="110" y="420" fill="rgba(255,255,255,0.82)" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="500">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

import { useState } from "react";

export default function Icon({ name, className = "", alt = "" }) {
  const [imgError, setImgError] = useState(false);
  if (!name) return null;

  const src = `/icon/${name}.svg`;

  if (!imgError) {
    return (
      <img
        src={src}
        alt={alt || name}
        onError={() => setImgError(true)}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden>
      {name}
    </span>
  );
}

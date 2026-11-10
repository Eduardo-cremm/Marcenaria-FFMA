import Image from "next/image";

// Mostra a foto real quando existir; até lá, um bloco em tom de madeira com etiqueta.
export function Photo({
  tone = "a",
  label,
  src,
  alt = "",
  className = "",
  sizes = "(max-width: 900px) 100vw, 50vw",
}: {
  tone?: string;
  label?: string;
  src?: string;
  alt?: string;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`ph ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} />
      </div>
    );
  }
  return <div className={`ph ph-${tone} ${className}`} data-foto={label} role="img" aria-label={alt || label} />;
}

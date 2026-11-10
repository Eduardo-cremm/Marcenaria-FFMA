import Link from "next/link";

const BLADE =
  "M 0.00,134.80 L 16.25,165.75 L 119.75,165.75 L 129.50,144.28 L 151.25,135.80 L 171.25,143.03 L 182.75,165.75 L 299.75,165.25 L 296.50,157.51 L 293.25,161.01 L 288.25,156.02 L 293.50,150.52 L 275.50,130.30 L 299.25,127.56 L 284.25,108.09 L 262.75,94.36 L 284.75,84.12 L 265.00,70.39 L 239.75,64.40 L 258.25,47.43 L 234.00,37.44 L 208.00,38.44 L 221.50,17.97 L 196.50,17.72 L 174.75,26.46 L 182.25,3.74 L 159.75,9.24 L 140.75,24.46 L 140.50,0.25 L 121.00,11.98 L 107.00,32.70 L 100.25,9.49 L 84.25,26.96 L 75.75,50.42 L 64.00,29.21 L 53.25,50.92 L 50.75,75.64 L 33.75,58.66 L 29.00,80.63 L 33.25,106.34 L 12.00,94.86 L 14.00,118.82 L 24.50,140.29 Z";

export function Blade({ width = 48 }: { width?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 166" width={width} height={Math.round((width * 166) / 300)} aria-hidden="true">
      <path d={BLADE} />
    </svg>
  );
}

export function Logo({ width = 48 }: { width?: number }) {
  return (
    <Link href="/" className="brand">
      <Blade width={width} />
      <b>Marcenaria FFMA</b>
    </Link>
  );
}

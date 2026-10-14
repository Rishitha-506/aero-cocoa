import React, { useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Dart-style paper airplane SVG — nose points right (+x)                     */
/*  offset-rotate:auto faces it along the bezier path direction at all times   */
/* ─────────────────────────────────────────────────────────────────────────── */
const PaperPlaneSVG: React.FC = () => (
  <svg
    viewBox="0 0 64 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
    aria-hidden="true"
  >
    {/* Upper wing: back-notch → nose → back-top */}
    <path
      d="M 8,20 L 60,20 L 2,4 Z"
      stroke="currentColor" strokeWidth="2.2"
      strokeLinejoin="round" strokeLinecap="round"
    />
    {/* Lower fold: back-notch → nose → back-bottom */}
    <path
      d="M 8,20 L 60,20 L 2,36 Z"
      stroke="currentColor" strokeWidth="2"
      strokeLinejoin="round" strokeLinecap="round"
    />
    {/* Center fold spine */}
    <line
      x1="8" y1="20" x2="52" y2="20"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    />
    {/* Upper wing paper crease */}
    <line
      x1="4" y1="11" x2="30" y2="19"
      stroke="currentColor" strokeWidth="1" strokeLinecap="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Types for multi-segment bezier flight paths                                */
/* ─────────────────────────────────────────────────────────────────────────── */
type Pt = [number, number]; // [xFraction, yFraction] of viewport
type CubicSeg = [Pt, Pt, Pt]; // [controlPt1, controlPt2, endPt]

interface FlightPath {
  start: Pt;
  curves: CubicSeg[];
}

interface PlaneConfig {
  id: number;
  duration: number;     // ms — one full traversal
  delay: number;        // ms — stagger start
  size: number;         // px width
  opacity: number;      // max opacity during flight
  wobbleDuration: number; // ms — gentle side-to-side wobble period
  path: FlightPath;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Flight paths — multi-segment cubic beziers with swoops, S-curves,          */
/*  direction reversals. All start & end off-screen.                           */
/*  Coordinates are viewport fractions: [0,0]=top-left  [1,1]=bottom-right     */
/* ─────────────────────────────────────────────────────────────────────────── */
const PLANES: PlaneConfig[] = [
  {
    // Left → graceful upward swoop → gentle dip → exit right
    id: 1, duration: 14000, delay: 0, size: 54, opacity: 0.14, wobbleDuration: 1800,
    path: {
      start: [-0.08, 0.45],
      curves: [
        [[0.06, 0.15], [0.20, 0.08], [0.32, 0.20]],   // swoops upward
        [[0.44, 0.34], [0.40, 0.56], [0.55, 0.48]],   // gentle dip and rise
        [[0.72, 0.38], [0.90, 0.15], [1.12, 0.22]],   // glides out right
      ],
    },
  },
  {
    // Right → S-curve through center → exit left
    id: 2, duration: 12000, delay: 4200, size: 48, opacity: 0.13, wobbleDuration: 2100,
    path: {
      start: [1.12, 0.22],
      curves: [
        [[0.90, 0.18], [0.74, 0.45], [0.58, 0.52]],   // curves down-left
        [[0.44, 0.58], [0.38, 0.30], [0.30, 0.20]],   // curves back UP (reversal!)
        [[0.20, 0.08], [0.06, 0.28], [-0.10, 0.35]],  // exits left
      ],
    },
  },
  {
    // Top-left → dives → direction change upward → swoops down → exit bottom-right
    id: 3, duration: 16000, delay: 1800, size: 50, opacity: 0.12, wobbleDuration: 2400,
    path: {
      start: [0.05, -0.08],
      curves: [
        [[0.10, 0.14], [0.18, 0.40], [0.28, 0.52]],   // dives down
        [[0.38, 0.64], [0.46, 0.45], [0.44, 0.30]],   // reverses upward!
        [[0.42, 0.16], [0.54, 0.26], [0.64, 0.42]],   // swoops down again
        [[0.76, 0.60], [0.94, 0.72], [1.10, 0.82]],   // exits bottom-right
      ],
    },
  },
  {
    // Bottom → rises → gentle bank → exits top-right
    id: 4, duration: 13000, delay: 7000, size: 52, opacity: 0.13, wobbleDuration: 1600,
    path: {
      start: [0.18, 1.10],
      curves: [
        [[0.20, 0.80], [0.16, 0.50], [0.28, 0.35]],   // rises steeply
        [[0.40, 0.18], [0.55, 0.38], [0.64, 0.32]],   // gentle bank
        [[0.75, 0.25], [0.92, 0.06], [1.08, -0.06]],  // exits top-right
      ],
    },
  },
  {
    // Right → big swooping S-curve → exit left
    id: 5, duration: 15000, delay: 9500, size: 44, opacity: 0.11, wobbleDuration: 2000,
    path: {
      start: [1.10, 0.58],
      curves: [
        [[0.88, 0.68], [0.70, 0.35], [0.54, 0.26]],   // swoops upward
        [[0.38, 0.18], [0.30, 0.48], [0.20, 0.58]],   // dips down (S-curve)
        [[0.08, 0.70], [-0.02, 0.52], [-0.10, 0.45]], // exits left
      ],
    },
  },
  {
    // Left low → steep rise → banks down → exits right
    id: 6, duration: 12500, delay: 3000, size: 46, opacity: 0.12, wobbleDuration: 1900,
    path: {
      start: [-0.08, 0.78],
      curves: [
        [[0.04, 0.56], [0.14, 0.20], [0.26, 0.14]],   // steep dramatic rise
        [[0.38, 0.08], [0.44, 0.32], [0.55, 0.42]],   // banks downward
        [[0.68, 0.54], [0.86, 0.38], [1.10, 0.32]],   // glides out right
      ],
    },
  },
  {
    // Top-right → swoop down → direction reversal → exit bottom-left
    id: 7, duration: 17000, delay: 11500, size: 42, opacity: 0.11, wobbleDuration: 2200,
    path: {
      start: [0.88, -0.08],
      curves: [
        [[0.80, 0.16], [0.68, 0.38], [0.56, 0.48]],   // swoops down
        [[0.46, 0.56], [0.50, 0.30], [0.44, 0.20]],   // reverses upward!
        [[0.36, 0.10], [0.22, 0.30], [0.16, 0.48]],   // dips again
        [[0.08, 0.68], [-0.02, 0.80], [-0.10, 0.88]], // exits bottom-left
      ],
    },
  },
  {
    // Bottom-right → rises with direction change → exits top-left
    id: 8, duration: 14500, delay: 5800, size: 40, opacity: 0.10, wobbleDuration: 2500,
    path: {
      start: [0.82, 1.08],
      curves: [
        [[0.74, 0.82], [0.66, 0.55], [0.56, 0.42]],   // rises
        [[0.46, 0.30], [0.50, 0.16], [0.40, 0.22]],   // slight direction change
        [[0.28, 0.30], [0.10, 0.14], [-0.08, 0.06]],  // exits top-left
      ],
    },
  },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Build an SVG path string from viewport-fraction coordinates                */
/* ─────────────────────────────────────────────────────────────────────────── */
function buildPathString(path: FlightPath, W: number, H: number): string {
  const [sx, sy] = path.start;
  let d = `M ${(sx * W).toFixed(1)},${(sy * H).toFixed(1)}`;
  for (const [[cx1, cy1], [cx2, cy2], [ex, ey]] of path.curves) {
    d += ` C ${(cx1 * W).toFixed(1)},${(cy1 * H).toFixed(1)} ${(cx2 * W).toFixed(1)},${(cy2 * H).toFixed(1)} ${(ex * W).toFixed(1)},${(ey * H).toFixed(1)}`;
  }
  return d;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Component                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
export const PaperPlaneDoodles: React.FC = () => {
  useEffect(() => {
    const applyMotionPaths = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      PLANES.forEach((plane) => {
        const el = document.getElementById(`pp-${plane.id}`);
        if (!el) return;

        const d = buildPathString(plane.path, W, H);

        // CSS Motion Path — element follows the multi-segment bezier
        // offset-rotate:auto makes the nose always face the direction of travel
        const style = el.style as CSSStyleDeclaration & {
          offsetPath: string;
          offsetRotate: string;
        };
        style.offsetPath = `path('${d}')`;
        style.offsetRotate = 'auto';
      });
    };

    applyMotionPaths();
    window.addEventListener('resize', applyMotionPaths);
    return () => window.removeEventListener('resize', applyMotionPaths);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {PLANES.map((plane) => (
        <div
          key={plane.id}
          id={`pp-${plane.id}`}
          style={{
            position: 'absolute',
            width: plane.size,
            height: Math.round(plane.size * 0.625),
            color: '#754C3B',
            ['--target-opacity' as string]: String(plane.opacity),
            // Two animations stacked:
            // 1. paperPlaneFly — drives offset-distance 0→100% along the curved path
            // 2. paperPlaneWobble — gentle ±4° rotation wobble for realism
            animation: [
              `paperPlaneFly ${plane.duration}ms linear ${plane.delay}ms infinite`,
              `paperPlaneWobble ${plane.wobbleDuration}ms ease-in-out 0ms infinite`,
            ].join(', '),
            willChange: 'offset-distance, opacity, transform',
          } as React.CSSProperties}
        >
          <PaperPlaneSVG />
        </div>
      ))}
    </div>
  );
};

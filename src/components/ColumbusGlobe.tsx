"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Columbus voyage stops with approximate lat/lon and voyage grouping
// ---------------------------------------------------------------------------
export interface VoyageStop {
  id: string;
  label: string;
  lat: number;  // degrees, positive = N
  lon: number;  // degrees, positive = E (negative = W)
  year: string;
  voyage: 1 | 2 | 3 | 4;
  note: string;
}

export const STOPS: VoyageStop[] = [
  // Voyage 1
  { id: "palos",        label: "Palos de la Frontera", lat: 37.2,  lon: -6.9,   year: "Aug 1492", voyage: 1, note: "Departure port — 3 Aug 1492" },
  { id: "canaries",     label: "Canary Islands",       lat: 28.0,  lon: -15.5,  year: "Sep 1492", voyage: 1, note: "Final resupply before open ocean" },
  { id: "san-salvador", label: "San Salvador",         lat: 24.0,  lon: -74.5,  year: "Oct 1492", voyage: 1, note: "First landfall — 12 Oct 1492" },
  { id: "cuba",         label: "Cuba",                 lat: 22.0,  lon: -79.5,  year: "Oct 1492", voyage: 1, note: "Columbus believed it was mainland China" },
  { id: "hispaniola",   label: "Hispaniola",           lat: 19.0,  lon: -71.0,  year: "Dec 1492", voyage: 1, note: "Santa María ran aground; Fort La Navidad built" },
  // Voyage 2
  { id: "lesser-antilles", label: "Lesser Antilles",  lat: 15.5,  lon: -61.0,  year: "Nov 1493", voyage: 2, note: "First landfall of 2nd voyage" },
  { id: "puerto-rico",  label: "Puerto Rico",          lat: 18.2,  lon: -66.5,  year: "Nov 1493", voyage: 2, note: "Named San Juan Bautista" },
  { id: "la-isabela",   label: "La Isabela",           lat: 19.9,  lon: -70.9,  year: "Jan 1494", voyage: 2, note: "First planned European town in the Americas" },
  { id: "jamaica",      label: "Jamaica",              lat: 18.1,  lon: -77.3,  year: "May 1494", voyage: 2, note: "Explored on 2nd voyage; stranded on 4th" },
  // Voyage 3
  { id: "trinidad",     label: "Trinidad",             lat: 10.5,  lon: -61.2,  year: "Jul 1498", voyage: 3, note: "Gateway to South American mainland" },
  { id: "venezuela",    label: "Venezuela (mainland)", lat: 10.6,  lon: -62.0,  year: "Aug 1498", voyage: 3, note: "First contact with South American continent" },
  // Voyage 4
  { id: "honduras",     label: "Honduras",             lat: 15.9,  lon: -87.2,  year: "Jul 1502", voyage: 4, note: "Seeking a strait to the Indian Ocean" },
  { id: "panama",       label: "Panama",               lat: 9.0,   lon: -79.5,  year: "Oct 1502", voyage: 4, note: "Closest he got to the Pacific" },
  { id: "jamaica-4",    label: "Jamaica (stranded)",   lat: 17.9,  lon: -76.8,  year: "1503–04",  voyage: 4, note: "Stranded for a year with worm-eaten ships" },
];

export const VOYAGE_COLORS: Record<number, string> = {
  1: "#f59e0b",  // amber
  2: "#3b82f6",  // blue
  3: "#10b981",  // emerald
  4: "#ef4444",  // red
};

export const VOYAGE_LABELS: Record<number, string> = {
  1: "1st Voyage (1492–93)",
  2: "2nd Voyage (1493–96)",
  3: "3rd Voyage (1498–1500)",
  4: "4th Voyage (1502–04)",
};

// ---------------------------------------------------------------------------
// Spherical → screen projection helpers
// ---------------------------------------------------------------------------
function toRad(deg: number) { return (deg * Math.PI) / 180; }

/** Project a lat/lon onto a spinning sphere of radius r centred at (cx,cy).
 *  rotY is the current Y-axis rotation in radians (spin).
 *  Returns {x, y, visible} where visible = point is on the front hemisphere. */
function project(
  lat: number,
  lon: number,
  rotY: number,
  cx: number,
  cy: number,
  r: number,
): { x: number; y: number; visible: boolean; depth: number } {
  const φ = toRad(lat);
  const λ = toRad(lon) + rotY;
  // 3-D unit vector
  const x3 = Math.cos(φ) * Math.sin(λ);
  const y3 = -Math.sin(φ);
  const z3 = Math.cos(φ) * Math.cos(λ);
  return {
    x: cx + r * x3,
    y: cy + r * y3,
    visible: z3 > 0,
    depth: z3,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface Props {
  /** Highlight stops for a particular lesson id (null = show all) */
  activeLessonId?: string | null;
}

// Map lesson IDs to voyage numbers shown
const LESSON_VOYAGES: Record<string, number[]> = {
  "background":      [1],
  "first-voyage":    [1],
  "second-voyage":   [1, 2],
  "later-voyages":   [1, 2, 3, 4],
};

export function ColumbusGlobe({ activeLessonId }: Props) {
  const [rotY, setRotY] = useState(0.4); // radians, initial tilt west
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [hoveredStop, setHoveredStop] = useState<VoyageStop | null>(null);
  const [animating, setAnimating] = useState(true);
  const rafRef = useRef<number | null>(null);
  const rotRef = useRef(rotY);

  const visibleVoyages = activeLessonId
    ? (LESSON_VOYAGES[activeLessonId] ?? [1, 2, 3, 4])
    : [1, 2, 3, 4];

  const visibleStops = STOPS.filter((s) => visibleVoyages.includes(s.voyage));

  // Auto-rotate when not dragging
  const tick = useCallback(() => {
    if (!isDragging) {
      rotRef.current += 0.003;
      setRotY(rotRef.current);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [isDragging]);

  useEffect(() => {
    if (animating) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animating, tick]);

  // Drag to rotate
  function onPointerDown(e: React.PointerEvent) {
    setIsDragging(true);
    setAnimating(false);
    setLastX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    rotRef.current += dx * 0.008;
    setRotY(rotRef.current);
    setLastX(e.clientX);
  }

  function onPointerUp() {
    setIsDragging(false);
    setAnimating(true);
  }

  const SIZE = 320;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const r = 130;

  // Latitude / longitude grid lines
  const latLines = [-60, -30, 0, 30, 60];
  const lonLines = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];

  function latLinePoints(lat: number, steps = 120): string {
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const lon = -180 + (360 * i) / steps;
      const p = project(lat, lon, rotY, cx, cy, r);
      if (p.visible) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    return pts.join(" ");
  }

  function lonLinePoints(lon: number, steps = 60): string {
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const lat = -90 + (180 * i) / steps;
      const p = project(lat, lon, rotY, cx, cy, r);
      if (p.visible) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    return pts.join(" ");
  }

  // Route arcs between consecutive stops of each voyage
  function arcPoints(from: VoyageStop, to: VoyageStop, steps = 60): string {
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = from.lat + (to.lat - from.lat) * t;
      const lon = from.lon + (to.lon - from.lon) * t;
      const p = project(lat, lon, rotY, cx, cy, r);
      if (p.visible) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    return pts.join(" ");
  }

  // Group stops by voyage to draw arcs
  const voyageGroups: Record<number, VoyageStop[]> = {};
  for (const s of visibleStops) {
    if (!voyageGroups[s.voyage]) voyageGroups[s.voyage] = [];
    voyageGroups[s.voyage].push(s);
  }

  const projectedStops = visibleStops.map((s) => ({
    stop: s,
    proj: project(s.lat, s.lon, rotY, cx, cy, r),
  }));

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="text-lg">🌍</span>
        <div>
          <p className="text-sm font-semibold leading-tight">Columbus&apos;s Voyages</p>
          <p className="text-xs text-muted leading-tight">Drag to rotate · hover stops for details</p>
        </div>
      </div>

      {/* globe */}
      <div className="flex justify-center pt-3 pb-1 select-none">
        <svg
          width={SIZE}
          height={SIZE}
          className="cursor-grab active:cursor-grabbing"
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* Ocean sphere */}
          <defs>
            <radialGradient id="globe-grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0c2a6e" stopOpacity="1" />
            </radialGradient>
            <clipPath id="globe-clip">
              <circle cx={cx} cy={cy} r={r} />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <circle cx={cx} cy={cy} r={r} fill="url(#globe-grad)" />

          {/* Grid lines — clipped to sphere */}
          <g clipPath="url(#globe-clip)" opacity="0.18" stroke="#7dd3fc" strokeWidth="0.5" fill="none">
            {latLines.map((lat) => {
              const pts = latLinePoints(lat);
              return pts ? <polyline key={`lat-${lat}`} points={pts} /> : null;
            })}
            {lonLines.map((lon) => {
              const pts = lonLinePoints(lon);
              return pts ? <polyline key={`lon-${lon}`} points={pts} /> : null;
            })}
          </g>

          {/* Equator highlight */}
          <g clipPath="url(#globe-clip)" opacity="0.35" stroke="#93c5fd" strokeWidth="1" fill="none">
            <polyline points={latLinePoints(0)} />
          </g>

          {/* Route arcs */}
          <g clipPath="url(#globe-clip)" fill="none" strokeWidth="1.5" strokeDasharray="4 3">
            {Object.entries(voyageGroups).map(([voyageNum, stops]) => {
              const color = VOYAGE_COLORS[Number(voyageNum)];
              const arcs: React.ReactNode[] = [];
              for (let i = 0; i < stops.length - 1; i++) {
                const pts = arcPoints(stops[i], stops[i + 1]);
                if (pts) {
                  arcs.push(
                    <polyline
                      key={`arc-${voyageNum}-${i}`}
                      points={pts}
                      stroke={color}
                      opacity="0.85"
                    />
                  );
                }
              }
              return arcs;
            })}
          </g>

          {/* Stop dots */}
          {projectedStops.map(({ stop, proj }) => {
            if (!proj.visible) return null;
            const color = VOYAGE_COLORS[stop.voyage];
            const isHovered = hoveredStop?.id === stop.id;
            const r2 = isHovered ? 7 : 5;
            return (
              <g
                key={stop.id}
                style={{ cursor: "pointer" }}
                onPointerEnter={() => setHoveredStop(stop)}
                onPointerLeave={() => setHoveredStop(null)}
              >
                {isHovered && (
                  <circle cx={proj.x} cy={proj.y} r={r2 + 5} fill={color} opacity="0.25" />
                )}
                <circle
                  cx={proj.x}
                  cy={proj.y}
                  r={r2}
                  fill={color}
                  stroke="white"
                  strokeWidth="1.5"
                  filter={isHovered ? "url(#glow)" : undefined}
                />
              </g>
            );
          })}

          {/* Globe rim */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* Hover tooltip */}
      <div className="px-4 pb-3 min-h-[3.5rem]">
        {hoveredStop ? (
          <div className="rounded-xl border border-border bg-background px-3 py-2 text-xs">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: VOYAGE_COLORS[hoveredStop.voyage] }}
              />
              <span className="font-semibold">{hoveredStop.label}</span>
              <span className="text-muted ml-auto">{hoveredStop.year}</span>
            </div>
            <p className="text-muted">{hoveredStop.note}</p>
          </div>
        ) : (
          <p className="text-xs text-muted text-center">Hover a stop to see details</p>
        )}
      </div>

      {/* Legend */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-1">
        {Object.entries(VOYAGE_LABELS)
          .filter(([num]) => visibleVoyages.includes(Number(num)))
          .map(([num, label]) => (
            <div key={num} className="flex items-center gap-1.5 text-xs text-muted">
              <span
                className="inline-block w-2.5 h-0.5 rounded shrink-0"
                style={{ background: VOYAGE_COLORS[Number(num)], display: "inline-block", height: 2 }}
              />
              {label}
            </div>
          ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { STOPS, VOYAGE_COLORS, VOYAGE_LABELS, type VoyageStop } from "./ColumbusGlobe";

// ---------------------------------------------------------------------------
// Projection helper (shared with sidebar globe)
// ---------------------------------------------------------------------------
function toRad(deg: number) { return (deg * Math.PI) / 180; }

function project(
  lat: number,
  lon: number,
  rotY: number,
  cx: number,
  cy: number,
  r: number,
) {
  const φ = toRad(lat);
  const λ = toRad(lon) + rotY;
  const x3 = Math.cos(φ) * Math.sin(λ);
  const y3 = -Math.sin(φ);
  const z3 = Math.cos(φ) * Math.cos(λ);
  return { x: cx + r * x3, y: cy + r * y3, visible: z3 > 0, depth: z3 };
}

// ---------------------------------------------------------------------------
// Full-page explorer
// ---------------------------------------------------------------------------
export function ColumbusGlobeExplorer() {
  const [rotY, setRotY] = useState(0.4);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [hoveredStop, setHoveredStop] = useState<VoyageStop | null>(null);
  const [selectedVoyages, setSelectedVoyages] = useState<Set<number>>(new Set([1, 2, 3, 4]));
  const [animating, setAnimating] = useState(true);
  const [focusedStop, setFocusedStop] = useState<VoyageStop | null>(null);
  const rafRef = useRef<number | null>(null);
  const rotRef = useRef(rotY);

  const tick = useCallback(() => {
    if (!isDragging) {
      rotRef.current += 0.002;
      setRotY(rotRef.current);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [isDragging]);

  useEffect(() => {
    if (animating) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animating, tick]);

  function onPointerDown(e: React.PointerEvent) {
    setIsDragging(true);
    setAnimating(false);
    setLastX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    rotRef.current += dx * 0.006;
    setRotY(rotRef.current);
    setLastX(e.clientX);
  }

  function onPointerUp() {
    setIsDragging(false);
    setAnimating(true);
  }

  function toggleVoyage(n: number) {
    setSelectedVoyages((prev) => {
      const next = new Set(prev);
      if (next.has(n)) { if (next.size > 1) next.delete(n); }
      else next.add(n);
      return next;
    });
  }

  // Fly to a stop by setting rotY so the stop faces the viewer (z = max)
  function flyTo(stop: VoyageStop) {
    setFocusedStop(stop);
    // We want lon + rotY = 0 (front of globe) → rotY = -lon_rad
    const targetRot = -toRad(stop.lon);
    rotRef.current = targetRot;
    setRotY(targetRot);
    setAnimating(false);
    setTimeout(() => setAnimating(true), 2000);
  }

  const SIZE = 460;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const r = 200;

  const latLines = [-60, -30, 0, 30, 60];
  const lonLines = Array.from({ length: 12 }, (_, i) => -180 + i * 30);

  function linePoints(points: [number, number][], steps = 120): string {
    return points
      .map(([lat, lon]) => {
        const p = project(lat, lon, rotY, cx, cy, r);
        return p.visible ? `${p.x.toFixed(1)},${p.y.toFixed(1)}` : null;
      })
      .filter(Boolean)
      .join(" ");
  }

  function latLinePoints(lat: number): string {
    const pts: [number, number][] = Array.from({ length: 121 }, (_, i) => [lat, -180 + i * 3]);
    return linePoints(pts);
  }

  function lonLinePoints(lon: number): string {
    const pts: [number, number][] = Array.from({ length: 61 }, (_, i) => [-90 + i * 3, lon]);
    return linePoints(pts);
  }

  function arcPoints(from: VoyageStop, to: VoyageStop, steps = 80): string {
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

  const visibleStops = STOPS.filter((s) => selectedVoyages.has(s.voyage));

  const voyageGroups: Record<number, VoyageStop[]> = {};
  for (const s of visibleStops) {
    if (!voyageGroups[s.voyage]) voyageGroups[s.voyage] = [];
    voyageGroups[s.voyage].push(s);
  }

  const projectedStops = visibleStops.map((s) => ({
    stop: s,
    proj: project(s.lat, s.lon, rotY, cx, cy, r),
  }));

  const activeStop = hoveredStop ?? focusedStop;

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      {/* Globe */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {/* Voyage filter */}
        <div className="px-5 py-3 border-b border-border flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-muted">Show voyages:</span>
          {([1, 2, 3, 4] as const).map((n) => (
            <button
              key={n}
              onClick={() => toggleVoyage(n)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                selectedVoyages.has(n)
                  ? "text-white border-transparent"
                  : "border-border text-muted"
              }`}
              style={selectedVoyages.has(n) ? { background: VOYAGE_COLORS[n] } : {}}
            >
              {n}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted">Drag to rotate</span>
        </div>

        {/* SVG Globe */}
        <div className="flex justify-center py-4 select-none">
          <svg
            width={SIZE}
            height={SIZE}
            className="cursor-grab active:cursor-grabbing max-w-full"
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <defs>
              <radialGradient id="eg-globe-grad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0a1a4a" stopOpacity="1" />
              </radialGradient>
              <clipPath id="eg-globe-clip">
                <circle cx={cx} cy={cy} r={r} />
              </clipPath>
              <filter id="eg-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ocean */}
            <circle cx={cx} cy={cy} r={r} fill="url(#eg-globe-grad)" />

            {/* Grid */}
            <g clipPath="url(#eg-globe-clip)" opacity="0.15" stroke="#93c5fd" strokeWidth="0.6" fill="none">
              {latLines.map((lat) => {
                const pts = latLinePoints(lat);
                return pts ? <polyline key={`lat${lat}`} points={pts} /> : null;
              })}
              {lonLines.map((lon) => {
                const pts = lonLinePoints(lon);
                return pts ? <polyline key={`lon${lon}`} points={pts} /> : null;
              })}
            </g>

            {/* Equator */}
            <g clipPath="url(#eg-globe-clip)" opacity="0.4" stroke="#bfdbfe" strokeWidth="1.2" fill="none">
              <polyline points={latLinePoints(0)} />
            </g>

            {/* Atlantic label zone highlight */}
            <g clipPath="url(#eg-globe-clip)" opacity="0.06" fill="#60a5fa">
              {(() => {
                const pts: string[] = [];
                for (let lon = -80; lon <= 0; lon += 2) {
                  const p = project(15, lon, rotY, cx, cy, r);
                  if (p.visible) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
                }
                for (let lon = 0; lon >= -80; lon -= 2) {
                  const p = project(45, lon, rotY, cx, cy, r);
                  if (p.visible) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
                }
                return pts.length > 4 ? <polygon points={pts.join(" ")} /> : null;
              })()}
            </g>

            {/* Route arcs */}
            <g clipPath="url(#eg-globe-clip)" fill="none" strokeWidth="2" strokeDasharray="5 3">
              {Object.entries(voyageGroups).map(([voyageNum, stops]) => {
                const color = VOYAGE_COLORS[Number(voyageNum)];
                return stops.slice(0, -1).map((stop, i) => {
                  const pts = arcPoints(stop, stops[i + 1]);
                  return pts ? (
                    <polyline
                      key={`arc-${voyageNum}-${i}`}
                      points={pts}
                      stroke={color}
                      opacity="0.9"
                    />
                  ) : null;
                });
              })}
            </g>

            {/* Stops */}
            {projectedStops.map(({ stop, proj }) => {
              if (!proj.visible) return null;
              const color = VOYAGE_COLORS[stop.voyage];
              const isActive = activeStop?.id === stop.id;
              const dotR = isActive ? 9 : 6;
              return (
                <g
                  key={stop.id}
                  style={{ cursor: "pointer" }}
                  onPointerEnter={() => setHoveredStop(stop)}
                  onPointerLeave={() => setHoveredStop(null)}
                  onClick={() => flyTo(stop)}
                >
                  {isActive && (
                    <circle cx={proj.x} cy={proj.y} r={dotR + 7} fill={color} opacity="0.2" />
                  )}
                  <circle
                    cx={proj.x}
                    cy={proj.y}
                    r={dotR}
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    filter={isActive ? "url(#eg-glow)" : undefined}
                  />
                  {isActive && (
                    <text
                      x={proj.x}
                      y={proj.y - dotR - 6}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="white"
                      stroke="#0a1a4a"
                      strokeWidth="3"
                      paintOrder="stroke"
                    >
                      {stop.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Rim */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
          </svg>
        </div>

        {/* Active stop detail */}
        <div className="px-5 pb-5 min-h-[80px]">
          {activeStop ? (
            <div className="rounded-xl border border-border bg-background px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: VOYAGE_COLORS[activeStop.voyage], display: "inline-block" }}
                />
                <span className="font-semibold">{activeStop.label}</span>
                <span className="text-xs text-muted ml-2">{activeStop.year}</span>
                <span
                  className="ml-auto text-xs rounded-full px-2 py-0.5 text-white"
                  style={{ background: VOYAGE_COLORS[activeStop.voyage] }}
                >
                  {VOYAGE_LABELS[activeStop.voyage]}
                </span>
              </div>
              <p className="text-sm text-muted">{activeStop.note}</p>
            </div>
          ) : (
            <p className="text-sm text-muted text-center pt-3">
              Click any stop to focus it, or hover to preview
            </p>
          )}
        </div>
      </div>

      {/* Timeline sidebar */}
      <div className="space-y-3">
        <h2 className="font-semibold text-sm text-muted uppercase tracking-wide px-1">
          All Stops
        </h2>
        {([1, 2, 3, 4] as const).map((voyageNum) => {
          const stops = STOPS.filter(
            (s) => s.voyage === voyageNum && selectedVoyages.has(voyageNum)
          );
          if (stops.length === 0) return null;
          const color = VOYAGE_COLORS[voyageNum];
          return (
            <div key={voyageNum} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div
                className="px-4 py-2.5 flex items-center gap-2"
                style={{ borderBottom: `2px solid ${color}20` }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: color, display: "inline-block" }}
                />
                <span className="text-xs font-semibold">{VOYAGE_LABELS[voyageNum]}</span>
              </div>
              <ol className="divide-y divide-border">
                {stops.map((stop) => {
                  const isActive = activeStop?.id === stop.id;
                  return (
                    <li key={stop.id}>
                      <button
                        onClick={() => flyTo(stop)}
                        onMouseEnter={() => setHoveredStop(stop)}
                        onMouseLeave={() => setHoveredStop(null)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          isActive ? "bg-brand/5" : "hover:bg-foreground/3"
                        }`}
                      >
                        <span
                          className={`font-medium ${isActive ? "text-brand" : ""}`}
                        >
                          {stop.label}
                        </span>
                        <span className="block text-xs text-muted mt-0.5">
                          {stop.year}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}

        {/* CTA */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-sm font-medium mb-1">Study this path</p>
          <p className="text-xs text-muted mb-3">
            Lessons, primary sources, and spaced-repetition quizzes
          </p>
          <Link
            href="/learn/history/columbus-voyages/background"
            className="block text-center rounded-full bg-brand text-white px-4 py-2 text-xs font-medium hover:bg-brand-ink transition-colors"
          >
            Start learning →
          </Link>
        </div>
      </div>
    </div>
  );
}

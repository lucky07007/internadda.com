"use client"
// components/globe-hero.tsx — SOPHISTICATED MONOCHROME GLOBE
// Clean orthographic globe with real continent outlines
// Fully theme-aware: adapts to light/dark mode automatically
// No childish animations — professional, trust-building aesthetic

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"

const CONTINENTS: { name: string; paths: [number, number][][] }[] = [
  {
    name: "North America",
    paths: [
      [[-168,72],[-140,72],[-95,72],[-75,70],[-65,68],[-60,48],[-66,44],[-70,42],[-80,25],[-88,15],[-78,8],[-78,0],[-80,0],[-90,8],[-105,15],[-118,32],[-125,37],[-135,58],[-148,62],[-165,65],[-168,72]],
      [[-55,47],[-53,47],[-53,45],[-66,44],[-60,48],[-55,47]],
    ],
  },
  {
    name: "South America",
    paths: [
      [[-78,12],[-62,12],[-50,0],[-35,-5],[-35,-10],[-40,-20],[-45,-25],[-50,-30],[-55,-35],[-68,-55],[-75,-50],[-80,-40],[-78,-30],[-75,-10],[-80,0],[-78,8],[-78,12]],
    ],
  },
  {
    name: "Europe",
    paths: [
      [[-10,36],[30,36],[32,42],[30,46],[20,50],[10,55],[5,60],[15,68],[28,72],[30,68],[25,60],[30,55],[25,50],[20,42],[28,40],[35,36],[28,36],[20,40],[10,43],[0,44],[-5,40],[-10,36]],
    ],
  },
  {
    name: "Africa",
    paths: [
      [[-18,15],[0,15],[15,15],[30,15],[42,12],[52,12],[52,0],[45,-10],[35,-18],[30,-25],[20,-35],[17,-35],[12,-28],[8,-20],[8,-5],[0,0],[-18,15]],
      [[28,36],[35,36],[37,22],[38,12],[42,12],[30,15],[15,15],[8,35],[15,38],[25,38],[28,36]],
    ],
  },
  {
    name: "Asia",
    paths: [
      [[28,36],[35,36],[45,38],[55,40],[60,45],[65,42],[75,38],[80,28],[78,12],[68,24],[58,22],[52,12],[45,12],[38,12],[36,22],[30,28],[25,35],[28,36]],
      [[65,42],[75,52],[85,55],[95,55],[110,48],[120,52],[130,60],[140,68],[150,62],[155,58],[150,50],[145,44],[140,38],[132,34],[120,28],[110,20],[105,12],[100,5],[105,-2],[100,-5],[95,0],[85,8],[80,12],[78,12],[80,28],[75,38],[65,42]],
      [[78,72],[100,72],[120,72],[135,68],[148,62],[140,60],[130,60],[120,52],[110,48],[95,55],[85,55],[75,52],[65,55],[55,70],[62,72],[78,72]],
    ],
  },
  {
    name: "Australia",
    paths: [
      [[114,-22],[118,-20],[125,-14],[132,-12],[138,-15],[145,-18],[150,-22],[152,-28],[148,-38],[140,-38],[132,-35],[125,-34],[115,-34],[112,-28],[114,-22]],
    ],
  },
  {
    name: "Greenland",
    paths: [
      [[-55,76],[-20,76],[-18,72],[-25,62],[-45,60],[-55,65],[-62,70],[-55,76]],
    ],
  },
]

const CITIES = [
  { name: "Bangalore", lat: 12.97, lng: 77.59, count: "2.5k+" },
  { name: "Mumbai", lat: 19.07, lng: 72.87, count: "2.1k+" },
  { name: "Delhi", lat: 28.61, lng: 77.20, count: "1.8k+" },
  { name: "San Francisco", lat: 37.77, lng: -122.41, count: "3.2k+" },
  { name: "New York", lat: 40.71, lng: -74.00, count: "2.8k+" },
  { name: "London", lat: 51.50, lng: -0.12, count: "2.2k+" },
  { name: "Berlin", lat: 52.52, lng: 13.40, count: "1.5k+" },
  { name: "Singapore", lat: 1.35, lng: 103.82, count: "1.9k+" },
  { name: "Tokyo", lat: 35.68, lng: 139.69, count: "1.6k+" },
  { name: "Dubai", lat: 25.20, lng: 55.27, count: "1.1k+" },
  { name: "Sydney", lat: -33.86, lng: 151.20, count: "980+" },
  { name: "Toronto", lat: 43.65, lng: -79.38, count: "1.3k+" },
]

const CX = 200, CY = 200, R = 170

function toRad(d: number) { return (d * Math.PI) / 180 }

function project(lat: number, lng: number, rot: number) {
  const φ = toRad(lat)
  const λ = toRad(lng + rot)
  const cosφ = Math.cos(φ), cosλ = Math.cos(λ), sinλ = Math.sin(λ)
  const depth = cosφ * cosλ
  return {
    x: CX + R * cosφ * sinλ,
    y: CY - R * Math.sin(φ),
    visible: depth > -0.05,
    depth,
  }
}

function polyPath(coords: [number, number][], rot: number): string | null {
  const pts = coords.map(([lng, lat]) => project(lat, lng, rot))
  if (pts.filter(p => p.visible).length < 3) return null
  let d = "", first = true
  for (const p of pts) {
    if (p.visible) { d += `${first ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)} `; first = false }
    else if (!first) { first = true }
  }
  return d + "Z"
}

function buildGrid(rot: number) {
  const meridians: string[] = [], parallels: string[] = []
  for (let lng = -180; lng < 180; lng += 30) {
    let d = "", first = true
    for (let lat = -85; lat <= 85; lat += 2) {
      const { x, y, visible } = project(lat, lng, rot)
      if (visible) { d += `${first ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`; first = false }
      else if (!first) { meridians.push(d); d = ""; first = true }
    }
    if (d) meridians.push(d)
  }
  for (const lat of [-60, -30, 0, 30, 60]) {
    let d = "", first = true
    for (let lng = -180; lng <= 180; lng += 2) {
      const { x, y, visible } = project(lat, lng, rot)
      if (visible) { d += `${first ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`; first = false }
      else first = true
    }
    if (d) parallels.push(d)
  }
  return { meridians, parallels }
}

export function GlobeHero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [rotation, setRotation] = useState(20)
  const [activeCityIdx, setActiveCityIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef(false)
  const dragStartX = useRef(0)
  const rotAtDrag = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTs = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const tick = (ts: number) => {
      if (!dragRef.current) {
        const dt = ts - lastTs.current
        setRotation(r => (r + dt * 0.004) % 360)
      }
      lastTs.current = ts
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setActiveCityIdx(i => (i + 1) % CITIES.length), 3200)
    return () => clearInterval(id)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true; setDragging(true)
    dragStartX.current = e.clientX; rotAtDrag.current = rotation
  }
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return
    setRotation((rotAtDrag.current + (e.clientX - dragStartX.current) * 0.4) % 360)
  }, [])
  const onMouseUp = () => { dragRef.current = false; setDragging(false) }

  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = true
    dragStartX.current = e.touches[0].clientX; rotAtDrag.current = rotation
  }
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragRef.current) return
    setRotation((rotAtDrag.current + (e.touches[0].clientX - dragStartX.current) * 0.4) % 360)
  }, [])
  const onTouchEnd = () => { dragRef.current = false }

  const { meridians, parallels } = buildGrid(rotation)
  const projCities = CITIES
    .map((c, i) => ({ ...c, ...project(c.lat, c.lng, rotation), idx: i }))
    .filter(c => c.visible)
    .sort((a, b) => a.depth - b.depth)

  const activeCity = CITIES[activeCityIdx]
  const activeCityProj = project(activeCity.lat, activeCity.lng, rotation)

  // Theme-aware palette
  const ocean = isDark
    ? { start: "#0f172a", mid: "#0c1525", end: "#080f1c" }
    : { start: "#e8f0fe", mid: "#dce8fd", end: "#c7d9fc" }

  const landFill = isDark ? "#1e293b" : "#f1f5f9"
  const landStroke = isDark ? "#334155" : "#cbd5e1"
  const gridColor = isDark ? "rgba(148,163,184,0.12)" : "rgba(100,116,139,0.10)"
  const rimColor = isDark ? "rgba(148,163,184,0.25)" : "rgba(100,116,139,0.20)"
  const dotColor = isDark ? "#94a3b8" : "#64748b"
  const activeDotColor = isDark ? "#f8fafc" : "#0f172a"
  const tooltipBg = isDark ? "#1e293b" : "#ffffff"
  const tooltipBorder = isDark ? "#334155" : "#e2e8f0"
  const tooltipText = isDark ? "#f1f5f9" : "#0f172a"
  const tooltipSub = isDark ? "#64748b" : "#94a3b8"

  return (
    <div className="relative flex flex-col items-center select-none">

      {/* City tooltip */}
      {mounted && activeCityProj.visible && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `calc(50% + ${(activeCityProj.x - CX) * 0.88}px + 18px)`,
            top: `calc(50% + ${(activeCityProj.y - CY) * 0.88}px - 14px)`,
            transition: "left 0.8s cubic-bezier(0.23, 1, 0.32, 1), top 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s",
          }}
        >
          <div
            className="px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-sm"
            style={{
              background: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              color: tooltipText,
              letterSpacing: "0.01em",
            }}
          >
            {activeCity.name}
            <span style={{ color: tooltipSub, marginLeft: 8, fontWeight: 400, fontVariantNumeric: "tabular-nums" }}>
              {activeCity.count}
            </span>
          </div>
        </div>
      )}

      {/* SVG Globe */}
      <svg
        viewBox="0 0 400 400"
        className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px]"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-label="Interactive globe showing internship hubs worldwide"
      >
        <defs>
          <radialGradient id="ocean" cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor={ocean.start} />
            <stop offset="60%" stopColor={ocean.mid} />
            <stop offset="100%" stopColor={ocean.end} />
          </radialGradient>
          <radialGradient id="sheen" cx="32%" cy="28%" r="45%">
            <stop offset="0%" stopColor={isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)"} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="terminator" cx="68%" cy="50%" r="52%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="75%" stopColor={isDark ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.06)"} />
            <stop offset="100%" stopColor={isDark ? "rgba(0,0,0,0.40)" : "rgba(0,0,0,0.12)"} />
          </radialGradient>
          <clipPath id="clip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </defs>

        {/* Subtle shadow */}
        <ellipse cx="210" cy="375" rx="120" ry="8"
          fill={isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.08)"}
        />

        {/* Ocean */}
        <circle cx={CX} cy={CY} r={R} fill="url(#ocean)" />

        <g clipPath="url(#clip)">
          {/* Continents */}
          {CONTINENTS.map(cont =>
            cont.paths.map((path, pi) => {
              const d = polyPath(path, rotation)
              if (!d) return null
              return (
                <path
                  key={`${cont.name}-${pi}`}
                  d={d}
                  fill={landFill}
                  stroke={landStroke}
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              )
            })
          )}

          {/* Grid — meridians */}
          {meridians.map((d, i) => (
            <path key={`m${i}`} d={d} stroke={gridColor} strokeWidth="0.5" fill="none" />
          ))}
          {/* Grid — parallels */}
          {parallels.map((d, i) => (
            <path key={`p${i}`} d={d} stroke={gridColor} strokeWidth="0.5" fill="none" />
          ))}

          {/* Terminator */}
          <circle cx={CX} cy={CY} r={R} fill="url(#terminator)" />

          {/* Specular sheen */}
          <ellipse cx="152" cy="136" rx="62" ry="30"
            fill="url(#sheen)" transform="rotate(-32 152 136)"
          />

          {/* City dots */}
          {mounted && projCities.map(c => {
            const isActive = c.idx === activeCityIdx
            return (
              <g key={c.name}>
                {isActive && (
                  <circle cx={c.x} cy={c.y} r="3.5"
                    fill="none"
                    stroke={activeDotColor}
                    strokeWidth="1"
                    opacity="0.4"
                  />
                )}
                <circle
                  cx={c.x} cy={c.y}
                  r={isActive ? 3.5 : 2.5}
                  fill={isActive ? activeDotColor : dotColor}
                  opacity={isActive ? 1 : 0.7}
                  stroke={isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.6)"}
                  strokeWidth="0.5"
                />
              </g>
            )
          })}
        </g>

        {/* Globe rim */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={rimColor} strokeWidth="1" />
      </svg>

      {/* Drag hint */}
      {mounted && (
        <p className="mt-3 text-[10px] tracking-[0.12em] uppercase font-medium"
          style={{ color: isDark ? "#475569" : "#94a3b8" }}
        >
          Drag to explore
        </p>
      )}
    </div>
  )
}

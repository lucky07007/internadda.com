"use client"
// components/globe-hero.tsx — PURE PROFESSIONAL GLOBE
// Clean, minimal, authentic globe artwork with smooth animation

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

// Pure continent data - just the landmasses
const CONTINENTS: { name: string; lightColor: string; darkColor: string; paths: [number, number][][] }[] = [
  {
    name: "North America",
    lightColor: "#2d8c5c",
    darkColor: "#3aad72",
    paths: [
      [[-168,72],[-140,72],[-95,72],[-75,70],[-65,68],[-60,48],[-66,44],[-70,42],[-80,25],[-88,15],[-78,8],[-78,0],[-80,0],[-90,8],[-105,15],[-118,32],[-125,37],[-135,58],[-148,62],[-165,65],[-168,72]],
      [[-55,47],[-53,47],[-53,45],[-66,44],[-60,48],[-55,47]],
      [[-85,30],[-80,25],[-82,20],[-88,15],[-95,20],[-90,28],[-85,30]],
    ]
  },
  {
    name: "South America",
    lightColor: "#1e8c7a",
    darkColor: "#2aad94",
    paths: [
      [[-78,12],[-62,12],[-50,0],[-35,-5],[-35,-10],[-40,-20],[-45,-25],[-50,-30],[-55,-35],[-68,-55],[-75,-50],[-80,-40],[-78,-30],[-75,-10],[-80,0],[-78,8],[-78,12]],
    ]
  },
  {
    name: "Europe",
    lightColor: "#4a7c9b",
    darkColor: "#5a96ba",
    paths: [
      [[-10,36],[30,36],[32,42],[30,46],[20,50],[10,55],[5,60],[15,68],[28,72],[30,68],[25,60],[30,55],[25,50],[20,42],[28,40],[35,36],[28,36],[20,40],[10,43],[0,44],[-5,40],[-10,36]],
      [[-25,66],[-18,62],[-15,66],[-5,70],[5,68],[10,62],[15,68],[5,60],[0,62],[-10,65],[-18,68],[-25,66]],
    ]
  },
  {
    name: "Africa",
    lightColor: "#c47a1a",
    darkColor: "#e89a2e",
    paths: [
      [[-18,15],[0,15],[15,15],[30,15],[42,12],[52,12],[52,0],[45,-10],[35,-18],[30,-25],[20,-35],[17,-35],[12,-28],[8,-20],[8,-5],[0,0],[-18,15]],
      [[28,36],[35,36],[37,22],[38,12],[42,12],[30,15],[15,15],[8,35],[15,38],[25,38],[28,36]],
    ]
  },
  {
    name: "Asia",
    lightColor: "#8c4425",
    darkColor: "#b85a34",
    paths: [
      [[28,36],[35,36],[45,38],[55,40],[60,45],[65,42],[75,38],[80,28],[78,12],[68,24],[58,22],[52,12],[45,12],[38,12],[36,22],[30,28],[25,35],[28,36]],
      [[65,42],[75,52],[85,55],[95,55],[110,48],[120,52],[130,60],[140,68],[150,62],[155,58],[150,50],[145,44],[140,38],[132,34],[120,28],[110,20],[105,12],[100,5],[105,-2],[100,-5],[95,0],[85,8],[80,12],[78,12],[80,28],[75,38],[65,42]],
      [[78,72],[100,72],[120,72],[135,68],[148,62],[140,60],[130,60],[120,52],[110,48],[95,55],[85,55],[75,52],[65,55],[55,70],[62,72],[78,72]],
      [[130,60],[132,54],[128,50],[132,46],[140,44],[148,48],[150,54],[145,58],[140,60],[135,58],[130,60]],
    ]
  },
  {
    name: "Australia",
    lightColor: "#6a8c3a",
    darkColor: "#85b04a",
    paths: [
      [[114,-22],[118,-20],[125,-14],[132,-12],[138,-15],[145,-18],[150,-22],[152,-28],[148,-38],[140,-38],[132,-35],[125,-34],[115,-34],[112,-28],[114,-22]],
    ]
  },
  {
    name: "Greenland",
    lightColor: "#5a8c6a",
    darkColor: "#72ad85",
    paths: [
      [[-55,76],[-20,76],[-18,72],[-25,62],[-45,60],[-55,65],[-62,70],[-55,76]],
    ]
  },
  {
    name: "Antarctica",
    lightColor: "#a8c4cc",
    darkColor: "#c0dce4",
    paths: [
      [[-180,-72],[-140,-72],[-100,-70],[-60,-72],[-20,-68],[0,-70],[20,-68],[60,-72],[100,-70],[140,-72],[180,-72],[180,-85],[-180,-85],[-180,-72]],
    ]
  }
]

// Pure connection lines - major global hubs
const CONNECTIONS: [number, number, number, number][] = [
  [12.97, 77.59, 37.77, -122.41],   // Bangalore - San Francisco
  [19.07, 72.87, 51.50, -0.12],     // Mumbai - London
  [28.61, 77.20, 35.68, 139.69],    // Delhi - Tokyo
  [17.38, 78.48, 1.35, 103.82],     // Hyderabad - Singapore
  [37.77, -122.41, 40.71, -74.00],  // SF - New York
  [51.50, -0.12, 52.52, 13.40],     // London - Berlin
  [35.68, 139.69, 37.56, 126.97],   // Tokyo - Seoul
  [1.35, 103.82, -33.86, 151.20],   // Singapore - Sydney
  [25.20, 55.27, 19.07, 72.87],     // Dubai - Mumbai
  [43.65, -79.38, 51.50, -0.12],    // Toronto - London
]

// Major city markers only
const CITIES = [
  { lat: 12.97, lng: 77.59 },   // Bangalore
  { lat: 19.07, lng: 72.87 },   // Mumbai
  { lat: 28.61, lng: 77.20 },   // Delhi
  { lat: 17.38, lng: 78.48 },   // Hyderabad
  { lat: 37.77, lng: -122.41 }, // San Francisco
  { lat: 40.71, lng: -74.00 },  // New York
  { lat: 51.50, lng: -0.12 },   // London
  { lat: 52.52, lng: 13.40 },   // Berlin
  { lat: 1.35, lng: 103.82 },   // Singapore
  { lat: 35.68, lng: 139.69 },  // Tokyo
  { lat: -33.86, lng: 151.20 }, // Sydney
  { lat: 43.65, lng: -79.38 },  // Toronto
]

const CX = 220, CY = 220, R = 185

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function project(lat: number, lng: number, rotDeg: number) {
  const φ = toRad(lat)
  const λ = toRad(lng + rotDeg)
  const cosφ = Math.cos(φ)
  const cosλ = Math.cos(λ)
  const sinλ = Math.sin(λ)
  const visible = cosφ * cosλ > -0.06
  const x = CX + R * cosφ * sinλ
  const y = CY - R * Math.sin(φ)
  return { x, y, visible, depth: cosφ * cosλ }
}

function polygonToPath(coords: [number, number][], rotDeg: number): string | null {
  const pts = coords.map(([lng, lat]) => project(lat, lng, rotDeg))
  if (pts.filter(p => p.visible).length < 3) return null
  let d = ""
  let first = true
  for (const p of pts) {
    if (p.visible) {
      d += `${first ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)} `
      first = false
    } else if (!first) {
      first = true
    }
  }
  return d + "Z"
}

function buildGrid(rotDeg: number) {
  const meridians: string[] = []
  const parallels: string[] = []
  
  for (let lng = -180; lng < 180; lng += 15) {
    const pts: string[] = []
    for (let lat = -85; lat <= 85; lat += 2) {
      const { x, y, visible } = project(lat, lng, rotDeg)
      if (visible) pts.push(`${pts.length === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      else if (pts.length) { meridians.push(pts.join(" ")); pts.length = 0 }
    }
    if (pts.length > 1) meridians.push(pts.join(" "))
  }

  for (const lat of [-60, -30, 0, 30, 60]) {
    let d = "", first = true
    for (let lng = -180; lng <= 180; lng += 2) {
      const { x, y, visible } = project(lat, lng, rotDeg)
      if (visible) { d += `${first ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`; first = false }
      else { first = true }
    }
    if (d) parallels.push(d)
  }
  
  return { meridians, parallels }
}

export function GlobeHero() {
  const { theme } = useTheme()
  const [rotation, setRotation] = useState(45)
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [rotationAtDrag, setRotationAtDrag] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const dragRef = useRef(false)

  const isDark = theme === "dark"

  useEffect(() => { setMounted(true) }, [])

  // Smooth auto-rotation
  useEffect(() => {
    const animate = (ts: number) => {
      if (!dragRef.current) {
        const dt = Math.min(ts - lastTimeRef.current, 50)
        lastTimeRef.current = ts
        setRotation(r => (r + dt * 0.003) % 360)
      } else {
        lastTimeRef.current = ts
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true
    setIsDragging(true)
    setDragStart(e.clientX)
    setRotationAtDrag(rotation)
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragStart
    setRotation((rotationAtDrag + dx * 0.4) % 360)
  }
  const handleMouseUp = () => { dragRef.current = false; setIsDragging(false) }

  const { meridians, parallels } = buildGrid(rotation)

  // Ocean colors - deep and rich
  const oceanColors = isDark 
    ? { start: "#0a1220", mid: "#0d1a30", end: "#060c18" }
    : { start: "#1a5a7a", mid: "#0e4a6a", end: "#063a55" }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center">
        
        {/* Globe container */}
        <div className="relative flex items-center justify-center select-none">
          
          {/* Subtle drag hint */}
          {mounted && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.2em] uppercase text-gray-400/60 dark:text-gray-500/60 pointer-events-none">
              Drag to rotate
            </div>
          )}

          <svg
            viewBox="0 0 440 440"
            className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px]"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            aria-label="Interactive globe showing global connections"
          >
            <defs>
              {/* Ocean gradient */}
              <radialGradient id="oceanGradient" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor={oceanColors.start} />
                <stop offset="45%" stopColor={oceanColors.mid} />
                <stop offset="85%" stopColor={oceanColors.end} />
                <stop offset="100%" stopColor={isDark ? "#030812" : "#032840"} />
              </radialGradient>
              
              {/* Atmosphere glow */}
              <radialGradient id="atmosphereGlow" cx="50%" cy="50%" r="50%">
                <stop offset="82%" stopColor="rgba(0,0,0,0)" />
                <stop offset="95%" stopColor={isDark ? "rgba(60,140,220,0.08)" : "rgba(80,160,220,0.12)"} />
                <stop offset="100%" stopColor={isDark ? "rgba(80,160,240,0.15)" : "rgba(100,180,240,0.2)"} />
              </radialGradient>
              
              {/* Dark side shadow */}
              <radialGradient id="darkSide" cx="68%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="45%" stopColor="rgba(0,0,0,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
              </radialGradient>
              
              {/* Sun reflection */}
              <radialGradient id="specular" cx="25%" cy="20%" r="45%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>

              <clipPath id="globeClip">
                <circle cx={CX} cy={CY} r={R} />
              </clipPath>
              
              <filter id="globeShadow">
                <feDropShadow dx="0" dy="8" stdDeviation="20" floodColor={isDark ? "#030812" : "#032840"} floodOpacity="0.3" />
              </filter>

              {/* Connection line gradient */}
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isDark ? "rgba(56,189,248,0)" : "rgba(14,165,233,0)"} />
                <stop offset="50%" stopColor={isDark ? "rgba(56,189,248,0.6)" : "rgba(14,165,233,0.7)"} />
                <stop offset="100%" stopColor={isDark ? "rgba(56,189,248,0)" : "rgba(14,165,233,0)"} />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="225" cy="415" rx="140" ry="12" fill={isDark ? "#030812" : "#032840"} opacity="0.15" filter="blur(6px)" />

            {/* Ocean base */}
            <circle cx={CX} cy={CY} r={R} fill="url(#oceanGradient)" filter="url(#globeShadow)" />

            <g clipPath="url(#globeClip)">
              {/* Atmosphere inner glow */}
              <circle cx={CX} cy={CY} r={R} fill="url(#atmosphereGlow)" />
              
              {/* Continents - pure landmass */}
              {CONTINENTS.map(continent =>
                continent.paths.map((path, pi) => {
                  const d = polygonToPath(path, rotation)
                  if (!d) return null
                  const color = isDark ? continent.darkColor : continent.lightColor
                  return (
                    <path
                      key={`${continent.name}-${pi}`}
                      d={d}
                      fill={color}
                      stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                      opacity="0.92"
                    />
                  )
                })
              )}

              {/* Subtle grid lines */}
              {meridians.map((d, i) => (
                <path key={`m${i}`} d={d} stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" fill="none" />
              ))}
              {parallels.map((d, i) => (
                <path key={`p${i}`} d={d} stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" fill="none" />
              ))}

              {/* Connection lines - animated */}
              {mounted && CONNECTIONS.map(([lat1, lng1, lat2, lng2], i) => {
                const p1 = project(lat1, lng1, rotation)
                const p2 = project(lat2, lng2, rotation)
                if (!p1.visible || !p2.visible) return null
                
                // Calculate control point for arc
                const midX = (p1.x + p2.x) / 2
                const midY = (p1.y + p2.y) / 2
                const dx = p2.x - p1.x
                const dy = p2.y - p1.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const arcHeight = Math.min(dist * 0.25, 40)
                const perpX = -dy / dist * arcHeight
                const perpY = dx / dist * arcHeight
                const ctrlX = midX + perpX
                const ctrlY = midY + perpY
                
                return (
                  <g key={i}>
                    <path
                      d={`M${p1.x.toFixed(1)},${p1.y.toFixed(1)} Q${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`}
                      fill="none"
                      stroke="url(#connectionGradient)"
                      strokeWidth="0.8"
                      strokeDasharray="3,4"
                      opacity="0.5"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="3s" repeatCount="indefinite" />
                    </path>
                  </g>
                )
              })}

              {/* City markers - subtle dots */}
              {mounted && CITIES.map((city, i) => {
                const p = project(city.lat, city.lng, rotation)
                if (!p.visible) return null
                return (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="2.5" fill={isDark ? "#7dd3fc" : "#0284c7"} opacity="0.6" />
                    <circle cx={p.x} cy={p.y} r="1.2" fill="white" opacity="0.8" />
                  </g>
                )
              })}
            </g>

            {/* Dark side overlay */}
            <circle cx={CX} cy={CY} r={R} fill="url(#darkSide)" />

            {/* Globe rim - clean edge */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke={isDark ? "rgba(60,140,220,0.15)" : "rgba(14,165,233,0.2)"} strokeWidth="1" />
            <circle cx={CX} cy={CY} r={R+0.5} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

            {/* Sun reflection */}
            <ellipse cx="135" cy="115" rx="60" ry="28" fill="url(#specular)" transform="rotate(-40 135 115)" />
            <ellipse cx="128" cy="108" rx="22" ry="10" fill="rgba(255,255,255,0.05)" transform="rotate(-40 128 108)" />
          </svg>
        </div>

        {/* Simple CTA - clean and minimal */}
        <div className="mt-8">
          <Link 
            href="/internships" 
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:shadow-md"
          >
            <Sparkles size={13} className="text-sky-500" />
            Explore global opportunities
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

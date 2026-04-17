"use client"
// components/globe-hero.tsx — PROFESSIONAL DUAL-THEME GLOBE v5
// Enterprise-grade orthographic globe with realistic terrain and adaptive theming

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { Verified, Globe, ArrowRight, Sparkles, MapPin, Building2, Users, Award, TrendingUp } from "lucide-react"
import { useTheme } from "next-themes"

// Enhanced continent data with realistic terrain
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

// Premium internship hubs with detailed metrics
const CITIES = [
  { name: "Bangalore", lat: 12.97, lng: 77.59, region: "India", type: "hub", internships: "2,500+", color: "#ff6b4a" },
  { name: "Mumbai", lat: 19.07, lng: 72.87, region: "India", type: "hub", internships: "2,100+", color: "#ff6b4a" },
  { name: "Delhi NCR", lat: 28.61, lng: 77.2, region: "India", type: "hub", internships: "1,800+", color: "#ff6b4a" },
  { name: "Hyderabad", lat: 17.38, lng: 78.48, region: "India", type: "hub", internships: "1,400+", color: "#ff6b4a" },
  { name: "San Francisco", lat: 37.77, lng: -122.41, region: "USA", type: "hub", internships: "3,200+", color: "#4a9eff" },
  { name: "New York", lat: 40.71, lng: -74.0, region: "USA", type: "hub", internships: "2,800+", color: "#4a9eff" },
  { name: "Austin", lat: 30.26, lng: -97.74, region: "USA", type: "hub", internships: "1,200+", color: "#4a9eff" },
  { name: "London", lat: 51.5, lng: -0.12, region: "Europe", type: "hub", internships: "2,200+", color: "#9b59b6" },
  { name: "Berlin", lat: 52.52, lng: 13.4, region: "Europe", type: "hub", internships: "1,500+", color: "#9b59b6" },
  { name: "Amsterdam", lat: 52.37, lng: 4.9, region: "Europe", type: "hub", internships: "1,100+", color: "#9b59b6" },
  { name: "Singapore", lat: 1.35, lng: 103.82, region: "SEA", type: "hub", internships: "1,900+", color: "#e74c3c" },
  { name: "Tokyo", lat: 35.68, lng: 139.69, region: "East Asia", type: "hub", internships: "1,600+", color: "#e74c3c" },
  { name: "Seoul", lat: 37.56, lng: 126.97, region: "East Asia", type: "hub", internships: "1,300+", color: "#e74c3c" },
  { name: "Dubai", lat: 25.2, lng: 55.27, region: "Middle East", type: "hub", internships: "1,100+", color: "#f39c12" },
  { name: "Sydney", lat: -33.86, lng: 151.2, region: "Pacific", type: "hub", internships: "980+", color: "#1abc9c" },
  { name: "Toronto", lat: 43.65, lng: -79.38, region: "Canada", type: "hub", internships: "1,300+", color: "#4a9eff" },
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
  const [activeCityIdx, setActiveCityIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [rotationAtDrag, setRotationAtDrag] = useState(0)
  const [hoveredCity, setHoveredCity] = useState<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const dragRef = useRef(false)
  const autoRotRef = useRef(true)

  const isDark = theme === "dark"

  useEffect(() => { setMounted(true) }, [])

  // Smooth auto-rotation
  useEffect(() => {
    const animate = (ts: number) => {
      if (autoRotRef.current && !dragRef.current) {
        const dt = Math.min(ts - lastTimeRef.current, 50)
        lastTimeRef.current = ts
        setRotation(r => (r + dt * 0.004) % 360)
      } else {
        lastTimeRef.current = ts
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // City highlight cycle
  useEffect(() => {
    const id = setInterval(() => {
      setActiveCityIdx(i => (i + 1) % CITIES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true
    setIsDragging(true)
    setDragStart(e.clientX)
    setRotationAtDrag(rotation)
  }
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragStart
    setRotation((rotationAtDrag + dx * 0.4) % 360)
  }, [dragStart, rotationAtDrag])
  const handleMouseUp = () => { dragRef.current = false; setIsDragging(false) }

  const { meridians, parallels } = buildGrid(rotation)
  const projCities = CITIES.map((c, i) => ({ ...c, ...project(c.lat, c.lng, rotation), idx: i }))
    .filter(c => c.visible)
    .sort((a, b) => a.depth - b.depth)

  const activeCity = CITIES[activeCityIdx]
  const activeCityProj = project(activeCity.lat, activeCity.lng, rotation)

  // Dynamic colors based on theme
  const oceanColors = isDark 
    ? { start: "#0a1628", mid: "#0d1f3c", end: "#071020" }
    : { start: "#1a6d8f", mid: "#0e5a7a", end: "#063b5a" }
  
  const atmosphereColor = isDark 
    ? "rgba(60,140,220,0.12)" 
    : "rgba(100,180,220,0.18)"

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main Grid Layout - Rows and Columns Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Globe Column - 7 cols on desktop */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          {/* Globe container */}
          <div className="relative flex items-center justify-center select-none">
            
            {/* Enhanced city label popup */}
            {mounted && activeCityProj.visible && (
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: `calc(50% + ${(activeCityProj.x - 220) * 0.9}px + 24px)`,
                  top: `calc(50% + ${(activeCityProj.y - 220) * 0.9}px - 20px)`,
                  transition: "left 0.7s cubic-bezier(0.2, 0.9, 0.4, 1), top 0.7s cubic-bezier(0.2, 0.9, 0.4, 1)",
                }}
              >
                <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 shadow-sm" />
                  <div className="text-xs font-semibold px-3 py-2 whitespace-nowrap bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-rose-500" />
                      <span className="text-gray-900 dark:text-white">{activeCity.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 size={10} className="text-emerald-500" />
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                        {activeCity.internships} internships
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Drag hint */}
            {mounted && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-wider uppercase text-gray-400 dark:text-gray-500 pointer-events-none whitespace-nowrap flex items-center gap-1">
                <span>← Drag to explore →</span>
              </div>
            )}

            <svg
              viewBox="0 0 440 440"
              className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px] drop-shadow-2xl"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              aria-label="Interactive globe showing global internship opportunities"
            >
              <defs>
                {/* Dynamic ocean gradient */}
                <radialGradient id="oceanGradient" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor={oceanColors.start} />
                  <stop offset="45%" stopColor={oceanColors.mid} />
                  <stop offset="85%" stopColor={oceanColors.end} />
                  <stop offset="100%" stopColor={isDark ? "#050a14" : "#043050"} />
                </radialGradient>
                
                {/* Enhanced atmosphere glow */}
                <radialGradient id="atmosphereGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="80%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="93%" stopColor={atmosphereColor} />
                  <stop offset="100%" stopColor={isDark ? "rgba(80,160,220,0.25)" : "rgba(100,180,220,0.35)"} />
                </radialGradient>
                
                {/* Cloud layer */}
                <radialGradient id="cloudLayer" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="75%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="92%" stopColor="rgba(255,255,255,0.04)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </radialGradient>
                
                {/* Dark side shadow */}
                <radialGradient id="darkSide" cx="68%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="40%" stopColor="rgba(0,0,0,0.08)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
                </radialGradient>
                
                {/* Sun reflection */}
                <radialGradient id="specular" cx="25%" cy="20%" r="45%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="30%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>

                <clipPath id="globeClip">
                  <circle cx={CX} cy={CY} r={R} />
                </clipPath>
                
                <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <filter id="globeShadow">
                  <feDropShadow dx="6" dy="12" stdDeviation="16" floodColor={isDark ? "#0a1628" : "#0a4a6a"} floodOpacity="0.25" />
                </filter>

                <filter id="continentShadow">
                  <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
                </filter>
              </defs>

              {/* Ground shadow */}
              <ellipse cx="230" cy="418" rx="150" ry="12" fill={isDark ? "#0a1628" : "#0a4a6a"} opacity="0.2" filter="blur(5px)" />

              {/* Ocean base */}
              <circle cx={CX} cy={CY} r={R} fill="url(#oceanGradient)" filter="url(#globeShadow)" />

              <g clipPath="url(#globeClip)">
                {/* Atmosphere inner glow */}
                <circle cx={CX} cy={CY} r={R} fill="url(#atmosphereGlow)" />
                
                {/* Continents */}
                {CONTINENTS.map(continent =>
                  continent.paths.map((path, pi) => {
                    const d = polygonToPath(path, rotation)
                    if (!d) return null
                    const color = isDark ? continent.darkColor : continent.lightColor
                    return (
                      <g key={`${continent.name}-${pi}`}>
                        <path
                          d={d}
                          fill={color}
                          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}
                          strokeWidth="0.8"
                          strokeLinejoin="round"
                          opacity="0.95"
                          filter="url(#continentShadow)"
                        />
                        {/* Inner highlight for depth */}
                        <path
                          d={d}
                          fill="none"
                          stroke="rgba(255,255,255,0.12)"
                          strokeWidth="1"
                          strokeLinejoin="round"
                        />
                      </g>
                    )
                  })
                )}

                {/* Grid lines */}
                {meridians.map((d, i) => (
                  <path key={`m${i}`} d={d} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" fill="none" />
                ))}
                {parallels.map((d, i) => (
                  <path key={`p${i}`} d={d} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" fill="none" />
                ))}

                {/* Enhanced equator */}
                {(() => {
                  const eq = parallels.find((_, i) => i === 2)
                  return eq ? <path d={eq} stroke="rgba(255,215,0,0.15)" strokeWidth="1.5" fill="none" strokeDasharray="6,5" /> : null
                })()}
                
                {/* Cloud patterns */}
                <ellipse cx="140" cy="120" rx="70" ry="18" fill="white" opacity="0.04" transform="rotate(-20 140 120)" />
                <ellipse cx="280" cy="260" rx="55" ry="12" fill="white" opacity="0.03" transform="rotate(30 280 260)" />
                <ellipse cx="100" cy="320" rx="45" ry="10" fill="white" opacity="0.05" transform="rotate(-35 100 320)" />
                <ellipse cx="320" cy="160" rx="40" ry="8" fill="white" opacity="0.03" transform="rotate(15 320 160)" />
              </g>

              {/* Dark side overlay */}
              <circle cx={CX} cy={CY} r={R} fill="url(#darkSide)" />
              
              {/* Cloud layer overlay */}
              <circle cx={CX} cy={CY} r={R} fill="url(#cloudLayer)" />

              {/* City markers */}
              {mounted && projCities.map(c => {
                const isActive = c.idx === activeCityIdx
                const isHovered = c.idx === hoveredCity
                const isHub = c.type === "hub"
                const size = isActive ? 6 : isHovered ? 5 : isHub ? 4 : 3
                return (
                  <g key={c.name}>
                    {/* Pulse animation for active city */}
                    {isActive && (
                      <>
                        <circle cx={c.x} cy={c.y} fill={c.color} r={size} opacity="0.25">
                          <animate attributeName="r" values="5;20;5" dur="2.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={c.x} cy={c.y} fill="none" stroke={c.color} strokeWidth="1.5" r={size + 4} opacity="0.5">
                          <animate attributeName="r" values="8;16;8" dur="2.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}
                    {/* City dot */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={size}
                      fill={c.color}
                      opacity={isActive ? 1 : isHub ? 0.95 : 0.85}
                      filter={isActive ? "url(#cityGlow)" : undefined}
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="0.8"
                      style={{ transition: "r 0.2s ease" }}
                    />
                    {/* Inner bright spot */}
                    <circle cx={c.x - 1} cy={c.y - 1} r={size * 0.3} fill="rgba(255,255,255,0.7)" />
                  </g>
                )
              })}

              {/* Globe rim */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke={isDark ? "rgba(80,160,220,0.3)" : "rgba(100,180,220,0.5)"} strokeWidth="1.5" />
              <circle cx={CX} cy={CY} r={R+1} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

              {/* Sun reflection highlight */}
              <ellipse cx="135" cy="115" rx="65" ry="32" fill="url(#specular)" transform="rotate(-40 135 115)" />
              <ellipse cx="128" cy="108" rx="25" ry="12" fill="rgba(255,255,255,0.08)" transform="rotate(-40 128 108)" />
            </svg>
          </div>

          {/* Stats bar - Row layout */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-12">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 shadow-sm animate-pulse" />
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Major Hubs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-sm" />
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Active Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <Verified size={11} className="text-indigo-500 dark:text-indigo-400" />
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">UpForge Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={11} className="text-emerald-500 dark:text-emerald-400" />
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">85+ Countries</span>
            </div>
          </div>
        </div>

        {/* Content Column - 5 cols on desktop */}
        <div className="lg:col-span-5 space-y-6">
          {/* Trust Metrics Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 rounded-2xl p-4 border border-sky-200/50 dark:border-sky-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                  <Building2 size={16} className="text-sky-600 dark:text-sky-400" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">15+</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Global Offices</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-2xl p-4 border border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Users size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">50K+</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Alumni Network</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-4 border border-amber-200/50 dark:border-amber-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Award size={16} className="text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">10K+</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Active Internships</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <TrendingUp size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">94%</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Placement Rate</p>
            </div>
          </div>

          {/* Global Identity Statement */}
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Global Identity</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  InternAdda connects students with verified internships across 40+ countries. 
                  As part of UpForge Global, we maintain the highest standards of quality and trust.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced CTA */}
          <Link 
            href="/internships" 
            className="group inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-xl text-sm font-semibold text-white transition-all shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30"
          >
            <Sparkles size={14} className="text-amber-300" />
            Explore 10,000+ internships worldwide
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

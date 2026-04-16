'use client'

import { useEffect, useRef } from 'react'

export function HeroIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const setDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    setDimensions()
    window.addEventListener('resize', setDimensions)

    // Animation variables
    let animationFrame: number
    let time = 0

    // Floating elements positions
    const floatingElements = [
      { type: 'globe', x: 0.75, y: 0.25, size: 40, offset: 0 },
      { type: 'briefcase', x: 0.85, y: 0.45, size: 35, offset: 1.5 },
      { type: 'gear', x: 0.7, y: 0.65, size: 30, offset: 3 },
      { type: 'chat', x: 0.2, y: 0.3, size: 35, offset: 2 },
      { type: 'sparkle', x: 0.15, y: 0.6, size: 25, offset: 4 },
      { type: 'dashboard', x: 0.8, y: 0.75, size: 45, offset: 1 }
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const w = canvas.width
      const h = canvas.height
      const centerX = w * 0.55 // Slightly right-aligned
      const centerY = h * 0.5

      // Draw subtle world map background (extremely low opacity)
      ctx.save()
      ctx.globalAlpha = 0.03
      drawWorldMap(ctx, w, h)
      ctx.restore()

      // Draw abstract global network lines
      ctx.save()
      ctx.globalAlpha = 0.06
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 0.5
      drawNetworkLines(ctx, w, h, time)
      ctx.restore()

      // Draw soft shadow under subject
      ctx.save()
      const gradient = ctx.createRadialGradient(
        centerX, centerY + 120, 0,
        centerX, centerY + 120, 100
      )
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0.08)')
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.ellipse(centerX, centerY + 130, 120, 20, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Draw subject (female student with laptop)
      drawSubject(ctx, centerX, centerY)

      // Draw floating elements with soft shadows and blur
      floatingElements.forEach(el => {
        const x = w * el.x + Math.sin(time * 0.5 + el.offset) * 8
        const y = h * el.y + Math.cos(time * 0.3 + el.offset) * 6
        
        ctx.save()
        // Soft shadow
        ctx.shadowColor = 'rgba(37, 99, 235, 0.15)'
        ctx.shadowBlur = 20
        ctx.shadowOffsetY = 4
        
        // Slight blur for depth (except subject-adjacent elements)
        if (el.type !== 'globe') {
          ctx.filter = 'blur(0.3px)'
        }
        
        drawFloatingElement(ctx, x, y, el.type, el.size, time + el.offset)
        ctx.restore()
      })

      // Draw subtle glow around subject
      ctx.save()
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY - 20, 0,
        centerX, centerY - 20, 200
      )
      glowGradient.addColorStop(0, 'rgba(37, 99, 235, 0.04)')
      glowGradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.02)')
      glowGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = glowGradient
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      time += 0.02
      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', setDimensions)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ background: '#f9fafb' }}
    />
  )
}

// Helper drawing functions

function drawWorldMap(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#2563eb'
  
  // Simplified world map paths (continents as smooth shapes)
  const continents = [
    // North America
    () => {
      ctx.beginPath()
      ctx.moveTo(w * 0.1, h * 0.2)
      ctx.bezierCurveTo(w * 0.15, h * 0.18, w * 0.2, h * 0.25, w * 0.18, h * 0.35)
      ctx.bezierCurveTo(w * 0.16, h * 0.45, w * 0.12, h * 0.4, w * 0.1, h * 0.35)
      ctx.closePath()
      ctx.fill()
    },
    // South America
    () => {
      ctx.beginPath()
      ctx.moveTo(w * 0.18, h * 0.45)
      ctx.bezierCurveTo(w * 0.22, h * 0.5, w * 0.2, h * 0.6, w * 0.18, h * 0.65)
      ctx.bezierCurveTo(w * 0.16, h * 0.6, w * 0.15, h * 0.5, w * 0.18, h * 0.45)
      ctx.closePath()
      ctx.fill()
    },
    // Europe
    () => {
      ctx.beginPath()
      ctx.moveTo(w * 0.35, h * 0.2)
      ctx.bezierCurveTo(w * 0.4, h * 0.18, w * 0.45, h * 0.22, w * 0.42, h * 0.28)
      ctx.bezierCurveTo(w * 0.38, h * 0.25, w * 0.35, h * 0.24, w * 0.35, h * 0.2)
      ctx.closePath()
      ctx.fill()
    },
    // Africa
    () => {
      ctx.beginPath()
      ctx.moveTo(w * 0.38, h * 0.3)
      ctx.bezierCurveTo(w * 0.42, h * 0.28, w * 0.45, h * 0.4, w * 0.42, h * 0.5)
      ctx.bezierCurveTo(w * 0.38, h * 0.48, w * 0.36, h * 0.38, w * 0.38, h * 0.3)
      ctx.closePath()
      ctx.fill()
    },
    // Asia
    () => {
      ctx.beginPath()
      ctx.moveTo(w * 0.5, h * 0.2)
      ctx.bezierCurveTo(w * 0.6, h * 0.15, w * 0.7, h * 0.2, w * 0.72, h * 0.3)
      ctx.bezierCurveTo(w * 0.68, h * 0.35, w * 0.55, h * 0.32, w * 0.5, h * 0.28)
      ctx.closePath()
      ctx.fill()
    },
    // Australia
    () => {
      ctx.beginPath()
      ctx.moveTo(w * 0.7, h * 0.55)
      ctx.bezierCurveTo(w * 0.75, h * 0.52, w * 0.78, h * 0.58, w * 0.75, h * 0.62)
      ctx.bezierCurveTo(w * 0.72, h * 0.6, w * 0.68, h * 0.58, w * 0.7, h * 0.55)
      ctx.closePath()
      ctx.fill()
    }
  ]
  
  continents.forEach(draw => draw())
}

function drawNetworkLines(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  const points = [
    { x: w * 0.15, y: h * 0.3 },
    { x: w * 0.35, y: h * 0.25 },
    { x: w * 0.55, y: h * 0.4 },
    { x: w * 0.7, y: h * 0.35 },
    { x: w * 0.85, y: h * 0.5 },
    { x: w * 0.75, y: h * 0.65 },
    { x: w * 0.5, y: h * 0.7 },
    { x: w * 0.25, y: h * 0.6 }
  ]

  ctx.beginPath()
  points.forEach((p, i) => {
    points.slice(i + 1, i + 3).forEach(p2 => {
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
      if (dist < w * 0.3) {
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
      }
    })
  })
  ctx.stroke()

  // Animated dots on lines
  ctx.fillStyle = '#2563eb'
  points.forEach((p, i) => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
    ctx.fill()
  })
}

function drawSubject(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const scale = Math.min(ctx.canvas.width, ctx.canvas.height) / 600
  
  ctx.save()
  ctx.translate(x, y - 30)
  ctx.scale(scale, scale)

  // Body - modern clean shapes
  // Torso
  ctx.fillStyle = '#2563eb'
  ctx.shadowColor = 'rgba(37, 99, 235, 0.2)'
  ctx.shadowBlur = 25
  ctx.shadowOffsetY = 8
  ctx.beginPath()
  ctx.ellipse(0, 40, 45, 60, 0, 0, Math.PI * 2)
  ctx.fill()

  // Over-shirt detail
  ctx.fillStyle = '#3b82f6'
  ctx.shadowBlur = 15
  ctx.beginPath()
  ctx.ellipse(-5, 35, 30, 45, -0.1, 0, Math.PI * 2)
  ctx.fill()

  // Head
  ctx.fillStyle = '#fcd34d'
  ctx.shadowColor = 'rgba(252, 211, 77, 0.3)'
  ctx.beginPath()
  ctx.ellipse(0, -40, 28, 32, 0, 0, Math.PI * 2)
  ctx.fill()

  // Hair
  ctx.fillStyle = '#1e293b'
  ctx.shadowColor = 'rgba(30, 41, 59, 0.3)'
  ctx.beginPath()
  ctx.arc(0, -55, 30, 0, Math.PI * 2)
  ctx.fill()
  
  // Hair swoop
  ctx.beginPath()
  ctx.ellipse(15, -50, 15, 20, -0.2, 0, Math.PI * 2)
  ctx.fill()

  // Face features
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0
  
  // Eyes
  ctx.fillStyle = '#1e293b'
  ctx.beginPath()
  ctx.arc(-10, -42, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(10, -42, 3, 0, Math.PI * 2)
  ctx.fill()

  // Eye highlights
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(-12, -44, 1, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(8, -44, 1, 0, Math.PI * 2)
  ctx.fill()

  // Smile
  ctx.strokeStyle = '#78350f'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(0, -34, 8, 0.1, Math.PI - 0.1)
  ctx.stroke()

  // Glasses (modern tech look)
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.ellipse(-10, -42, 8, 7, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(10, -42, 8, 7, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(-2, -42)
  ctx.lineTo(2, -42)
  ctx.stroke()

  // Laptop
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetY = 6
  
  // Laptop base
  ctx.fillStyle = '#cbd5e1'
  ctx.beginPath()
  ctx.roundRect(-35, 50, 70, 8, 4)
  ctx.fill()
  
  // Laptop screen
  ctx.fillStyle = '#1e293b'
  ctx.beginPath()
  ctx.roundRect(-30, 10, 60, 42, 6)
  ctx.fill()
  
  // Screen content (code-like lines)
  ctx.fillStyle = '#10b981'
  ctx.shadowBlur = 8
  ctx.shadowColor = 'rgba(16, 185, 129, 0.3)'
  ctx.beginPath()
  ctx.roundRect(-22, 18, 18, 3, 1.5)
  ctx.fill()
  ctx.fillStyle = '#3b82f6'
  ctx.beginPath()
  ctx.roundRect(-22, 25, 30, 3, 1.5)
  ctx.fill()
  ctx.fillStyle = '#f59e0b'
  ctx.beginPath()
  ctx.roundRect(-22, 32, 12, 3, 1.5)
  ctx.fill()
  ctx.fillStyle = '#8b5cf6'
  ctx.beginPath()
  ctx.roundRect(-22, 39, 22, 3, 1.5)
  ctx.fill()

  // Arms
  ctx.shadowColor = 'rgba(37, 99, 235, 0.2)'
  ctx.fillStyle = '#fcd34d'
  
  // Left arm
  ctx.beginPath()
  ctx.ellipse(-45, 30, 12, 20, -0.3, 0, Math.PI * 2)
  ctx.fill()
  
  // Right arm (typing)
  ctx.beginPath()
  ctx.ellipse(45, 35, 12, 20, 0.3, 0, Math.PI * 2)
  ctx.fill()

  // Hands on keyboard
  ctx.fillStyle = '#fcd34d'
  ctx.shadowBlur = 10
  ctx.beginPath()
  ctx.arc(-25, 48, 6, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(25, 48, 6, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawFloatingElement(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  type: string, 
  size: number,
  time: number
) {
  ctx.save()
  ctx.translate(x, y)
  
  // Soft shadow
  ctx.shadowColor = 'rgba(37, 99, 235, 0.15)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetY = 4

  switch (type) {
    case 'globe':
      // Globe with gradient
      const globeGrad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2)
      globeGrad.addColorStop(0, '#2563eb')
      globeGrad.addColorStop(1, '#7c3aed')
      ctx.fillStyle = globeGrad
      ctx.beginPath()
      ctx.arc(0, 0, size/2, 0, Math.PI * 2)
      ctx.fill()
      
      // Globe lines
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.ellipse(0, 0, size/2, size/4, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(0, 0, size/4, size/2, 0, 0, Math.PI * 2)
      ctx.stroke()
      break

    case 'briefcase':
      // Briefcase with purple gradient
      const briefGrad = ctx.createLinearGradient(-size/2, 0, size/2, size/2)
      briefGrad.addColorStop(0, '#7c3aed')
      briefGrad.addColorStop(1, '#a78bfa')
      ctx.fillStyle = briefGrad
      ctx.beginPath()
      ctx.roundRect(-size/2, -size/3, size, size/1.5, 6)
      ctx.fill()
      
      // Handle
      ctx.fillStyle = '#cbd5e1'
      ctx.beginPath()
      ctx.roundRect(-size/6, -size/2, size/3, size/6, 3)
      ctx.fill()
      break

    case 'gear':
      // Settings gear
      ctx.fillStyle = '#64748b'
      ctx.shadowColor = 'rgba(100, 116, 139, 0.2)'
      
      // Gear teeth
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) + time * 0.5
        const tx = Math.cos(angle) * size/2
        const ty = Math.sin(angle) * size/2
        
        ctx.save()
        ctx.translate(tx, ty)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.roundRect(-size/10, -size/4, size/5, size/2, 3)
        ctx.fill()
        ctx.restore()
      }
      
      // Gear center
      ctx.fillStyle = '#475569'
      ctx.beginPath()
      ctx.arc(0, 0, size/3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#94a3b8'
      ctx.beginPath()
      ctx.arc(0, 0, size/6, 0, Math.PI * 2)
      ctx.fill()
      break

    case 'chat':
      // Chat bubble
      const chatGrad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2)
      chatGrad.addColorStop(0, '#3b82f6')
      chatGrad.addColorStop(1, '#2563eb')
      ctx.fillStyle = chatGrad
      
      ctx.beginPath()
      ctx.roundRect(-size/2, -size/2, size, size * 0.8, 12)
      ctx.fill()
      
      // Chat tail
      ctx.beginPath()
      ctx.moveTo(-size/4, size * 0.3)
      ctx.lineTo(-size/3, size * 0.5)
      ctx.lineTo(-size/6, size * 0.3)
      ctx.fill()
      
      // Chat dots
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.beginPath()
      ctx.arc(-size/6, -size/8, size/10, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(size/6, -size/8, size/10, 0, Math.PI * 2)
      ctx.fill()
      break

    case 'sparkle':
      // Sparkle/star for growth
      const sparkleGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size/2)
      sparkleGrad.addColorStop(0, '#fbbf24')
      sparkleGrad.addColorStop(1, '#f59e0b')
      ctx.fillStyle = sparkleGrad
      ctx.shadowColor = 'rgba(251, 191, 36, 0.3)'
      
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI / 2) + time
        const spikeX = Math.cos(angle) * size/2
        const spikeY = Math.sin(angle) * size/2
        
        if (i === 0) ctx.moveTo(spikeX, spikeY)
        else ctx.lineTo(spikeX, spikeY)
        
        const innerAngle = angle + Math.PI / 4
        const innerX = Math.cos(innerAngle) * size/4
        const innerY = Math.sin(innerAngle) * size/4
        ctx.lineTo(innerX, innerY)
      }
      ctx.closePath()
      ctx.fill()
      break

    case 'dashboard':
      // Mini dashboard card
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
      ctx.beginPath()
      ctx.roundRect(-size/2, -size/2, size, size * 0.9, 8)
      ctx.fill()
      
      // Chart bars
      ctx.fillStyle = '#2563eb'
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(37, 99, 235, 0.2)'
      
      const barWidth = size / 8
      const heights = [0.4, 0.6, 0.8, 0.5, 0.7]
      heights.forEach((h, i) => {
        ctx.fillRect(
          -size/3 + i * barWidth * 1.5,
          size/4 - h * size/2,
          barWidth,
          h * size/2
        )
      })
      
      // Trend line
      ctx.strokeStyle = '#7c3aed'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(-size/3, size/4)
      ctx.lineTo(-size/3 + barWidth * 1.5, 0)
      ctx.lineTo(-size/3 + barWidth * 3, -size/6)
      ctx.lineTo(-size/3 + barWidth * 4.5, size/8)
      ctx.lineTo(-size/3 + barWidth * 6, -size/8)
      ctx.stroke()
      break
  }

  ctx.restore()
}

// Add roundRect utility
CanvasRenderingContext2D.prototype.roundRect = function(
  x: number, 
  y: number, 
  w: number, 
  h: number, 
  r: number
) {
  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  this.moveTo(x + r, y)
  this.lineTo(x + w - r, y)
  this.quadraticCurveTo(x + w, y, x + w, y + r)
  this.lineTo(x + w, y + h - r)
  this.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  this.lineTo(x + r, y + h)
  this.quadraticCurveTo(x, y + h, x, y + h - r)
  this.lineTo(x, y + r)
  this.quadraticCurveTo(x, y, x + r, y)
  return this
}

// Type declaration for the roundRect utility
declare global {
  interface CanvasRenderingContext2D {
    roundRect(x: number, y: number, w: number, h: number, r: number): CanvasRenderingContext2D
  }
}

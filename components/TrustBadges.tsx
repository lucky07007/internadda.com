import { CheckCircle, Zap, Shield, Users } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: CheckCircle,
      label: 'MSME REGISTERED',
      description: 'Government Verified',
      color: 'text-green-500',
    },
    {
      icon: Users,
      label: '7000+ STUDENTS',
      description: 'Trusted Ecosystem',
      color: 'text-blue-500',
    },
    {
      icon: Zap,
      label: '100% VERIFIED',
      description: 'Quality Internships',
      color: 'text-yellow-500',
    },
    {
      icon: Shield,
      label: 'SECURE PLATFORM',
      description: 'Safe & Transparent',
      color: 'text-primary',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge) => {
        const Icon = badge.icon
        return (
          <div
            key={badge.label}
            className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <Icon className={`${badge.color} flex-shrink-0`} size={24} />
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-semibold text-foreground">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

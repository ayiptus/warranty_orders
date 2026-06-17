'use client'

import { ProductCategory } from '@/lib/types'

interface CategoryCardProps {
  title: ProductCategory
  onClick: () => void
}

export function CategoryCard({ title, onClick }: CategoryCardProps) {
  const icons: Record<ProductCategory, string> = {
    Exterior: '🏗️',
    Interior: '⚙️',
    Warranty: '🛡️',
  }

  const descriptions: Record<ProductCategory, string> = {
    Exterior: 'External components and weatherproofing',
    Interior: 'Internal systems and assemblies',
    Warranty: 'Coverage and support options',
  }

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-8 cursor-pointer hover:shadow-md transition-shadow hover:border-primary/50"
    >
      <div className="text-4xl mb-4">{icons[title]}</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{descriptions[title]}</p>
    </div>
  )
}

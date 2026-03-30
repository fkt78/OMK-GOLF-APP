import React from 'react'

interface Props {
  label: string
  value: string | number
  sub?: string
  color?: string
  pga?: string  // PGAツアー平均値など参考値
  icon?: React.ReactNode
}

export default function StatCard({ label, value, sub, color = 'text-golf-green', pga, icon }: Props) {
  return (
    <div className="card flex flex-col gap-1">
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-golf-green">{icon}</span>}
        <span className="stat-label">{label}</span>
      </div>
      <span className={`stat-value ${color}`}>{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
      {pga && (
        <span className="text-xs text-gray-400 mt-1 border-t pt-1">
          PGAツアー平均: <span className="font-medium text-gray-500">{pga}</span>
        </span>
      )}
    </div>
  )
}

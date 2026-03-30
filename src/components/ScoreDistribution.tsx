import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CareerStats } from '../types'

const COLORS = ['#f59e0b', '#ef4444', '#22c55e', '#3b82f6', '#6b7280', '#374151']
const LABELS = ['イーグル以下', 'バーディ', 'パー', 'ボギー', 'ダボ', 'トリプル以上']

interface Props {
  stats: CareerStats
}

export default function ScoreDistribution({ stats }: Props) {
  const data = [
    { name: LABELS[0], value: stats.eagleCount },
    { name: LABELS[1], value: stats.birdieCount },
    { name: LABELS[2], value: stats.parCount },
    { name: LABELS[3], value: stats.bogeyCount },
    { name: LABELS[4], value: stats.doubleBogeyCount },
    { name: LABELS[5], value: stats.worseCount },
  ].filter(d => d.value > 0)

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="card">
      <h3 className="font-bold text-gray-700 mb-3">スコア分布</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => {
              const originalIdx = LABELS.indexOf(entry.name)
              return <Cell key={entry.name} fill={COLORS[originalIdx >= 0 ? originalIdx : index]} />
            })}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}回 (${total > 0 ? ((value/total)*100).toFixed(0) : 0}%)`, '']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

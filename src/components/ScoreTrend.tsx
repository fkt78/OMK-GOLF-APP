import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer
} from 'recharts'
import { Round } from '../types'
import { calcRoundStats } from '../utils/stats'

interface Props {
  rounds: Round[]
}

export default function ScoreTrend({ rounds }: Props) {
  const data = [...rounds]
    .reverse()
    .slice(-20)
    .map(r => {
      const s = calcRoundStats(r)
      const totalPar = r.holes.reduce((sum, h) => sum + h.par, 0)
      return {
        date: r.date.slice(5), // MM-DD
        score: s.totalScore,
        par: totalPar,
        gir: Math.round(s.girPct),
        fw: Math.round(s.fairwayPct),
        putts: s.totalPutts,
      }
    })

  if (data.length === 0) return null

  const avgPar = Math.round(data.reduce((sum, d) => sum + d.par, 0) / data.length)

  return (
    <div className="card">
      <h3 className="font-bold text-gray-700 mb-3">スコア推移（直近20ラウンド）</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
          <Tooltip />
          <ReferenceLine y={avgPar} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Par', position: 'right', fontSize: 11 }} />
          <Line type="monotone" dataKey="score" stroke="#1a5c38" strokeWidth={2} dot={{ r: 3 }} name="スコア" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

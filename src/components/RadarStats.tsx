import React from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip
} from 'recharts'
import { CareerStats } from '../types'

interface Props {
  stats: CareerStats
}

// 各スタッツを0-100でノーマライズ（アマチュア基準）
function normalize(value: number, min: number, max: number): number {
  const clamped = Math.max(min, Math.min(max, value))
  return Math.round(((clamped - min) / (max - min)) * 100)
}

export default function RadarStats({ stats }: Props) {
  const data = [
    {
      stat: 'FW率',
      value: normalize(stats.fairwayPct, 20, 75),
      raw: `${stats.fairwayPct.toFixed(0)}%`,
    },
    {
      stat: 'GIR率',
      value: normalize(stats.girPct, 5, 60),
      raw: `${stats.girPct.toFixed(0)}%`,
    },
    {
      stat: 'スクランブル',
      value: normalize(stats.scramblingPct, 10, 65),
      raw: `${stats.scramblingPct.toFixed(0)}%`,
    },
    {
      stat: 'パット',
      value: normalize(45 - stats.avgPuttsPerRound, 0, 12), // 少ない方が良い
      raw: `${stats.avgPuttsPerRound.toFixed(1)}回`,
    },
    {
      stat: 'サンドセーブ',
      value: normalize(stats.sandSavePct, 10, 60),
      raw: `${stats.sandSavePct.toFixed(0)}%`,
    },
    {
      stat: 'パー5',
      value: normalize(2 - stats.par5Avg, -0.5, 2), // 対パーが低い方が良い
      raw: `${stats.par5Avg >= 0 ? '+' : ''}${stats.par5Avg.toFixed(2)}`,
    },
  ]

  return (
    <div className="card">
      <h3 className="font-bold text-gray-700 mb-1">スキルレーダー</h3>
      <p className="text-xs text-gray-400 mb-3">アマチュア基準で0〜100スコア化</p>
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" tick={{ fontSize: 12 }} />
          <Radar
            name="あなた"
            dataKey="value"
            stroke="#1a5c38"
            fill="#1a5c38"
            fillOpacity={0.3}
          />
          <Tooltip
            formatter={(_: number, __: string, props: { payload?: { raw?: string } }) =>
              [props.payload?.raw ?? '', '']
            }
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

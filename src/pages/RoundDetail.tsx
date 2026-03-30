import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Round } from '../types'
import { deleteRoundFromFirestore } from '../lib/firestore'
import { deleteRound } from '../utils/storage'
import { calcRoundStats, scoreColor, formatScore } from '../utils/stats'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  rounds: Round[]
  onDeleted: () => void
}

export default function RoundDetail({ rounds, onDeleted }: Props) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const round = rounds.find(r => r.id === id)

  if (!round) return <div className="p-8 text-center text-gray-500">ラウンドが見つかりません</div>

  const stats = calcRoundStats(round)
  const totalPar = round.holes.reduce((s, h) => s + h.par, 0)

  const handleDelete = async () => {
    if (!confirm('このラウンドを削除しますか？')) return
    if (user) {
      await deleteRoundFromFirestore(user.uid, round.id)
    } else {
      deleteRound(round.id)
    }
    onDeleted()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-golf-dark text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => navigate('/')} className="text-gray-300 hover:text-white">← 戻る</button>
          <h1 className="font-bold">{round.courseName}</h1>
          <button onClick={handleDelete} className="text-red-400 hover:text-red-300 text-sm">削除</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Overview */}
        <div className="card bg-golf-dark text-white">
          <div className="text-center">
            <div className="text-xs text-gray-400">{round.date} {round.weather && `• ${round.weather}`}</div>
            <div className="text-5xl font-bold mt-2 text-golf-fairway">{stats.totalScore}</div>
            <div className="text-gray-300">{stats.scoreToPar >= 0 ? '+' : ''}{stats.scoreToPar} (Par {totalPar})</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-600 text-center text-sm">
            <div><div className="text-gray-400 text-xs">FW率</div><div className="font-bold">{stats.fairwayPct.toFixed(0)}%</div></div>
            <div><div className="text-gray-400 text-xs">GIR率</div><div className="font-bold">{stats.girPct.toFixed(0)}%</div></div>
            <div><div className="text-gray-400 text-xs">パット</div><div className="font-bold">{stats.totalPutts}</div></div>
            <div><div className="text-gray-400 text-xs">スクランブル</div><div className="font-bold">{stats.scramblingPct.toFixed(0)}%</div></div>
            <div><div className="text-gray-400 text-xs">サンドセーブ</div><div className="font-bold">{round.holes.some(h => h.inBunker) ? `${stats.sandSavePct.toFixed(0)}%` : '−'}</div></div>
            <div><div className="text-gray-400 text-xs">GIRパット</div><div className="font-bold">{stats.puttsPerGIR > 0 ? stats.puttsPerGIR.toFixed(2) : '−'}</div></div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="card">
          <h3 className="font-bold text-gray-700 mb-2">スコア内訳</h3>
          <div className="flex gap-2 flex-wrap">
            {stats.birdies > 0 && <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">バーディ×{stats.birdies}</span>}
            {stats.pars > 0 && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">パー×{stats.pars}</span>}
            {stats.bogeys > 0 && <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">ボギー×{stats.bogeys}</span>}
            {stats.doubleBogeys > 0 && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">ダボ×{stats.doubleBogeys}</span>}
            {stats.worse > 0 && <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">トリプル以上×{stats.worse}</span>}
          </div>
        </div>

        {/* Hole by hole */}
        <div className="card overflow-x-auto">
          <h3 className="font-bold text-gray-700 mb-3">ホール別スコア</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="text-left pb-1">H</th>
                <th>Par</th>
                <th>Score</th>
                <th>FW</th>
                <th>GIR</th>
                <th>Putt</th>
                <th>Pen</th>
              </tr>
            </thead>
            <tbody>
              {round.holes.map(h => (
                <tr key={h.holeNumber} className="border-b border-gray-50">
                  <td className="py-1.5 font-medium text-gray-600">{h.holeNumber}</td>
                  <td className="text-center text-gray-400">{h.par}</td>
                  <td className={`text-center font-bold ${scoreColor(h.score, h.par)}`}>
                    {h.score}
                    <span className="text-xs font-normal ml-0.5">({formatScore(h.score, h.par)[0]})</span>
                  </td>
                  <td className="text-center">{h.fairwayHit === null ? <span className="text-gray-300">−</span> : h.fairwayHit ? <span className="text-green-500">○</span> : <span className="text-red-400">✕</span>}</td>
                  <td className="text-center">{h.girHit ? <span className="text-green-500">○</span> : <span className="text-red-400">✕</span>}</td>
                  <td className="text-center">{h.putts}</td>
                  <td className="text-center">{h.penaltyStrokes > 0 ? <span className="text-red-500">{h.penaltyStrokes}</span> : <span className="text-gray-300">−</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {round.notes && (
          <div className="card">
            <h3 className="font-bold text-gray-700 mb-1">メモ</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{round.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

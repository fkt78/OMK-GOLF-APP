import React from 'react'
import { HoleData } from '../types'
import { scoreColor } from '../utils/stats'

interface Props {
  hole: HoleData
  onChange: (hole: HoleData) => void
}

export default function HoleInputRow({ hole, onChange }: Props) {
  const update = (field: Partial<HoleData>) => onChange({ ...hole, ...field })

  const diff = hole.score - hole.par
  const diffLabel = diff === 0 ? 'E' : diff > 0 ? `+${diff}` : `${diff}`

  const btnBase = 'w-8 h-8 rounded-full text-sm font-bold border-2 transition-all'
  const btnOn = `${btnBase} bg-golf-green border-golf-green text-white`
  const btnOff = `${btnBase} bg-white border-gray-200 text-gray-500 hover:border-golf-green`

  return (
    <div className="border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-7 h-7 rounded-full bg-golf-dark text-white flex items-center justify-center text-xs font-bold">
          {hole.holeNumber}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Par</span>
          {([3, 4, 5] as const).map(p => (
            <button
              key={p}
              onClick={() => update({ par: p, fairwayHit: p === 3 ? null : hole.fairwayHit })}
              className={`w-7 h-7 rounded text-xs font-semibold border transition-all ${hole.par === p ? 'bg-golf-green text-white border-golf-green' : 'bg-white text-gray-500 border-gray-200'}`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => update({ score: Math.max(1, hole.score - 1) })}
            className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200"
          >−</button>
          <div className="text-center w-14">
            <span className={`text-2xl font-bold ${scoreColor(hole.score, hole.par)}`}>{hole.score}</span>
            <span className="text-xs text-gray-400 ml-1">({diffLabel})</span>
          </div>
          <button
            onClick={() => update({ score: hole.score + 1 })}
            className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200"
          >+</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-2 mt-2">
        {/* Fairway */}
        {hole.par !== 3 && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 w-8">FW</span>
            <button
              onClick={() => update({ fairwayHit: true })}
              className={hole.fairwayHit === true ? btnOn : btnOff}
            >○</button>
            <button
              onClick={() => update({ fairwayHit: false })}
              className={hole.fairwayHit === false ? `${btnBase} bg-red-500 border-red-500 text-white` : btnOff}
            >✕</button>
          </div>
        )}

        {/* GIR */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 w-10">GIR</span>
          <button
            onClick={() => update({ girHit: true, upAndDownAttempt: false, upAndDownSuccess: null })}
            className={hole.girHit ? btnOn : btnOff}
          >○</button>
          <button
            onClick={() => update({ girHit: false })}
            className={!hole.girHit ? `${btnBase} bg-red-500 border-red-500 text-white` : btnOff}
          >✕</button>
        </div>

        {/* Putts */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 w-10">パット</span>
          {[0, 1, 2, 3, 4].map(n => (
            <button
              key={n}
              onClick={() => update({ putts: n })}
              className={`w-8 h-8 rounded text-sm font-semibold border transition-all ${hole.putts === n ? 'bg-golf-green text-white border-golf-green' : 'bg-white text-gray-500 border-gray-200'}`}
            >{n}</button>
          ))}
        </div>

        {/* Up & Down (GIR外のみ) */}
        {!hole.girHit && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 w-16">U&D</span>
            <button
              onClick={() => update({ upAndDownAttempt: true, upAndDownSuccess: true })}
              className={hole.upAndDownAttempt && hole.upAndDownSuccess ? btnOn : btnOff}
            >成功</button>
            <button
              onClick={() => update({ upAndDownAttempt: true, upAndDownSuccess: false })}
              className={hole.upAndDownAttempt && hole.upAndDownSuccess === false ? `${btnBase} bg-red-500 border-red-500 text-white` : btnOff}
            >失敗</button>
            <button
              onClick={() => update({ upAndDownAttempt: false, upAndDownSuccess: null })}
              className={!hole.upAndDownAttempt ? `${btnBase} bg-gray-400 border-gray-400 text-white` : btnOff}
            >−</button>
          </div>
        )}

        {/* Bunker */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 w-16">バンカー</span>
          <button
            onClick={() => update({ inBunker: !hole.inBunker, bunkerSave: !hole.inBunker ? null : hole.bunkerSave })}
            className={hole.inBunker ? btnOn : btnOff}
          >あり</button>
          {hole.inBunker && (
            <>
              <button
                onClick={() => update({ bunkerSave: true })}
                className={hole.bunkerSave === true ? btnOn : btnOff}
              >セーブ</button>
              <button
                onClick={() => update({ bunkerSave: false })}
                className={hole.bunkerSave === false ? `${btnBase} bg-red-500 border-red-500 text-white` : btnOff}
              >NG</button>
            </>
          )}
        </div>

        {/* Penalty */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 w-14">ペナルティ</span>
          {[0, 1, 2, 3].map(n => (
            <button
              key={n}
              onClick={() => update({ penaltyStrokes: n })}
              className={`w-8 h-8 rounded text-sm font-semibold border transition-all ${hole.penaltyStrokes === n ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-500 border-gray-200'}`}
            >{n}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

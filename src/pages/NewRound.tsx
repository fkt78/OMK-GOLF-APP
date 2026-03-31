import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Lock, Sun, Cloud, CloudRain, Wind, ChevronDown, ChevronRight, Pencil } from 'lucide-react'
import { HoleData, Round } from '../types'
import HoleInputRow from '../components/HoleInputRow'
import { saveRound, generateId } from '../utils/storage'
import { saveRoundToFirestore } from '../lib/firestore'
import { calcRoundStats } from '../utils/stats'
import { useAuth } from '../contexts/AuthContext'
import { REGION_NAMES, getPrefectures, getCourses } from '../data/golfCourseData'

function defaultHole(n: number): HoleData {
  return {
    holeNumber: n,
    par: 4,
    score: 5,
    fairwayHit: null,
    girHit: false,
    putts: 2,
    inBunker: false,
    bunkerSave: null,
    penaltyStrokes: 0,
    upAndDownAttempt: false,
    upAndDownSuccess: null,
  }
}

interface Props {
  onSaved: () => void
}

const WEATHER_OPTIONS = [
  { value: '晴れ', label: '晴れ', icon: Sun },
  { value: '曇り', label: '曇り', icon: Cloud },
  { value: '雨', label: '雨', icon: CloudRain },
  { value: '風強', label: '風強', icon: Wind },
]

export default function NewRound({ onSaved }: Props) {
  const navigate = useNavigate()
  const { user, canAddRound, FREE_ROUND_LIMIT } = useAuth()

  const [courseName, setCourseName] = useState('')
  const [coursePickerRegion, setCoursePickerRegion] = useState('')
  const [coursePickerPref, setCoursePickerPref] = useState('')
  const [coursePickerStep, setCoursePickerStep] = useState<'region' | 'pref' | 'course' | 'manual' | null>(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [weather, setWeather] = useState('')
  const [notes, setNotes] = useState('')
  const [holes, setHoles] = useState<HoleData[]>(
    Array.from({ length: 18 }, (_, i) => defaultHole(i + 1))
  )
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front')

  const updateHole = (idx: number, updated: HoleData) => {
    setHoles(prev => prev.map((h, i) => i === idx ? updated : h))
  }

  const displayHoles = activeTab === 'front' ? holes.slice(0, 9) : holes.slice(9, 18)
  const displayOffset = activeTab === 'front' ? 0 : 9

  const stats = calcRoundStats({ id: '', date, courseName, holes } as Round)
  const frontScore = holes.slice(0, 9).reduce((s, h) => s + h.score, 0)
  const backScore = holes.slice(9, 18).reduce((s, h) => s + h.score, 0)
  const frontPar = holes.slice(0, 9).reduce((s, h) => s + h.par, 0)
  const backPar = holes.slice(9, 18).reduce((s, h) => s + h.par, 0)

  // 無料枠上限
  if (!canAddRound) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Lock size={28} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">無料プランの上限に達しました</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          無料プランは{FREE_ROUND_LIMIT}ラウンドまで保存できます。<br />
          プレミアムプランで無制限に記録できます。
        </p>
        <button className="bg-golf-green text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-golf-lightGreen mb-3">
          プレミアムにアップグレード（¥300/月）
        </button>
        <button onClick={() => navigate('/')} className="text-gray-400 text-sm">
          戻る
        </button>
      </div>
    )
  }

  const handleSave = async () => {
    if (!courseName.trim()) {
      alert('コース名を入力してください')
      return
    }
    setSaving(true)
    try {
      const round: Round = {
        id: generateId(),
        date,
        courseName: courseName.trim(),
        weather,
        notes,
        holes,
      }
      if (user) {
        await saveRoundToFirestore(user.uid, round)
      } else {
        saveRound(round)
      }
      onSaved()
      navigate('/')
    } catch (e) {
      console.error(e)
      alert('保存に失敗しました。再度お試しください。')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-golf-dark text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => navigate('/')} className="text-gray-300 hover:text-white text-sm">戻る</button>
          <h1 className="font-bold text-lg">新しいラウンド</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-golf-fairway text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-golf-lightGreen disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {/* 未ログイン時の注意 */}
      {!user && (
        <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-center gap-2 text-xs text-yellow-700">
          <AlertTriangle size={13} />
          ログインしていません。データはこのデバイスにのみ保存されます。
        </div>
      )}

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Course Info */}
        <div className="card space-y-3">
          {/* ─── コース名ピッカー ─── */}
          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide">コース名</label>

            {/* 選択済み or 手入力の表示 */}
            {courseName ? (
              <div className="mt-1 flex items-center gap-2 bg-green-50 border border-golf-green rounded-lg px-3 py-2">
                <span className="text-sm font-semibold text-golf-green flex-1">{courseName}</span>
                {coursePickerPref && <span className="text-xs text-gray-400">{coursePickerPref}</span>}
                <button
                  type="button"
                  onClick={() => { setCourseName(''); setCoursePickerRegion(''); setCoursePickerPref(''); setCoursePickerStep('region') }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Pencil size={13} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCoursePickerStep('region')}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-left text-gray-400 flex justify-between items-center bg-white"
              >
                <span>地方・都道府県から選ぶ</span>
                <ChevronDown size={14} className="text-gray-300" />
              </button>
            )}

            {/* Step 1: 地方選択 */}
            {coursePickerStep === 'region' && (
              <div className="mt-2 border border-gray-100 rounded-xl bg-gray-50 p-2">
                <p className="text-xs text-gray-400 mb-2 px-1">地方を選択</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {REGION_NAMES.map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => { setCoursePickerRegion(r); setCoursePickerPref(''); setCoursePickerStep('pref') }}
                      className="py-2.5 px-3 rounded-lg text-sm font-medium text-left bg-white border border-gray-200 hover:border-golf-green text-gray-700 flex justify-between items-center"
                    >
                      <span>{r}</span>
                      <ChevronRight size={13} className="text-gray-300" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => { setCoursePickerStep('manual') }}
                  className="mt-2 w-full py-2 px-3 rounded-lg text-xs font-medium text-gray-500 bg-white border border-dashed border-gray-300 hover:border-golf-green"
                >
                  リストにないコースを手入力
                </button>
                <button type="button" onClick={() => setCoursePickerStep(null)} className="mt-1 w-full py-1.5 text-xs text-gray-400">閉じる</button>
              </div>
            )}

            {/* Step 2: 都道府県選択 */}
            {coursePickerStep === 'pref' && coursePickerRegion && (
              <div className="mt-2 border border-gray-100 rounded-xl bg-gray-50 p-2">
                <button type="button" onClick={() => setCoursePickerStep('region')} className="text-xs text-golf-green mb-2 px-1 flex items-center gap-1">
                  ← {coursePickerRegion}
                </button>
                <p className="text-xs text-gray-400 mb-2 px-1">都道府県を選択</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {getPrefectures(coursePickerRegion).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => { setCoursePickerPref(p); setCoursePickerStep('course') }}
                      className="py-2.5 px-3 rounded-lg text-sm font-medium text-left bg-white border border-gray-200 hover:border-golf-green text-gray-700 flex justify-between items-center"
                    >
                      <span>{p}</span>
                      <ChevronRight size={13} className="text-gray-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: コース選択 */}
            {coursePickerStep === 'course' && coursePickerRegion && coursePickerPref && (
              <div className="mt-2 border border-gray-100 rounded-xl bg-gray-50 p-2">
                <button type="button" onClick={() => setCoursePickerStep('pref')} className="text-xs text-golf-green mb-2 px-1 flex items-center gap-1">
                  ← {coursePickerPref}
                </button>
                <p className="text-xs text-gray-400 mb-2 px-1">コースを選択（50音順）</p>
                <div className="grid grid-cols-1 gap-1">
                  {getCourses(coursePickerRegion, coursePickerPref).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => { setCourseName(c); setCoursePickerStep(null) }}
                      className="py-2.5 px-3 rounded-lg text-sm text-left bg-white border border-gray-200 hover:border-golf-green text-gray-700"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCoursePickerStep('manual')}
                  className="mt-2 w-full py-2 px-3 rounded-lg text-xs font-medium text-gray-500 bg-white border border-dashed border-gray-300 hover:border-golf-green"
                >
                  リストにないコースを手入力
                </button>
              </div>
            )}

            {/* 手入力モード */}
            {coursePickerStep === 'manual' && (
              <div className="mt-2">
                <input
                  type="text"
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                  onBlur={() => { if (courseName.trim()) setCoursePickerStep(null) }}
                  placeholder="コース名を入力..."
                  autoFocus
                  className="w-full border border-golf-green rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
                />
                <button type="button" onClick={() => setCoursePickerStep(null)} className="mt-1 text-xs text-gray-400">キャンセル</button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide">日付</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide">天候</label>
              <div className="mt-1 grid grid-cols-4 gap-1">
                {WEATHER_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setWeather(weather === value ? '' : value)}
                    className={`flex flex-col items-center py-1.5 rounded-lg text-xs border transition-all ${weather === value ? 'bg-golf-green text-white border-golf-green' : 'bg-white text-gray-500 border-gray-200'}`}
                  >
                    <Icon size={14} />
                    <span className="mt-0.5">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="card bg-golf-dark text-white">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xs text-gray-400">前半</div>
              <div className="text-2xl font-bold">{frontScore}</div>
              <div className="text-xs text-gray-400">({frontScore > frontPar ? '+' : ''}{frontScore - frontPar})</div>
            </div>
            <div className="border-x border-gray-600">
              <div className="text-xs text-gray-400">合計</div>
              <div className="text-3xl font-bold text-golf-fairway">{stats.totalScore}</div>
              <div className="text-xs text-gray-400">({stats.scoreToPar >= 0 ? '+' : ''}{stats.scoreToPar})</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">後半</div>
              <div className="text-2xl font-bold">{backScore}</div>
              <div className="text-xs text-gray-400">({backScore > backPar ? '+' : ''}{backScore - backPar})</div>
            </div>
          </div>
          <div className="flex justify-around mt-3 pt-3 border-t border-gray-600 text-xs text-gray-300">
            <span>GIR: {stats.girPct.toFixed(0)}%</span>
            <span>FW: {stats.fairwayPct.toFixed(0)}%</span>
            <span>パット: {stats.totalPutts}</span>
          </div>
        </div>

        {/* Front/Back tabs */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => setActiveTab('front')}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${activeTab === 'front' ? 'bg-golf-green text-white' : 'bg-white text-gray-600'}`}
          >
            前半 ({frontScore})
          </button>
          <button
            onClick={() => setActiveTab('back')}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${activeTab === 'back' ? 'bg-golf-green text-white' : 'bg-white text-gray-600'}`}
          >
            後半 ({backScore})
          </button>
        </div>

        {/* Hole inputs */}
        <div className="space-y-2">
          {displayHoles.map((hole, i) => (
            <HoleInputRow
              key={hole.holeNumber}
              hole={hole}
              onChange={updated => updateHole(displayOffset + i, updated)}
            />
          ))}
        </div>

        {/* Notes */}
        <div className="card">
          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide">メモ</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="今日のラウンドについてメモ..."
            rows={3}
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green resize-none"
          />
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary w-full py-3 text-base">
          {saving ? '保存中...' : 'ラウンドを保存'}
        </button>
      </div>
    </div>
  )
}

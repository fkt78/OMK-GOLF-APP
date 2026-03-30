import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { FirebaseError } from 'firebase/app'
import { Plus, Pencil, Trash2, Check } from 'lucide-react'
import { Club, GearSet, ClubType, CLUB_TYPE_LABELS } from '../types'
import { loadClubs, saveClub, updateClub, deleteClub, loadGearSets, saveGearSet, updateGearSet, deleteGearSet } from '../lib/firestore'
import { useAuth } from '../contexts/AuthContext'
import BottomNav from '../components/BottomNav'
import {
  CLUB_NUMBERS,
  MAKER_NAMES,
  getSeriesOptions,
  CUSTOM_INPUT_VALUE,
  SHAFT_OPTIONS,
  HOSEL_PRESETS,
  FLEX_PRESET_OPTIONS,
  SHAFT_WEIGHT_PRESETS,
  BALANCE_PRESETS,
} from '../data/clubData'

const CLUB_TYPE_ORDER: ClubType[] = ['driver', 'wood', 'utility', 'iron', 'wedge', 'putter', 'other']

function clubSaveErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    if (err.code === 'permission-denied') {
      return '保存が拒否されました（権限がありません）。アプリ管理者が Firebase のセキュリティルールを公開用に更新する必要があります。'
    }
    if (err.code === 'failed-precondition') {
      return 'データベースの準備が完了していません。数分待ってから再試行するか、管理者にインデックス作成を依頼してください。'
    }
    if (err.code === 'unavailable') {
      return 'サーバーに接続できませんでした。通信状況を確認してから再試行してください。'
    }
    return `保存に失敗しました（${err.code}）。しばらくしてから再試行してください。`
  }
  return '保存に失敗しました。通信状況を確認するか、しばらくしてからもう一度お試しください。'
}

function roundLoftHalf(n: number): number {
  return Math.round(n * 2) / 2
}

/** メーカー一覧（「その他」は手入力にまとめる） */
const MAKER_DROPDOWN = MAKER_NAMES.filter(m => m !== 'その他')

function emptyClub(): Omit<Club, 'id' | 'userId' | 'createdAt'> {
  return {
    type: 'driver',
    typeDetail: '',
    number: '1W',
    maker: '',
    series: '',
    nickname: '',
    shaft: '',
    shaftWeight: '',
    flex: '',
    loft: undefined,
    balance: '',
    hoselSetting: '',
    notes: '',
  }
}

type ClubFormState = Omit<Club, 'id' | 'userId' | 'createdAt'>

function ClubFormFields({
  clubForm,
  setClubForm,
}: {
  clubForm: ClubFormState
  setClubForm: Dispatch<SetStateAction<ClubFormState>>
}) {
  const numberOptions = CLUB_NUMBERS[clubForm.type] ?? []
  const numberIsCustom = !numberOptions.includes(clubForm.number)
  const numberSelectVal = numberIsCustom ? CUSTOM_INPUT_VALUE : clubForm.number

  const makerIsCustom = !MAKER_DROPDOWN.includes(clubForm.maker)
  const makerSelectVal = makerIsCustom ? CUSTOM_INPUT_VALUE : clubForm.maker

  const seriesOpts = getSeriesOptions(clubForm.maker, clubForm.type)
  const seriesInList = seriesOpts.length > 0 && seriesOpts.includes(clubForm.series)
  const seriesSelectVal = seriesOpts.length === 0 ? CUSTOM_INPUT_VALUE : (seriesInList ? clubForm.series : CUSTOM_INPUT_VALUE)

  const shaftSelectVal = !clubForm.shaft ? '' : (SHAFT_OPTIONS.includes(clubForm.shaft) ? clubForm.shaft : CUSTOM_INPUT_VALUE)
  const showShaftCustom = shaftSelectVal === CUSTOM_INPUT_VALUE || (!!clubForm.shaft && !SHAFT_OPTIONS.includes(clubForm.shaft))

  const flexSelectVal = !clubForm.flex ? '' : (FLEX_PRESET_OPTIONS.includes(clubForm.flex) ? clubForm.flex : CUSTOM_INPUT_VALUE)
  const showFlexCustom = flexSelectVal === CUSTOM_INPUT_VALUE || (!!clubForm.flex && !FLEX_PRESET_OPTIONS.includes(clubForm.flex))

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500">種類</label>
          <select
            value={clubForm.type}
            onChange={e => {
              const newType = e.target.value as ClubType
              const firstNum = CLUB_NUMBERS[newType]?.[0] ?? ''
              setClubForm(f => ({ ...f, type: newType, number: firstNum, series: '' }))
            }}
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            {CLUB_TYPE_ORDER.map(t => <option key={t} value={t}>{CLUB_TYPE_LABELS[t]}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500">番手/名称</label>
          <select
            value={numberSelectVal}
            onChange={e => {
              const v = e.target.value
              if (v === CUSTOM_INPUT_VALUE) setClubForm(f => ({ ...f, number: '' }))
              else setClubForm(f => ({ ...f, number: v }))
            }}
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            {numberOptions.map(n => <option key={n} value={n}>{n}</option>)}
            <option value={CUSTOM_INPUT_VALUE}>その他（手入力）</option>
          </select>
          {(numberIsCustom || numberSelectVal === CUSTOM_INPUT_VALUE) && (
            <input
              value={clubForm.number}
              onChange={e => setClubForm(f => ({ ...f, number: e.target.value }))}
              placeholder="例: 5W ロフト調整・チッパー表記など"
              className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
            />
          )}
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500">種類の補足（任意）</label>
        <input
          value={clubForm.typeDetail ?? ''}
          onChange={e => setClubForm(f => ({ ...f, typeDetail: e.target.value }))}
          placeholder="例: チッパー・特殊形状・セット内の呼び名など"
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500">メーカー</label>
        <select
          value={makerSelectVal}
          onChange={e => {
            const v = e.target.value
            if (v === CUSTOM_INPUT_VALUE) setClubForm(f => ({ ...f, maker: '', series: '' }))
            else setClubForm(f => ({ ...f, maker: v, series: '' }))
          }}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">選択してください</option>
          {MAKER_DROPDOWN.map(m => <option key={m} value={m}>{m}</option>)}
          <option value={CUSTOM_INPUT_VALUE}>その他（手入力）</option>
        </select>
        {(makerIsCustom || makerSelectVal === CUSTOM_INPUT_VALUE) && (
          <input
            value={clubForm.maker}
            onChange={e => setClubForm(f => ({ ...f, maker: e.target.value, series: '' }))}
            placeholder="メーカー名を入力"
            className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
          />
        )}
      </div>
      <div>
        <label className="text-xs text-gray-500">シリーズ/モデル</label>
        {seriesOpts.length > 0 ? (
          <>
            <select
              value={seriesSelectVal}
              onChange={e => {
                const v = e.target.value
                if (v === CUSTOM_INPUT_VALUE) setClubForm(f => ({ ...f, series: '' }))
                else setClubForm(f => ({ ...f, series: v }))
              }}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">選択してください</option>
              {seriesOpts.map(s => <option key={s} value={s}>{s}</option>)}
              <option value={CUSTOM_INPUT_VALUE}>その他（手入力）</option>
            </select>
            {(!seriesInList || seriesSelectVal === CUSTOM_INPUT_VALUE) && (
              <input
                value={clubForm.series}
                onChange={e => setClubForm(f => ({ ...f, series: e.target.value }))}
                placeholder="モデル名を入力..."
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
              />
            )}
          </>
        ) : (
          <input
            value={clubForm.series}
            onChange={e => setClubForm(f => ({ ...f, series: e.target.value }))}
            placeholder="モデル名を入力..."
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
          />
        )}
      </div>
      <div>
        <label className="text-xs text-gray-500">ニックネーム（任意）</label>
        <input value={clubForm.nickname} onChange={e => setClubForm(f => ({ ...f, nickname: e.target.value }))} placeholder="例: エース, 切り札..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
      </div>
      <div>
        <label className="text-xs text-gray-500">シャフト</label>
        <select
          value={shaftSelectVal}
          onChange={e => {
            const v = e.target.value
            if (v === '' || v === CUSTOM_INPUT_VALUE) setClubForm(f => ({ ...f, shaft: '' }))
            else setClubForm(f => ({ ...f, shaft: v }))
          }}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">未設定</option>
          {SHAFT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          <option value={CUSTOM_INPUT_VALUE}>その他（手入力）</option>
        </select>
        {showShaftCustom && (
          <input
            value={clubForm.shaft}
            onChange={e => setClubForm(f => ({ ...f, shaft: e.target.value }))}
            placeholder="シャフト名を自由入力（リストにないモデルなど）"
            className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
          />
        )}
      </div>
      <div>
        <label className="text-xs text-gray-500">シャフト重量</label>
        <input
          value={clubForm.shaftWeight ?? ''}
          onChange={e => setClubForm(f => ({ ...f, shaftWeight: e.target.value }))}
          list="shaft-weight-presets"
          placeholder="例: 50g, 40g, Sシャフト 50g など"
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
        />
        <datalist id="shaft-weight-presets">
          {SHAFT_WEIGHT_PRESETS.map(w => <option key={w} value={w} />)}
        </datalist>
      </div>
      <div>
        <label className="text-xs text-gray-500">フレックス</label>
        <select
          value={flexSelectVal}
          onChange={e => {
            const v = e.target.value
            if (v === '') setClubForm(f => ({ ...f, flex: '' }))
            else if (v === CUSTOM_INPUT_VALUE) setClubForm(f => ({ ...f, flex: '' }))
            else setClubForm(f => ({ ...f, flex: v }))
          }}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">未設定</option>
          {FLEX_PRESET_OPTIONS.map(fl => <option key={fl} value={fl}>{fl}</option>)}
          <option value={CUSTOM_INPUT_VALUE}>その他（手入力）</option>
        </select>
        {showFlexCustom && (
          <input
            value={clubForm.flex}
            onChange={e => setClubForm(f => ({ ...f, flex: e.target.value }))}
            placeholder="例: XX、Tour XX、7.2、カスタム表記"
            className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
          />
        )}
        <p className="text-xs text-gray-400 mt-1">X より硬い XX / Tour X、数値フレックス（6.5 等）はプリセットまたは手入力で。</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500">ロフト (°) ※0.5°刻み</label>
          <input
            type="number"
            step={0.5}
            min={4}
            max={68}
            value={clubForm.loft === undefined ? '' : clubForm.loft}
            onChange={e => {
              const v = e.target.value
              if (v === '') {
                setClubForm(f => ({ ...f, loft: undefined }))
                return
              }
              const n = parseFloat(v)
              if (Number.isNaN(n)) return
              setClubForm(f => ({ ...f, loft: roundLoftHalf(n) }))
            }}
            onBlur={e => {
              const v = e.target.value
              if (v === '') return
              const n = parseFloat(v)
              if (Number.isNaN(n)) return
              const r = roundLoftHalf(n)
              if (r !== clubForm.loft) setClubForm(f => ({ ...f, loft: r }))
            }}
            placeholder="10.5"
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">バランス（スイングウェイト）</label>
          <input
            value={clubForm.balance ?? ''}
            onChange={e => setClubForm(f => ({ ...f, balance: e.target.value }))}
            list="balance-presets"
            placeholder="例: D0, C9"
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
          />
          <datalist id="balance-presets">
            {BALANCE_PRESETS.map(b => <option key={b} value={b} />)}
          </datalist>
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500">ヘッド調整・スリーブ（カチャカチャ）</label>
        <input
          value={clubForm.hoselSetting ?? ''}
          onChange={e => setClubForm(f => ({ ...f, hoselSetting: e.target.value }))}
          list="hosel-presets"
          placeholder="候補から選ぶか、独自の設定を入力"
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green"
        />
        <datalist id="hosel-presets">
          {HOSEL_PRESETS.map(p => <option key={p} value={p} />)}
        </datalist>
        <p className="text-xs text-gray-400 mt-1">ロフト・ライ角・ドロー/フェードなど、スリーブの向きやメーカー表記をメモできます。</p>
      </div>
      <div>
        <label className="text-xs text-gray-500">メモ</label>
        <textarea value={clubForm.notes} onChange={e => setClubForm(f => ({ ...f, notes: e.target.value }))} rows={2} placeholder="調整内容など..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-golf-green" />
      </div>
    </div>
  )
}

export default function MyBag() {
  const { user } = useAuth()
  const [clubs, setClubs] = useState<Club[]>([])
  const [gearSets, setGearSets] = useState<GearSet[]>([])
  const [tab, setTab] = useState<'clubs' | 'sets'>('clubs')
  const [editingClub, setEditingClub] = useState<Club | null>(null)
  const [addingClub, setAddingClub] = useState(false)
  const [clubForm, setClubForm] = useState(emptyClub())
  const [editingSet, setEditingSet] = useState<GearSet | null>(null)
  const [addingSet, setAddingSet] = useState(false)
  const [setName, setSetName] = useState('')
  const [selectedClubIds, setSelectedClubIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [clubSaveError, setClubSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    Promise.all([loadClubs(user.uid), loadGearSets(user.uid)])
      .then(([c, s]) => { setClubs(c); setGearSets(s) })
      .finally(() => setLoading(false))
  }, [user])

  const refresh = async () => {
    if (!user) return
    const [c, s] = await Promise.all([loadClubs(user.uid), loadGearSets(user.uid)])
    setClubs(c); setGearSets(s)
  }

  // ─── クラブ操作 ───────────────────────────────
  const handleSaveClub = async () => {
    if (!user || !clubForm.maker.trim()) return
    setClubSaveError(null)
    try {
      if (editingClub) {
        await updateClub(editingClub.id, clubForm)
      } else {
        await saveClub(user.uid, clubForm)
      }
      setEditingClub(null)
      setAddingClub(false)
      setClubForm(emptyClub())
      await refresh()
    } catch (err) {
      console.error(err)
      setClubSaveError(clubSaveErrorMessage(err))
    }
  }

  const handleDeleteClub = async (club: Club) => {
    if (!confirm(`「${club.nickname || club.maker}」を削除しますか？`)) return
    await deleteClub(club.id)
    await refresh()
  }

  // ─── ギアセット操作 ────────────────────────────
  const handleSaveSet = async () => {
    if (!user || !setName.trim() || selectedClubIds.length === 0) return
    const data = { name: setName, clubIds: selectedClubIds, isDefault: gearSets.length === 0 }
    if (editingSet) {
      await updateGearSet(editingSet.id, data)
    } else {
      await saveGearSet(user.uid, data)
    }
    setEditingSet(null); setAddingSet(false); setSetName(''); setSelectedClubIds([])
    await refresh()
  }

  const handleDeleteSet = async (set: GearSet) => {
    if (!confirm(`「${set.name}」を削除しますか？`)) return
    await deleteGearSet(set.id)
    await refresh()
  }

  const toggleClubInSet = (id: string) => {
    setSelectedClubIds(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : prev.length < 14 ? [...prev, id] : prev
    )
  }

  const clubById = (id: string) => clubs.find(c => c.id === id)

  const clubsByType = CLUB_TYPE_ORDER.reduce((acc, type) => {
    const list = clubs.filter(c => c.type === type)
    if (list.length > 0) acc[type] = list
    return acc
  }, {} as Record<string, Club[]>)

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm mb-4">ログインが必要です</p>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-golf-dark text-white p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-bold text-lg">マイバッグ</h1>
          <p className="text-xs text-gray-400">クラブ {clubs.length}本 登録済み</p>
        </div>
      </div>

      {/* Tab */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-white">
          <button onClick={() => setTab('clubs')} className={`flex-1 py-2 text-sm font-semibold ${tab === 'clubs' ? 'bg-golf-green text-white' : 'text-gray-600'}`}>
            クラブ一覧
          </button>
          <button onClick={() => setTab('sets')} className={`flex-1 py-2 text-sm font-semibold ${tab === 'sets' ? 'bg-golf-green text-white' : 'text-gray-600'}`}>
            今日のセット ({gearSets.length})
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-3">
        {/* ─── クラブ一覧タブ ─── */}
        {tab === 'clubs' && (
          <>
            {loading ? (
              <div className="text-center py-8 text-gray-400">読み込み中...</div>
            ) : clubs.length === 0 ? (
              <div className="card text-center py-10">
                <p className="text-gray-500 mb-4">まだクラブが登録されていません</p>
                <button onClick={() => { setClubSaveError(null); setAddingClub(true); setClubForm(emptyClub()) }} className="btn-primary px-6 py-2">
                  最初のクラブを追加
                </button>
              </div>
            ) : (
              Object.entries(clubsByType).map(([type, list]) => (
                <div key={type} className="card">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                    {CLUB_TYPE_LABELS[type as ClubType]}
                  </h3>
                  <div className="space-y-2">
                    {list.map(club => (
                      <div key={club.id} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-lg bg-golf-dark text-white text-xs font-bold flex items-center justify-center">
                            {club.number}
                          </span>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">
                              {club.nickname || `${club.maker} ${club.series}`}
                            </div>
                            {club.nickname && (
                              <div className="text-xs text-gray-400">{club.maker} {club.series}</div>
                            )}
                            {club.typeDetail && <div className="text-xs text-amber-700">種類メモ: {club.typeDetail}</div>}
                            {club.flex && <div className="text-xs text-gray-400">フレックス: {club.flex}</div>}
                            {club.shaftWeight && <div className="text-xs text-gray-400">重量: {club.shaftWeight}</div>}
                            {club.balance && <div className="text-xs text-gray-400">バランス: {club.balance}</div>}
                            {club.hoselSetting && <div className="text-xs text-gray-500">調整: {club.hoselSetting}</div>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setClubSaveError(null); setEditingClub(club); setClubForm({ type: club.type, typeDetail: club.typeDetail ?? '', number: club.number, maker: club.maker, series: club.series, nickname: club.nickname, shaft: club.shaft ?? '', shaftWeight: club.shaftWeight ?? '', flex: club.flex ?? '', loft: club.loft, balance: club.balance ?? '', hoselSetting: club.hoselSetting ?? '', notes: club.notes ?? '' }); setAddingClub(false) }} className="p-1.5 text-gray-400 hover:text-golf-green">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDeleteClub(club)} className="p-1.5 text-gray-400 hover:text-red-500">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => { setClubSaveError(null); setAddingClub(true); setEditingClub(null); setClubForm(emptyClub()) }}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              <Plus size={16} /> クラブを追加
            </button>
          </>
        )}

        {/* ─── ギアセットタブ ─── */}
        {tab === 'sets' && (
          <>
            {gearSets.length === 0 && !addingSet ? (
              <div className="card text-center py-10">
                <p className="text-gray-500 mb-1 text-sm">14本のセットを登録しましょう</p>
                <p className="text-gray-400 text-xs mb-4">ラウンド開始時に選択できます</p>
                <button onClick={() => { setAddingSet(true); setSetName(''); setSelectedClubIds([]) }} className="btn-primary px-6 py-2" disabled={clubs.length === 0}>
                  {clubs.length === 0 ? '先にクラブを登録してください' : '最初のセットを作成'}
                </button>
              </div>
            ) : (
              gearSets.map(set => (
                <div key={set.id} className="card">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{set.name}</span>
                        {set.isDefault && <span className="text-xs bg-golf-green text-white px-2 py-0.5 rounded-full">デフォルト</span>}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{set.clubIds.length}本選択中</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingSet(set); setSetName(set.name); setSelectedClubIds(set.clubIds); setAddingSet(false) }} className="p-1.5 text-gray-400 hover:text-golf-green">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDeleteSet(set)} className="p-1.5 text-gray-400 hover:text-red-500">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {set.clubIds.map(id => {
                      const c = clubById(id)
                      return c ? (
                        <span key={id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {c.nickname || c.number}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              ))
            )}

            {!addingSet && !editingSet && clubs.length > 0 && (
              <button onClick={() => { setAddingSet(true); setEditingSet(null); setSetName(''); setSelectedClubIds([]) }} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                <Plus size={16} /> 新しいセットを作成
              </button>
            )}
          </>
        )}
      </div>

      {/* ─── クラブ編集モーダル ─── */}
      {(addingClub || editingClub) && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto">
            <h2 className="font-bold text-lg mb-4">{editingClub ? 'クラブを編集' : 'クラブを追加'}</h2>
            <ClubFormFields
              clubForm={clubForm}
              setClubForm={setClubForm}
            />
            {!clubForm.maker.trim() && (
              <p className="text-xs text-amber-700 mt-2">メーカーを選択するか、「その他（手入力）」で入力してください。</p>
            )}
            {clubSaveError && (
              <p className="text-sm text-red-600 mt-3 text-center">{clubSaveError}</p>
            )}
            <div className="flex gap-3 mt-4">
              <button type="button" onClick={() => { setClubSaveError(null); setEditingClub(null); setAddingClub(false) }} className="flex-1 btn-secondary py-3">キャンセル</button>
              <button type="button" onClick={handleSaveClub} disabled={!clubForm.maker.trim()} className="flex-1 btn-primary py-3">保存</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ギアセット作成モーダル ─── */}
      {(addingSet || editingSet) && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-lg mb-1">{editingSet ? 'セットを編集' : '新しいセットを作成'}</h2>
            <p className="text-xs text-gray-400 mb-4">最大14本まで選択できます（現在 {selectedClubIds.length}/14）</p>
            <div className="mb-4">
              <label className="text-xs text-gray-500">セット名</label>
              <input value={setName} onChange={e => setSetName(e.target.value)} placeholder="いつもの14本, 雨の日セット..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
            </div>
            <div className="space-y-1">
              {clubs.map(club => {
                const selected = selectedClubIds.includes(club.id)
                return (
                  <button
                    key={club.id}
                    onClick={() => toggleClubInSet(club.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${selected ? 'border-golf-green bg-green-50' : 'border-gray-100 bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-golf-green border-golf-green' : 'border-gray-300'}`}>
                      {selected && <Check size={12} color="white" />}
                    </div>
                    <span className="w-9 h-9 rounded-lg bg-golf-dark text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {club.number}
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-sm text-gray-800">{club.nickname || `${club.maker} ${club.series}`}</div>
                      {club.nickname && <div className="text-xs text-gray-400">{club.maker} {club.series}</div>}
                    </div>
                    <span className="ml-auto text-xs text-gray-400">{CLUB_TYPE_LABELS[club.type]}</span>
                  </button>
                )
              })}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setEditingSet(null); setAddingSet(false) }} className="flex-1 btn-secondary py-3">キャンセル</button>
              <button onClick={handleSaveSet} disabled={!setName.trim() || selectedClubIds.length === 0} className="flex-1 btn-primary py-3">保存</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

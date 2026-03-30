import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { updateUserProfile } from '../lib/firestore'
import { UserProfile } from '../types'
import BottomNav from '../components/BottomNav'
import AuthButton from '../components/AuthButton'

export default function Profile() {
  const { user, profile, signInWithGoogle, refreshProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    averageScore: '',
    driverDistance: '',
    handicap: '',
    dominantHand: 'right' as 'right' | 'left',
    homeCourse: '',
    startedYear: '',
    targetScore: '',
    bio: '',
  })

  useEffect(() => {
    if (profile) {
      setForm({
        averageScore: profile.averageScore?.toString() ?? '',
        driverDistance: profile.driverDistance?.toString() ?? '',
        handicap: profile.handicap?.toString() ?? '',
        dominantHand: profile.dominantHand ?? 'right',
        homeCourse: profile.homeCourse ?? '',
        startedYear: profile.startedYear?.toString() ?? '',
        targetScore: profile.targetScore?.toString() ?? '',
        bio: profile.bio ?? '',
      })
    }
  }, [profile])

  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setSaveError(null)
    try {
      const update: Partial<UserProfile> = {
        averageScore: form.averageScore ? Number(form.averageScore) : undefined,
        driverDistance: form.driverDistance ? Number(form.driverDistance) : undefined,
        handicap: form.handicap ? Number(form.handicap) : undefined,
        dominantHand: form.dominantHand,
        homeCourse: form.homeCourse || undefined,
        startedYear: form.startedYear ? Number(form.startedYear) : undefined,
        targetScore: form.targetScore ? Number(form.targetScore) : undefined,
        bio: form.bio || undefined,
      }
      await updateUserProfile(user.uid, update)
      await refreshProfile()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setSaveError('保存に失敗しました。もう一度お試しください。')
    } finally {
      setSaving(false)
    }
  }

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-golf-dark text-white p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <h1 className="font-bold text-lg">プロフィール</h1>
            <AuthButton />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <User size={28} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm mb-6 text-center">ログインするとプロフィールを<br />保存できます</p>
          <button onClick={signInWithGoogle} className="btn-primary px-8 py-3">
            Googleでログイン
          </button>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-golf-dark text-white p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-lg">プロフィール</h1>
          <AuthButton />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* アカウント情報 */}
        <div className="card flex items-center gap-4">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-golf-green flex items-center justify-center text-white text-2xl font-bold">
              {user.displayName?.[0]}
            </div>
          )}
          <div>
            <div className="font-bold text-gray-800 text-lg">{user.displayName}</div>
            <div className="text-sm text-gray-400">{user.email}</div>
            <div className={`text-xs font-bold mt-1 ${profile?.plan === 'premium' ? 'text-yellow-600' : 'text-gray-400'}`}>
              {profile?.plan === 'premium' ? 'プレミアムプラン' : '無料プラン'}
            </div>
          </div>
        </div>

        {/* 一言コメント */}
        <div className="card space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">一言コメント</label>
          <textarea
            value={form.bio}
            onChange={e => set('bio', e.target.value)}
            placeholder="ゴルフに対する想いや目標など..."
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-golf-green"
          />
        </div>

        {/* スタッツデータ */}
        <div className="card space-y-3">
          <h3 className="font-bold text-gray-700">ゴルフデータ</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">平均スコア</label>
              <input type="number" value={form.averageScore} onChange={e => set('averageScore', e.target.value)} placeholder="例: 98" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
            </div>
            <div>
              <label className="text-xs text-gray-500">目標スコア</label>
              <input type="number" value={form.targetScore} onChange={e => set('targetScore', e.target.value)} placeholder="例: 90" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
            </div>
            <div>
              <label className="text-xs text-gray-500">ドライバー飛距離 (yd)</label>
              <input type="number" value={form.driverDistance} onChange={e => set('driverDistance', e.target.value)} placeholder="例: 230" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
            </div>
            <div>
              <label className="text-xs text-gray-500">ハンディキャップ</label>
              <input type="number" value={form.handicap} onChange={e => set('handicap', e.target.value)} placeholder="例: 18" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
            </div>
          </div>
        </div>

        {/* 個人情報 */}
        <div className="card space-y-3">
          <h3 className="font-bold text-gray-700">個人データ</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">利き手</label>
              <div className="mt-1 flex gap-2">
                {(['right', 'left'] as const).map(hand => (
                  <button
                    key={hand}
                    onClick={() => set('dominantHand', hand)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${form.dominantHand === hand ? 'bg-golf-green text-white border-golf-green' : 'bg-white text-gray-600 border-gray-200'}`}
                  >
                    {hand === 'right' ? '右' : '左'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">ゴルフ開始年</label>
              <input type="number" value={form.startedYear} onChange={e => set('startedYear', e.target.value)} placeholder="例: 2010" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">ホームコース</label>
            <input type="text" value={form.homeCourse} onChange={e => set('homeCourse', e.target.value)} placeholder="例: ○○カントリークラブ" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green" />
          </div>
        </div>

        {saveError && (
          <p className="text-red-500 text-sm text-center">{saveError}</p>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2"
        >
          <Save size={16} />
          {saving ? '保存中...' : saved ? '保存しました' : 'プロフィールを保存'}
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

// User icon for unauth state
function User({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

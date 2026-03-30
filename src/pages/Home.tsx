import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ChevronRight, Search, TrendingUp } from 'lucide-react'
import { Round } from '../types'
import { calcRoundStats, calcCareerStats, getWeaknessAnalysis } from '../utils/stats'
import StatCard from '../components/StatCard'
import ScoreTrend from '../components/ScoreTrend'
import ScoreDistribution from '../components/ScoreDistribution'
import RadarStats from '../components/RadarStats'
import AuthButton from '../components/AuthButton'
import GolfLogo from '../components/GolfLogo'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  rounds: Round[]
  loading: boolean
  onRefresh: () => void
}

export default function Home({ rounds, loading }: Props) {
  const navigate = useNavigate()
  const { user, isPremium, canAddRound, FREE_ROUND_LIMIT, profile } = useAuth()
  const stats = calcCareerStats(rounds)
  const insights = getWeaknessAnalysis(stats)

  const noRounds = rounds.length === 0

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-golf-dark text-white p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GolfLogo size={28} color="white" />
            <div>
              <h1 className="text-xl font-bold leading-tight">Golf Stats Pro</h1>
              <p className="text-gray-400 text-xs">
                プロ級スタッツで自分のゲームを分析
                <span className="ml-2 text-gray-500">v{__APP_VERSION__}</span>
              </p>
            </div>
          </div>
          <AuthButton />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">

        {/* 未ログイン時のバナー */}
        {!user && (
          <div className="card border-l-4 border-yellow-400 bg-yellow-50">
            <p className="text-sm text-yellow-800 font-semibold">Googleでログインするとデータをクラウドに保存できます</p>
            <p className="text-xs text-yellow-600 mt-1">複数デバイス対応・コースDBへのアクセス・バックアップ機能が使えます</p>
          </div>
        )}

        {/* プレミアムアップグレード訴求 */}
        {user && !isPremium && (
          <div className="card bg-golf-dark text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400">無料プラン</div>
                <div className="font-bold">残り {FREE_ROUND_LIMIT - (profile?.roundCount ?? 0)} ラウンド</div>
                <div className="text-xs text-gray-400 mt-0.5">プレミアムで無制限 + コースDB</div>
              </div>
              <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300">
                ¥300/月
              </button>
            </div>
            <div className="mt-3 bg-gray-600 rounded-full h-1.5">
              <div
                className="bg-yellow-400 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min(100, ((profile?.roundCount ?? 0) / FREE_ROUND_LIMIT) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-400">読み込み中...</div>
        ) : noRounds ? (
          <div className="card text-center py-12">
            <div className="flex justify-center mb-4">
              <GolfLogo size={56} color="#1a5c38" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">最初のラウンドを記録しよう</h2>
            <p className="text-gray-400 text-sm mb-6">
              ホール毎にスコア・FW・GIR・パット数を入力するだけで<br />
              PGAツアー並みのスタッツを自動計算します
            </p>
            <button onClick={() => navigate('/new')} className="btn-primary px-8 py-3 text-base">
              新しいラウンドを記録
            </button>
          </div>
        ) : (
          <>
            {/* キャリアスタッツ */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-gray-700 flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-golf-green" />
                  キャリアスタッツ
                </h2>
                <span className="text-xs text-gray-400">{stats.totalRounds}ラウンド</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="スコア平均" value={stats.scoringAverage.toFixed(1)} sub={`ベスト: ${stats.bestScore} / ワースト: ${stats.worstScore}`} pga="69〜71" />
                <StatCard label="フェアウェイ率" value={`${stats.fairwayPct.toFixed(1)}%`} sub="ドライバー精度" pga="~60%" />
                <StatCard label="GIR率" value={`${stats.girPct.toFixed(1)}%`} sub="グリーン・イン・レギュレーション" pga="~67%" />
                <StatCard label="パット/ラウンド" value={stats.avgPuttsPerRound.toFixed(1)} sub={`GIR時: ${stats.avgPuttsPerGIR.toFixed(2)}`} pga="28〜29" />
                <StatCard label="スクランブリング" value={`${stats.scramblingPct.toFixed(1)}%`} sub="GIR外からのパーセーブ率" pga="~59%" />
                <StatCard label="サンドセーブ" value={`${stats.sandSavePct.toFixed(1)}%`} sub="バンカーからの1打以内" pga="~49%" />
              </div>
            </div>

            {/* パー別平均 */}
            <div className="card">
              <h3 className="font-bold text-gray-700 mb-3">パー別平均スコア（対パー）</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: 'Par 3', val: stats.par3Avg },
                  { label: 'Par 4', val: stats.par4Avg },
                  { label: 'Par 5', val: stats.par5Avg },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="text-xs text-gray-400">{label}</div>
                    <div className={`text-2xl font-bold ${val < 0 ? 'text-red-500' : val === 0 ? 'text-green-600' : 'text-gray-700'}`}>
                      {val >= 0 ? '+' : ''}{val.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ScoreTrend rounds={rounds} />
            <RadarStats stats={stats} />
            <ScoreDistribution stats={stats} />

            {/* 弱点分析 */}
            <div className="card border-l-4 border-golf-green">
              <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                <Search size={15} className="text-golf-green" />
                弱点分析・改善提案
              </h3>
              <ul className="space-y-2">
                {insights.map((insight, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <ChevronRight size={16} className="text-golf-green mt-0.5 shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 最近のラウンド */}
            <div>
              <h3 className="font-bold text-gray-700 mb-2">最近のラウンド</h3>
              <div className="space-y-2">
                {rounds.slice(0, 5).map(r => {
                  const s = calcRoundStats(r)
                  const totalPar = r.holes.reduce((sum, h) => sum + h.par, 0)
                  return (
                    <div
                      key={r.id}
                      onClick={() => navigate(`/round/${r.id}`)}
                      className="card cursor-pointer hover:border-golf-green hover:border transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">{r.courseName}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{r.date}{r.weather && ` · ${r.weather}`}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-golf-green">{s.totalScore}</div>
                            <div className="text-xs text-gray-400">{s.scoreToPar >= 0 ? '+' : ''}{s.scoreToPar} (Par {totalPar})</div>
                          </div>
                          <ChevronRight size={16} className="text-gray-300" />
                        </div>
                      </div>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>FW {s.fairwayPct.toFixed(0)}%</span>
                        <span>GIR {s.girPct.toFixed(0)}%</span>
                        <span>パット {s.totalPutts}</span>
                        <span>スクランブル {s.scramblingPct.toFixed(0)}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* FAB */}
      {canAddRound ? (
        <button
          onClick={() => navigate('/new')}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-golf-green text-white shadow-lg hover:bg-golf-lightGreen transition-colors flex items-center justify-center"
          aria-label="新しいラウンドを記録"
        >
          <Plus size={24} />
        </button>
      ) : (
        <button className="fixed bottom-6 right-6 bg-yellow-400 text-gray-900 px-4 py-3 rounded-full shadow-lg text-sm font-bold">
          無料枠上限 — アップグレード
        </button>
      )}
    </div>
  )
}

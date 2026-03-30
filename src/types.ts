export interface HoleData {
  holeNumber: number
  par: 3 | 4 | 5
  score: number
  fairwayHit: boolean | null
  girHit: boolean
  putts: number
  inBunker: boolean
  bunkerSave: boolean | null
  penaltyStrokes: number
  upAndDownAttempt: boolean
  upAndDownSuccess: boolean | null
  chipShotPenalty?: boolean
}

export interface Round {
  id: string
  date: string
  courseName: string
  courseRating?: number
  slopeRating?: number
  weather?: string
  notes?: string
  holes: HoleData[]
  gearSetId?: string   // 使用したギアセットID
}

// ─── クラブ ───────────────────────────────────────
export type ClubType = 'driver' | 'wood' | 'utility' | 'iron' | 'wedge' | 'putter' | 'other'

export const CLUB_TYPE_LABELS: Record<ClubType, string> = {
  driver:  'ドライバー',
  wood:    'フェアウェイウッド',
  utility: 'ユーティリティ',
  iron:    'アイアン',
  wedge:   'ウェッジ',
  putter:  'パター',
  other:   'その他',
}

export type ShaftFlex = 'X' | 'S' | 'SR' | 'R' | 'A' | 'L' | ''

export interface Club {
  id: string
  userId: string
  type: ClubType
  number: string       // '1W', '3W', '5I', 'SW', 'PT' など
  maker: string        // 'Callaway', 'TaylorMade', 'PING' など
  series: string       // 'Paradym', 'G430' など
  nickname: string     // ユーザーが付けたニックネーム
  shaft?: string       // シャフト名
  flex?: ShaftFlex     // シャフトフレックス
  loft?: number        // ロフト角
  notes?: string
  createdAt?: string
}

// ─── ギアセット（今日の14本）──────────────────────
export interface GearSet {
  id: string
  userId: string
  name: string          // 'いつもの14本', '雨の日セット' など
  clubIds: string[]     // 最大14本
  isDefault: boolean
  createdAt?: string
}

// ─── ユーザープロフィール ─────────────────────────
export interface UserProfile {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  plan: 'free' | 'premium'
  roundCount: number
  // 個人データ
  averageScore?: number
  driverDistance?: number   // ヤード
  handicap?: number
  dominantHand?: 'right' | 'left'
  homeCourse?: string
  startedYear?: number      // ゴルフを始めた年
  targetScore?: number      // 目標スコア
  height?: number           // cm
  weight?: number           // kg
  bio?: string              // 一言コメント
}

// ─── スタッツ ─────────────────────────────────────
export interface CareerStats {
  totalRounds: number
  scoringAverage: number
  bestScore: number
  worstScore: number
  fairwayPct: number
  girPct: number
  avgPuttsPerRound: number
  avgPuttsPerGIR: number
  scramblingPct: number
  sandSavePct: number
  birdieAvg: number
  par3Avg: number
  par4Avg: number
  par5Avg: number
  eagleCount: number
  birdieCount: number
  parCount: number
  bogeyCount: number
  doubleBogeyCount: number
  worseCount: number
}

export interface RoundStats {
  round: Round
  totalScore: number
  scoreToPar: number
  fairwayPct: number
  girPct: number
  totalPutts: number
  puttsPerGIR: number
  scramblingPct: number
  sandSavePct: number
  birdies: number
  pars: number
  bogeys: number
  doubleBogeys: number
  worse: number
  par3Avg: number
  par4Avg: number
  par5Avg: number
}

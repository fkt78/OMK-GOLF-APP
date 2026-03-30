export interface HoleData {
  holeNumber: number
  par: 3 | 4 | 5
  score: number
  fairwayHit: boolean | null   // null = par3（ティーショットなし）
  girHit: boolean              // グリーンオンレギュレーション
  putts: number
  inBunker: boolean
  bunkerSave: boolean | null   // null = バンカーなし
  penaltyStrokes: number
  upAndDownAttempt: boolean    // GIR外でのアップ&ダウン挑戦
  upAndDownSuccess: boolean | null
  chipShotPenalty?: boolean    // チップインか否か
}

export interface Round {
  id: string
  date: string                 // ISO date string
  courseName: string
  courseRating?: number
  slopeRating?: number
  weather?: string
  notes?: string
  holes: HoleData[]
}

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

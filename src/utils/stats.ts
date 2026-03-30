import { Round, RoundStats, CareerStats, HoleData } from '../types'

function avg(nums: number[]): number {
  if (nums.length === 0) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function pct(numerator: number, denominator: number): number {
  if (denominator === 0) return 0
  return (numerator / denominator) * 100
}

export function calcRoundStats(round: Round): RoundStats {
  const holes = round.holes
  const totalScore = holes.reduce((s, h) => s + h.score, 0)
  const totalPar = holes.reduce((s, h) => s + h.par, 0)

  // Fairway
  const fwHoles = holes.filter(h => h.fairwayHit !== null)
  const fwHit = fwHoles.filter(h => h.fairwayHit === true).length
  const fairwayPct = pct(fwHit, fwHoles.length)

  // GIR
  const girHit = holes.filter(h => h.girHit).length
  const girPct = pct(girHit, holes.length)

  // Putts
  const totalPutts = holes.reduce((s, h) => s + h.putts, 0)
  const girHoles = holes.filter(h => h.girHit)
  const puttsPerGIR = girHoles.length > 0
    ? avg(girHoles.map(h => h.putts))
    : 0

  // Scrambling (GIR外でパー以下に抑えた割合)
  const nonGirHoles = holes.filter(h => !h.girHit && h.upAndDownAttempt)
  const scrambles = nonGirHoles.filter(h => h.score <= h.par).length
  const scramblingPct = pct(scrambles, nonGirHoles.length)

  // Sand save
  const bunkerHoles = holes.filter(h => h.inBunker)
  const sandSaves = bunkerHoles.filter(h => h.bunkerSave === true).length
  const sandSavePct = pct(sandSaves, bunkerHoles.length)

  // Score distribution
  const dist = scoreDistribution(holes)

  // Par averages
  const par3Holes = holes.filter(h => h.par === 3)
  const par4Holes = holes.filter(h => h.par === 4)
  const par5Holes = holes.filter(h => h.par === 5)

  return {
    round,
    totalScore,
    scoreToPar: totalScore - totalPar,
    fairwayPct,
    girPct,
    totalPutts,
    puttsPerGIR,
    scramblingPct,
    sandSavePct,
    birdies: dist.birdies,
    pars: dist.pars,
    bogeys: dist.bogeys,
    doubleBogeys: dist.doubleBogeys,
    worse: dist.worse,
    par3Avg: par3Holes.length ? avg(par3Holes.map(h => h.score - h.par)) : 0,
    par4Avg: par4Holes.length ? avg(par4Holes.map(h => h.score - h.par)) : 0,
    par5Avg: par5Holes.length ? avg(par5Holes.map(h => h.score - h.par)) : 0,
  }
}

function scoreDistribution(holes: HoleData[]) {
  let eagles = 0, birdies = 0, pars = 0, bogeys = 0, doubleBogeys = 0, worse = 0
  holes.forEach(h => {
    const diff = h.score - h.par
    if (diff <= -2) eagles++
    else if (diff === -1) birdies++
    else if (diff === 0) pars++
    else if (diff === 1) bogeys++
    else if (diff === 2) doubleBogeys++
    else worse++
  })
  return { eagles, birdies, pars, bogeys, doubleBogeys, worse }
}

export function calcCareerStats(rounds: Round[]): CareerStats {
  if (rounds.length === 0) {
    return {
      totalRounds: 0,
      scoringAverage: 0,
      bestScore: 0,
      worstScore: 0,
      fairwayPct: 0,
      girPct: 0,
      avgPuttsPerRound: 0,
      avgPuttsPerGIR: 0,
      scramblingPct: 0,
      sandSavePct: 0,
      birdieAvg: 0,
      par3Avg: 0,
      par4Avg: 0,
      par5Avg: 0,
      eagleCount: 0,
      birdieCount: 0,
      parCount: 0,
      bogeyCount: 0,
      doubleBogeyCount: 0,
      worseCount: 0,
    }
  }

  const allStats = rounds.map(calcRoundStats)
  const scores = allStats.map(s => s.totalScore)

  // Fairway
  const allFwHoles = rounds.flatMap(r => r.holes.filter(h => h.fairwayHit !== null))
  const allFwHit = allFwHoles.filter(h => h.fairwayHit === true).length

  // GIR
  const allHoles = rounds.flatMap(r => r.holes)
  const allGirHit = allHoles.filter(h => h.girHit).length

  // Putts
  const totalPutts = allStats.reduce((s, r) => s + r.totalPutts, 0)
  const allGirHoles = allHoles.filter(h => h.girHit)
  const avgPuttsPerGIR = allGirHoles.length > 0 ? avg(allGirHoles.map(h => h.putts)) : 0

  // Scrambling
  const nonGirAttempts = allHoles.filter(h => !h.girHit && h.upAndDownAttempt)
  const scrambles = nonGirAttempts.filter(h => h.score <= h.par).length

  // Sand
  const bunkerHoles = allHoles.filter(h => h.inBunker)
  const sandSaves = bunkerHoles.filter(h => h.bunkerSave === true).length

  // Score distribution
  const allDist = allHoles.map(h => h.score - h.par)
  const eagleCount = allDist.filter(d => d <= -2).length
  const birdieCount = allDist.filter(d => d === -1).length
  const parCount = allDist.filter(d => d === 0).length
  const bogeyCount = allDist.filter(d => d === 1).length
  const doubleBogeyCount = allDist.filter(d => d === 2).length
  const worseCount = allDist.filter(d => d >= 3).length

  // Par averages (vs par)
  const par3Holes = allHoles.filter(h => h.par === 3)
  const par4Holes = allHoles.filter(h => h.par === 4)
  const par5Holes = allHoles.filter(h => h.par === 5)

  return {
    totalRounds: rounds.length,
    scoringAverage: avg(scores),
    bestScore: Math.min(...scores),
    worstScore: Math.max(...scores),
    fairwayPct: pct(allFwHit, allFwHoles.length),
    girPct: pct(allGirHit, allHoles.length),
    avgPuttsPerRound: totalPutts / rounds.length,
    avgPuttsPerGIR,
    scramblingPct: pct(scrambles, nonGirAttempts.length),
    sandSavePct: pct(sandSaves, bunkerHoles.length),
    birdieAvg: birdieCount / rounds.length,
    par3Avg: par3Holes.length ? avg(par3Holes.map(h => h.score - h.par)) : 0,
    par4Avg: par4Holes.length ? avg(par4Holes.map(h => h.score - h.par)) : 0,
    par5Avg: par5Holes.length ? avg(par5Holes.map(h => h.score - h.par)) : 0,
    eagleCount,
    birdieCount,
    parCount,
    bogeyCount,
    doubleBogeyCount,
    worseCount,
  }
}

export function formatScore(score: number, par: number): string {
  const diff = score - par
  if (diff <= -2) return 'Eagle'
  if (diff === -1) return 'Birdie'
  if (diff === 0) return 'Par'
  if (diff === 1) return 'Bogey'
  if (diff === 2) return 'Double'
  return `+${diff}`
}

export function scoreColor(score: number, par: number): string {
  const diff = score - par
  if (diff <= -2) return 'text-yellow-500'
  if (diff === -1) return 'text-red-500'
  if (diff === 0) return 'text-green-600'
  if (diff === 1) return 'text-blue-500'
  if (diff === 2) return 'text-gray-600'
  return 'text-gray-800'
}

export function getWeaknessAnalysis(stats: CareerStats): string[] {
  const insights: string[] = []

  if (stats.girPct < 25) {
    insights.push(`GIR率${stats.girPct.toFixed(0)}%は要改善。アイアンの精度向上がスコアアップの鍵です。`)
  } else if (stats.girPct < 40) {
    insights.push(`GIR率${stats.girPct.toFixed(0)}%。平均的ですが、改善の余地があります。`)
  }

  if (stats.avgPuttsPerRound > 36) {
    insights.push(`1ラウンド平均${stats.avgPuttsPerRound.toFixed(1)}パット。パッティング練習でスコアが大きく改善します。`)
  } else if (stats.avgPuttsPerRound > 33) {
    insights.push(`パット数${stats.avgPuttsPerRound.toFixed(1)}は改善余地あり。距離感の練習が効果的です。`)
  }

  if (stats.scramblingPct < 30) {
    insights.push(`スクランブリング率${stats.scramblingPct.toFixed(0)}%。アプローチ精度向上でボギーを防げます。`)
  }

  if (stats.fairwayPct < 40) {
    insights.push(`フェアウェイキープ率${stats.fairwayPct.toFixed(0)}%。ドライバーの方向性改善が優先課題です。`)
  }

  if (stats.par5Avg > 1.5) {
    insights.push(`パー5平均+${stats.par5Avg.toFixed(1)}はスコアアップのチャンス。セカンドショットの戦略を見直しましょう。`)
  }

  if (stats.doubleBogeyCount + stats.worseCount > stats.totalRounds * 3) {
    const rate = ((stats.doubleBogeyCount + stats.worseCount) / stats.totalRounds).toFixed(1)
    insights.push(`ダボ以上が1ラウンド平均${rate}回。大きなミスを減らすことがスコア改善の近道です。`)
  }

  if (insights.length === 0) {
    insights.push('バランスの取れたゲームができています。引き続き各スタッツの向上を目指しましょう。')
  }

  return insights
}

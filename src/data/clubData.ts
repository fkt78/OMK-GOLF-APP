import { ClubType } from '../types'

// ─── 番手/名称の選択肢（クラブタイプ別）───────────────────────
export const CLUB_NUMBERS: Record<ClubType, string[]> = {
  driver:  ['1W'],
  wood:    ['2W', '3W', '4W', '5W', '6W', '7W', '9W', '10W'],
  utility: ['U2', 'U3', 'U4', 'U5', 'U6', 'U7'],
  iron:    ['1I', '2I', '3I', '4I', '5I', '6I', '7I', '8I', '9I'],
  wedge:   ['PW', '46°', '48°', '50°(AW/GW)', '52°', '54°(SW)', '56°', '58°(LW)', '60°', '62°', '64°'],
  putter:  ['PT(マレット)', 'PT(ブレード)', 'PT(ミッドマレット)', 'PT(フェースバランス)'],
  other:   ['その他'],
}

// ─── メーカー別シリーズデータ（2024-2025年現行モデル中心）──────
export type MakerSeriesMap = {
  driver?: string[]
  wood?: string[]
  utility?: string[]
  iron?: string[]
  wedge?: string[]
  putter?: string[]
}

export const MAKER_SERIES: Record<string, MakerSeriesMap> = {
  Callaway: {
    driver:  ['Paradym Ai Smoke Max', 'Paradym Ai Smoke', 'Paradym Ai Smoke Max D', 'Paradym Ai Smoke Triple Diamond', 'Paradym', 'Rogue ST Max', 'Rogue ST Max D', 'Epic Speed'],
    wood:    ['Paradym Ai Smoke', 'Paradym', 'Rogue ST Max', 'Epic Speed'],
    utility: ['Paradym Ai Smoke', 'Apex', 'Rogue ST Max OS'],
    iron:    ['Paradym Ai Smoke', 'Apex', 'Apex Pro', 'Apex CB', 'X Forged CB', 'X Forged', 'Rogue ST Max OS'],
    wedge:   ['Jaws Raw', 'Jaws Full Toe', 'MD5'],
    putter:  ['Odyssey White Hot OG', 'Odyssey Ai-ONE', 'Odyssey Tri-Hot 5K', 'Odyssey Eleven'],
  },
  TaylorMade: {
    driver:  ['Qi10 Max', 'Qi10', 'Qi10 LS', 'Qi10 Max D', 'Stealth 2 Plus', 'Stealth 2', 'Stealth 2 HD', 'SIM2 Max'],
    wood:    ['Qi10', 'Stealth 2', 'Stealth 2 HD', 'SIM2 Max'],
    utility: ['Qi10', 'Stealth 2', 'SIM2 Max Rescue'],
    iron:    ['P790', 'P770', 'P7TW', 'P7MB', 'P7MC', 'Stealth', 'SIM2 Max', 'T200'],
    wedge:   ['Hi-Toe Raw', 'Milled Grind 4', 'Milled Grind Hi-Toe 3'],
    putter:  ['Spider GT', 'Spider EX', 'TP Hydro Blast'],
  },
  PING: {
    driver:  ['G430 Max 10K', 'G430 Max', 'G430 LST', 'G430 SFT', 'G425 Max', 'G425 LST', 'G425 SFT'],
    wood:    ['G430 Max', 'G430 LST', 'G425 Max'],
    utility: ['G430', 'G425', 'G410'],
    iron:    ['G430', 'i230', 'Blueprint T', 'Blueprint S', 'i59', 's159'],
    wedge:   ['Glide 4.0', 'Glide Forged Pro'],
    putter:  ['Anser', 'Sigma 2', 'PLD Milled'],
  },
  Titleist: {
    driver:  ['TSR3', 'TSR2', 'TSR1', 'TSi3', 'TSi2'],
    wood:    ['TSR3', 'TSR2', 'TSi3', 'TSi2'],
    utility: ['TSR', 'TSi', 'T200 Utility', 'U510'],
    iron:    ['T100', 'T100S', 'T150', 'T200', 'T300', 'T350', 'AP3', 'CB', 'MB'],
    wedge:   ['Vokey SM10', 'Vokey SM9', 'Vokey WedgeWorks'],
    putter:  ['Scotty Cameron Phantom', 'Scotty Cameron Super Select', 'Scotty Cameron Special Select'],
  },
  Cleveland: {
    driver:  ['Launcher XL Lite', 'Launcher XL Halo'],
    wood:    ['Launcher XL Halo'],
    utility: ['Launcher XL Halo'],
    iron:    ['ZipCore XL', 'Launcher XL Halo', 'ZipCore'],
    wedge:   ['RTX 6 ZipCore', 'RTX Full Face 2', 'CBX4', 'Smart Sole 4'],
    putter:  ['Frontline Elite', 'HB Soft Milled'],
  },
  Mizuno: {
    driver:  ['ST-Z 230', 'ST-X 230', 'ST-MAX 230'],
    wood:    ['ST-Z 230', 'ST-X 230'],
    utility: ['CLK', 'ST-Z 230'],
    iron:    ['Pro 241', 'Pro 243', 'Pro 245', 'JPX923 Tour', 'JPX923 Forged', 'JPX923 Hot Metal', 'MP-20 HMB', 'MP-20 MB'],
    wedge:   ['S23', 'T24', 'ES21'],
    putter:  ['M.Craft', 'Omoi'],
  },
  Srixon: {
    driver:  ['ZX5 Mk II LS', 'ZX5 Mk II', 'ZX7 Mk II'],
    wood:    ['ZX Mk II'],
    utility: ['ZX Mk II', 'U85'],
    iron:    ['ZX7 Mk II', 'ZX5 Mk II', 'ZX4 Mk II', 'ZX Utility'],
    wedge:   ['ZX4 MkII', 'ZX5 MkII'],
    putter:  [],
  },
  Cobra: {
    driver:  ['Darkspeed X', 'Darkspeed Max', 'Darkspeed LS', 'Aerojet Max', 'Aerojet', 'Aerojet LS'],
    wood:    ['Darkspeed', 'Aerojet'],
    utility: ['Darkspeed', 'Aerojet'],
    iron:    ['Darkspeed', 'Aerojet', 'King Tour', 'King Forged TEC'],
    wedge:   ['King Wedge', 'Snakebite'],
    putter:  ['King 3D', 'King Agera'],
  },
  Honma: {
    driver:  ['TR23', 'TW757 455', 'TW757 460', 'BERES 11', 'XP-1'],
    wood:    ['TR23', 'TW757', 'BERES 11'],
    utility: ['TR23', 'TW757', 'BERES 11'],
    iron:    ['TR23', 'TW757', 'BERES 11', 'T World GS'],
    wedge:   ['T//World TR', 'TW-W'],
    putter:  ['T//World GS PT'],
  },
  Yonex: {
    driver:  ['Ezone Elite 4', 'Ezone GS', 'Ezone XP'],
    wood:    ['Ezone Elite 4', 'Ezone GS'],
    utility: ['Ezone GS'],
    iron:    ['Ezone Elite 4', 'Ezone GS', 'Ezone XP'],
    wedge:   [],
    putter:  [],
  },
  Bridgestone: {
    driver:  ['B2HT', 'B1ST', 'JGR HF1', 'JGR'],
    wood:    ['B2HT', 'JGR'],
    utility: ['B2HT', 'JGR'],
    iron:    ['B2HT', 'B1ST', 'JGR HF1', 'Tour B JGR'],
    wedge:   ['Tour B XW-1', 'Tour B XW-2'],
    putter:  [],
  },
  XXIO: {
    driver:  ['XXIO 13', 'XXIO 12', 'XXIO X'],
    wood:    ['XXIO 13', 'XXIO 12', 'XXIO X'],
    utility: ['XXIO 13', 'XXIO 12'],
    iron:    ['XXIO 13', 'XXIO 12', 'XXIO X'],
    wedge:   [],
    putter:  ['XXIO'],
  },
  Yamaha: {
    driver:  ['inpres UD+2', 'inpres X'],
    wood:    ['inpres UD+2'],
    utility: ['inpres UD+2'],
    iron:    ['inpres UD+2', 'inpres X Forged'],
    wedge:   [],
    putter:  [],
  },
  Acushnet: {  // Titleist別ブランド
    putter:  ['Scotty Cameron'],
  },
  'その他': {},
}

export const MAKER_NAMES = Object.keys(MAKER_SERIES)

// クラブタイプに応じたシリーズ候補を返す
export function getSeriesOptions(maker: string, type: ClubType): string[] {
  const makerData = MAKER_SERIES[maker]
  if (!makerData) return []
  const typeKey = type === 'driver' ? 'driver'
    : type === 'wood' ? 'wood'
    : type === 'utility' ? 'utility'
    : type === 'iron' ? 'iron'
    : type === 'wedge' ? 'wedge'
    : type === 'putter' ? 'putter'
    : null
  if (!typeKey) return []
  return makerData[typeKey] ?? []
}

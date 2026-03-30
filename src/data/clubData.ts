import { ClubType } from '../types'

/** ドロップダウン末尾「その他（手入力）」用の値（保存時には使わない） */
export const CUSTOM_INPUT_VALUE = '__CUSTOM_INPUT__'

// ─── 番手/名称の選択肢（クラブタイプ別）───────────────────────
export const CLUB_NUMBERS: Record<ClubType, string[]> = {
  driver:  ['1W', 'ミニドライバー', '高反発1W', '1.5W'],
  wood:    ['2W', '3W', '4W', '5W', '6W', '7W', '8W', '9W', '10W', '11W', '13W'],
  utility: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'UT', 'クロスオーバー'],
  iron:    ['0I', '1I', '2I', '3I', '4I', '5I', '6I', '7I', '8I', '9I', '10I', 'コンボアイアン'],
  wedge:   ['PW', 'AW', 'GW', 'SW', 'LW', '46°', '48°', '50°', '52°', '54°', '56°', '58°', '60°', '62°', '64°', '50°(AW/GW)', '54°(SW)', '58°(LW)', 'チッパー', '高ロフト'],
  putter:  ['PT(マレット)', 'PT(ブレード)', 'PT(ミッドマレット)', 'PT(フェースバランス)', 'PT(センターシャフト)', 'PT(大型マレット)', 'ベントネック', 'パター'],
  other:   ['カスタム', 'セット内表記'],
}

// ─── シャフト候補（代表的モデル。末尾で「その他」手入力可）──────────
export const SHAFT_OPTIONS: string[] = [
  // Fujikura
  'Ventus TR Black', 'Ventus TR Blue', 'Ventus TR Red', 'Ventus Black', 'Ventus Blue', 'Ventus Red',
  'Speeder NX', 'Speeder EVOLUTION VII', 'Speeder EVOLUTION VI', 'Speeder 661', 'Speeder 757',
  'Air Speeder', 'Motore X', 'Pro 2.0',
  // Mitsubishi Chemical
  'Diamana PD', 'Diamana TB', 'Diamana GT', 'Diamana ZF', 'Diamana BF', 'Diamana D-Limited',
  'TENSEI 1K Black', 'TENSEI 1K Blue', 'TENSEI 1K White', 'TENSEI AV Blue', 'TENSEI AV Raw White', 'TENSEI CK Pro Orange',
  'Kai\'li White', 'Kai\'li Blue', 'Kai\'li Red',
  'C6 Black', 'MMT', 'MMT Scorpion',
  // Graphite Design
  'Tour AD DI', 'Tour AD HD', 'Tour AD IZ', 'Tour AD UB', 'Tour AD XC', 'Tour AD VR', 'Tour AD TP',
  // Project X
  'HZRDUS Smoke Black', 'HZRDUS Smoke Green', 'HZRDUS Smoke Red', 'HZRDUS Gen 4', 'EvenFlow Riptide',
  'Project X LS', 'Project X HZRDUS', 'Cypher', 'EvenFlow',
  // Aldila
  'Rogue Silver', 'Rogue Black', 'Rogue White', 'NV Green', 'NV Blue',
  // Oban
  'Kiyoshi', 'Kiyoshi HB', 'Kiyoshi Purple',
  // Accra
  'TZ RPG', 'TZ Six',
  // Nippon (アイアン・ウェッジ系も含む)
  'NS PRO 950GH neo', 'NS PRO MODUS³ Tour 105', 'NS PRO MODUS³ Tour 120', 'NS PRO MODUS³ Tour 130',
  'NS PRO 850GH', 'NS PRO Zelos', 'NS PRO 1050GH',
  // KBS
  'KBS Tour', 'KBS Tour-V', 'KBS $-Taper', 'KBS PGI', 'KBS MAX',
  // True Temper
  'Dynamic Gold', 'Dynamic Gold 120', 'Dynamic Gold MID', 'Elevate 95', 'Elevate Tour', 'AMT Black', 'AMT Red',
  // Shimada
  'Shimada K\'s 8001', 'Shimada Tour',
  // Aerotech
  'SteelFiber i95', 'SteelFiber i110',
  // LA Golf
  'LA Golf A-Series', 'LA Golf TPZ',
  // UST Mamiya
  'Recoil ESX', 'Recoil Prototype', 'Helium',
  // 汎用
  '純正シャフト', 'オリジナルカスタム', '中古シャフト',
]

// ─── ヘッド調整・スリーブ（カチャカチャ）入力の候補（datalist 用）────
export const HOSEL_PRESETS: string[] = [
  '未設定・純正標準',
  'ニュートラル(N) / 標準ロフト',
  'ドロー(D) / ドロー寄り',
  'フェード(F) / フェード寄り',
  'ロフト：+1°（強ロフト）',
  'ロフト：+0.5°',
  'ロフト：-1°（弱ロフト）',
  'ロフト：-2°',
  'ライ角：アップライト',
  'ライ角：フラット',
  'フェース：オープン寄り',
  'フェース：クローズ寄り',
  'Callaway OptiFit：ドロー(D)',
  'Callaway OptiFit：フェード(F)',
  'Callaway OptiFit：ニュートラル(N)',
  'TaylorMade：トラック ドロー側',
  'TaylorMade：トラック フェード側',
  'TaylorMade：トラック 中立',
  'Titleist SureFit：チップ A1', 'Titleist SureFit：チップ B2', 'Titleist SureFit：チップ C3', 'Titleist SureFit：チップ D4',
  'PING：ドロー設定', 'PING：フェード設定', 'PING：ストレート',
  'Cobra MyFly：ロフト調整',
  'ホーゼル：接着固定（調整なし）',
  'その他（メモ欄に詳細記入）',
]

/** フレックスのプリセット（X より硬い表記・数値フレックスも含む） */
export const FLEX_PRESET_OPTIONS: string[] = [
  'X', 'XX', 'Tour X', 'TX', 'Tour Issue X',
  'S', 'SR', 'R', 'A', 'L',
  '5.5', '6.0', '6.5', '7.0', '7.5', '8.0',
]

/** シャフト重量の候補（datalist 用・g 表記） */
export const SHAFT_WEIGHT_PRESETS: string[] = [
  '40g', '45g', '50g', '55g', '60g', '65g', '70g', '75g', '80g', '85g', '90g', '95g',
  '100g', '105g', '110g', '115g', '120g', '125g', '130g', '135g',
]

/** スイングバランス・クラブバランスの候補 */
export const BALANCE_PRESETS: string[] = [
  'D0', 'D0.5', 'D1', 'D1.5', 'D2', 'D2.5', 'D3', 'D3.5', 'D4', 'D5',
  'C6', 'C7', 'C7.5', 'C8', 'C8.5', 'C9', 'C9.5',
  'E0', 'E0.5', 'E1', 'E1.5', 'E2',
  'F0',
  'バランス調整なし',
]

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

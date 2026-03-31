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

// ─── シャフト：ブランド別2段階選択データ ─────────────────────────
export type ShaftGroup = {
  brand: string    // 1段目ドロップダウンに表示するブランド名
  models: string[] // 2段目ドロップダウンに表示するモデル名
}

export const SHAFT_GROUPS: ShaftGroup[] = [
  // ── Fujikura ──────────────────────────────────────────────
  {
    brand: 'Ventus (Fujikura)',
    models: [
      'Ventus TR Black', 'Ventus TR Blue', 'Ventus TR Red',
      'Ventus Black', 'Ventus Blue', 'Ventus Red',
      'Ventus Velocore Black', 'Ventus Velocore Blue', 'Ventus Velocore Red',
    ],
  },
  {
    brand: 'Speeder (Fujikura)',
    models: [
      'Speeder NX', 'Speeder NX Green', 'Speeder NX Black',
      'Speeder EVOLUTION VII', 'Speeder EVOLUTION VI', 'Speeder EVOLUTION V',
      'Speeder 661', 'Speeder 757', 'Speeder 569',
    ],
  },
  {
    brand: 'Air Speeder / Motore (Fujikura)',
    models: ['Air Speeder', 'Air Speeder MH', 'Motore X', 'Motore F1', 'Pro 2.0'],
  },
  // ── 三菱ケミカル ────────────────────────────────────────────
  {
    brand: 'Diamana (三菱ケミカル)',
    models: [
      'Diamana PD', 'Diamana TB', 'Diamana GT', 'Diamana ZF',
      'Diamana BF', 'Diamana D-Limited', 'Diamana S+',
      'Diamana WS', 'Diamana DF', 'Diamana RF',
    ],
  },
  {
    brand: 'TENSEI (三菱ケミカル)',
    models: [
      'TENSEI 1K Black', 'TENSEI 1K Blue', 'TENSEI 1K White',
      'TENSEI AV Blue', 'TENSEI AV Raw White', 'TENSEI AV Raw Orange',
      'TENSEI CK Pro Orange', 'TENSEI CK Pro Blue',
    ],
  },
  {
    brand: "Kai'li (三菱ケミカル)",
    models: ["Kai'li White", "Kai'li Blue", "Kai'li Red", "Kai'li Silver"],
  },
  {
    brand: 'Kurokage (三菱ケミカル)',
    models: ['Kurokage Black', 'Kurokage Silver', 'Kurokage TM5', 'Kurokage XT'],
  },
  {
    brand: 'MMT / C6 (三菱ケミカル)',
    models: ['C6 Black', 'MMT', 'MMT Scorpion', 'MMT Graphite'],
  },
  // ── グラファイトデザイン ──────────────────────────────────────
  {
    brand: 'Tour AD (グラファイトデザイン)',
    models: [
      'Tour AD DI', 'Tour AD HD', 'Tour AD IZ', 'Tour AD UB',
      'Tour AD XC', 'Tour AD VR', 'Tour AD TP', 'Tour AD BB',
      'Tour AD CQ', 'Tour AD MT',
    ],
  },
  // ── UST Mamiya ──────────────────────────────────────────────
  {
    brand: 'ATTAS (UST Mamiya)',
    models: [
      'ATTAS KING', 'ATTAS CoooL', 'ATTAS PUNCH', 'ATTAS GoGo',
      'ATTAS W', 'ATTAS AW', 'ATTAS 11', 'ATTAS G7', 'ATTAS DA',
    ],
  },
  {
    brand: 'Recoil / Helium (UST Mamiya)',
    models: ['Recoil ESX', 'Recoil Prototype', 'Recoil 110 SmacWrap', 'Helium', 'Lin-Q Blue', 'Lin-Q Green'],
  },
  // ── Project X ───────────────────────────────────────────────
  {
    brand: 'HZRDUS (Project X)',
    models: [
      'HZRDUS Smoke Black', 'HZRDUS Smoke Green', 'HZRDUS Smoke Red',
      'HZRDUS Smoke Yellow', 'HZRDUS Gen 4 Black', 'HZRDUS Gen 4 Yellow',
    ],
  },
  {
    brand: 'EvenFlow / Cypher (Project X)',
    models: [
      'EvenFlow Riptide', 'EvenFlow Black', 'EvenFlow Blue', 'EvenFlow T1100',
      'Cypher 40', 'Cypher 50', 'Cypher 60', 'Project X LS',
    ],
  },
  // ── Aldila ─────────────────────────────────────────────────
  {
    brand: 'Aldila',
    models: [
      'Rogue Silver', 'Rogue Black', 'Rogue White',
      'NV Green', 'NV Blue', 'NV 55', 'Quaranta',
      'Ascent Blue', 'Ascent Red', 'Synergy',
    ],
  },
  // ── Oban ──────────────────────────────────────────────────
  {
    brand: 'Oban',
    models: ['Kiyoshi', 'Kiyoshi HB', 'Kiyoshi Purple', 'Devotion', 'Ikon'],
  },
  // ── Accra ─────────────────────────────────────────────────
  {
    brand: 'Accra',
    models: ['TZ RPG', 'TZ Six', 'TZ6 Tour', 'iWood', 'FX 200'],
  },
  // ── Basileus ──────────────────────────────────────────────
  {
    brand: 'Basileus',
    models: ['Basileus Fiamma', 'Basileus Γ (Gamma)', 'Basileus Z', 'Basileus Arzante'],
  },
  // ── Waccine compo ─────────────────────────────────────────
  {
    brand: 'Waccine compo',
    models: ['Waccine compo GR', 'Waccine compo RD', 'Waccine compo DBCB 50', 'Waccine compo DBCB 60'],
  },
  // ── LA Golf ──────────────────────────────────────────────
  {
    brand: 'LA Golf',
    models: ['LA Golf A-Series', 'LA Golf TPZ', 'LA Golf Proto', 'LA Golf PXG Shaft'],
  },
  // ── 日本シャフト (Nippon Shaft) ───────────────────────────────
  {
    brand: 'NS PRO (日本シャフト)',
    models: [
      'NS PRO 950GH neo', 'NS PRO 850GH', 'NS PRO 1050GH',
      'NS PRO MODUS³ Tour 105', 'NS PRO MODUS³ Tour 120', 'NS PRO MODUS³ Tour 125', 'NS PRO MODUS³ Tour 130',
      'NS PRO MODUS³ WEDGE 115', 'NS PRO Zelos 7', 'NS PRO Zelos 8',
    ],
  },
  // ── KBS ──────────────────────────────────────────────────
  {
    brand: 'KBS',
    models: ['KBS Tour', 'KBS Tour-V', 'KBS $-Taper', 'KBS $-Taper Lite', 'KBS PGI', 'KBS MAX', 'KBS C-Taper', 'KBS C-Taper Lite'],
  },
  // ── True Temper ───────────────────────────────────────────
  {
    brand: 'Dynamic Gold / True Temper',
    models: [
      'Dynamic Gold', 'Dynamic Gold 120', 'Dynamic Gold MID', 'Dynamic Gold Tour Issue',
      'AMT Black', 'AMT Red', 'AMT Tour White',
      'Elevate 95', 'Elevate Tour', 'Elevate MPH',
    ],
  },
  // ── Shimada ───────────────────────────────────────────────
  {
    brand: 'Shimada',
    models: ["Shimada K's 8001", 'Shimada Tour', 'Shimada Attack'],
  },
  // ── Aerotech ──────────────────────────────────────────────
  {
    brand: 'SteelFiber (Aerotech)',
    models: ['SteelFiber i95', 'SteelFiber i110', 'SteelFiber i125', 'SteelFiber fc90'],
  },
  // ── 汎用 ──────────────────────────────────────────────────
  {
    brand: '純正・汎用',
    models: ['純正シャフト', 'オリジナルカスタム', '中古シャフト'],
  },
]

/** ブランド名一覧（1段目ドロップダウン用） */
export const SHAFT_BRAND_NAMES = SHAFT_GROUPS.map(g => g.brand)

/** フラットなシャフトモデル一覧（後方互換用） */
export const SHAFT_OPTIONS: string[] = SHAFT_GROUPS.flatMap(g => g.models)

/** モデル名からブランドを逆引きする */
export function getShaftBrandForModel(model: string): string | null {
  for (const g of SHAFT_GROUPS) {
    if (g.models.includes(model)) return g.brand
  }
  return null
}

/** ブランドからモデル一覧を返す */
export function getShaftModels(brand: string): string[] {
  return SHAFT_GROUPS.find(g => g.brand === brand)?.models ?? []
}

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
  // ── Callaway ─────────────────────────────────────────────────
  Callaway: {
    driver:  [
      'Paradym Ai Smoke Max', 'Paradym Ai Smoke', 'Paradym Ai Smoke Max D', 'Paradym Ai Smoke Triple Diamond',
      'Paradym', 'Paradym X', 'Paradym Triple Diamond',
      'Rogue ST Max', 'Rogue ST Max D', 'Rogue ST Max LS', 'Rogue ST Triple Diamond',
      'Epic Max', 'Epic Max LS', 'Epic Speed', 'Epic Flash', 'Epic Flash Sub Zero',
      'Mavrik Max', 'Mavrik', 'Mavrik Sub-Zero', 'Big Bertha B21', 'Big Bertha',
    ],
    wood:    [
      'Paradym Ai Smoke', 'Paradym', 'Rogue ST Max', 'Rogue ST Max LS',
      'Epic Max', 'Epic Speed', 'Epic Flash', 'Mavrik', 'Big Bertha B21',
    ],
    utility: [
      'Paradym Ai Smoke', 'Apex', 'Apex MB', 'Apex Pro',
      'Rogue ST Max OS', 'Epic Flash', 'Mavrik', 'Big Bertha B21', 'Apex DCB',
    ],
    iron:    [
      'Paradym Ai Smoke', 'Apex', 'Apex Pro', 'Apex CB', 'Apex MB', 'Apex DCB',
      'X Forged CB', 'X Forged', 'X Forged UT',
      'Rogue ST Max OS', 'Rogue ST Pro', 'Rogue X',
      'Mavrik Pro', 'Mavrik Max OS', 'Mavrik',
      'Big Bertha B21', 'Edge', '300 Pro',
    ],
    wedge:   [
      'Jaws Raw', 'Jaws Full Toe', 'Jaws Full Toe Raw',
      'MD5', 'Mack Daddy CB', 'Mack Daddy 4',
      'PM Grind 19', 'Sure Out 2',
    ],
    putter:  [
      'Odyssey Ai-ONE', 'Odyssey Ai-ONE Milled', 'Odyssey Ai-ONE DB',
      'Odyssey White Hot OG', 'Odyssey White Hot Pro',
      'Odyssey Tri-Hot 5K', 'Odyssey Eleven', 'Odyssey Ten',
      'Odyssey Two-Ball', 'Odyssey Triple Track', 'Odyssey Stroke Lab',
    ],
  },
  // ── TaylorMade ───────────────────────────────────────────────
  TaylorMade: {
    driver:  [
      'Qi10 Max', 'Qi10', 'Qi10 LS', 'Qi10 Max D', 'Qi10 Tour',
      'Qi35 Max', 'Qi35', 'Qi35 LS', 'Qi35 Ultra',
      'Stealth 2 Plus', 'Stealth 2', 'Stealth 2 HD',
      'Stealth Plus', 'Stealth', 'Stealth HD',
      'SIM2 Max', 'SIM2 Max D', 'SIM2', 'SIM2 Ti',
      'SIM Max', 'SIM Max D', 'SIM',
      'M6', 'M5', 'M4', 'M3', 'BRNR Mini',
    ],
    wood:    [
      'Qi10', 'Qi35', 'Stealth 2', 'Stealth 2 HD', 'Stealth',
      'SIM2 Max', 'SIM2', 'SIM Max', 'SIM', 'M6', 'M5', 'M4',
    ],
    utility: [
      'Qi10', 'Qi35', 'Stealth 2', 'SIM2 Max Rescue', 'SIM Rescue',
      'GAPR Lo', 'GAPR Mid', 'DHY', 'SIM DHY',
    ],
    iron:    [
      'P790 (2023)', 'P790 Ti', 'P770 (2023)', 'P760', 'P7TW', 'P7MB', 'P7MC', 'P730', 'P·CB',
      'Stealth', 'Stealth HD', 'Stealth DHY',
      'SIM2 Max', 'SIM2 Max OS', 'SIM DHY',
      'T200', 'T150', 'T100', 'T100·S',
      'Kalea Premier', 'M4', 'M-CGB',
    ],
    wedge:   [
      'Hi-Toe Raw', 'Hi-Toe Raw Big Foot', 'Hi-Toe 3',
      'Milled Grind 4', 'Milled Grind Hi-Toe 4', 'Milled Grind Hi-Toe 3',
      'Milled Grind 3', 'MG3',
    ],
    putter:  [
      'Spider GT', 'Spider GT Notchback', 'Spider GT Rollback',
      'Spider EX', 'Spider Tour', 'Spider X', 'Spider S',
      'TP Hydro Blast', 'TP Patina', 'TP Ardmore',
      'Truss TB1', 'Truss TM1',
    ],
  },
  // ── PING ──────────────────────────────────────────────────────
  PING: {
    driver:  [
      'G430 Max 10K', 'G430 Max', 'G430 LST', 'G430 SFT',
      'G430 HL', 'G430 Max 10K LST',
      'G425 Max', 'G425 LST', 'G425 SFT',
      'G410 Plus', 'G410 LST', 'G410 SFT',
      'G400 Max', 'G400 LST', 'G400 SFT',
    ],
    wood:    [
      'G430 Max', 'G430 LST', 'G430 HL',
      'G425 Max', 'G425 LST',
      'G410 Plus', 'G400', 'G400 Max',
    ],
    utility: [
      'G430', 'G425', 'G410', 'G400', 'G700',
      'G Le3', 'i230 Utility',
    ],
    iron:    [
      'G430', 'i230', 'i230 Wide Sole',
      'Blueprint T', 'Blueprint S', 'Blueprint',
      'i59', 's159', 'i525', 'i210',
      'G425', 'G400', 'iBlade', 'Anser Forged',
      's55', 'i200', 'i500',
    ],
    wedge:   [
      'Glide 4.0', 'Glide 4.0 Stealth', 'Glide Forged Pro',
      'Glide 3.0', 'Glide 3.0 Stealth', 'Glide 2.0 Stealth',
    ],
    putter:  [
      'Anser', 'Anser 2', 'Anser D',
      'PLD Milled', 'PLD Milled Anser', 'PLD Milled DS72',
      'Sigma 2', 'Sigma G', 'Sigma 2 Valor',
      'Heppler', 'Heppler Anser 2', 'Heppler Fetch',
      'Ketsch', 'Ketsch G', 'Zing 2', 'Oslo H',
    ],
  },
  // ── Titleist ─────────────────────────────────────────────────
  Titleist: {
    driver:  [
      'TSR3', 'TSR2', 'TSR1', 'TSR4',
      'TSi3', 'TSi2', 'TSi1',
      'TS3', 'TS2', 'TS1',
      '917D3', '917D2', '915D3', '915D2',
    ],
    wood:    [
      'TSR3', 'TSR2', 'TSR1',
      'TSi3', 'TSi2', 'TSi1',
      'TS3', 'TS2', 'TS1',
      '917F3', '917F2', '915F',
    ],
    utility: [
      'TSR', 'TSi', 'TS', 'T200 Utility', 'U510', 'U505',
      '816H1', '816H2', '915Hd',
    ],
    iron:    [
      'T100', 'T100·S', 'T150', 'T200', 'T300', 'T350',
      'T-MB', 'AP3',
      '718 AP1', '718 AP2', '718 AP3', '718 CB', '718 MB',
      '716 AP1', '716 AP2', '716 CB', '716 MB',
      '620 MB', '620 CB', '620 UD+2',
    ],
    wedge:   [
      'Vokey SM10', 'Vokey SM9', 'Vokey SM8', 'Vokey SM7',
      'Vokey WedgeWorks', 'Vokey SM10 RAW',
    ],
    putter:  [
      'Scotty Cameron Phantom', 'Scotty Cameron Phantom X',
      'Scotty Cameron Super Select', 'Scotty Cameron Super Select Del Mar',
      'Scotty Cameron Special Select', 'Scotty Cameron Special Select Flowback',
      'Scotty Cameron Newport', 'Scotty Cameron Newport 2',
      'Scotty Cameron Fastback', 'Scotty Cameron Golo',
      'Scotty Cameron X5', 'Scotty Cameron Select',
    ],
  },
  // ── Cleveland ────────────────────────────────────────────────
  Cleveland: {
    driver:  ['Launcher XL Lite', 'Launcher XL Halo', 'HiBore XLS'],
    wood:    ['Launcher XL Halo', 'Launcher HB Turbo'],
    utility: ['Launcher XL Halo', 'Launcher HB Turbo'],
    iron:    [
      'ZipCore XL', 'Launcher XL Halo', 'ZipCore', 'CBX4',
      'HB Soft 2', 'HB Soft', 'Launcher HB Turbo',
    ],
    wedge:   [
      'RTX 6 ZipCore', 'RTX 6 Full Face', 'RTX Full Face 2',
      'RTX 4 ZipCore', 'RTX 4 Full Face', 'RTX ZipCore',
      'CBX4', 'CBX Zipcore', 'CBX 2',
      'Smart Sole 4 C', 'Smart Sole 4 S', 'Smart Sole 3',
      '588 RTX', '588 RTX 2.0',
    ],
    putter:  [
      'Frontline Elite', 'Frontline Elite 2.0',
      'HB Soft Milled', 'HB Soft 2', 'HB Soft',
      'Huntington Beach Soft', 'TFi 2135',
    ],
  },
  // ── Mizuno ───────────────────────────────────────────────────
  Mizuno: {
    driver:  [
      'ST-Z 230', 'ST-X 230', 'ST-MAX 230',
      'ST-G 220', 'ST-Z 220', 'ST-X 220',
      'ST-200', 'ST-200X', 'ST-200G',
      'ST-190', 'ST-190G',
    ],
    wood:    [
      'ST-Z 230', 'ST-X 230', 'ST-G 220', 'ST-Z 220',
      'ST-200', 'ST-190',
    ],
    utility: [
      'CLK', 'ST-Z 230', 'ST-G 220', 'ST-200',
      'JPX923', 'JPX900', 'MP-H5',
    ],
    iron:    [
      'Pro 241', 'Pro 243', 'Pro 245',
      'JPX923 Tour', 'JPX923 Forged', 'JPX923 Hot Metal Pro', 'JPX923 Hot Metal',
      'JPX921 Tour', 'JPX921 Forged', 'JPX921 Hot Metal Pro', 'JPX921 Hot Metal',
      'JPX919 Tour', 'JPX919 Forged', 'JPX919 Hot Metal',
      'JPX903 Forged', 'JPX903 Hot Metal', 'JPX850 Forged',
      'MP-20 HMB', 'MP-20 MMC', 'MP-20 MB',
      'MP-18 MMC', 'MP-18 SC', 'MP-18 MB',
      'MP-5', 'MP-4', 'MP-H5', 'MP-54', 'MP-64', 'MP-25',
    ],
    wedge:   ['T24', 'S23', 'T22', 'S18', 'T7', 'ES21', 'MP-T11'],
    putter:  [
      'M.Craft OMOI', 'M.Craft II', 'M.Craft III', 'M.Craft V', 'M.Craft VII',
      'Omoi', 'M.Craft',
    ],
  },
  // ── Srixon ───────────────────────────────────────────────────
  Srixon: {
    driver:  [
      'ZX9 Mk II', 'ZX5 Mk II LS', 'ZX5 Mk II', 'ZX7 Mk II',
      'ZX9', 'ZX7', 'ZX5',
      'Z785', 'Z585', 'Z355',
    ],
    wood:    ['ZX Mk II', 'ZX5 Mk II', 'ZX7 Mk II', 'ZX5', 'ZX7', 'Z F85'],
    utility: ['ZX Mk II', 'U85', 'U65', 'ZX', 'H85', 'Z U85'],
    iron:    [
      'ZX7 Mk II', 'ZX5 Mk II', 'ZX4 Mk II', 'ZX Utility',
      'ZX7', 'ZX5', 'ZX4',
      'Z 785', 'Z 585', 'Z 385', 'Z 745', 'Z 545',
    ],
    wedge:   ['ZX4 MkII', 'ZX5 MkII', 'Z 585', 'Z 745', 'RTX ZipCore'],
    putter:  ['Z-Star PT', 'Soft Feel PT'],
  },
  // ── Cobra ────────────────────────────────────────────────────
  Cobra: {
    driver:  [
      'Darkspeed X', 'Darkspeed Max', 'Darkspeed LS', 'Darkspeed LS Tour',
      'Aerojet Max', 'Aerojet', 'Aerojet LS',
      'LTDx Max', 'LTDx', 'LTDx LS',
      'RADSPEED XD', 'RADSPEED', 'RADSPEED XB',
      'F9 Speedback', 'King F9', 'King F8+',
    ],
    wood:    [
      'Darkspeed', 'Aerojet', 'LTDx', 'RADSPEED',
      'F9 Speedback', 'King F9',
    ],
    utility: [
      'Darkspeed', 'Aerojet', 'LTDx', 'RADSPEED',
      'King Utility', 'F9 Speedback',
    ],
    iron:    [
      'Darkspeed', 'Aerojet', 'LTDx', 'King Tour',
      'King Forged TEC', 'King MB', 'King CB',
      'RADSPEED', 'F9', 'Baffler Rail',
    ],
    wedge:   ['King Wedge', 'Snakebite', 'King MIM'],
    putter:  ['King 3D', 'King Agera', 'King Putters'],
  },
  // ── Honma ────────────────────────────────────────────────────
  Honma: {
    driver:  [
      'TR23', 'TW757 455', 'TW757 460',
      'TR20 460', 'TR20 440', 'TR20 Proto',
      'TW747 455', 'TW747 460',
      'BERES 11', 'BERES IE', 'BERES IS',
      'XP-1', 'S-06',
    ],
    wood:    [
      'TR23', 'TR20', 'TW757', 'TW747',
      'BERES 11', 'BERES IE',
    ],
    utility: [
      'TR23', 'TR20', 'TW757', 'TW747',
      'BERES 11', 'BERES IE', 'BERES IS',
    ],
    iron:    [
      'TR23', 'TR20P', 'TR20',
      'TW757P', 'TW757V', 'TW747P', 'TW747V',
      'TW737P', 'TW737V', 'TW737Gs',
      'BERES 11', 'BERES IS-06', 'BERES IE',
      'T World GS', 'T World XP-1',
    ],
    wedge:   [
      'T//World TR', 'T//World XW-1', 'T//World TW-W',
      'TW-W', 'T//World GS',
    ],
    putter:  ['T//World GS PT', 'BERES PT', 'PP-202', 'TW-PT'],
  },
  // ── Yonex ────────────────────────────────────────────────────
  Yonex: {
    driver:  [
      'Ezone Elite 4', 'Ezone GS', 'Ezone XP',
      'Ezone Elite 3', 'Royal Ezone',
    ],
    wood:    [
      'Ezone Elite 4', 'Ezone GS', 'Ezone Elite 3',
    ],
    utility: [
      'Ezone GS', 'Ezone Elite 4', 'Ezone XP',
    ],
    iron:    [
      'Ezone Elite 4', 'Ezone GS', 'Ezone XP',
      'Ezone Elite 3', 'Ezone CB', 'Royal Ezone',
    ],
    wedge:   ['Ezone Elite', 'Ezone GS Wedge'],
    putter:  ['Ezone GS PT', 'Ezone PT'],
  },
  // ── Bridgestone ──────────────────────────────────────────────
  Bridgestone: {
    driver:  [
      'B2HT', 'B1ST',
      'Tour B JGR HF1', 'Tour B JGR', 'JGR HF1', 'JGR',
      'Tour B XD-3', 'Tour B XD-5', 'Tour B XD-7',
      'Tour B X', 'Tour B XS',
    ],
    wood:    [
      'B2HT', 'JGR', 'Tour B JGR',
      'Tour B XW-3', 'Tour B FW',
    ],
    utility: [
      'B2HT', 'JGR', 'Tour B JGR',
      'Tour B XU', 'Tour B HF1',
    ],
    iron:    [
      'B2HT', 'B1ST', 'JGR HF1', 'Tour B JGR', 'Tour B JGR HF1',
      'Tour B X', 'Tour B CB', 'Tour B MB',
      'J15', 'J15 CB', 'J15 DF',
      'J40', 'J40 CB', 'J40 DF', 'J40 MB',
      'J38', 'J33', 'J33 CB',
    ],
    wedge:   [
      'Tour B XW-1', 'Tour B XW-2', 'Tour B XW-3',
      'Tour B CBX', 'J40 Wedge',
    ],
    putter:  ['Tour B PT', 'J40 PT'],
  },
  // ── XXIO ──────────────────────────────────────────────────────
  XXIO: {
    driver:  [
      'XXIO 13', 'XXIO 12', 'XXIO 11', 'XXIO 10',
      'XXIO X', 'XXIO X-eks',
      'XXIO Prime 12', 'XXIO Prime 11', 'XXIO Prime',
      'XXIO Ladies', 'XXIO HL',
    ],
    wood:    [
      'XXIO 13', 'XXIO 12', 'XXIO 11', 'XXIO 10',
      'XXIO X', 'XXIO Prime 12', 'XXIO Prime',
    ],
    utility: [
      'XXIO 13', 'XXIO 12', 'XXIO 11', 'XXIO X',
      'XXIO Prime', 'XXIO Hybrid',
    ],
    iron:    [
      'XXIO 13', 'XXIO 12', 'XXIO 11', 'XXIO 10',
      'XXIO X', 'XXIO Prime 12', 'XXIO Prime',
      'XXIO Ladies', 'XXIO Forged',
    ],
    wedge:   ['XXIO Wedge', 'XXIO 12 Wedge'],
    putter:  ['XXIO', 'XXIO Prime PT', 'XXIO 11 PT'],
  },
  // ── Yamaha ───────────────────────────────────────────────────
  Yamaha: {
    driver:  [
      'inpres UD+2', 'inpres X',
      'RMX VD', 'RMX VD59', 'RMX VD50',
      'RMX 120', 'RMX 220', 'RMX 320',
      'RMX', 'inpres',
    ],
    wood:    ['inpres UD+2', 'RMX VD', 'RMX 220', 'RMX 120', 'RMX'],
    utility: ['inpres UD+2', 'RMX VD', 'RMX 220', 'RMX'],
    iron:    [
      'inpres UD+2', 'inpres X Forged',
      'RMX VD59', 'RMX VD50', 'RMX 220', 'RMX 120',
      'RMX', 'inpres',
    ],
    wedge:   ['inpres X Forged', 'RMX Wedge'],
    putter:  ['inpres X', 'RMX PT'],
  },
  // ─── 国内・マニア向けメーカー（シリーズは代表的モデル）────────────
  Epon: {
    driver:  ['AF-TOUR', 'Personal', 'AF-255', 'AF-105'],
    wood:    ['AF-TOUR', 'Personal', 'AF-105'],
    utility: ['AF-TOUR', 'AF-705', 'AF-901'],
    iron:    ['AF-TOUR', 'Personal', 'AF-705', 'AF-901', 'AF-303', 'AF-Ti'],
    wedge:   ['AF-TOUR', 'Tour Wedge', 'AF-705'],
    putter:  [],
  },
  Fourteen: {
    driver:  ['TC-788', 'TC-544'],
    wood:    ['TC-788', 'FH-900'],
    utility: ['TC-788', 'FH-900'],
    iron:    ['TB-5', 'TB-7', 'TC-544 Forged', 'FH-900'],
    wedge:   ['RM-4', 'RM-12', 'MT-28'],
    putter:  ['TC-788'],
  },
  Onoff: {
    driver:  ['LABOSPEC RB-247K', 'AKERO', 'KURO'],
    wood:    ['KURO', 'AKERO', 'FAIRWAY ARMS'],
    utility: ['KURO', 'AKERO', 'LABOSPEC'],
    iron:    ['KURO', 'FORGED', 'AKERO', 'LABOSPEC'],
    wedge:   ['FORGED WEDGE', 'KURO'],
    putter:  ['KURO'],
  },
  Ryoma: {
    driver:  ['Maxima II', 'D-1 Maxima', 'Maxima Type G', 'Maxima Type D'],
    wood:    ['Maxima II', 'D-1'],
    utility: ['D-1 U', 'Maxima'],
    iron:    ['D-1', 'Maxima', 'RS-01'],
    wedge:   ['D-1 Wedge'],
    putter:  [],
  },
  Romaro: {
    driver:  ['Ray α', 'Ray V', 'Ray H'],
    wood:    ['Ray α', 'Ray V'],
    utility: ['Ray α', 'Ray V'],
    iron:    ['Ray α', 'Ray V', 'RJ-Ti'],
    wedge:   ['Ray α', 'RJ-Ti'],
    putter:  [],
  },
  VEGA: {
    driver:  ['RAFW', 'V-DR', 'ALC'],
    wood:    ['RAFW', 'V-FW'],
    utility: ['RAFW', 'V-UT'],
    iron:    ['RAFI', 'V-MB', 'V-CB', 'ALC'],
    wedge:   ['V-W', 'RAFI'],
    putter:  ['V-PT'],
  },
  'Jビーム': {
    driver:  ['ZY-11', 'BM-535', 'JL-001'],
    wood:    ['ZY-11', 'BM-535'],
    utility: ['ZY-11', 'BM-535'],
    iron:    ['ZY-11', 'BM-535', 'JL-001'],
    wedge:   ['ZY-11', 'BM-535'],
    putter:  [],
  },
  マジェスティ: {
    driver:  ['Prestigio XIII', 'Conrad', 'Royale', 'Vanquish'],
    wood:    ['Prestigio', 'Conrad', 'Royale'],
    utility: ['Prestigio', 'Conrad'],
    iron:    ['Prestigio', 'Conrad', 'Royale', 'Vanquish'],
    wedge:   ['Prestigio', 'Royale'],
    putter:  ['Prestigio'],
  },
  カタナゴルフ: {
    driver:  ['SWORD SNIPER', 'VOLTIO NINJA', 'VOLTIO'],
    wood:    ['VOLTIO', 'SWORD'],
    utility: ['VOLTIO', 'SWORD'],
    iron:    ['SWORD', 'VOLTIO', 'STUDIO'],
    wedge:   ['SWORD', 'VOLTIO'],
    putter:  [],
  },
  'PROTOCONCEPT': {
    driver:  ['C01DR', 'C05DR'],
    wood:    ['C01', 'C05'],
    utility: ['C01', 'C05'],
    iron:    ['Forged', 'C01', 'C05', 'C03'],
    wedge:   ['Forged', 'C01'],
    putter:  ['C01'],
  },
  バルド: {
    driver:  ['COMPETIZIONE 568', 'TTX', 'BRASSY'],
    wood:    ['COMPETIZIONE', 'TTX'],
    utility: ['COMPETIZIONE', 'TTX'],
    iron:    ['COMPETIZIONE', '568', 'BRASSY'],
    wedge:   ['COMPETIZIONE'],
    putter:  [],
  },
  ムジーク: {
    driver:  ['DD-4', 'On The Screw'],
    wood:    ['DD-4'],
    utility: ['DD-4'],
    iron:    ['DD-4', 'On The Screw'],
    wedge:   ['DD-4'],
    putter:  [],
  },
  ロッディオ: {
    driver:  ['S-Tuning', 'Roddio'],
    wood:    ['Roddio'],
    utility: ['Roddio'],
    iron:    ['Roddio', 'S-Tuning'],
    wedge:   ['Roddio'],
    putter:  ['Roddio'],
  },
  SYARD: {
    driver:  ['TX', 'TX-V'],
    wood:    ['TX'],
    utility: ['TX'],
    iron:    ['TX', 'TX-V'],
    wedge:   ['TX'],
    putter:  [],
  },
  フジクラゴルフ: {
    driver:  ['FT-1', 'FT-1 ドライバー'],
    wood:    ['FT-1'],
    utility: ['FT-1'],
    iron:    ['FT-1', 'FG-001'],
    wedge:   ['FT-1'],
    putter:  [],
  },
  カムイ: {
    driver:  ['TP-09', 'TP-X'],
    wood:    ['TP-09'],
    utility: ['TP-09'],
    iron:    ['TP-09', 'TP-X'],
    wedge:   ['TP-09'],
    putter:  ['TP-09'],
  },
  イトボリ: {
    driver:  [],
    wood:    [],
    utility: [],
    iron:    ['Itobori', 'カスタム'],
    wedge:   ['Itobori', 'マッスルバック'],
    putter:  ['Itobori'],
  },
  グランディスタ: {
    driver:  ['RS-001', 'RS-D'],
    wood:    ['RS-001'],
    utility: ['RS-001'],
    iron:    ['RS-001', 'RS-F'],
    wedge:   ['RS-001'],
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

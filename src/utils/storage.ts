import { Round } from '../types'

const KEY = 'golf_rounds'

export function loadRounds(): Round[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveRound(round: Round): void {
  const rounds = loadRounds()
  const idx = rounds.findIndex(r => r.id === round.id)
  if (idx >= 0) {
    rounds[idx] = round
  } else {
    rounds.unshift(round)
  }
  localStorage.setItem(KEY, JSON.stringify(rounds))
}

export function deleteRound(id: string): void {
  const rounds = loadRounds().filter(r => r.id !== id)
  localStorage.setItem(KEY, JSON.stringify(rounds))
}

export function generateId(): string {
  return `round_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

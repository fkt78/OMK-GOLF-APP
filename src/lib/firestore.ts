import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
} from 'firebase/firestore'
import { db } from './firebase'
import { Round, Club, GearSet, UserProfile } from '../types'

/** Firestore はフィールド値に undefined を許可しない（書き込み時にエラーになる） */
function omitUndefined<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))
}

// ─── ラウンド ─────────────────────────────────────
export async function saveRoundToFirestore(userId: string, round: Round): Promise<string> {
  const ref = collection(db, 'rounds')
  const docRef = await addDoc(ref, { ...round, userId, createdAt: serverTimestamp() })
  await updateDoc(doc(db, 'users', userId), { roundCount: increment(1) })
  return docRef.id
}

export async function loadRoundsFromFirestore(userId: string): Promise<Round[]> {
  const q = query(collection(db, 'rounds'), where('userId', '==', userId), orderBy('date', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Round))
}

export async function deleteRoundFromFirestore(userId: string, roundId: string): Promise<void> {
  await deleteDoc(doc(db, 'rounds', roundId))
  await updateDoc(doc(db, 'users', userId), { roundCount: increment(-1) })
}

// ─── プロフィール ─────────────────────────────────
export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  const payload = omitUndefined({
    ...data,
    updatedAt: serverTimestamp(),
  } as Record<string, unknown>)
  await setDoc(doc(db, 'users', userId), payload, { merge: true })
}

// ─── クラブ ───────────────────────────────────────
export async function saveClub(userId: string, club: Omit<Club, 'id' | 'userId' | 'createdAt'>): Promise<string> {
  const ref = collection(db, 'clubs')
  const payload = omitUndefined({
    ...club,
    userId,
    createdAt: serverTimestamp(),
  } as Record<string, unknown>)
  const docRef = await addDoc(ref, payload)
  return docRef.id
}

export async function updateClub(clubId: string, data: Partial<Club>): Promise<void> {
  const payload = omitUndefined({
    ...data,
    updatedAt: serverTimestamp(),
  } as Record<string, unknown>)
  await updateDoc(doc(db, 'clubs', clubId), payload)
}

export async function deleteClub(clubId: string): Promise<void> {
  await deleteDoc(doc(db, 'clubs', clubId))
}

export async function loadClubs(userId: string): Promise<Club[]> {
  const q = query(collection(db, 'clubs'), where('userId', '==', userId), orderBy('createdAt', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Club))
}

// ─── ギアセット ───────────────────────────────────
export async function saveGearSet(userId: string, set: Omit<GearSet, 'id' | 'userId' | 'createdAt'>): Promise<string> {
  const ref = collection(db, 'gearSets')
  const payload = omitUndefined({
    ...set,
    userId,
    createdAt: serverTimestamp(),
  } as Record<string, unknown>)
  const docRef = await addDoc(ref, payload)
  return docRef.id
}

export async function updateGearSet(setId: string, data: Partial<GearSet>): Promise<void> {
  const payload = omitUndefined({
    ...data,
    updatedAt: serverTimestamp(),
  } as Record<string, unknown>)
  await updateDoc(doc(db, 'gearSets', setId), payload)
}

export async function deleteGearSet(setId: string): Promise<void> {
  await deleteDoc(doc(db, 'gearSets', setId))
}

export async function loadGearSets(userId: string): Promise<GearSet[]> {
  const q = query(collection(db, 'gearSets'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as GearSet))
}

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
  await updateDoc(doc(db, 'users', userId), { ...data, updatedAt: serverTimestamp() })
}

// ─── クラブ ───────────────────────────────────────
export async function saveClub(userId: string, club: Omit<Club, 'id' | 'userId' | 'createdAt'>): Promise<string> {
  const ref = collection(db, 'clubs')
  const docRef = await addDoc(ref, { ...club, userId, createdAt: serverTimestamp() })
  return docRef.id
}

export async function updateClub(clubId: string, data: Partial<Club>): Promise<void> {
  await updateDoc(doc(db, 'clubs', clubId), { ...data, updatedAt: serverTimestamp() })
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
  const docRef = await addDoc(ref, { ...set, userId, createdAt: serverTimestamp() })
  return docRef.id
}

export async function updateGearSet(setId: string, data: Partial<GearSet>): Promise<void> {
  await updateDoc(doc(db, 'gearSets', setId), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteGearSet(setId: string): Promise<void> {
  await deleteDoc(doc(db, 'gearSets', setId))
}

export async function loadGearSets(userId: string): Promise<GearSet[]> {
  const q = query(collection(db, 'gearSets'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as GearSet))
}

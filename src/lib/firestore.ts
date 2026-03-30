import {
  collection,
  doc,
  addDoc,
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
import { Round } from '../types'

// ラウンドを保存
export async function saveRoundToFirestore(userId: string, round: Round): Promise<string> {
  const ref = collection(db, 'rounds')
  const docRef = await addDoc(ref, {
    ...round,
    userId,
    createdAt: serverTimestamp(),
  })
  // ユーザーのラウンド数をインクリメント
  await updateDoc(doc(db, 'users', userId), {
    roundCount: increment(1),
  })
  return docRef.id
}

// ユーザーのラウンド一覧を取得
export async function loadRoundsFromFirestore(userId: string): Promise<Round[]> {
  const q = query(
    collection(db, 'rounds'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Round))
}

// ラウンドを削除
export async function deleteRoundFromFirestore(userId: string, roundId: string): Promise<void> {
  await deleteDoc(doc(db, 'rounds', roundId))
  await updateDoc(doc(db, 'users', userId), {
    roundCount: increment(-1),
  })
}

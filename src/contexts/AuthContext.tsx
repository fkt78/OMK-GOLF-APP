import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '../lib/firebase'
import { UserProfile } from '../types'

export type Plan = 'free' | 'premium'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  /** Firestore に保存した値を優先。未設定時は Google アカウントの名前 */
  displayName: string | null
  /** Firestore に保存した URL を優先。未設定時は Google のプロフィール写真 */
  photoURL: string | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  isPremium: boolean
  canAddRound: boolean
  FREE_ROUND_LIMIT: number
}

const AuthContext = createContext<AuthContextType | null>(null)

export const FREE_ROUND_LIMIT = 5

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await loadOrCreateProfile(firebaseUser)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function loadOrCreateProfile(firebaseUser: User) {
    const ref = doc(db, 'users', firebaseUser.uid)
    const snap = await getDoc(ref)
    if (snap.exists()) {
      setProfile(snap.data() as UserProfile)
    } else {
      const newProfile: UserProfile = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        plan: 'free',
        roundCount: 0,
      }
      await setDoc(ref, { ...newProfile, createdAt: serverTimestamp() })
      setProfile(newProfile)
    }
  }

  async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider)
  }

  async function signOut() {
    await firebaseSignOut(auth)
  }

  async function refreshProfile() {
    const u = auth.currentUser
    if (!u) return
    const ref = doc(db, 'users', u.uid)
    const snap = await getDoc(ref)
    if (snap.exists()) setProfile(snap.data() as UserProfile)
  }

  const isPremium = profile?.plan === 'premium'
  const canAddRound = isPremium || (profile?.roundCount ?? 0) < FREE_ROUND_LIMIT

  const displayName = profile?.displayName ?? user?.displayName ?? null
  const photoURL = profile?.photoURL ?? user?.photoURL ?? null

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      displayName,
      photoURL,
      loading,
      signInWithGoogle,
      signOut,
      refreshProfile,
      isPremium,
      canAddRound,
      FREE_ROUND_LIMIT,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

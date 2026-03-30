import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewRound from './pages/NewRound'
import RoundDetail from './pages/RoundDetail'
import MyBag from './pages/MyBag'
import Profile from './pages/Profile'
import UpdateNotification from './components/UpdateNotification'
import GolfLogo from './components/GolfLogo'
import { Round } from './types'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { loadRoundsFromFirestore } from './lib/firestore'
import { loadRounds } from './utils/storage'

function AppRoutes() {
  const { user, loading } = useAuth()
  const [rounds, setRounds] = useState<Round[]>([])
  const [roundsLoading, setRoundsLoading] = useState(false)

  useEffect(() => {
    if (loading) return
    if (user) {
      setRoundsLoading(true)
      loadRoundsFromFirestore(user.uid)
        .then(setRounds)
        .finally(() => setRoundsLoading(false))
    } else {
      setRounds(loadRounds())
    }
  }, [user, loading])

  const refreshRounds = async () => {
    if (user) {
      const updated = await loadRoundsFromFirestore(user.uid)
      setRounds(updated)
    } else {
      setRounds(loadRounds())
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-golf-dark">
        <div className="text-white text-center">
          <GolfLogo size={48} color="white" />
          <div className="text-sm text-gray-400 mt-3">読み込み中...</div>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/"          element={<Home rounds={rounds} loading={roundsLoading} onRefresh={refreshRounds} />} />
      <Route path="/new"       element={<NewRound onSaved={refreshRounds} />} />
      <Route path="/round/:id" element={<RoundDetail rounds={rounds} onDeleted={refreshRounds} />} />
      <Route path="/bag"       element={<MyBag />} />
      <Route path="/profile"   element={<Profile />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <UpdateNotification />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

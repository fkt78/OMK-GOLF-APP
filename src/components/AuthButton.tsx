import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function AuthButton() {
  const { user, profile, signInWithGoogle, signOut, isPremium, FREE_ROUND_LIMIT } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        className="flex items-center gap-2 bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold shadow hover:shadow-md transition-all"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Googleでログイン
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border-2 border-golf-fairway" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-golf-fairway flex items-center justify-center text-white text-sm font-bold">
            {user.displayName?.[0] ?? 'U'}
          </div>
        )}
        <span className="text-xs text-gray-300 hidden sm:block">{user.displayName}</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 p-3 w-52 z-20">
          <div className="text-xs text-gray-500 mb-2">{user.email}</div>
          <div className={`text-xs font-bold mb-3 px-2 py-1 rounded-full inline-block ${isPremium ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
            {isPremium ? '⭐ プレミアム' : `無料 (${profile?.roundCount ?? 0}/${FREE_ROUND_LIMIT}ラウンド)`}
          </div>
          {!isPremium && (
            <button className="w-full bg-golf-green text-white text-xs py-2 rounded-lg font-bold mb-2 hover:bg-golf-lightGreen">
              プレミアムにアップグレード
            </button>
          )}
          <button
            onClick={() => { signOut(); setMenuOpen(false) }}
            className="w-full text-gray-500 text-xs py-1.5 hover:text-gray-700"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}

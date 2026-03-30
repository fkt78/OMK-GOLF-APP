import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Briefcase, User } from 'lucide-react'

const TABS = [
  { path: '/',        icon: LayoutDashboard, label: 'ホーム' },
  { path: '/bag',     icon: Briefcase,       label: 'マイバッグ' },
  { path: '/profile', icon: User,            label: 'プロフィール' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-30 safe-area-bottom">
      {TABS.map(({ path, icon: Icon, label }) => {
        const active = pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              active ? 'text-golf-green' : 'text-gray-400'
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span className={`text-xs ${active ? 'font-bold' : 'font-normal'}`}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

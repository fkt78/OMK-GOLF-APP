import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateNotification() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-golf-green text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <div>
        <span className="font-bold text-sm">🆕 新しいバージョンが利用可能です</span>
        <span className="text-green-200 text-xs ml-2">v{__APP_VERSION__}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setNeedRefresh(false)}
          className="text-green-200 text-xs hover:text-white px-2"
        >
          後で
        </button>
        <button
          onClick={() => updateServiceWorker(true)}
          className="bg-white text-golf-green px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-50"
        >
          今すぐ更新
        </button>
      </div>
    </div>
  )
}

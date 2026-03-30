import React from 'react'
import { RefreshCw, X } from 'lucide-react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateNotification() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-golf-green text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <RefreshCw size={15} className="shrink-0" />
        <span className="font-semibold text-sm">新しいバージョンが利用可能です</span>
        <span className="text-green-200 text-xs">v{__APP_VERSION__}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setNeedRefresh(false)}
          className="text-green-200 hover:text-white p-1"
          aria-label="閉じる"
        >
          <X size={16} />
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

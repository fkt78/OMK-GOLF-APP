import React from 'react'

interface Props {
  size?: number
  color?: string
}

// HIG準拠のゴルフフラッグアイコン（絵文字不使用）
export default function GolfLogo({ size = 24, color = 'currentColor' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* フラッグスティック */}
      <line x1="11" y1="3" x2="11" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* フラッグ */}
      <path d="M11 4 L20 7.5 L11 11 Z" fill={color} />
      {/* ホール */}
      <ellipse cx="11" cy="21" rx="5" ry="1.5" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

import { useEffect, useRef } from 'react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'

let loadPromise: Promise<void> | null = null

function loadGooglePlaces(): Promise<void> {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()
  if (!key) return Promise.reject(new Error('no key'))
  if (!loadPromise) {
    loadPromise = (async () => {
      setOptions({ key, v: 'weekly' })
      await importLibrary('places')
    })()
  }
  return loadPromise
}

export function hasGoogleMapsPlacesKey(): boolean {
  return Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim())
}

type Props = {
  onSelect: (displayName: string) => void
}

/**
 * Google Places のオートコンプリート（日本の施設）。
 * VITE_GOOGLE_MAPS_API_KEY が設定されているときのみ利用可能。
 * Cloud Console で「Maps JavaScript API」「Places API」を有効化し、キーに HTTP リファラー制限を推奨。
 */
export default function GoogleGolfPlaceAutocomplete({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  useEffect(() => {
    if (!hasGoogleMapsPlacesKey() || !inputRef.current) return

    let cancelled = false
    let listener: google.maps.MapsEventListener | undefined
    let ac: google.maps.places.Autocomplete | null = null

    ;(async () => {
      try {
        await loadGooglePlaces()
      } catch {
        return
      }
      const el = inputRef.current
      if (cancelled || !el) return

      ac = new google.maps.places.Autocomplete(el, {
        componentRestrictions: { country: 'jp' },
        fields: ['name', 'formatted_address', 'types'],
        types: ['establishment'],
      })
      listener = ac.addListener('place_changed', () => {
        const place = ac!.getPlace()
        const name = place.name?.trim()
        if (!name) return
        onSelectRef.current(name)
      })
    })()

    return () => {
      cancelled = true
      if (listener) google.maps.event.removeListener(listener)
      if (ac) {
        google.maps.event.clearInstanceListeners(ac)
      }
    }
  }, [])

  return (
    <input
      ref={inputRef}
      type="text"
      name="google-golf-place"
      autoComplete="off"
      placeholder="例: Japan Classic、ジャパンクラシック…"
      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-golf-green bg-white"
    />
  )
}

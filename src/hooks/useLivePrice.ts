import { useState, useEffect, useRef } from 'react'
import { getAllMids } from '../utils/data'

interface LivePriceState {
  price: string | null
  prevPrice: string | null
  lastUpdated: Date | null
  loading: boolean
  error: string | null
}

export function useLivePrice(coin: string, intervalMs: number = 10000): LivePriceState {
  const [state, setState] = useState<LivePriceState>({
    price: null,
    prevPrice: null,
    lastUpdated: null,
    loading: true,
    error: null
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchPrice = async () => {
    try {
      const mids = await getAllMids()
      
      if (!mids || !(coin in mids)) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: `Price not found for ${coin}`
        }))
        return
      }

      const newPrice = mids[coin]
      
      setState(prev => ({
        price: newPrice,
        prevPrice: prev.price,
        lastUpdated: new Date(),
        loading: false,
        error: null
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch price data'
      }))
    }
  }

  useEffect(() => {
    // Initial fetch on mount
    fetchPrice()

    // Set up polling interval
    intervalRef.current = setInterval(fetchPrice, intervalMs)

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [coin, intervalMs])

  return state
}

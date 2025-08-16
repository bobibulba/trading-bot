/**
 * Fetches all mid prices from Hyperliquid API
 * @returns Object mapping symbol to price string, or null on error
 */
export async function getAllMids(): Promise<Record<string, string> | null> {
  try {
    const response = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'allMids',
        dex: ''
      })
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

/**
 * Represents a single candlestick data point
 */
export interface Candle {
  timestamp: number
  open: string
  high: string
  low: string
  close: string
  volume: string
}

/**
 * Fetches historical candlestick data from Hyperliquid API
 * @param coin - The coin symbol (e.g., "BTC", "ETH")
 * @param interval - The time interval (e.g., "1m", "5m", "1h", "1d")
 * @param startTime - Start timestamp in milliseconds
 * @param endTime - End timestamp in milliseconds
 * @returns Array of candles if available, empty array otherwise
 */
export async function getCandles(
  coin: string,
  interval: string,
  startTime: number,
  endTime: number
): Promise<Candle[]> {
  try {
    const response = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'candleSnapshot',
        req: {
          coin,
          interval,
          startTime,
          endTime
        }
      })
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    
    // Return empty array if no data or invalid response
    if (!data || !Array.isArray(data)) {
      return []
    }

    // Map the response to our Candle interface
    // Assuming the API returns arrays in format: [timestamp, open, high, low, close, volume]
    return data.map((candle: any[]): Candle => ({
      timestamp: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5]
    }))
  } catch (error) {
    return []
  }
}

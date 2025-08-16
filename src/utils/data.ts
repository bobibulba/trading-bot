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

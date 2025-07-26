import React from 'react'
import { TrendingUp, TrendingDown, BarChart3, Eye } from 'lucide-react'

const MarketTab: React.FC = () => {
  const marketData = [
    { symbol: 'BTC/USDT', price: '$43,250.00', change: '+2.45%', volume: '$2.1B', trend: 'up' },
    { symbol: 'ETH/USDT', price: '$2,680.50', change: '+1.89%', volume: '$1.8B', trend: 'up' },
    { symbol: 'BNB/USDT', price: '$315.20', change: '-0.75%', volume: '$456M', trend: 'down' },
    { symbol: 'ADA/USDT', price: '$0.5234', change: '+3.21%', volume: '$234M', trend: 'up' },
    { symbol: 'SOL/USDT', price: '$98.50', change: '+5.67%', volume: '$189M', trend: 'up' },
    { symbol: 'DOT/USDT', price: '$7.89', change: '-1.23%', volume: '$145M', trend: 'down' },
    { symbol: 'MATIC/USDT', price: '$0.8945', change: '+2.11%', volume: '$123M', trend: 'up' },
    { symbol: 'AVAX/USDT', price: '$24.67', change: '+4.33%', volume: '$98M', trend: 'up' },
  ]

  const watchlist = [
    { symbol: 'LINK/USDT', price: '$14.56', change: '+1.23%', alert: 'Buy Signal' },
    { symbol: 'UNI/USDT', price: '$6.78', change: '-0.45%', alert: 'Sell Signal' },
    { symbol: 'ATOM/USDT', price: '$9.12', change: '+2.67%', alert: 'Watch' },
  ]

  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-4 border-black shadow-brutal p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide">Market Cap</h3>
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl font-black text-black">$1.2T</p>
          <p className="text-sm font-bold text-accent">+3.2% (24h)</p>
        </div>

        <div className="bg-white border-4 border-black shadow-brutal p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide">24h Volume</h3>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl font-black text-black">$89.5B</p>
          <p className="text-sm font-bold text-accent">+12.8% (24h)</p>
        </div>

        <div className="bg-white border-4 border-black shadow-brutal p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide">BTC Dominance</h3>
            <Eye className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl font-black text-black">52.3%</p>
          <p className="text-sm font-bold text-red-500">-0.8% (24h)</p>
        </div>
      </div>

      {/* Market Data Table */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <h3 className="text-2xl font-black text-black uppercase mb-6">Top Markets</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Symbol</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Price</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">24h Change</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Volume</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Trend</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((item, index) => (
                <tr key={index} className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-2 font-bold text-black">{item.symbol}</td>
                  <td className="py-4 px-2 font-bold text-black">{item.price}</td>
                  <td className={`py-4 px-2 font-bold ${item.trend === 'up' ? 'text-accent' : 'text-red-500'}`}>
                    {item.change}
                  </td>
                  <td className="py-4 px-2 font-bold text-gray-600">{item.volume}</td>
                  <td className="py-4 px-2">
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-accent" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="py-4 px-2">
                    <button className="bg-accent border-2 border-black px-4 py-2 font-black text-black text-xs uppercase hover:bg-accent-dark transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Watchlist */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <h3 className="text-2xl font-black text-black uppercase mb-6">Watchlist</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {watchlist.map((item, index) => (
            <div key={index} className="bg-gray-50 border-4 border-black p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-black text-black">{item.symbol}</h4>
                <span className={`px-3 py-1 text-xs font-black border-2 border-black ${
                  item.alert === 'Buy Signal' ? 'bg-accent text-black' :
                  item.alert === 'Sell Signal' ? 'bg-red-500 text-white' :
                  'bg-yellow-400 text-black'
                }`}>
                  {item.alert}
                </span>
              </div>
              <p className="text-2xl font-black text-black mb-2">{item.price}</p>
              <p className={`text-sm font-bold ${item.change.startsWith('+') ? 'text-accent' : 'text-red-500'}`}>
                {item.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarketTab

import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Zap } from 'lucide-react'

const OverviewTab: React.FC = () => {
  const stats = [
    { label: 'Total Portfolio', value: '$24,567.89', change: '+12.5%', trend: 'up' },
    { label: 'Active Trades', value: '7', change: '+2', trend: 'up' },
    { label: 'Win Rate', value: '73.2%', change: '+5.1%', trend: 'up' },
    { label: 'Daily P&L', value: '+$1,234.56', change: '+8.9%', trend: 'up' },
  ]

  const recentTrades = [
    { pair: 'BTC/USDT', type: 'BUY', amount: '0.5 BTC', price: '$43,250', profit: '+$125.50', time: '2 min ago' },
    { pair: 'ETH/USDT', type: 'SELL', amount: '2.1 ETH', price: '$2,680', profit: '+$89.20', time: '5 min ago' },
    { pair: 'ADA/USDT', type: 'BUY', amount: '1000 ADA', price: '$0.52', profit: '+$15.80', time: '12 min ago' },
    { pair: 'SOL/USDT', type: 'SELL', amount: '5 SOL', price: '$98.50', profit: '+$45.30', time: '18 min ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border-4 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide">{stat.label}</h3>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-accent" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-black text-black">{stat.value}</p>
              <p className={`text-sm font-bold ${stat.trend === 'up' ? 'text-accent' : 'text-red-500'}`}>
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Chart */}
        <div className="bg-white border-4 border-black shadow-brutal p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-black uppercase">Portfolio Performance</h3>
            <Activity className="w-6 h-6 text-accent" />
          </div>
          <div className="h-64 bg-gray-50 border-4 border-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <p className="text-lg font-black text-black">+24.7% This Month</p>
              <p className="text-sm font-bold text-gray-600">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Bot Status */}
        <div className="bg-white border-4 border-black shadow-brutal p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-black uppercase">Bot Status</h3>
            <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-4 border-black">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-black text-black">SCALPING BOT</span>
              </div>
              <span className="bg-accent border-2 border-black px-3 py-1 text-xs font-black text-black">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 border-4 border-black">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-accent" />
                <span className="font-black text-black">SWING BOT</span>
              </div>
              <span className="bg-accent border-2 border-black px-3 py-1 text-xs font-black text-black">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 border-4 border-black">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span className="font-black text-gray-400">ARBITRAGE BOT</span>
              </div>
              <span className="bg-gray-300 border-2 border-black px-3 py-1 text-xs font-black text-black">PAUSED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <h3 className="text-2xl font-black text-black uppercase mb-6">Recent Trades</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Pair</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Type</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Amount</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Price</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Profit</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade, index) => (
                <tr key={index} className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-2 font-bold text-black">{trade.pair}</td>
                  <td className="py-4 px-2">
                    <span className={`px-3 py-1 text-xs font-black border-2 border-black ${
                      trade.type === 'BUY' ? 'bg-accent text-black' : 'bg-red-500 text-white'
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-4 px-2 font-bold text-black">{trade.amount}</td>
                  <td className="py-4 px-2 font-bold text-black">{trade.price}</td>
                  <td className="py-4 px-2 font-bold text-accent">{trade.profit}</td>
                  <td className="py-4 px-2 font-bold text-gray-600">{trade.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OverviewTab

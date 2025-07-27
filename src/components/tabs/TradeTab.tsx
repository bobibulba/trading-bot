import React, { useState, useEffect } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Play, AlertTriangle, Target, Eye, Pause, TestTube, Clock } from 'lucide-react'

interface Strategy {
  id: string
  name: string
  type: string
  status: 'Active' | 'Paused'
  profit: string
  trades: number
  winRate: string
  pairs: string[]
  config: StrategyConfig
  createdAt: Date
  performance: StrategyPerformance
}

interface StrategyConfig {
  riskLevel: 'Low' | 'Medium' | 'High'
  maxPositionSize: string
  stopLoss: string
  takeProfit: string
  leverage: string
  tradingPairs: string[]
}

interface StrategyPerformance {
  trades: number
  wins: number
  profit: number
}

interface Toast {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

const TradeTab: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('scalping-master')
  const [tradeType, setTradeType] = useState('buy')
  const [amount, setAmount] = useState('1000')
  const [leverage, setLeverage] = useState('1')
  const [activeStrategies, setActiveStrategies] = useState<Strategy[]>([])
  const [toast, setToast] = useState<Toast | null>(null)

  const tradingPairs = [
    { pair: 'BTC/USDT', price: '$43,256.78', change: '+2.34%', volume: '$2.1B' },
    { pair: 'ETH/USDT', price: '$2,678.90', change: '+1.87%', volume: '$1.8B' },
    { pair: 'ADA/USDT', price: '$0.4567', change: '-0.45%', volume: '$456M' },
    { pair: 'SOL/USDT', price: '$98.76', change: '+3.21%', volume: '$789M' },
  ]

  const activePositions = [
    { pair: 'BTC/USDT', type: 'Long', size: '$2,500', pnl: '+$156.78', entry: '$42,890' },
    { pair: 'ETH/USDT', type: 'Short', size: '$1,800', pnl: '-$23.45', entry: '$2,695' },
    { pair: 'SOL/USDT', type: 'Long', size: '$1,200', pnl: '+$89.12', entry: '$95.60' },
  ]

  // Load active strategies from localStorage
  useEffect(() => {
    const loadActiveStrategies = () => {
      const savedStrategies = localStorage.getItem('tradingStrategies')
      if (savedStrategies) {
        const parsed = JSON.parse(savedStrategies)
        const strategiesWithDates = parsed.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          // Initialize performance if it doesn't exist
          performance: s.performance || { trades: 0, wins: 0, profit: 0 }
        }))
        
        // Filter only active strategies and sort by newest first
        const activeOnly = strategiesWithDates
          .filter((s: Strategy) => s.status === 'Active')
          .sort((a: Strategy, b: Strategy) => b.createdAt.getTime() - a.createdAt.getTime())
        
        setActiveStrategies(activeOnly)
      } else {
        setActiveStrategies([])
      }
    }

    loadActiveStrategies()

    // Listen for localStorage changes (when strategies are updated from Strategy Lab)
    const handleStorageChange = () => {
      loadActiveStrategies()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadActiveStrategies, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const formatProfit = (profit: number) => {
    const sign = profit >= 0 ? '+' : ''
    return `${sign}${profit} USDT`
  }

  const calculateWinRate = (wins: number, totalTrades: number) => {
    if (totalTrades === 0) return '0%'
    return `${Math.round((wins / totalTrades) * 100)}%`
  }

  const handleMockTrade = (strategyId: string, strategyName: string) => {
    const savedStrategies = localStorage.getItem('tradingStrategies')
    if (savedStrategies) {
      const parsed = JSON.parse(savedStrategies)
      
      // Simulate trade outcome: 50% chance to win
      const isWin = Math.random() >= 0.5
      const profitChange = isWin ? 10 : -5
      
      const updated = parsed.map((s: any) => {
        if (s.id === strategyId) {
          const currentPerformance = s.performance || { trades: 0, wins: 0, profit: 0 }
          return {
            ...s,
            performance: {
              trades: currentPerformance.trades + 1,
              wins: currentPerformance.wins + (isWin ? 1 : 0),
              profit: currentPerformance.profit + profitChange
            }
          }
        }
        return s
      })
      
      localStorage.setItem('tradingStrategies', JSON.stringify(updated))
      
      // Update local state immediately
      setActiveStrategies(prev => prev.map(s => {
        if (s.id === strategyId) {
          return {
            ...s,
            performance: {
              trades: s.performance.trades + 1,
              wins: s.performance.wins + (isWin ? 1 : 0),
              profit: s.performance.profit + profitChange
            }
          }
        }
        return s
      }))
      
      // Show success toast with trade result
      const resultText = isWin ? `WIN (+10 USDT)` : `LOSS (-5 USDT)`
      showToast(`Strategy "${strategyName}" mock trade executed! ${resultText}`, 'success')
    }
  }

  const handlePauseStrategy = (strategyId: string, strategyName: string) => {
    const savedStrategies = localStorage.getItem('tradingStrategies')
    if (savedStrategies) {
      const parsed = JSON.parse(savedStrategies)
      const updated = parsed.map((s: any) => 
        s.id === strategyId ? { ...s, status: 'Paused' } : s
      )
      localStorage.setItem('tradingStrategies', JSON.stringify(updated))
      
      // Update local state
      setActiveStrategies(prev => prev.filter(s => s.id !== strategyId))
      showToast(`Strategy "${strategyName}" paused`, 'info')
    }
  }

  const handleViewStrategy = (strategyName: string) => {
    showToast(`Strategy "${strategyName}" details (coming soon)`, 'info')
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 border-4 border-black p-4 shadow-brutal ${
          toast.type === 'success' ? 'bg-accent' : 
          toast.type === 'error' ? 'bg-red-500' : 
          toast.type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="font-black text-black">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Active Strategies Section */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-black uppercase">Active Strategies</h3>
          <div className="bg-accent border-4 border-black px-4 py-2">
            <span className="font-black text-black">{activeStrategies.length} Active</span>
          </div>
        </div>

        {activeStrategies.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-300 border-4 border-black mx-auto mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-lg font-black text-gray-600 mb-2">No active strategies yet</p>
            <p className="font-bold text-gray-500">Create one in Strategy Lab to start trading</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeStrategies.map((strategy) => (
              <div key={strategy.id} className="bg-gray-50 border-4 border-black p-6 hover:bg-gray-100 transition-colors">
                {/* Strategy Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-black text-black">{strategy.name}</h4>
                    <p className="text-sm font-bold text-gray-600 uppercase">{strategy.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-accent border-2 border-black px-2 py-1 text-xs font-black text-black">
                      ACTIVE
                    </span>
                    <span className="bg-blue-500 border-2 border-black px-2 py-1 text-xs font-black text-white">
                      {strategy.config.leverage}x
                    </span>
                  </div>
                </div>

                {/* Trading Pairs */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-600 uppercase mb-2">Trading Pairs</p>
                  <div className="flex flex-wrap gap-2">
                    {strategy.pairs.map((pair, index) => (
                      <span key={index} className="bg-white border-2 border-black px-2 py-1 text-xs font-black text-black">
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase">Profit</p>
                    <p className={`text-sm font-black ${
                      strategy.performance.profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatProfit(strategy.performance.profit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase">Win Rate</p>
                    <p className="text-sm font-black text-black">
                      {calculateWinRate(strategy.performance.wins, strategy.performance.trades)} Win Rate
                    </p>
                  </div>
                </div>

                {/* Trade Count */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-600 uppercase">Total Trades</p>
                  <p className="text-sm font-black text-black">
                    {strategy.performance.trades} trades ({strategy.performance.wins} wins)
                  </p>
                </div>

                {/* Creation Time */}
                <div className="flex items-center space-x-2 mb-6">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-500">
                    Created {getTimeAgo(strategy.createdAt)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMockTrade(strategy.id, strategy.name)}
                    className="flex-1 bg-accent border-2 border-black py-2 px-3 font-black text-black text-xs uppercase hover:bg-accent-dark transition-colors flex items-center justify-center space-x-1"
                  >
                    <TestTube className="w-3 h-3" />
                    <span>Mock Trade</span>
                  </button>
                  <button
                    onClick={() => handlePauseStrategy(strategy.id, strategy.name)}
                    className="bg-yellow-500 border-2 border-black py-2 px-3 font-black text-black text-xs uppercase hover:bg-yellow-600 transition-colors"
                  >
                    <Pause className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleViewStrategy(strategy.name)}
                    className="bg-blue-500 border-2 border-black py-2 px-3 font-black text-white text-xs uppercase hover:bg-blue-600 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trade Execution Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="bg-white border-4 border-black shadow-brutal p-8">
          <h3 className="text-2xl font-black text-black uppercase mb-6">Execute Trade</h3>
          
          <div className="space-y-6">
            {/* Strategy Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Select Strategy
              </label>
              <select 
                value={selectedStrategy}
                onChange={(e) => setSelectedStrategy(e.target.value)}
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              >
                {activeStrategies.length > 0 ? (
                  activeStrategies.map((strategy) => (
                    <option key={strategy.id} value={strategy.id}>
                      {strategy.name} (Active)
                    </option>
                  ))
                ) : (
                  <option value="">No active strategies available</option>
                )}
              </select>
            </div>

            {/* Trade Type */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Trade Type
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 border-4 border-black py-3 font-black uppercase transition-colors ${
                    tradeType === 'buy' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5 inline mr-2" />
                  Buy/Long
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 border-4 border-black py-3 font-black uppercase transition-colors ${
                    tradeType === 'sell' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  <TrendingDown className="w-5 h-5 inline mr-2" />
                  Sell/Short
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Amount (USDT)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
                placeholder="Enter amount"
              />
            </div>

            {/* Leverage */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Leverage
              </label>
              <select 
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              >
                <option value="1">1x (No Leverage)</option>
                <option value="2">2x</option>
                <option value="5">5x</option>
                <option value="10">10x</option>
                <option value="20">20x</option>
              </select>
            </div>

            {/* Execute Button */}
            <button 
              disabled={activeStrategies.length === 0}
              className={`w-full border-4 border-black py-4 font-black uppercase tracking-wide transition-colors flex items-center justify-center space-x-2 ${
                activeStrategies.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-accent text-black hover:bg-accent-dark'
              }`}
            >
              <Play className="w-5 h-5" />
              <span>{activeStrategies.length === 0 ? 'No Active Strategies' : 'Execute Trade'}</span>
            </button>

            {/* Risk Warning */}
            <div className="bg-yellow-100 border-4 border-black p-4 flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-black text-black text-sm uppercase">Risk Warning</p>
                <p className="text-sm font-bold text-gray-600">
                  Trading involves substantial risk. Only trade with funds you can afford to lose.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Pairs */}
        <div className="bg-white border-4 border-black shadow-brutal p-8">
          <h3 className="text-2xl font-black text-black uppercase mb-6">Trading Pairs</h3>
          <div className="space-y-4">
            {tradingPairs.map((pair, index) => (
              <div key={index} className="bg-gray-50 border-4 border-black p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-black text-black">{pair.pair}</h4>
                    <p className="text-sm font-bold text-gray-600">Vol: {pair.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-black">{pair.price}</p>
                    <p className={`text-sm font-black ${
                      pair.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {pair.change}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Positions */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <h3 className="text-2xl font-black text-black uppercase mb-6">Active Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Pair</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Type</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Size</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Entry</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">P&L</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {activePositions.map((position, index) => (
                <tr key={index} className="border-b-2 border-gray-200">
                  <td className="py-4 px-2 font-bold text-black">{position.pair}</td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 text-xs font-black border-2 border-black ${
                      position.type === 'Long' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {position.type}
                    </span>
                  </td>
                  <td className="py-4 px-2 font-bold text-black">{position.size}</td>
                  <td className="py-4 px-2 font-bold text-gray-600">{position.entry}</td>
                  <td className={`py-4 px-2 font-black ${
                    position.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {position.pnl}
                  </td>
                  <td className="py-4 px-2">
                    <button className="bg-red-500 border-2 border-black px-3 py-1 font-black text-white text-xs uppercase hover:bg-red-600 transition-colors">
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TradeTab

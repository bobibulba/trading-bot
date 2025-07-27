import React, { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Play, AlertTriangle, Target } from 'lucide-react'

const TradeTab: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('scalping-master')
  const [tradeType, setTradeType] = useState('buy')
  const [amount, setAmount] = useState('1000')
  const [leverage, setLeverage] = useState('1')

  const strategies = [
    { id: 'scalping-master', name: 'Scalping Master', status: 'Active', profit: '+$2,456.78' },
    { id: 'swing-trader-pro', name: 'Swing Trader Pro', status: 'Active', profit: '+$1,234.56' },
    { id: 'arbitrage-hunter', name: 'Arbitrage Hunter', status: 'Paused', profit: '+$567.89' },
  ]

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

  return (
    <div className="space-y-8">
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
                {strategies.map((strategy) => (
                  <option key={strategy.id} value={strategy.id}>
                    {strategy.name} ({strategy.status})
                  </option>
                ))}
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
            <button className="w-full bg-accent border-4 border-black py-4 font-black text-black uppercase tracking-wide hover:bg-accent-dark transition-colors flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Execute Trade</span>
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

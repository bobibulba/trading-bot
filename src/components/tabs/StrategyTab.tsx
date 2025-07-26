import React from 'react'
import { Zap, Target, Settings, Play, Pause, BarChart3 } from 'lucide-react'

const StrategyTab: React.FC = () => {
  const strategies = [
    {
      name: 'Scalping Master',
      type: 'Scalping',
      status: 'Active',
      profit: '+$2,456.78',
      trades: 156,
      winRate: '78.5%',
      pairs: ['BTC/USDT', 'ETH/USDT'],
    },
    {
      name: 'Swing Trader Pro',
      type: 'Swing Trading',
      status: 'Active',
      profit: '+$1,234.56',
      trades: 23,
      winRate: '69.6%',
      pairs: ['ADA/USDT', 'SOL/USDT'],
    },
    {
      name: 'Arbitrage Hunter',
      type: 'Arbitrage',
      status: 'Paused',
      profit: '+$567.89',
      trades: 89,
      winRate: '85.4%',
      pairs: ['BNB/USDT', 'MATIC/USDT'],
    },
  ]

  const parameters = [
    { name: 'Risk Level', value: 'Medium', type: 'select' },
    { name: 'Max Position Size', value: '5%', type: 'input' },
    { name: 'Stop Loss', value: '2%', type: 'input' },
    { name: 'Take Profit', value: '4%', type: 'input' },
    { name: 'Trading Pairs', value: '8 Selected', type: 'multi' },
  ]

  return (
    <div className="space-y-8">
      {/* Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <div key={index} className="bg-white border-4 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent border-4 border-black flex items-center justify-center">
                  {strategy.type === 'Scalping' ? <Zap className="w-5 h-5 text-black" /> :
                   strategy.type === 'Swing Trading' ? <Target className="w-5 h-5 text-black" /> :
                   <BarChart3 className="w-5 h-5 text-black" />}
                </div>
                <div>
                  <h3 className="text-lg font-black text-black">{strategy.name}</h3>
                  <p className="text-sm font-bold text-gray-600 uppercase">{strategy.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-black border-2 border-black ${
                strategy.status === 'Active' ? 'bg-accent text-black' : 'bg-gray-300 text-black'
              }`}>
                {strategy.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-bold text-gray-600">Profit:</span>
                <span className="font-black text-accent">{strategy.profit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-600">Trades:</span>
                <span className="font-black text-black">{strategy.trades}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-600">Win Rate:</span>
                <span className="font-black text-black">{strategy.winRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-600">Pairs:</span>
                <span className="font-bold text-black text-sm">{strategy.pairs.join(', ')}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className={`flex-1 border-2 border-black px-4 py-2 font-black text-xs uppercase transition-colors ${
                strategy.status === 'Active' 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-accent text-black hover:bg-accent-dark'
              }`}>
                {strategy.status === 'Active' ? (
                  <>
                    <Pause className="w-4 h-4 inline mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 inline mr-2" />
                    Start
                  </>
                )}
              </button>
              <button className="bg-white border-2 border-black px-4 py-2 font-black text-black text-xs uppercase hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parameters */}
        <div className="bg-white border-4 border-black shadow-brutal p-8">
          <h3 className="text-2xl font-black text-black uppercase mb-6">Strategy Parameters</h3>
          <div className="space-y-6">
            {parameters.map((param, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                  {param.name}
                </label>
                {param.type === 'select' ? (
                  <select className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50">
                    <option>{param.value}</option>
                    <option>Low</option>
                    <option>High</option>
                  </select>
                ) : param.type === 'multi' ? (
                  <button className="w-full border-4 border-black p-3 font-bold text-black bg-gray-50 text-left hover:bg-gray-100 transition-colors">
                    {param.value}
                  </button>
                ) : (
                  <input
                    type="text"
                    value={param.value}
                    className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
                    readOnly
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 space-y-4">
            <button className="w-full bg-accent border-4 border-black py-4 font-black text-black uppercase tracking-wide hover:bg-accent-dark transition-colors">
              Deploy Strategy
            </button>
            <button className="w-full bg-white border-4 border-black py-4 font-black text-black uppercase tracking-wide hover:bg-gray-50 transition-colors">
              Backtest Strategy
            </button>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white border-4 border-black shadow-brutal p-8">
          <h3 className="text-2xl font-black text-black uppercase mb-6">Performance Analysis</h3>
          <div className="h-64 bg-gray-50 border-4 border-black flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-black" />
              </div>
              <p className="text-lg font-black text-black">Strategy Performance</p>
              <p className="text-sm font-bold text-gray-600">Chart visualization would go here</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border-4 border-black p-4 text-center">
              <p className="text-2xl font-black text-black">+24.7%</p>
              <p className="text-sm font-bold text-gray-600 uppercase">Total Return</p>
            </div>
            <div className="bg-gray-50 border-4 border-black p-4 text-center">
              <p className="text-2xl font-black text-black">1.8</p>
              <p className="text-sm font-bold text-gray-600 uppercase">Sharpe Ratio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrategyTab

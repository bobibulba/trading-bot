import React, { useState, useEffect } from 'react'
import { Zap, Target, Settings, Play, Pause, BarChart3, X, Check, Edit3, Trash2, Plus, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { useLivePrice } from '../../hooks/useLivePrice'

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
}

interface StrategyConfig {
  riskLevel: 'Low' | 'Medium' | 'High'
  maxPositionSize: string
  stopLoss: string
  takeProfit: string
  leverage: string
  tradingPairs: string[]
}

interface Toast {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface DeleteConfirmation {
  isOpen: boolean
  strategyId: string | null
  strategyName: string
}

const LivePricePill: React.FC<{ coin: string }> = ({ coin }) => {
  const { price, prevPrice, loading, error } = useLivePrice(coin, 10000)

  const formatPrice = (price: string | null): string => {
    if (!price) return '0.00'
    const num = parseFloat(price)
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const getPriceDirection = (): 'up' | 'down' | 'neutral' => {
    if (!price || !prevPrice) return 'neutral'
    const current = parseFloat(price)
    const previous = parseFloat(prevPrice)
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'neutral'
  }

  const direction = getPriceDirection()

  if (loading && !price) {
    return (
      <div className="bg-gray-100 border-2 border-black px-3 py-1 text-xs font-black text-gray-600">
        Live: …
      </div>
    )
  }

  if (error && !price) {
    return (
      <div className="bg-gray-100 border-2 border-black px-3 py-1 text-xs font-black text-gray-600">
        Live: —
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-black px-3 py-1 text-xs font-black text-black flex items-center space-x-1">
      <span>Live: ${formatPrice(price)}</span>
      {direction !== 'neutral' && (
        <span className={`opacity-50 ${direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {direction === 'up' ? '▲' : '▼'}
        </span>
      )}
    </div>
  )
}

const StrategyTab: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [editingStrategy, setEditingStrategy] = useState<string | null>(null)
  const [strategyName, setStrategyName] = useState('')
  const [strategyType, setStrategyType] = useState('Scalping')
  
  const [config, setConfig] = useState<StrategyConfig>({
    riskLevel: 'Medium',
    maxPositionSize: '5',
    stopLoss: '2',
    takeProfit: '4',
    leverage: '2',
    tradingPairs: ['BTC/USDT', 'ETH/USDT']
  })

  const [showPairSelector, setShowPairSelector] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>({
    isOpen: false,
    strategyId: null,
    strategyName: ''
  })

  const MAX_STRATEGIES = 10

  const availablePairs = [
    'BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT', 'BNB/USDT', 
    'MATIC/USDT', 'DOT/USDT', 'LINK/USDT', 'UNI/USDT', 'AVAX/USDT',
    'ATOM/USDT', 'XRP/USDT', 'LTC/USDT', 'BCH/USDT', 'ALGO/USDT'
  ]

  const leverageOptions = ['1', '2', '5', '10', '20', '50', '100']
  const strategyTypes = ['Scalping', 'Swing Trading', 'Arbitrage', 'Grid Trading', 'DCA']

  // Mock chart data
  const chartData = [
    { time: '09:00', price: 42000, volume: 120 },
    { time: '09:30', price: 42150, volume: 95 },
    { time: '10:00', price: 41980, volume: 140 },
    { time: '10:30', price: 42300, volume: 110 },
    { time: '11:00', price: 42450, volume: 85 },
    { time: '11:30', price: 42200, volume: 160 },
    { time: '12:00', price: 42600, volume: 130 },
    { time: '12:30', price: 42750, volume: 105 },
  ]

  // Load strategies from localStorage on component mount
  useEffect(() => {
    const savedStrategies = localStorage.getItem('tradingStrategies')
    if (savedStrategies) {
      const parsed = JSON.parse(savedStrategies)
      const strategiesWithDates = parsed.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt)
      }))
      // Sort by newest first
      strategiesWithDates.sort((a: Strategy, b: Strategy) => b.createdAt.getTime() - a.createdAt.getTime())
      setStrategies(strategiesWithDates)
    } else {
      // Initialize with mock strategies
      const mockStrategies: Strategy[] = [
        {
          id: '1',
          name: 'Scalping Master',
          type: 'Scalping',
          status: 'Active',
          profit: '+$2,456.78',
          trades: 156,
          winRate: '78.5%',
          pairs: ['BTC/USDT', 'ETH/USDT'],
          config: {
            riskLevel: 'High',
            maxPositionSize: '3',
            stopLoss: '1.5',
            takeProfit: '2.5',
            leverage: '5',
            tradingPairs: ['BTC/USDT', 'ETH/USDT']
          },
          createdAt: new Date(Date.now() - 86400000) // 1 day ago
        },
        {
          id: '2',
          name: 'Swing Trader Pro',
          type: 'Swing Trading',
          status: 'Active',
          profit: '+$1,234.56',
          trades: 23,
          winRate: '69.6%',
          pairs: ['ADA/USDT', 'SOL/USDT'],
          config: {
            riskLevel: 'Medium',
            maxPositionSize: '8',
            stopLoss: '5',
            takeProfit: '12',
            leverage: '2',
            tradingPairs: ['ADA/USDT', 'SOL/USDT']
          },
          createdAt: new Date() // Now
        }
      ]
      // Sort by newest first
      mockStrategies.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      setStrategies(mockStrategies)
      localStorage.setItem('tradingStrategies', JSON.stringify(mockStrategies))
    }
  }, [])

  // Save strategies to localStorage whenever strategies change
  useEffect(() => {
    if (strategies.length > 0) {
      localStorage.setItem('tradingStrategies', JSON.stringify(strategies))
    }
  }, [strategies])

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleConfigChange = (key: keyof StrategyConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const toggleTradingPair = (pair: string) => {
    setConfig(prev => ({
      ...prev,
      tradingPairs: prev.tradingPairs.includes(pair)
        ? prev.tradingPairs.filter(p => p !== pair)
        : [...prev.tradingPairs, pair]
    }))
  }

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const handleDeploy = () => {
    if (!strategyName.trim()) {
      showToast('Please enter a strategy name', 'error')
      return
    }

    if (config.tradingPairs.length === 0) {
      showToast('Please select at least one trading pair', 'error')
      return
    }

    // Check strategy limit for new strategies only
    if (!editingStrategy && strategies.length >= MAX_STRATEGIES) {
      showToast(`Strategy limit reached! You can only create up to ${MAX_STRATEGIES} strategies.`, 'warning')
      return
    }

    const newStrategy: Strategy = {
      id: editingStrategy || generateId(),
      name: strategyName,
      type: strategyType,
      status: 'Paused',
      profit: '$0.00',
      trades: 0,
      winRate: '0%',
      pairs: config.tradingPairs,
      config: { ...config },
      createdAt: editingStrategy ? 
        strategies.find(s => s.id === editingStrategy)?.createdAt || new Date() : 
        new Date()
    }

    if (editingStrategy) {
      const updatedStrategies = strategies.map(s => s.id === editingStrategy ? newStrategy : s)
      // Sort by newest first
      updatedStrategies.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      setStrategies(updatedStrategies)
      showToast(`Strategy "${strategyName}" updated successfully!`, 'success')
      setEditingStrategy(null)
    } else {
      const newStrategies = [newStrategy, ...strategies]
      setStrategies(newStrategies)
      showToast(`Strategy "${strategyName}" deployed successfully!`, 'success')
    }

    // Reset form
    setStrategyName('')
    setStrategyType('Scalping')
    setConfig({
      riskLevel: 'Medium',
      maxPositionSize: '5',
      stopLoss: '2',
      takeProfit: '4',
      leverage: '2',
      tradingPairs: ['BTC/USDT', 'ETH/USDT']
    })
  }

  const handleEdit = (strategy: Strategy) => {
    setEditingStrategy(strategy.id)
    setStrategyName(strategy.name)
    setStrategyType(strategy.type)
    setConfig({ ...strategy.config })
    showToast(`Editing strategy "${strategy.name}"`, 'info')
  }

  const handleDeleteClick = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId)
    if (strategy) {
      setDeleteConfirmation({
        isOpen: true,
        strategyId,
        strategyName: strategy.name
      })
    }
  }

  const confirmDelete = () => {
    if (deleteConfirmation.strategyId) {
      const updatedStrategies = strategies.filter(s => s.id !== deleteConfirmation.strategyId)
      setStrategies(updatedStrategies)
      showToast(`Strategy "${deleteConfirmation.strategyName}" deleted`, 'success')
      
      // Update localStorage
      if (updatedStrategies.length === 0) {
        localStorage.removeItem('tradingStrategies')
      } else {
        localStorage.setItem('tradingStrategies', JSON.stringify(updatedStrategies))
      }
    }
    
    setDeleteConfirmation({
      isOpen: false,
      strategyId: null,
      strategyName: ''
    })
  }

  const cancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      strategyId: null,
      strategyName: ''
    })
  }

  const toggleStrategyStatus = (strategyId: string) => {
    const updatedStrategies = strategies.map(s => 
      s.id === strategyId 
        ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' as 'Active' | 'Paused' }
        : s
    )
    setStrategies(updatedStrategies)
    
    const strategy = strategies.find(s => s.id === strategyId)
    const newStatus = strategy?.status === 'Active' ? 'Paused' : 'Active'
    showToast(`Strategy "${strategy?.name}" ${newStatus.toLowerCase()}`, 'info')
  }

  const cancelEdit = () => {
    setEditingStrategy(null)
    setStrategyName('')
    setStrategyType('Scalping')
    setConfig({
      riskLevel: 'Medium',
      maxPositionSize: '5',
      stopLoss: '2',
      takeProfit: '4',
      leverage: '2',
      tradingPairs: ['BTC/USDT', 'ETH/USDT']
    })
    showToast('Edit cancelled', 'info')
  }

  // Extract main coin from strategy's first trading pair
  const getMainCoin = (strategy: Strategy): string | null => {
    if (!strategy.pairs || strategy.pairs.length === 0) return null
    const firstPair = strategy.pairs[0]
    return firstPair.split('/')[0] // Extract coin from "BTC/USDT" -> "BTC"
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
            {toast.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-black" />
            ) : (
              <Check className="w-5 h-5 text-black" />
            )}
            <span className="font-black text-black">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-black shadow-brutal p-8 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-500 border-4 border-black flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-black uppercase">Confirm Delete</h3>
                <p className="text-sm font-bold text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="font-bold text-black mb-8">
              Are you sure you want to delete the strategy "{deleteConfirmation.strategyName}"? 
              This action cannot be undone.
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-300 border-4 border-black py-3 font-black text-black uppercase hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 border-4 border-black py-3 font-black text-white uppercase hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Strategy Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-black uppercase">Active Strategies</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-50 border-4 border-black px-4 py-2">
              <span className="font-black text-black">{strategies.length}/{MAX_STRATEGIES} Strategies</span>
            </div>
            {strategies.length >= MAX_STRATEGIES && (
              <div className="bg-yellow-500 border-4 border-black px-4 py-2">
                <span className="font-black text-black">LIMIT REACHED</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {strategies.map((strategy) => {
            const mainCoin = getMainCoin(strategy)
            
            return (
              <div key={strategy.id} className="bg-white border-4 border-black shadow-brutal p-6">
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
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 text-xs font-black border-2 border-black ${
                      strategy.status === 'Active' ? 'bg-accent text-black' : 'bg-gray-300 text-black'
                    }`}>
                      {strategy.status}
                    </span>
                    {/* Live Price Pill */}
                    {mainCoin && <LivePricePill coin={mainCoin} />}
                  </div>
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
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-600">Created:</span>
                    <span className="font-bold text-black text-xs">
                      {strategy.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleStrategyStatus(strategy.id)}
                    className={`flex-1 border-2 border-black px-4 py-2 font-black text-xs uppercase transition-colors ${
                      strategy.status === 'Active' 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-accent text-black hover:bg-accent-dark'
                    }`}
                  >
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
                  <button 
                    onClick={() => handleEdit(strategy)}
                    className="bg-white border-2 border-black px-4 py-2 font-black text-black text-xs uppercase hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(strategy.id)}
                    className="bg-red-500 border-2 border-black px-4 py-2 font-black text-white text-xs uppercase hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Strategy Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Form */}
        <div className="bg-white border-4 border-black shadow-brutal p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-black uppercase">
              {editingStrategy ? 'Edit Strategy' : 'Create New Strategy'}
            </h3>
            {editingStrategy && (
              <button
                onClick={cancelEdit}
                className="bg-gray-500 border-2 border-black px-4 py-2 font-black text-white text-xs uppercase hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4 inline mr-2" />
                Cancel
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Strategy Name */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Strategy Name
              </label>
              <input
                type="text"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                placeholder="Enter strategy name..."
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              />
            </div>

            {/* Strategy Type */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Strategy Type
              </label>
              <select 
                value={strategyType}
                onChange={(e) => setStrategyType(e.target.value)}
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              >
                {strategyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Risk Level */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Risk Level
              </label>
              <select 
                value={config.riskLevel}
                onChange={(e) => handleConfigChange('riskLevel', e.target.value as 'Low' | 'Medium' | 'High')}
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Max Position Size */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Max Position Size (%)
              </label>
              <input
                type="number"
                value={config.maxPositionSize}
                onChange={(e) => handleConfigChange('maxPositionSize', e.target.value)}
                min="1"
                max="100"
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              />
            </div>

            {/* Stop Loss */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Stop Loss (%)
              </label>
              <input
                type="number"
                value={config.stopLoss}
                onChange={(e) => handleConfigChange('stopLoss', e.target.value)}
                min="0.1"
                max="50"
                step="0.1"
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              />
            </div>

            {/* Take Profit */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Take Profit (%)
              </label>
              <input
                type="number"
                value={config.takeProfit}
                onChange={(e) => handleConfigChange('takeProfit', e.target.value)}
                min="0.1"
                max="100"
                step="0.1"
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              />
            </div>

            {/* Leverage */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Leverage
              </label>
              <select 
                value={config.leverage}
                onChange={(e) => handleConfigChange('leverage', e.target.value)}
                className="w-full border-4 border-black p-3 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
              >
                {leverageOptions.map(option => (
                  <option key={option} value={option}>{option}x</option>
                ))}
              </select>
            </div>

            {/* Trading Pairs */}
            <div className="space-y-2 relative">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-wide">
                Trading Pairs
              </label>
              <button
                onClick={() => setShowPairSelector(!showPairSelector)}
                className="w-full border-4 border-black p-3 font-bold text-black bg-gray-50 text-left hover:bg-gray-100 transition-colors flex justify-between items-center"
              >
                <span>{config.tradingPairs.length} Selected</span>
                <span className="text-xs">{showPairSelector ? '▲' : '▼'}</span>
              </button>
              
              {showPairSelector && (
                <div className="absolute top-full left-0 right-0 z-10 bg-white border-4 border-black shadow-brutal max-h-48 overflow-y-auto">
                  {availablePairs.map(pair => (
                    <label key={pair} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b-2 border-gray-200">
                      <input
                        type="checkbox"
                        checked={config.tradingPairs.includes(pair)}
                        onChange={() => toggleTradingPair(pair)}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="font-bold text-black">{pair}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={handleDeploy}
              disabled={!editingStrategy && strategies.length >= MAX_STRATEGIES}
              className={`w-full border-4 border-black py-4 font-black uppercase tracking-wide transition-colors ${
                !editingStrategy && strategies.length >= MAX_STRATEGIES
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-accent text-black hover:bg-accent-dark'
              }`}
            >
              {editingStrategy ? 'Update Strategy' : 
               strategies.length >= MAX_STRATEGIES ? 'Strategy Limit Reached' : 'Deploy Strategy'}
            </button>
          </div>
        </div>

        {/* Configuration Preview & Chart */}
        <div className="space-y-8">
          {/* Live Configuration Preview */}
          <div className="bg-white border-4 border-black shadow-brutal p-8">
            <h3 className="text-2xl font-black text-black uppercase mb-6">Configuration Preview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border-2 border-black p-3">
                <p className="text-sm font-bold text-gray-600 uppercase">Risk Level</p>
                <p className="text-lg font-black text-black">{config.riskLevel}</p>
              </div>
              <div className="bg-gray-50 border-2 border-black p-3">
                <p className="text-sm font-bold text-gray-600 uppercase">Position Size</p>
                <p className="text-lg font-black text-black">{config.maxPositionSize}%</p>
              </div>
              <div className="bg-gray-50 border-2 border-black p-3">
                <p className="text-sm font-bold text-gray-600 uppercase">Stop Loss</p>
                <p className="text-lg font-black text-black">{config.stopLoss}%</p>
              </div>
              <div className="bg-gray-50 border-2 border-black p-3">
                <p className="text-sm font-bold text-gray-600 uppercase">Take Profit</p>
                <p className="text-lg font-black text-black">{config.takeProfit}%</p>
              </div>
              <div className="bg-gray-50 border-2 border-black p-3">
                <p className="text-sm font-bold text-gray-600 uppercase">Leverage</p>
                <p className="text-lg font-black text-black">{config.leverage}x</p>
              </div>
              <div className="bg-gray-50 border-2 border-black p-3">
                <p className="text-sm font-bold text-gray-600 uppercase">Trading Pairs</p>
                <p className="text-lg font-black text-black">{config.tradingPairs.length}</p>
              </div>
            </div>
            
            {config.tradingPairs.length > 0 && (
              <div className="mt-4 bg-gray-50 border-2 border-black p-3">
                <p className="text-sm font-bold text-gray-600 uppercase mb-2">Selected Pairs</p>
                <div className="flex flex-wrap gap-2">
                  {config.tradingPairs.map(pair => (
                    <span key={pair} className="bg-accent border-2 border-black px-2 py-1 text-xs font-black text-black">
                      {pair}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Performance Chart */}
          <div className="bg-white border-4 border-black shadow-brutal p-8">
            <h3 className="text-2xl font-black text-black uppercase mb-6">Performance Analysis</h3>
            
            <div className="h-64 bg-gray-50 border-4 border-black mb-6 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeWidth={2} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#000" 
                    strokeWidth={2}
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <YAxis 
                    stroke="#000" 
                    strokeWidth={2}
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="volume" fill="#10B981" stroke="#000" strokeWidth={2} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#000" 
                    strokeWidth={4}
                    dot={{ fill: '#10B981', stroke: '#000', strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
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
    </div>
  )
}

export default StrategyTab

import React, { useState } from 'react'
import { TrendingUp, BarChart3, Zap, DollarSign, FileText, Bot } from 'lucide-react'
import TabContent from './components/TabContent'

const tabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'market', label: 'Market', icon: BarChart3 },
  { id: 'strategy', label: 'Strategy Lab', icon: Zap },
  { id: 'trade', label: 'Trade', icon: DollarSign },
  { id: 'logs', label: 'Trade Logs', icon: FileText },
  { id: 'ai', label: 'AI Assistant', icon: Bot },
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-brutal">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent border-4 border-black flex items-center justify-center">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-black tracking-tight">TRADINGBOT</h1>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Dashboard v2.1</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-accent border-4 border-black px-4 py-2">
                <span className="text-black font-black text-sm">LIVE</span>
              </div>
              <div className="bg-white border-4 border-black px-4 py-2">
                <span className="text-black font-bold text-sm">$24,567.89</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-0">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center space-x-3 px-8 py-6 font-black text-lg uppercase tracking-wide border-r-4 border-black transition-all duration-200 hover:bg-gray-50 min-w-[140px] ${
                    index === 0 ? 'border-l-4' : ''
                  } ${
                    activeTab === tab.id
                      ? 'bg-accent text-black'
                      : 'bg-white text-gray-700 hover:text-black'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-center">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <TabContent activeTab={activeTab} />
      </main>
    </div>
  )
}

export default App

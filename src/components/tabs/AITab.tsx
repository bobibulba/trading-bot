import React, { useState } from 'react'
import { Bot, Send, TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from 'lucide-react'

const AITab: React.FC = () => {
  const [message, setMessage] = useState('')
  
  const insights = [
    {
      type: 'opportunity',
      icon: TrendingUp,
      title: 'BTC Breakout Signal',
      description: 'Bitcoin is showing strong bullish momentum with RSI breaking above 70. Consider increasing position size.',
      confidence: '87%',
      action: 'BUY'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'High Volatility Alert',
      description: 'ETH/USDT showing unusual volatility patterns. Recommend reducing position size or implementing tighter stop losses.',
      confidence: '92%',
      action: 'CAUTION'
    },
    {
      type: 'suggestion',
      icon: Lightbulb,
      title: 'Portfolio Rebalancing',
      description: 'Current allocation is 65% BTC, 25% ETH, 10% Alts. Consider diversifying into DeFi tokens for better risk distribution.',
      confidence: '74%',
      action: 'OPTIMIZE'
    }
  ]

  const chatHistory = [
    { type: 'user', message: 'What are the current market conditions?' },
    { type: 'ai', message: 'Current market conditions show bullish momentum across major cryptocurrencies. BTC is up 2.45% in the last 24h, with strong volume supporting the move. The overall market sentiment is positive with fear & greed index at 72 (Greed).' },
    { type: 'user', message: 'Should I increase my BTC position?' },
    { type: 'ai', message: 'Based on technical analysis, BTC is showing strong bullish signals with RSI at 68 and MACD showing positive divergence. However, consider your risk tolerance and current portfolio allocation. I recommend a gradual increase rather than a large position change.' },
  ]

  const marketAnalysis = [
    { metric: 'Market Sentiment', value: 'Bullish', score: 78 },
    { metric: 'Volatility Index', value: 'Medium', score: 45 },
    { metric: 'Volume Trend', value: 'Increasing', score: 82 },
    { metric: 'Technical Score', value: 'Strong Buy', score: 89 },
  ]

  return (
    <div className="space-y-8">
      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <div key={index} className="bg-white border-4 border-black shadow-brutal p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 border-4 border-black flex items-center justify-center ${
                  insight.type === 'opportunity' ? 'bg-accent' :
                  insight.type === 'warning' ? 'bg-yellow-400' :
                  'bg-blue-400'
                }`}>
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <span className={`px-3 py-1 text-xs font-black border-2 border-black ${
                  insight.action === 'BUY' ? 'bg-accent text-black' :
                  insight.action === 'CAUTION' ? 'bg-yellow-400 text-black' :
                  'bg-blue-400 text-black'
                }`}>
                  {insight.action}
                </span>
              </div>
              <h3 className="text-lg font-black text-black mb-2">{insight.title}</h3>
              <p className="text-sm font-bold text-gray-600 mb-4">{insight.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600">Confidence:</span>
                <span className="font-black text-black">{insight.confidence}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Market Analysis */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-accent" />
          <h3 className="text-2xl font-black text-black uppercase">AI Market Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketAnalysis.map((item, index) => (
            <div key={index} className="bg-gray-50 border-4 border-black p-6">
              <h4 className="text-sm font-black text-gray-600 uppercase mb-2">{item.metric}</h4>
              <p className="text-xl font-black text-black mb-3">{item.value}</p>
              <div className="w-full bg-gray-300 border-2 border-black h-3">
                <div 
                  className="h-full bg-accent border-r-2 border-black"
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
              <p className="text-sm font-bold text-gray-600 mt-2">{item.score}/100</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat Interface */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Bot className="w-6 h-6 text-accent" />
          <h3 className="text-2xl font-black text-black uppercase">AI Trading Assistant</h3>
        </div>

        {/* Chat History */}
        <div className="bg-gray-50 border-4 border-black p-6 h-64 overflow-y-auto mb-6 space-y-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 border-4 border-black font-bold ${
                chat.type === 'user' 
                  ? 'bg-accent text-black' 
                  : 'bg-white text-black'
              }`}>
                {chat.message}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me about market conditions, trading strategies, or portfolio optimization..."
            className="flex-1 border-4 border-black p-4 font-bold text-black bg-white focus:outline-none focus:bg-gray-50"
          />
          <button className="bg-accent border-4 border-black px-6 py-4 font-black text-black hover:bg-accent-dark transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="bg-white border-2 border-black px-4 py-2 font-bold text-black text-sm hover:bg-gray-50 transition-colors">
            Analyze Portfolio
          </button>
          <button className="bg-white border-2 border-black px-4 py-2 font-bold text-black text-sm hover:bg-gray-50 transition-colors">
            Market Outlook
          </button>
          <button className="bg-white border-2 border-black px-4 py-2 font-bold text-black text-sm hover:bg-gray-50 transition-colors">
            Risk Assessment
          </button>
          <button className="bg-white border-2 border-black px-4 py-2 font-bold text-black text-sm hover:bg-gray-50 transition-colors">
            Strategy Suggestions
          </button>
        </div>
      </div>
    </div>
  )
}

export default AITab

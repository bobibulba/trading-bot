import React from 'react'
import { FileText, Download, Filter, Search } from 'lucide-react'

const LogsTab: React.FC = () => {
  const trades = [
    {
      id: 'TXN-001234',
      timestamp: '2024-01-15 14:32:15',
      pair: 'BTC/USDT',
      type: 'BUY',
      amount: '0.5 BTC',
      price: '$43,250.00',
      total: '$21,625.00',
      fee: '$10.81',
      profit: '+$125.50',
      status: 'Completed',
      strategy: 'Scalping Master'
    },
    {
      id: 'TXN-001233',
      timestamp: '2024-01-15 14:28:42',
      pair: 'ETH/USDT',
      type: 'SELL',
      amount: '2.1 ETH',
      price: '$2,680.50',
      total: '$5,629.05',
      fee: '$2.81',
      profit: '+$89.20',
      status: 'Completed',
      strategy: 'Swing Trader Pro'
    },
    {
      id: 'TXN-001232',
      timestamp: '2024-01-15 14:15:33',
      pair: 'ADA/USDT',
      type: 'BUY',
      amount: '1000 ADA',
      price: '$0.5234',
      total: '$523.40',
      fee: '$0.26',
      profit: '+$15.80',
      status: 'Completed',
      strategy: 'Scalping Master'
    },
    {
      id: 'TXN-001231',
      timestamp: '2024-01-15 14:02:18',
      pair: 'SOL/USDT',
      type: 'SELL',
      amount: '5 SOL',
      price: '$98.50',
      total: '$492.50',
      fee: '$0.25',
      profit: '+$45.30',
      status: 'Completed',
      strategy: 'Swing Trader Pro'
    },
    {
      id: 'TXN-001230',
      timestamp: '2024-01-15 13:45:27',
      pair: 'BNB/USDT',
      type: 'BUY',
      amount: '1.5 BNB',
      price: '$315.20',
      total: '$472.80',
      fee: '$0.24',
      profit: '-$12.40',
      status: 'Completed',
      strategy: 'Arbitrage Hunter'
    },
  ]

  const systemLogs = [
    { time: '14:35:22', level: 'INFO', message: 'Strategy "Scalping Master" executed BUY order for BTC/USDT' },
    { time: '14:35:15', level: 'INFO', message: 'Market data updated for all trading pairs' },
    { time: '14:34:58', level: 'WARNING', message: 'High volatility detected in ETH/USDT market' },
    { time: '14:34:45', level: 'INFO', message: 'Portfolio rebalancing completed successfully' },
    { time: '14:34:12', level: 'ERROR', message: 'Connection timeout to exchange API - retrying...' },
    { time: '14:33:55', level: 'INFO', message: 'Risk management check passed for all active positions' },
  ]

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-white border-4 border-black shadow-brutal p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search trades..."
                className="pl-10 pr-4 py-3 border-4 border-black font-bold text-black bg-white focus:outline-none focus:bg-gray-50 w-64"
              />
            </div>
            <button className="bg-white border-4 border-black px-6 py-3 font-black text-black uppercase hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
          <button className="bg-accent border-4 border-black px-6 py-3 font-black text-black uppercase hover:bg-accent-dark transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Trade History */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-accent" />
          <h3 className="text-2xl font-black text-black uppercase">Trade History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">ID</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Time</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Pair</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Type</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Amount</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Price</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Total</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Profit</th>
                <th className="text-left py-4 px-2 font-black text-black uppercase text-sm">Strategy</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index} className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-2 font-bold text-black text-sm">{trade.id}</td>
                  <td className="py-4 px-2 font-bold text-gray-600 text-sm">{trade.timestamp}</td>
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
                  <td className="py-4 px-2 font-bold text-black">{trade.total}</td>
                  <td className={`py-4 px-2 font-bold ${trade.profit.startsWith('+') ? 'text-accent' : 'text-red-500'}`}>
                    {trade.profit}
                  </td>
                  <td className="py-4 px-2 font-bold text-gray-600 text-sm">{trade.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <h3 className="text-2xl font-black text-black uppercase mb-6">System Logs</h3>
        <div className="bg-black p-6 font-mono text-sm space-y-2 max-h-64 overflow-y-auto">
          {systemLogs.map((log, index) => (
            <div key={index} className="flex space-x-4">
              <span className="text-gray-400">{log.time}</span>
              <span className={`font-bold ${
                log.level === 'ERROR' ? 'text-red-400' :
                log.level === 'WARNING' ? 'text-yellow-400' :
                'text-accent'
              }`}>
                [{log.level}]
              </span>
              <span className="text-white">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogsTab

import React from 'react'
import OverviewTab from './tabs/OverviewTab'
import MarketTab from './tabs/MarketTab'
import StrategyTab from './tabs/StrategyTab'
import TradeTab from './tabs/TradeTab'
import LogsTab from './tabs/LogsTab'
import AITab from './tabs/AITab'

interface TabContentProps {
  activeTab: string
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />
      case 'market':
        return <MarketTab />
      case 'strategy':
        return <StrategyTab />
      case 'trade':
        return <TradeTab />
      case 'logs':
        return <LogsTab />
      case 'ai':
        return <AITab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white border-4 border-black shadow-brutal p-8">
        <h2 className="text-4xl font-black text-black uppercase tracking-tight mb-2">
          {activeTab.replace(/([A-Z])/g, ' $1').toUpperCase()}
        </h2>
        <div className="w-24 h-2 bg-accent"></div>
      </div>
      
      {renderContent()}
    </div>
  )
}

export default TabContent

'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Sidebar } from '@/components/layout/Sidebar'
import { JobSearch } from './JobSearch'
import { MyApplications } from './MyApplications'
import { ProfilePage } from './ProfilePage'

type TabType = 'search' | 'applications' | 'profile'

export function WorkerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('search')

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <JobSearch />
      case 'applications':
        return <MyApplications />
      case 'profile':
        return <ProfilePage />
      default:
        return <JobSearch />
    }
  }

  return (
    <div className="app-container flex h-screen">
      <Sidebar 
        activeTab={activeTab as any} 
        onTabChange={(tab) => setActiveTab(tab as TabType)} 
      />
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-bg-secondary border-b border-border-color flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              <span className="text-accent-primary">Work</span>sta
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-bg-tertiary rounded-lg">
              <div className="text-lg">{user?.avatar}</div>
              <div>
                <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                <p className="text-xs text-text-muted capitalize">{user?.type}</p>
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

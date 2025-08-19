'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { JobSearch } from './JobSearch'
import { MyApplications } from './MyApplications'
import { ProfilePage } from './ProfilePage'
import { WorkerDashboardPage } from './WorkerDashboardPage'

type TabType = 'dashboard' | 'search' | 'applications' | 'profile'

export function WorkerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <WorkerDashboardPage />
      case 'search':
        return <JobSearch />
      case 'applications':
        return <MyApplications />
      case 'profile':
        return <ProfilePage />
      default:
        return <WorkerDashboardPage />
    }
  }

  return (
    <div className="app-container flex h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex w-full">
        <Sidebar
          activeTab={activeTab as any}
          onTabChange={(tab) => setActiveTab(tab as TabType)}
        />
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

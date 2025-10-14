'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { Layout } from '@/components/layout/Layout'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { JobsList } from './JobsList'
import { ApplicationsList } from './ApplicationsList'
import { ProfilePage } from './ProfilePage'
import { PostJobModal } from './PostJobModal'
import { AnalyticsPage } from './AnalyticsPage'
import { PreferencesPage } from '../worker/PreferencesPage'
import { HelpSupportPage } from '../worker/HelpSupportPage'
import { TabType as SidebarTabType } from '@/components/layout/Sidebar'

declare global {
  interface WindowEventMap {
    openPostJobModal: CustomEvent<void>
  }
}

type TabType = 'dashboard' | 'jobs' | 'applications' | 'analytics' | 'profile' | 'preferences' | 'help'

export function BusinessDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [showPostJobModal, setShowPostJobModal] = useState(false)

  useEffect(() => {
    const handleOpenPostJobModal = () => {
      setShowPostJobModal(true)
    }

    window.addEventListener('openPostJobModal', handleOpenPostJobModal)
    return () => window.removeEventListener('openPostJobModal', handleOpenPostJobModal)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AnalyticsPage />
      case 'jobs':
        return <JobsList />
      case 'applications':
        return <ApplicationsList />
      case 'analytics':
        return <AnalyticsPage />
      case 'profile':
        return <ProfilePage />
      case 'preferences':
        return <PreferencesPage />
      case 'help':
        return <HelpSupportPage />
      default:
        return <AnalyticsPage />
    }
  }

  return (
    <div className="app-container flex h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex w-full">
        {/* FIXME nasty type casting here, but it works for now. there are many TabTypes everywhere, but only SidebarTabTypes are valid for Sidebar. */}/}
        <Sidebar activeTab={activeTab as unknown as SidebarTabType} onTabChange={setActiveTab as unknown as (tab: SidebarTabType) => void} />
        <div className="flex-1 flex flex-col">
          <Header onNavigate={(tab) => setActiveTab(tab as TabType)} />

          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {showPostJobModal && (
        <PostJobModal onClose={() => setShowPostJobModal(false)} />
      )}
    </div>
  )
}

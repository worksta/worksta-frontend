'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { Layout } from '@/components/layout/Layout'
import { Sidebar } from '@/components/layout/Sidebar'
import { JobsList } from './JobsList'
import { ApplicationsList } from './ApplicationsList'
import { ProfilePage } from './ProfilePage'
import { PostJobModal } from './PostJobModal'

type TabType = 'jobs' | 'applications' | 'profile'

export function BusinessDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('jobs')
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
      case 'jobs':
        return <JobsList />
      case 'applications':
        return <ApplicationsList />
      case 'profile':
        return <ProfilePage />
      default:
        return <JobsList />
    }
  }

  return (
    <div className="app-container flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
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

      {showPostJobModal && (
        <PostJobModal onClose={() => setShowPostJobModal(false)} />
      )}
    </div>
  )
}

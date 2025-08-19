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
    <div className="app-container flex h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex w-full">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <Header />

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

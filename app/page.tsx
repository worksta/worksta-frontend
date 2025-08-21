'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { AuthPage } from '@/components/auth/AuthPage'
import { BusinessDashboard } from '@/components/business/BusinessDashboard'
import { WorkerDashboard } from '@/components/worker/WorkerDashboard'
import { ToastContainer } from '@/components/ui/Toast'
import { useEffect } from 'react'

export default function Home() {
  const { user, logout } = useAuth()
  const { notifications, removeNotification } = useApp()
  
  // Always show login page when the app loads
  useEffect(() => {
    // Clear any existing user session when the app loads
    if (typeof window !== 'undefined') {
      logout()
    }
  }, [])

  if (!user) {
    return <AuthPage />
  }

  return (
    <>
      {user.type === 'business' ? <BusinessDashboard /> : <WorkerDashboard />}
      <ToastContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </>
  )
}

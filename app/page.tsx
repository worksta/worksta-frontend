'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { AuthPage } from '@/components/auth/AuthPage'
import { BusinessDashboard } from '@/components/business/BusinessDashboard'
import { WorkerDashboard } from '@/components/worker/WorkerDashboard'
import { ToastContainer } from '@/components/ui/Toast'

export default function Home() {
  const { user, loading } = useAuth()
  const { notifications, removeNotification } = useApp()

  // Wait for auth hydration; prevents flashing login while validating token cookie
  if (loading) {
    return null
  }

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

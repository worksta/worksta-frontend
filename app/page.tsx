'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { AuthPage } from '@/components/auth/AuthPage'
import { BusinessDashboard } from '@/components/business/BusinessDashboard'
import { WorkerDashboard } from '@/components/worker/WorkerDashboard'
import { ToastContainer } from '@/components/ui/Toast'

export default function Home() {
  const { user } = useAuth()
  const { notifications, removeNotification } = useApp()

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

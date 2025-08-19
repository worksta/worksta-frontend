'use client'

import React, { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  onClose: (id: string) => void
  duration?: number
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle
}

const styles = {
  success: 'bg-green-500/10 border-green-500/20 text-green-400',
  error: 'bg-red-500/10 border-red-500/20 text-red-400',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
}

export function Toast({ id, message, type, onClose, duration = 5000 }: ToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, onClose, duration])

  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm',
        'transform transition-all duration-300 ease-out',
        'animate-slide-in',
        styles[type]
      )}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    timestamp: string
  }>
  onClose: (id: string) => void
}

export function ToastContainer({ notifications, onClose }: ToastContainerProps) {
  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type as 'success' | 'error' | 'info' | 'warning'}
          onClose={onClose}
        />
      ))}
    </div>
  )
}

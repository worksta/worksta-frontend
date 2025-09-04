'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { LogOut, Bell, Settings, HelpCircle, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  onNavigate?: (tab: string) => void
}

export function Header({ onNavigate }: HeaderProps) {
  const { user, logout } = useAuth()
  const { notifications } = useApp()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.length

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  const handleProfileSettings = () => {
    setShowUserMenu(false)
    if (onNavigate) {
      onNavigate('profile')
    }
  }

  const handlePreferences = () => {
    setShowUserMenu(false)
    if (onNavigate) {
      onNavigate('preferences')
    }
  }

  const handleHelpSupport = () => {
    setShowUserMenu(false)
    if (onNavigate) {
      onNavigate('help')
    }
  }

  return (
    <header className="h-18 bg-bg-secondary/90 border-b border-border-color flex items-center justify-between px-6 backdrop-blur-20 relative sticky top-0 z-50 glass-effect">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Worksta
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 text-sm"
            onClick={() => onNavigate && onNavigate('help')}
            aria-label="Open help and support"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-bg-card border border-border-color rounded-xl shadow-xl z-50 max-h-96 overflow-auto">
              <div className="p-4 border-b border-border-color">
                <h3 className="font-semibold text-text-primary">Notifications</h3>
              </div>
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No new notifications</p>
                </div>
              ) : (
                <div className="max-h-64 overflow-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-border-color hover:bg-bg-tertiary">
                      <p className="text-sm text-text-secondary">{notification.message}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 px-4 py-2 bg-bg-tertiary rounded-xl hover:bg-bg-card transition-all duration-300 border border-border-color hover:border-border-hover"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              {user?.avatar || user?.name?.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-muted capitalize">{user?.type}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-bg-card border border-border-color rounded-xl shadow-xl z-50">
              <div className="p-4 border-b border-border-color">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {user?.avatar || user?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{user?.name}</p>
                    <p className="text-sm text-text-muted">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={handleProfileSettings}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-bg-tertiary rounded-lg transition-colors group"
                >
                  <User className="w-4 h-4 text-text-muted group-hover:text-purple-400 transition-colors" />
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors">Profile Settings</span>
                </button>
                <button
                  onClick={handlePreferences}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-bg-tertiary rounded-lg transition-colors group"
                >
                  <Settings className="w-4 h-4 text-text-muted group-hover:text-blue-400 transition-colors" />
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors">Preferences</span>
                </button>
                <button
                  onClick={handleHelpSupport}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-bg-tertiary rounded-lg transition-colors group"
                >
                  <HelpCircle className="w-4 h-4 text-text-muted group-hover:text-green-400 transition-colors" />
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors">Help & Support</span>
                </button>
                <hr className="my-2 border-border-color" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-red-500/10 rounded-lg transition-colors text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}

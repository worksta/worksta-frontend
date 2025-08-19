'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Briefcase, 
  FileText, 
  User, 
  Plus,
  Search,
  Users
} from 'lucide-react'
import clsx from 'clsx'

type TabType = 'jobs' | 'applications' | 'profile' | 'search'

interface SidebarProps {
  activeTab?: TabType
  onTabChange?: (tab: TabType) => void
}

export function Sidebar({ activeTab = 'jobs', onTabChange }: SidebarProps) {
  const { user } = useAuth()
  const [currentTab, setCurrentTab] = useState(activeTab)

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab)
    onTabChange?.(tab)
  }

  const businessNavItems = [
    { id: 'jobs' as TabType, label: 'My Jobs', icon: Briefcase },
    { id: 'applications' as TabType, label: 'Applications', icon: Users },
    { id: 'profile' as TabType, label: 'Profile', icon: User }
  ]

  const workerNavItems = [
    { id: 'search' as TabType, label: 'Find Jobs', icon: Search },
    { id: 'applications' as TabType, label: 'My Applications', icon: FileText },
    { id: 'profile' as TabType, label: 'Profile', icon: User }
  ]

  const navItems = user?.type === 'business' ? businessNavItems : workerNavItems

  return (
    <aside className="w-64 bg-bg-secondary border-r border-border-color p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={clsx(
                'nav-item w-full text-left',
                currentTab === item.id && 'active'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
      
      {user?.type === 'business' && (
        <div className="mt-8">
          <button 
            className="btn btn-primary w-full gap-2"
            onClick={() => {
              // This will be handled by the parent component
              const event = new CustomEvent('openPostJobModal')
              window.dispatchEvent(event)
            }}
          >
            <Plus className="w-4 h-4" />
            Post a Gig
          </button>
        </div>
      )}
    </aside>
  )
}

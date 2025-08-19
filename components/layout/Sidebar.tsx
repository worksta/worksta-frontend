'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  Briefcase,
  FileText,
  User,
  Plus,
  Search,
  Users,
  Shield,
  FileCheck,
  Info,
  HelpCircle,
  ExternalLink
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

  const legalLinks = [
    { label: 'About', href: '/about', icon: Info },
    { label: 'Privacy Policy', href: '/privacy', icon: Shield },
    { label: 'Terms of Service', href: '/terms', icon: FileCheck },
    { label: 'Help Center', href: '#', icon: HelpCircle }
  ]

  return (
    <aside className="w-64 bg-bg-secondary border-r border-border-color flex flex-col h-screen glass-effect">
      <div className="p-4 border-b border-border-color">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Worksta
            </h2>
            <p className="text-xs text-text-muted capitalize">{user?.type} Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <nav className="space-y-2 mb-8">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={clsx(
                  'nav-item w-full text-left group relative overflow-hidden',
                  currentTab === item.id && 'active'
                )}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {currentTab === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg"></div>
                )}
              </button>
            )
          })}
        </nav>

        {user?.type === 'business' && (
          <div className="mb-8">
            <button
              className="btn btn-primary w-full gap-2 relative overflow-hidden group"
              onClick={() => {
                const event = new CustomEvent('openPostJobModal')
                window.dispatchEvent(event)
              }}
            >
              <Plus className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Post a Gig</span>
            </button>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 px-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-3 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">This Month</span>
                  <span className="text-lg font-bold text-blue-400">
                    {user?.type === 'business' ? '12' : '8'}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  {user?.type === 'business' ? 'Jobs Posted' : 'Applications'}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-3 rounded-lg border border-green-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Success Rate</span>
                  <span className="text-lg font-bold text-green-400">87%</span>
                </div>
                <p className="text-xs text-text-muted">
                  {user?.type === 'business' ? 'Successful Hires' : 'Job Matches'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border-color">
        <div className="space-y-1">
          {legalLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-all duration-200 group"
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{link.label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
          <p className="text-xs text-purple-300 font-medium">Need Help?</p>
          <p className="text-xs text-text-muted mt-1">Contact our 24/7 support team</p>
          <button className="text-xs text-blue-400 hover:text-blue-300 mt-2 font-medium">
            Get Support →
          </button>
        </div>
      </div>
    </aside>
  )
}

'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  Smartphone,
  Mail,
  MessageSquare,
  Volume2,
  VolumeX
} from 'lucide-react'

export function PreferencesPage() {
  const { user } = useAuth()
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'english',
    notifications: {
      email: true,
      push: true,
      sms: false,
      jobAlerts: true,
      applicationUpdates: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    sound: true
  })

  const handlePreferenceChange = (category: string, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        // @ts-ignore FIXME
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }))
  }

  const handleDirectChange = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#A259FF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2D9CFF]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#A259FF]/5 to-[#2D9CFF]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Premium Header Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-[26px] p-8 border border-white/10 relative overflow-hidden"
          style={{
            boxShadow: `
              0 32px 64px rgba(0, 0, 0, 0.4),
              0 16px 32px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[26px]"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#A259FF] to-[#2D9CFF] flex items-center justify-center"
              style={{ boxShadow: '0 8px 32px rgba(162, 89, 255, 0.3)' }}
            >
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[32px] font-black text-white mb-1 tracking-[0.02em]">
                Preferences
              </h1>
              <p className="text-[#c0c0c0] text-[16px]">
                Customize your Worksta experience
              </p>
            </div>
          </div>
        </div>

        {/* Preferences Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Appearance Settings */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[24px] p-8 border border-white/10 relative overflow-hidden"
            style={{
              boxShadow: `
                0 24px 48px rgba(0, 0, 0, 0.3),
                0 12px 24px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-[24px]"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#A259FF] to-[#8B5CF6] flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(162, 89, 255, 0.3)' }}
                >
                  {preferences.theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
                </div>
                <h3 className="text-[20px] font-bold text-white">Appearance</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#c0c0c0] text-sm font-medium mb-3">Theme</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDirectChange('theme', 'dark')}
                      className={`flex-1 p-4 rounded-[16px] border transition-all duration-300 ${
                        preferences.theme === 'dark'
                          ? 'bg-gradient-to-r from-[#A259FF]/20 to-[#2D9CFF]/20 border-[#A259FF]/30 text-white'
                          : 'bg-gradient-to-r from-white/5 to-white/3 border-white/10 text-[#c0c0c0] hover:border-white/20'
                      }`}
                    >
                      <Moon className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button
                      onClick={() => handleDirectChange('theme', 'light')}
                      className={`flex-1 p-4 rounded-[16px] border transition-all duration-300 ${
                        preferences.theme === 'light'
                          ? 'bg-gradient-to-r from-[#A259FF]/20 to-[#2D9CFF]/20 border-[#A259FF]/30 text-white'
                          : 'bg-gradient-to-r from-white/5 to-white/3 border-white/10 text-[#c0c0c0] hover:border-white/20'
                      }`}
                    >
                      <Sun className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#c0c0c0] text-sm font-medium mb-3">Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handleDirectChange('language', e.target.value)}
                    className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                    style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                  >
                    <option value="english">English</option>
                    <option value="mandarin">中文 (Mandarin)</option>
                    <option value="malay">Bahasa Melayu</option>
                    <option value="tamil">தமிழ் (Tamil)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                  <div className="flex items-center gap-3">
                    {preferences.sound ? <Volume2 className="w-5 h-5 text-[#22c55e]" /> : <VolumeX className="w-5 h-5 text-[#ef4444]" />}
                    <div>
                      <p className="text-white font-medium">Sound Effects</p>
                      <p className="text-[#c0c0c0] text-sm">Play sounds for notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDirectChange('sound', !preferences.sound)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      preferences.sound ? 'bg-[#22c55e]' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      preferences.sound ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[24px] p-8 border border-white/10 relative overflow-hidden"
            style={{
              boxShadow: `
                0 24px 48px rgba(0, 0, 0, 0.3),
                0 12px 24px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-[24px]"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#2D9CFF] to-[#1e40af] flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(45, 156, 255, 0.3)' }}
                >
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[20px] font-bold text-white">Notifications</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
                  { key: 'push', label: 'Push Notifications', desc: 'Browser and mobile notifications', icon: Smartphone },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Text message alerts', icon: MessageSquare },
                  { key: 'jobAlerts', label: 'Job Alerts', desc: 'New job opportunities', icon: Bell },
                  { key: 'applicationUpdates', label: 'Application Updates', desc: 'Status changes on applications', icon: Bell },
                  { key: 'marketing', label: 'Marketing', desc: 'Promotional content and tips', icon: Bell }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#A259FF]" />
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-[#c0c0c0] text-sm">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('notifications', item.key, !preferences.notifications[item.key as keyof typeof preferences.notifications])}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          preferences.notifications[item.key as keyof typeof preferences.notifications] ? 'bg-[#22c55e]' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                          preferences.notifications[item.key as keyof typeof preferences.notifications] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-[24px] p-8 border border-white/10 relative overflow-hidden"
          style={{
            boxShadow: `
              0 24px 48px rgba(0, 0, 0, 0.3),
              0 12px 24px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-[24px]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center"
                style={{ boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)' }}
              >
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[20px] font-bold text-white">Privacy & Security</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#c0c0c0] text-sm font-medium mb-3">Profile Visibility</label>
                <select
                  value={preferences.privacy.profileVisibility}
                  onChange={(e) => handlePreferenceChange('privacy', 'profileVisibility', e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                  style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="employers-only">Employers Only</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Show Email Address</span>
                  <button
                    onClick={() => handlePreferenceChange('privacy', 'showEmail', !preferences.privacy.showEmail)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      preferences.privacy.showEmail ? 'bg-[#22c55e]' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      preferences.privacy.showEmail ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Show Phone Number</span>
                  <button
                    onClick={() => handlePreferenceChange('privacy', 'showPhone', !preferences.privacy.showPhone)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      preferences.privacy.showPhone ? 'bg-[#22c55e]' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      preferences.privacy.showPhone ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

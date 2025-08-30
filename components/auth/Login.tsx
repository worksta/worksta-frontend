'use client'

import React, { useState, useEffect } from 'react'
import { useAuth, UserType } from '@/contexts/AuthContext'
import { Building2, User } from 'lucide-react'

interface LoginProps {
  onToggleMode: () => void
}

export function Login({ onToggleMode }: LoginProps) {
  const { login, loading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'business' as UserType
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const success = await login(formData.email, formData.password, formData.userType)
    if (!success) {
      setErrors({ general: 'Invalid credentials. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-[480px] mb-[8vh]">
        {/* Premium frosted-glass login card with layered shadows */}
        <div
          className="bg-white/5 backdrop-blur-2xl rounded-[26px] p-8 md:p-10 border border-white/10 relative overflow-hidden"
          style={{
            boxShadow: `
              0 32px 64px rgba(0, 0, 0, 0.4),
              0 16px 32px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[26px]"></div>

          {/* Premium header section with clear separation */}
          <div className="text-center mb-12 relative z-10">
            <h1 className="text-[38px] md:text-[40px] font-black text-white mb-4 tracking-[0.03em] leading-tight">Welcome Back</h1>
            <p className="text-[#c0c0c0] text-[18px] font-light mb-12">Sign in to your account to continue</p>
          </div>

          {/* Error message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-[18px] text-red-400 text-sm relative z-10">
              {errors.general}
            </div>
          )}

          {/* Account type dropdown with clear gap below */}
          <div className="mb-10 relative z-10">
            <div className="relative">
              <select
                value={formData.userType}
                onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value as UserType }))}
                className="w-full px-5 py-4 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[14px] text-white text-[15px] appearance-none cursor-pointer focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/6 h-[48px]"
                style={{
                  boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                <option value="business">Business Account</option>
                <option value="worker">Worker Account</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-4 h-4 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Form fields with clear gaps between each element */}
          <form onSubmit={handleSubmit} className="relative z-10">
            {/* Email input field with gap below */}
            <div className="mb-8">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[14px] text-white placeholder-[#999999] text-[15px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/6 h-[48px]"
                style={{
                  boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password input field with large gap below */}
            <div className="mb-12">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                className="w-full px-5 py-4 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[14px] text-white placeholder-[#999999] text-[15px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/6 h-[48px]"
                style={{
                  boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Continue button with clear gap below */}
            <div className="mb-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#A259FF] to-[#2D9CFF] hover:from-[#B366FF] hover:to-[#3DA8FF] text-white font-semibold py-3.5 rounded-[14px] text-[16px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-[48px] relative overflow-hidden group"
                style={{
                  boxShadow: '0 4px 16px rgba(162, 89, 255, 0.25), 0 2px 8px rgba(45, 156, 255, 0.15)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(162, 89, 255, 0.35), 0 3px 10px rgba(45, 156, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(162, 89, 255, 0.25), 0 2px 8px rgba(45, 156, 255, 0.15)';
                }}
              >
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">{loading ? 'Signing In...' : 'Continue'}</span>
              </button>
            </div>
          </form>

          {/* Sign-up section with clear gap below */}
          <div className="text-center mb-10 relative z-10">
            <span className="text-[#b8b8b8] text-[15px]">Don't have an account? </span>
            <button
              onClick={onToggleMode}
              className="text-[#A259FF] text-[15px] font-medium relative group transition-colors duration-300 hover:text-[#B366FF]"
            >
              Sign up here
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A259FF] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* OR divider with clear gaps above and below */}
          <div className="flex items-center my-10 relative z-10">
            <div className="flex-1 border-t border-white/15"></div>
            <span className="px-4 text-[#999999] text-[13px] font-medium">OR</span>
            <div className="flex-1 border-t border-white/15"></div>
          </div>

          {/* Beautiful Google button with generous spacing */}
          <div className="mt-2 mb-4 relative z-10">
            <button className="w-full bg-gradient-to-br from-white/6 to-white/3 hover:from-white/10 hover:to-white/6 border border-white/12 text-white font-medium py-3.5 rounded-[14px] flex items-center justify-center gap-3 text-[15px] transition-all duration-300 h-[48px] group focus:outline-none focus:ring-2 focus:ring-white/20 hover:border-white/20"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 2px 6px rgba(0, 0, 0, 0.08)'
              }}
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

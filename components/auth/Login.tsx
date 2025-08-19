'use client'

import React, { useState, useEffect } from 'react'
import { useAuth, UserType } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Building2, User, Star, Mail, Lock } from 'lucide-react'

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
      setErrors({ general: 'Invalid credentials. Try demo accounts with password "demo123"' })
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0" style={{background: '#000000'}}></div>
      
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-particle-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-pink-500/20 blur-2xl rounded-3xl"></div>
              <Card className="relative glass-card border-purple-500/30 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600"></div>
                
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-2xl animate-glow">
                        <span className="text-white font-bold text-3xl">W</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-3xl mb-2 font-bold">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-gradient-shift">
                      Welcome to Worksta
                    </span>
                  </CardTitle>
                  <p className="text-text-muted text-sm">
                    🚀 Southeast Asia's premier gig economy platform
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      4.8/5
                    </span>
                    <span>500+ Businesses</span>
                    <span>2.5K+ Workers</span>
                  </div>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errors.general && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm backdrop-blur-sm">
                        {errors.general}
                      </div>
                    )}

                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-text-primary flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                        I am a:
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className={`group relative p-5 rounded-xl border-2 text-sm font-semibold transition-all duration-300 overflow-hidden ${
                            formData.userType === 'business'
                              ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400 text-purple-300 shadow-lg shadow-purple-500/25'
                              : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-purple-400/50 hover:bg-bg-card'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, userType: 'business' }))}
                        >
                          <div className="flex flex-col items-center gap-3 relative z-10">
                            <div className={`p-3 rounded-xl ${formData.userType === 'business' ? 'bg-purple-500/20' : 'bg-gray-700/20'}`}>
                              <Building2 className="w-6 h-6" />
                            </div>
                            <span>🏢 Business</span>
                            <span className="text-xs opacity-75">Hire workers</span>
                          </div>
                          {formData.userType === 'business' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent animate-pulse"></div>
                          )}
                        </button>
                        <button
                          type="button"
                          className={`group relative p-5 rounded-xl border-2 text-sm font-semibold transition-all duration-300 overflow-hidden ${
                            formData.userType === 'worker'
                              ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400 text-purple-300 shadow-lg shadow-purple-500/25'
                              : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-purple-400/50 hover:bg-bg-card'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, userType: 'worker' }))}
                        >
                          <div className="flex flex-col items-center gap-3 relative z-10">
                            <div className={`p-3 rounded-xl ${formData.userType === 'worker' ? 'bg-purple-500/20' : 'bg-gray-700/20'}`}>
                              <User className="w-6 h-6" />
                            </div>
                            <span>👤 Worker</span>
                            <span className="text-xs opacity-75">Find work</span>
                          </div>
                          {formData.userType === 'worker' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent animate-pulse"></div>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <Input
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          error={errors.email}
                          placeholder="Enter your email"
                          className="pl-12"
                        />
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <Input
                          label="Password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                          error={errors.password}
                          placeholder="Enter your password"
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-14 text-lg font-bold relative overflow-hidden group" loading={loading}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            ✨ Sign In
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </form>

                  <div className="mt-8 text-center">
                    <button
                      onClick={onToggleMode}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors font-medium group"
                    >
                      Don't have an account? <span className="underline group-hover:no-underline">✨ Sign up here</span>
                    </button>
                  </div>

                  <div className="mt-6 p-5 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl border border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/5 to-pink-600/5 animate-pulse"></div>
                    <div className="relative z-10">
                      <p className="text-sm text-purple-300 text-center mb-4 font-bold flex items-center justify-center gap-2">
                        🎯 Try Demo Accounts
                        <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs">FREE</span>
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-3 rounded-xl border border-purple-500/30">
                          <p className="text-purple-300 font-bold flex items-center gap-1">
                            🏢 Business
                          </p>
                          <p className="text-text-muted mt-1">business@demo.com</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl border border-purple-500/30">
                          <p className="text-purple-300 font-bold flex items-center gap-1">
                            👤 Worker
                          </p>
                          <p className="text-text-muted mt-1">worker@demo.com</p>
                        </div>
                      </div>
                      <div className="text-center mt-4 p-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                        <p className="text-yellow-300 text-xs font-mono">
                          🔑 Password: <span className="font-bold">demo123</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

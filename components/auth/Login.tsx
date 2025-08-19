'use client'

import React, { useState, useEffect } from 'react'
import { useAuth, UserType } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Building2, User, Star, Zap, Heart, Shield } from 'lucide-react'

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
      setErrors({ general: 'Invalid credentials. Try demo accounts: business@demo.com or worker@demo.com with password "demo123"' })
    }
  }

  const floatingElements = [
    { icon: Star, position: 'top-20 left-20', delay: '0s' },
    { icon: Zap, position: 'top-32 right-32', delay: '0.5s' },
    { icon: Heart, position: 'bottom-40 left-16', delay: '1s' },
    { icon: Shield, position: 'bottom-20 right-20', delay: '1.5s' }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0" style={{background: '#000000'}}></div>

      <div className="absolute inset-0">
        {floatingElements.map((element, index) => {
          const Icon = element.icon
          return (
            <div
              key={index}
              className={`absolute ${element.position} w-8 h-8 text-blue-400 opacity-20 animate-pulse`}
              style={{ animationDelay: element.delay }}
            >
              <Icon className="w-full h-full" />
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex items-center justify-center gap-12">
          <div className={`hidden lg:block flex-1 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-3xl">W</span>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Welcome to Worksta
                  </span>
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed max-w-lg mx-auto">
                  Southeast Asia's premier platform connecting F&B businesses with talented gig workers in real-time
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-text-muted">Lightning Fast</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-text-muted">Secure & Trusted</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-text-muted">Built for F&B</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-text-muted">
                <div className="flex items-center justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    4.8/5 Rating
                  </span>
                  <span>500+ Businesses</span>
                  <span>2.5K+ Workers</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`w-full max-w-md transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <Card className="backdrop-blur-xl bg-bg-card/80 border-border-color/50 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className="lg:hidden flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">W</span>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Sign In
                  </span>
                </CardTitle>
                <p className="text-text-muted text-sm">Welcome back! Please sign in to continue</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.general && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm backdrop-blur-sm">
                      {errors.general}
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-text-primary">I am a:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className={`group relative p-4 rounded-xl border text-sm font-medium transition-all duration-300 overflow-hidden ${
                          formData.userType === 'business'
                            ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400 text-blue-400 shadow-lg'
                            : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-blue-400/50 hover:bg-bg-card'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, userType: 'business' }))}
                      >
                        <div className="flex flex-col items-center gap-2 relative z-10">
                          <Building2 className="w-5 h-5" />
                          <span>Business</span>
                        </div>
                        {formData.userType === 'business' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
                        )}
                      </button>
                      <button
                        type="button"
                        className={`group relative p-4 rounded-xl border text-sm font-medium transition-all duration-300 overflow-hidden ${
                          formData.userType === 'worker'
                            ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400 text-blue-400 shadow-lg'
                            : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-blue-400/50 hover:bg-bg-card'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, userType: 'worker' }))}
                      >
                        <div className="flex flex-col items-center gap-2 relative z-10">
                          <User className="w-5 h-5" />
                          <span>Worker</span>
                        </div>
                        {formData.userType === 'worker' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
                        )}
                      </button>
                    </div>
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    error={errors.email}
                    placeholder="Enter your email"
                  />

                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    error={errors.password}
                    placeholder="Enter your password"
                  />

                  <Button type="submit" className="w-full h-12 text-lg font-semibold" loading={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={onToggleMode}
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors font-medium"
                  >
                    Don't have an account? <span className="underline">Sign up here</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                  <p className="text-xs text-blue-300 text-center mb-3 font-medium">🚀 Try Demo Accounts</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-bg-tertiary/50 p-2 rounded-lg">
                      <p className="text-blue-400 font-semibold">Business</p>
                      <p className="text-text-muted">business@demo.com</p>
                    </div>
                    <div className="bg-bg-tertiary/50 p-2 rounded-lg">
                      <p className="text-green-400 font-semibold">Worker</p>
                      <p className="text-text-muted">worker@demo.com</p>
                    </div>
                  </div>
                  <p className="text-center text-text-muted text-xs mt-2">
                    Password: <span className="text-yellow-400 font-mono">demo123</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth, UserType } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Building2, User, CheckCircle, Eye, EyeOff } from 'lucide-react'

interface SignupProps {
  onToggleMode: () => void
}

export function Signup({ onToggleMode }: SignupProps) {
  const { signup, loading } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'business' as UserType
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const success = await signup(formData.email, formData.password, formData.name, formData.userType)
    if (!success) {
      setErrors({ general: 'Failed to create account. Please try again.' })
    }
  }

  const passwordStrength = {
    hasLength: formData.password.length >= 6,
    hasLower: /[a-z]/.test(formData.password),
    hasUpper: /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password)
  }

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0" style={{background: '#000000'}}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5"></div>

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
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Join Worksta Today
                  </span>
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed max-w-lg mx-auto">
                  Start your journey in Southeast Asia's fastest-growing gig economy platform
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      500+
                    </div>
                    <p className="text-sm text-text-muted">Active Businesses</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                      2.5K+
                    </div>
                    <p className="text-sm text-text-muted">Skilled Workers</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                      10K+
                    </div>
                    <p className="text-sm text-text-muted">Jobs Completed</p>
                  </div>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-text-secondary">Free to join and get started</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-text-secondary">Verified businesses and workers</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-text-secondary">Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-text-secondary">24/7 customer support</span>
                  </div>
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
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Create Account
                  </span>
                </CardTitle>
                <p className="text-text-muted text-sm">Join thousands of businesses and workers</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errors.general && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm backdrop-blur-sm">
                      {errors.general}
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-text-primary">I want to:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className={`group relative p-4 rounded-xl border text-sm font-medium transition-all duration-300 overflow-hidden ${
                          formData.userType === 'business'
                            ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400 text-purple-400 shadow-lg'
                            : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-purple-400/50 hover:bg-bg-card'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, userType: 'business' }))}
                      >
                        <div className="flex flex-col items-center gap-2 relative z-10">
                          <Building2 className="w-5 h-5" />
                          <span>Hire Workers</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`group relative p-4 rounded-xl border text-sm font-medium transition-all duration-300 overflow-hidden ${
                          formData.userType === 'worker'
                            ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-400 text-purple-400 shadow-lg'
                            : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-purple-400/50 hover:bg-bg-card'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, userType: 'worker' }))}
                      >
                        <div className="flex flex-col items-center gap-2 relative z-10">
                          <User className="w-5 h-5" />
                          <span>Find Work</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <Input
                    label={formData.userType === 'business' ? 'Business Name' : 'Full Name'}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    error={errors.name}
                    placeholder={formData.userType === 'business' ? 'Enter your business name' : 'Enter your full name'}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    error={errors.email}
                    placeholder="Enter your email"
                  />

                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        error={errors.password}
                        placeholder="Create a secure password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-text-muted hover:text-text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                i <= strengthScore
                                  ? strengthScore <= 2 ? 'bg-red-400'
                                    : strengthScore === 3 ? 'bg-yellow-400'
                                    : 'bg-green-400'
                                  : 'bg-border-color'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className={`flex items-center gap-1 ${passwordStrength.hasLength ? 'text-green-400' : 'text-text-muted'}`}>
                            <CheckCircle className="w-3 h-3" />
                            6+ characters
                          </span>
                          <span className={`flex items-center gap-1 ${passwordStrength.hasLower ? 'text-green-400' : 'text-text-muted'}`}>
                            <CheckCircle className="w-3 h-3" />
                            Lowercase
                          </span>
                          <span className={`flex items-center gap-1 ${passwordStrength.hasUpper ? 'text-green-400' : 'text-text-muted'}`}>
                            <CheckCircle className="w-3 h-3" />
                            Uppercase
                          </span>
                          <span className={`flex items-center gap-1 ${passwordStrength.hasNumber ? 'text-green-400' : 'text-text-muted'}`}>
                            <CheckCircle className="w-3 h-3" />
                            Number
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      error={errors.confirmPassword}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-text-muted hover:text-text-primary transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <Button type="submit" className="w-full h-12 text-lg font-semibold" loading={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={onToggleMode}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors font-medium"
                  >
                    Already have an account? <span className="underline">Sign in here</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20 backdrop-blur-sm text-center">
                  <p className="text-xs text-green-300 mb-2">
                    🎉 <strong>Free to join!</strong> No setup fees or hidden charges
                  </p>
                  <p className="text-xs text-text-muted">
                    Start building your {formData.userType === 'business' ? 'team' : 'career'} today
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

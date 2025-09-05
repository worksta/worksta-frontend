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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-md mx-6">
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-2xl shadow-black/20">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-[28px]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-[28px]"></div>

          {/* Card Content */}
          <div className="relative z-10 px-16 py-10">
            {/* Header & Subtitle */}
            <div className="text-center mb-8">
              <h1 className="text-[40px] font-black tracking-wide text-white mb-3 leading-tight">
                Worksta
              </h1>
              <p className="text-[20px] font-normal text-gray-300 leading-relaxed">
                Create your account to get started
              </p>
            </div>

             {/* Account Switcher */}
             <div className="mb-8">
               <div className="relative bg-gray-800/50 rounded-2xl p-1 border border-gray-700/50">
                 <div className="flex">
                   <button
                     type="button"
                     onClick={() => setFormData(prev => ({ ...prev, userType: 'business' }))}
                     className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-[16px] transition-all duration-300 ${
                       formData.userType === 'business'
                         ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
                         : 'text-gray-400 hover:text-gray-300'
                     }`}
                   >
                     <Building2 className="w-5 h-5" />
                     Business Account
                   </button>
                   <button
                     type="button"
                     onClick={() => setFormData(prev => ({ ...prev, userType: 'worker' }))}
                     className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-[16px] transition-all duration-300 ${
                       formData.userType === 'worker'
                         ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
                         : 'text-gray-400 hover:text-gray-300'
                     }`}
                   >
                     <User className="w-5 h-5" />
                     Worker Account
                   </button>
                 </div>
               </div>
             </div>

             {/* Error Message */}
             {errors.general && (
               <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm text-center">
                 {errors.general}
               </div>
             )}

             {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[16px] font-medium text-gray-300">
                    {formData.userType === 'business' ? 'Business Name' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full h-[60px] px-6 bg-gray-800/80 border border-gray-700/50 rounded-[20px] text-white placeholder-gray-400 font-medium text-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-purple-500/20"
                      placeholder={formData.userType === 'business' ? 'Enter your business name' : 'Enter your full name'}
                      required
                    />
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 focus-within:opacity-100 pointer-events-none"></div>
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[16px] font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full h-[60px] px-6 bg-gray-800/80 border border-gray-700/50 rounded-[20px] text-white placeholder-gray-400 font-medium text-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-purple-500/20"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 focus-within:opacity-100 pointer-events-none"></div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-[16px] font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full h-[60px] px-6 bg-gray-800/80 border border-gray-700/50 rounded-[20px] text-white placeholder-gray-400 font-medium text-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-purple-500/20"
                      placeholder="Create a secure password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 focus-within:opacity-100 pointer-events-none"></div>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                  )}

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
                                : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className={`flex items-center gap-1 ${passwordStrength.hasLength ? 'text-green-400' : 'text-gray-400'}`}>
                          <CheckCircle className="w-3 h-3" />
                          6+ characters
                        </span>
                        <span className={`flex items-center gap-1 ${passwordStrength.hasLower ? 'text-green-400' : 'text-gray-400'}`}>
                          <CheckCircle className="w-3 h-3" />
                          Lowercase
                        </span>
                        <span className={`flex items-center gap-1 ${passwordStrength.hasUpper ? 'text-green-400' : 'text-gray-400'}`}>
                          <CheckCircle className="w-3 h-3" />
                          Uppercase
                        </span>
                        <span className={`flex items-center gap-1 ${passwordStrength.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                          <CheckCircle className="w-3 h-3" />
                          Number
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-[16px] font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full h-[60px] px-6 bg-gray-800/80 border border-gray-700/50 rounded-[20px] text-white placeholder-gray-400 font-medium text-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-purple-500/20"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 focus-within:opacity-100 pointer-events-none"></div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[62px] bg-purple-600 hover:bg-purple-700 text-white font-bold text-[22px] rounded-[28px] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center mt-8">
                <button
                  onClick={onToggleMode}
                  className="text-gray-400 text-[16px] hover:text-white transition-colors duration-300"
                >
                  Already have an account?{' '}
                  <span className="text-[#A259FF] font-semibold hover:underline">
                    Sign in
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

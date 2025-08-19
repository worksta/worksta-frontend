'use client'

import React, { useState } from 'react'
import { useAuth, UserType } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">
            <span className="text-accent-primary">Work</span>sta
          </CardTitle>
          <p className="text-secondary text-sm">Create your account</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  formData.userType === 'business'
                    ? 'bg-accent-primary/10 border-accent-primary text-accent-primary'
                    : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-accent-primary'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, userType: 'business' }))}
              >
                🏢 Business
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  formData.userType === 'worker'
                    ? 'bg-accent-primary/10 border-accent-primary text-accent-primary'
                    : 'bg-bg-tertiary border-border-color text-text-secondary hover:border-accent-primary'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, userType: 'worker' }))}
              >
                👤 Worker
              </button>
            </div>

            <Input
              label={formData.userType === 'business' ? 'Business Name' : 'Full Name'}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              error={errors.name}
              placeholder={formData.userType === 'business' ? 'Enter business name' : 'Enter your full name'}
            />

            <Input
              label="Email"
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
              placeholder="Create a password"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
            />

            <Button type="submit" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onToggleMode}
              className="text-accent-primary hover:text-accent-secondary text-sm transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

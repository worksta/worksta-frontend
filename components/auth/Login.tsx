'use client'

import React, { useState } from 'react'
import { useAuth, UserType } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">
            <span className="text-accent-primary">Work</span>sta
          </CardTitle>
          <p className="text-secondary text-sm">Sign in to your account</p>
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
              placeholder="Enter your password"
            />

            <Button type="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onToggleMode}
              className="text-accent-primary hover:text-accent-secondary text-sm transition-colors"
            >
              Don't have an account? Sign up
            </button>
          </div>

          <div className="mt-4 p-3 bg-bg-tertiary rounded-lg">
            <p className="text-xs text-text-muted text-center mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Business:</strong> business@demo.com</p>
              <p><strong>Worker:</strong> worker@demo.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

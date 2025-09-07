'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { 
  Building2, 
  Mail, 
  MapPin, 
  Phone, 
  Globe,
  Edit,
  Save,
  X
} from 'lucide-react'

export function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+65 9123 4567',
    location: 'Singapore',
    website: 'https://business.example.com',
    description: 'We are a premium dining establishment specializing in authentic cuisine with a modern twist. We pride ourselves on exceptional service and quality food.',
    industry: 'Food & Beverage',
    establishedYear: '2018'
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile data:', formData)
    setIsEditing(false)
  }

  const stats = [
    { label: 'Jobs Posted', value: '12', icon: '📋' },
    { label: 'Active Jobs', value: '3', icon: '✅' },
    { label: 'Total Applications', value: '47', icon: '👥' },
    { label: 'Hired Workers', value: '8', icon: '🎯' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-lg">Business Profile</h1>
          <p className="text-secondary">Manage your business information and settings</p>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="success" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)} className="gap-2">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover={false} className="h-fit">
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-accent-primary mb-2">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Business Information */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {isEditing ? (
              <>
                <Input
                  label="Business Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
                <Input
                  label="Website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                />
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{user?.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{formData.name}</h3>
                    <Badge variant="info">{formData.industry}</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-4 h-4 text-text-muted" />
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Globe className="w-4 h-4 text-text-muted" />
                    <a href={formData.website} className="text-accent-primary hover:underline">
                      {formData.website}
                    </a>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Business Description */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>About Your Business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label className="form-label">Business Description</label>
                  <textarea
                    className="form-input form-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    placeholder="Tell potential workers about your business..."
                  />
                </div>
                <Input
                  label="Industry"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                />
                <Input
                  label="Established Year"
                  value={formData.establishedYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, establishedYear: e.target.value }))}
                />
              </>
            ) : (
              <>
                <p className="text-text-secondary leading-relaxed">{formData.description}</p>
                
                <div className="grid grid-cols-2 gap-5 pt-5 border-t border-border-color">
                  <div>
                    <p className="text-sm text-text-muted mb-1">Industry</p>
                    <p className="font-medium">{formData.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Established</p>
                    <p className="font-medium">{formData.establishedYear}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Settings */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="flex items-center justify-between p-5 bg-bg-tertiary rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Email Notifications</h4>
                <p className="text-sm text-text-muted">Receive notifications about applications and messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-5 bg-bg-tertiary rounded-lg">
              <div>
                <h4 className="font-medium mb-1">SMS Notifications</h4>
                <p className="text-sm text-text-muted">Get text messages for urgent notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

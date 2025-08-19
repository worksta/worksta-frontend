'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Star,
  Edit,
  Save,
  X,
  Award,
  Briefcase,
  Calendar
} from 'lucide-react'

export function ProfilePage() {
  const { user } = useAuth()
  const { getApplicationsByWorker } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+65 9123 4567',
    location: 'Singapore',
    bio: 'Experienced F&B professional with a passion for delivering excellent customer service. I have worked in various restaurant environments and am skilled in both front-of-house and kitchen operations.',
    experience: '3 years',
    skills: ['Customer Service', 'Food Preparation', 'Cash Handling', 'Team Collaboration', 'Multi-tasking'],
    languages: ['English', 'Mandarin', 'Malay'],
    availability: 'Flexible hours, weekends available'
  })

  const myApplications = getApplicationsByWorker(user?.id || '')
  const acceptedJobs = myApplications.filter(app => app.status === 'accepted').length
  const totalApplications = myApplications.length

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile data:', formData)
    setIsEditing(false)
  }

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }))
  }

  const updateSkill = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }))
  }

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const stats = [
    { label: 'Jobs Completed', value: acceptedJobs.toString(), icon: '✅' },
    { label: 'Total Applications', value: totalApplications.toString(), icon: '📝' },
    { label: 'Success Rate', value: totalApplications > 0 ? `${Math.round((acceptedJobs / totalApplications) * 100)}%` : '0%', icon: '📊' },
    { label: 'Rating', value: '4.8', icon: '⭐' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-lg">My Profile</h1>
          <p className="text-secondary">Manage your personal information and work preferences</p>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} hover={false}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-accent-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <Input
                  label="Full Name"
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
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{user?.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{formData.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="info">Gig Worker</Badge>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-text-muted" />
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <span>{formData.location}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Bio & Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-input form-textarea"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    placeholder="Tell employers about yourself..."
                  />
                </div>
                <Input
                  label="Experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g., 3 years"
                />
                <Input
                  label="Availability"
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  placeholder="e.g., Flexible hours, weekends available"
                />
              </>
            ) : (
              <>
                <p className="text-text-secondary leading-relaxed">{formData.bio}</p>
                
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-border-color">
                  <div>
                    <p className="text-sm text-text-muted">Experience</p>
                    <p className="font-medium">{formData.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Availability</p>
                    <p className="font-medium">{formData.availability}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Skills & Languages */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className="form-input flex-1"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder={`Skill ${index + 1}`}
                    />
                    {formData.skills.length > 1 && (
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addSkill}
                >
                  Add Skill
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                  <Badge key={index} variant="info">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <Badge key={index} variant="success">
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
              <div>
                <h4 className="font-medium">Job Notifications</h4>
                <p className="text-sm text-text-muted">Get notified about new job opportunities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
              <div>
                <h4 className="font-medium">Application Updates</h4>
                <p className="text-sm text-text-muted">Get updates when employers respond to your applications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

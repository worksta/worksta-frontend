'use client'

import React, { useState, useCallback, useMemo, type ChangeEvent, type ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

type LoadingProps = {
  className?: string;
};

const Loading = React.memo(({ className }: LoadingProps) => (
  <div className={cn("flex items-center justify-center min-h-screen", className)}>
    <div className="space-y-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
));
Loading.displayName = 'Loading';

const ErrorMessage = React.memo(({ message }: { message: string }) => (
  <Alert variant="destructive" className="m-4">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
));
ErrorMessage.displayName = 'ErrorMessage';

const NoAuth = React.memo(() => (
  <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
    Please log in to view your profile.
  </div>
));
NoAuth.displayName = 'NoAuth';

type CardProps = React.ComponentProps<typeof Card>;
type CardContentProps = React.ComponentProps<typeof CardContent>;
type CardHeaderProps = React.ComponentProps<typeof CardHeader>;
type CardTitleProps = React.ComponentProps<typeof CardTitle>;
type InputProps = React.ComponentProps<typeof Input>;
type TextareaProps = React.ComponentProps<typeof Textarea>;
type BadgeProps = React.ComponentProps<typeof Badge>;
type LabelProps = React.ComponentProps<typeof Label>;

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  experience?: string;
  skills?: string[];
}

interface Application {
  id: string;
  status: 'pending' | 'accepted' | 'rejected';
  jobId: string;
  workerId: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  logout?: () => Promise<void>;
}

interface AppContextType {
  getApplicationsByWorker: (workerId: string) => Application[];
  isLoading: boolean;
  error: Error | null;
  clearError?: () => void;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  experience: string;
  skills: string[];
  languages: string[];
  availability: string;
};

type ButtonVariant = ButtonProps['variant'];
type ButtonSize = ButtonProps['size'];

type DivProps = HTMLAttributes<HTMLDivElement>;

type CardComponentProps = CardProps & {
  children?: ReactNode;
  className?: string;
};

type InputComponentProps = InputProps & {
  label?: string;
  error?: string;
};

export function ProfilePage(): JSX.Element {
  const { user, isLoading: authLoading, error: authError } = useAuth<AuthContextType>()
  const { getApplicationsByWorker, isLoading: appLoading, error: appError } = useApp<AppContextType>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(authError?.message || appError?.message || null)
  const [formData, setFormData] = useState<FormData>(() => ({

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
  Calendar,
  Camera,
  Shield,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  experience: string
  skills: string[]
  languages: string[]
  availability: string
}

interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
}

interface Application {
  status: string;
}

interface AuthContextType {
  user: User | null;
}

interface AppContextType {
  getApplicationsByWorker: (id: string) => Application[];
}

export const ProfilePage = React.memo((): JSX.Element => {
  const { user, isLoading: authLoading, error: authError } = useAuth<AuthContextType>()
  const { getApplicationsByWorker, isLoading: appLoading, error: appError } = useApp<AppContextType>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(authError?.message || appError?.message || null)
  const [formData, setFormData] = useState<FormData>(() => ({
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

  const myApplications = useMemo(() => {
    if (!user?.id) return []
    try {
      return getApplicationsByWorker(user.id)
    } catch (err) {
      console.error('Error fetching applications:', err)
      return []
    }
  }, [user?.id, getApplicationsByWorker])

  const { totalJobsCompleted, totalApplications } = useMemo(() => ({
    totalJobsCompleted: myApplications.filter(app => app.status === 'accepted').length,
    totalApplications: myApplications.length
  }), [myApplications])

  const handleSave = useCallback(async (): Promise<void> => {
    try {
      setError(null)
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim()) {
        throw new Error('Name and email are required')
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error('Please enter a valid email address')
      }
      // In a real app, this would save to the backend
      await Promise.resolve(console.log('Saving profile data:', formData))
      setIsEditing(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save profile'
      setError(errorMessage)
      console.error('Error saving profile:', err)
    }
  }, [formData, setError])

  const addSkill = (): void => {
    setFormData((prev: FormData) => ({
      ...prev,
      skills: [...prev.skills, '']
    }))
  }

  const handleInputChange = useCallback((e: InputChangeEvent, field: keyof FormData): void => {
    const value = e.target.value.trim()
    setFormData(prev => ({
      ...prev,
      [field]: field === 'email' ? value.toLowerCase() : value
    }))
    if (error) setError(null)
  }, [error, setError])

  const updateSkill = (index: number, value: string): void => {
    setFormData((prev: FormData) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }))
  }

  const removeSkill = (index: number): void => {
    setFormData((prev: FormData) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const stats = [
    { label: 'Jobs Completed', value: totalJobsCompleted.toString(), icon: '✅' },
    { label: 'Total Applications', value: totalApplications.toString(), icon: '📝' },
    { label: 'Success Rate', value: totalApplications > 0 ? `${Math.round((totalJobsCompleted / totalApplications) * 100)}%` : '0%', icon: '📊' },
    { label: 'Rating', value: '4.8', icon: '⭐' }
  ]

  if (authLoading || appLoading) {
    return <Loading className="bg-[#1a1a1a]" />
  }

  if (!user) {
    return <NoAuth />
  }

  if (error) {
    return <ErrorMessage message={error} />
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
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[26px]"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Profile Avatar with Premium Design */}
              <div className="relative">
                <div className="w-24 h-24 rounded-[20px] bg-gradient-to-br from-[#A259FF] to-[#2D9CFF] flex items-center justify-center text-4xl font-bold text-white relative overflow-hidden group"
                  style={{
                    boxShadow: '0 8px 32px rgba(162, 89, 255, 0.3), 0 4px 16px rgba(45, 156, 255, 0.2)'
                  }}
                >
                  <span>{user?.avatar || user?.name?.charAt(0)?.toUpperCase()}</span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </div>
          </div>
            <div className="flex flex-col space-y-3">
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
                {/* Camera icon for editing */}
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#A259FF] rounded-full flex items-center justify-center text-white hover:bg-[#B366FF] transition-colors duration-300"
                  style={{ boxShadow: '0 4px 12px rgba(162, 89, 255, 0.4)' }}
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h1 className="text-[32px] font-black text-white mb-2 tracking-[0.02em]">
                  {formData.name}
                </h1>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-gradient-to-r from-[#A259FF]/20 to-[#2D9CFF]/20 border-[#A259FF]/30 text-[#A259FF] px-3 py-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified Worker
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-violet-400 fill-current" />
                    ))}
                    <span className="text-white/80 text-sm ml-1">4.8</span>
                  </div>
                </div>
                <p className="text-[#c0c0c0] text-[16px] max-w-md">
                  {formData.bio.substring(0, 100)}...
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white font-semibold px-6 py-3 rounded-[14px] text-[14px] transition-all duration-300 flex items-center gap-2 h-[44px] relative overflow-hidden group"
                    style={{
                      boxShadow: '0 4px 16px rgba(34, 197, 94, 0.25), 0 2px 8px rgba(22, 163, 74, 0.15)'
                    }}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gradient-to-br from-white/8 to-white/4 hover:from-white/12 hover:to-white/8 border border-white/10 text-white font-medium px-6 py-3 rounded-[14px] text-[14px] transition-all duration-300 flex items-center gap-2 h-[44px]"
                    style={{
                      boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-[#A259FF] to-[#2D9CFF] hover:from-[#B366FF] hover:to-[#3DA8FF] text-white font-semibold px-6 py-3 rounded-[14px] text-[14px] transition-all duration-300 flex items-center gap-2 h-[44px] relative overflow-hidden group"
                  style={{
                    boxShadow: '0 4px 16px rgba(162, 89, 255, 0.25), 0 2px 8px rgba(45, 156, 255, 0.15)'
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Applications', value: myApplications.length, icon: Briefcase, color: 'from-[#A259FF] to-[#8B5CF6]', bg: 'from-[#A259FF]/10 to-[#8B5CF6]/10' },
            { label: 'Jobs Completed', value: totalJobsCompleted, icon: Award, color: 'from-[#22c55e] to-[#16a34a]', bg: 'from-[#22c55e]/10 to-[#16a34a]/10' },
            { label: 'Rating', value: '4.8', icon: Star, color: 'from-[#f59e0b] to-[#d97706]', bg: 'from-[#f59e0b]/10 to-[#d97706]/10' },
            { label: 'Earnings', value: '$1,240', icon: DollarSign, color: 'from-[#2D9CFF] to-[#1e40af]', bg: 'from-[#2D9CFF]/10 to-[#1e40af]/10' }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index}
                className="bg-white/5 backdrop-blur-xl rounded-[20px] p-6 border border-white/10 relative overflow-hidden group hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: `
                    0 16px 32px rgba(0, 0, 0, 0.3),
                    0 8px 16px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} pointer-events-none rounded-[20px]`}></div>
                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}
                    style={{ boxShadow: '0 4px 16px rgba(162, 89, 255, 0.2)' }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[#c0c0c0] text-sm">{stat.label}</div>
                </div>
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>
            )
          })}
        </div>

        {/* Premium Information Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information Card */}
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
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[20px] font-bold text-white">Personal Information</h3>
              </div>

              <Card>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange(e, 'phone')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange(e, 'location')}
                      />
                    </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{user?.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{formData.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="info">Gig Worker</Badge>
                            <div className="flex items-center gap-1 text-violet-400">
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

            </div>
          </div>

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
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    placeholder="Tell employers about yourself..."
                    className={cn(
                      "resize-none",
                      "min-h-[100px]"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g., 3 years"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                    placeholder="e.g., Flexible hours, weekends available"
                  />
                </div>
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
                    <Input
                      className="flex-1"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder={`Skill ${index + 1}`}
                    />
                    {formData.skills.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
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
                  variant="outline"
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
    </div>
  );
}
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
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

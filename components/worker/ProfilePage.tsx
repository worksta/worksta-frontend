'use client'

import React, { useState, useCallback, useMemo, type ChangeEvent } from 'react'
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
  Calendar,
  Camera,
  Shield,
  TrendingUp,
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react'

// Simple className utility function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

// Import types from contexts
import type { User as AuthUser } from '@/contexts/AuthContext'
import type { Application } from '@/contexts/AppContext'

// Extended User interface for profile data
interface ExtendedUser extends AuthUser {
  phone?: string;
  location?: string;
  bio?: string;
  experience?: string;
  skills?: string[];
}

type LoadingProps = {
  className?: string;
};

const Loading = React.memo(({ className }: LoadingProps) => (
  <div className={cn("flex items-center justify-center min-h-screen", className)}>
    <div className="space-y-4">
      <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse" />
      <div className="h-4 w-[250px] bg-gray-300 animate-pulse rounded" />
      <div className="h-4 w-[200px] bg-gray-300 animate-pulse rounded" />
    </div>
  </div>
));
Loading.displayName = 'Loading';

const ErrorMessage = React.memo(({ message }: { message: string }) => (
  <div className="m-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
    <AlertCircle className="h-4 w-4" />
    <span>{message}</span>
  </div>
));
ErrorMessage.displayName = 'ErrorMessage';

const NoAuth = React.memo(() => (
  <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
    Please log in to view your profile.
  </div>
));
NoAuth.displayName = 'NoAuth';

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

export const ProfilePage = React.memo((): JSX.Element => {
  const { user, loading: authLoading } = useAuth()
  const { getApplicationsByWorker } = useApp()
  
  // Cast user to extended type for profile features
  const extendedUser = user as ExtendedUser | null
  
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(() => ({
    name: extendedUser?.name || '',
    email: extendedUser?.email || '',
    phone: extendedUser?.phone || '',
    location: extendedUser?.location || '',
    bio: extendedUser?.bio || '',
    experience: extendedUser?.experience || '',
    skills: extendedUser?.skills || [],
    languages: [],
    availability: 'Full-time'
  }))

  const isLoading = authLoading

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSave = useCallback(async () => {
    try {
      // Save logic would go here
      setIsEditing(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile')
    }
  }, [formData])

  const handleCancel = useCallback(() => {
    setFormData({
      name: extendedUser?.name || '',
      email: extendedUser?.email || '',
      phone: extendedUser?.phone || '',
      location: extendedUser?.location || '',
      bio: extendedUser?.bio || '',
      experience: extendedUser?.experience || '',
      skills: extendedUser?.skills || [],
      languages: [],
      availability: 'Full-time'
    })
    setIsEditing(false)
    setError(null)
  }, [extendedUser])

  const applications = useMemo(() => {
    return extendedUser?.id ? getApplicationsByWorker(extendedUser.id) : []
  }, [extendedUser?.id, getApplicationsByWorker])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!extendedUser) {
    return <NoAuth />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{extendedUser.name}</h2>
                  <p className="text-gray-300">{extendedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-medium">4.8</span>
                    <span className="text-gray-400">(24 reviews)</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isEditing ? (
                  <><X className="w-4 h-4 mr-2" /> Cancel</>
                ) : (
                  <><Edit className="w-4 h-4 mr-2" /> Edit Profile</>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Details */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white"
                  />
                ) : (
                  <p className="text-white">{extendedUser.name || 'Not provided'}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white"
                  />
                ) : (
                  <p className="text-white">{extendedUser.email || 'Not provided'}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </label>
                {isEditing ? (
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white"
                  />
                ) : (
                  <p className="text-white">{extendedUser.phone || 'Not provided'}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                {isEditing ? (
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white"
                  />
                ) : (
                  <p className="text-white">{extendedUser.location || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-white">{extendedUser.bio || 'No bio provided'}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex space-x-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                   <X className="w-4 h-4 mr-2" />
                   Cancel
                 </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills & Experience */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Skills & Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {(extendedUser.skills || []).map((skill: string, index: number) => (
                    <Badge key={index} className="bg-blue-600 text-white">
                      {skill}
                    </Badge>
                  ))}
                  {(!extendedUser.skills || extendedUser.skills.length === 0) && (
                    <p className="text-gray-400">No skills added yet</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Experience</h3>
                <p className="text-white">{extendedUser.experience || 'No experience added yet'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.slice(0, 5).map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Job #{application.jobId}</p>
                      <p className="text-gray-400 text-sm">{new Date(application.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <Badge 
                      className={`${
                        application.status === 'accepted' ? 'bg-green-600' :
                        application.status === 'rejected' ? 'bg-red-600' :
                        'bg-yellow-600'
                      } text-white`}
                    >
                      {application.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No applications yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
})

ProfilePage.displayName = 'ProfilePage'

export default ProfilePage

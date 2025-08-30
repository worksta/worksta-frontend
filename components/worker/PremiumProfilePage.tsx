'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
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
  Globe,
  Languages
} from 'lucide-react'

export function PremiumProfilePage() {
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
  const acceptedJobs = myApplications.filter(app => app.status === 'accepted')

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const addSkill = () => {
    setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }))
  }

  const removeSkill = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      skills: prev.skills.filter((_, i) => i !== index) 
    }))
  }

  const updateSkill = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }))
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
                  {user?.avatar}
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </div>
                {/* Camera icon for editing */}
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#A259FF] rounded-full flex items-center justify-center text-white hover:bg-[#B366FF] transition-colors duration-300"
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
                  <div className="bg-gradient-to-r from-[#A259FF]/20 to-[#2D9CFF]/20 border border-[#A259FF]/30 text-[#A259FF] px-3 py-1 rounded-[8px] text-sm font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified Worker
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Applications', value: myApplications.length, icon: Briefcase, color: 'from-[#A259FF] to-[#8B5CF6]', bg: 'from-[#A259FF]/10 to-[#8B5CF6]/10' },
            { label: 'Jobs Completed', value: acceptedJobs.length, icon: Award, color: 'from-[#22c55e] to-[#16a34a]', bg: 'from-[#22c55e]/10 to-[#16a34a]/10' },
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

              <div className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[#c0c0c0] text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                          style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-[#c0c0c0] text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                          style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-[#c0c0c0] text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                          style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-[#c0c0c0] text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                          style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                        <Mail className="w-5 h-5 text-[#A259FF]" />
                        <div>
                          <p className="text-[#c0c0c0] text-sm">Email</p>
                          <p className="text-white font-medium">{formData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                        <Phone className="w-5 h-5 text-[#2D9CFF]" />
                        <div>
                          <p className="text-[#c0c0c0] text-sm">Phone</p>
                          <p className="text-white font-medium">{formData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                        <MapPin className="w-5 h-5 text-[#22c55e]" />
                        <div>
                          <p className="text-[#c0c0c0] text-sm">Location</p>
                          <p className="text-white font-medium">{formData.location}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Professional Profile Card */}
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
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#2D9CFF] to-[#1e40af] flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(45, 156, 255, 0.3)' }}
                >
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[20px] font-bold text-white">Professional Profile</h3>
              </div>

              <div className="space-y-6">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-[#c0c0c0] text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300 resize-none"
                        style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="Tell employers about yourself..."
                      />
                    </div>
                    <div>
                      <label className="block text-[#c0c0c0] text-sm font-medium mb-2">Experience</label>
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                        style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="e.g., 3 years"
                      />
                    </div>
                    <div>
                      <label className="block text-[#c0c0c0] text-sm font-medium mb-2">Availability</label>
                      <input
                        type="text"
                        value={formData.availability}
                        onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                        className="w-full px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                        style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="e.g., Flexible hours, weekends available"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                      <p className="text-white leading-relaxed">{formData.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                        <Clock className="w-5 h-5 text-[#f59e0b]" />
                        <div>
                          <p className="text-[#c0c0c0] text-sm">Experience</p>
                          <p className="text-white font-medium">{formData.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10">
                        <Calendar className="w-5 h-5 text-[#22c55e]" />
                        <div>
                          <p className="text-[#c0c0c0] text-sm">Availability</p>
                          <p className="text-white font-medium">{formData.availability}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Languages Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skills Card */}
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
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)' }}
                >
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[20px] font-bold text-white">Skills</h3>
              </div>

              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-3">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            className="flex-1 px-4 py-3 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[12px] text-white placeholder-[#999999] text-[14px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
                            style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                            placeholder={`Skill ${index + 1}`}
                          />
                          {formData.skills.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSkill(index)}
                              className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white px-4 py-3 rounded-[12px] text-[14px] transition-all duration-300 flex items-center justify-center"
                              style={{ boxShadow: '0 4px 16px rgba(239, 68, 68, 0.25)' }}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addSkill}
                        className="w-full bg-gradient-to-br from-white/8 to-white/4 hover:from-white/12 hover:to-white/8 border border-white/10 text-white font-medium px-4 py-3 rounded-[12px] text-[14px] transition-all duration-300 flex items-center justify-center gap-2"
                        style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                      >
                        + Add Skill
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-3">
                      {formData.skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                        <div key={index}
                          className="bg-gradient-to-r from-[#A259FF]/20 to-[#2D9CFF]/20 border border-[#A259FF]/30 text-white px-4 py-2 rounded-[10px] text-sm font-medium"
                          style={{ boxShadow: '0 2px 8px rgba(162, 89, 255, 0.15)' }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Languages Card */}
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
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center"
                  style={{ boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)' }}
                >
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[20px] font-bold text-white">Languages</h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {formData.languages.map((language, index) => (
                    <div key={index}
                      className="bg-gradient-to-r from-[#f59e0b]/20 to-[#d97706]/20 border border-[#f59e0b]/30 text-white px-4 py-2 rounded-[10px] text-sm font-medium flex items-center gap-2"
                      style={{ boxShadow: '0 2px 8px rgba(245, 158, 11, 0.15)' }}
                    >
                      <Languages className="w-3 h-3" />
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp, Job } from '@/contexts/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Users,
  Eye,
  MoreVertical
} from 'lucide-react'
import clsx from 'clsx'

export function JobsList() {
  const { user } = useAuth()
  const { getJobsByBusiness, getApplicationsByJob } = useApp()
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const jobs = getJobsByBusiness(user?.id || '')
  const filteredJobs = jobs.filter(job => filter === 'all' || job.status === filter)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="glass-card p-8 rounded-2xl border border-border-color/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              🎯 My Job Postings
            </h1>
            <p className="text-text-secondary text-lg">Manage your job postings and track applications with ease</p>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{jobs.filter(j => j.status === 'active').length} Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>{jobs.reduce((acc, job) => acc + getApplicationsByJob(job.id).length, 0)} Total Applications</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={clsx(
                'px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105',
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-bg-tertiary/50 text-text-secondary hover:bg-bg-card border border-border-color/30'
              )}
            >
              All Jobs ({jobs.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={clsx(
                'px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105',
                filter === 'active'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                  : 'bg-bg-tertiary/50 text-text-secondary hover:bg-bg-card border border-border-color/30'
              )}
            >
              Active ({jobs.filter(j => j.status === 'active').length})
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={clsx(
                'px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105',
                filter === 'closed'
                  ? 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/25'
                  : 'bg-bg-tertiary/50 text-text-secondary hover:bg-bg-card border border-border-color/30'
              )}
            >
              Closed ({jobs.filter(j => j.status === 'closed').length})
            </button>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="glass-card border border-border-color/50 hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-12 text-center">
            <div className="relative mb-8">
              <div className="text-8xl mb-4 animate-bounce">📋</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              {filter === 'all' ? 'Ready to Start Hiring?' : `No ${filter} jobs found`}
            </h3>
            <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto leading-relaxed">
              {filter === 'all' 
                ? "Create your first job posting and connect with talented workers in your area. It only takes a few minutes!"
                : `No ${filter} jobs found. Try changing the filter or create a new job posting.`
              }
            </p>
            {filter === 'all' && (
              <div className="space-y-4">
                <Button 
                  onClick={() => {
                    const event = new CustomEvent('openPostJobModal')
                    window.dispatchEvent(event)
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  🚀 Post Your First Job
                </Button>
                <div className="flex items-center justify-center gap-6 text-sm text-text-muted mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Free to post</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Instant applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Quality workers</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8">
          {filteredJobs.map((job, index) => {
            const applications = getApplicationsByJob(job.id)
            const pendingCount = applications.filter(app => app.status === 'pending').length
            const acceptedCount = applications.filter(app => app.status === 'accepted').length
            
            return (
              <Card key={job.id} className={`group relative overflow-hidden glass-card hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fadeInUp stagger-${Math.min(index + 1, 4)} border border-border-color/50`}>
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 space-y-5">
                      {/* Job Header */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold text-text-primary group-hover:text-purple-400 transition-colors duration-300">{job.title}</h3>
                          <Badge 
                            variant={job.status === 'active' ? 'success' : 'error'}
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              job.status === 'active' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {job.status === 'active' ? '🟢 Active' : '🔴 Closed'}
                          </Badge>
                          {pendingCount > 0 && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 text-xs font-semibold rounded-full animate-pulse">
                              🔔 {pendingCount} new application{pendingCount > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                        <p className="text-text-secondary leading-relaxed line-clamp-2">{job.description}</p>
                      </div>
                      
                      {/* Job Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary/30 border border-border-color/30 hover:bg-bg-tertiary/50 transition-colors">
                          <div className="p-2 rounded-lg bg-blue-500/20">
                            <MapPin className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-xs text-text-muted font-medium">Location</div>
                            <div className="text-sm font-semibold text-text-primary">{job.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary/30 border border-border-color/30 hover:bg-bg-tertiary/50 transition-colors">
                          <div className="p-2 rounded-lg bg-green-500/20">
                            <DollarSign className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <div className="text-xs text-text-muted font-medium">Pay Rate</div>
                            <div className="text-sm font-semibold text-text-primary">${job.pay}{job.payType === 'hourly' ? '/hr' : ''}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary/30 border border-border-color/30 hover:bg-bg-tertiary/50 transition-colors">
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Calendar className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-xs text-text-muted font-medium">Schedule</div>
                            <div className="text-sm font-semibold text-text-primary">{formatDate(job.date)} at {formatTime(job.time)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary/30 border border-border-color/30 hover:bg-bg-tertiary/50 transition-colors">
                          <div className="p-2 rounded-lg bg-orange-500/20">
                            <Clock className="w-4 h-4 text-orange-400" />
                          </div>
                          <div>
                            <div className="text-xs text-text-muted font-medium">Duration</div>
                            <div className="text-sm font-semibold text-text-primary">{job.duration}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                      <Button 
                        onClick={() => setSelectedJob(job)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                      >
                        <Users className="w-5 h-5" />
                        View Applications ({applications.length})
                      </Button>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                          <div className="font-bold text-yellow-400">{pendingCount}</div>
                          <div className="text-text-muted">Pending</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                          <div className="font-bold text-green-400">{acceptedCount}</div>
                          <div className="text-text-muted">Hired</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer Stats */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t border-border-color/50">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-text-muted">
                        <Eye className="w-4 h-4" />
                        <span>Posted {formatDate(job.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Users className="w-4 h-4" />
                        <span>{applications.length} total applications</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-bg-tertiary/50 hover:bg-bg-tertiary border border-border-color/30 transition-colors group/btn">
                        <MoreVertical className="w-4 h-4 text-text-muted group-hover/btn:text-text-primary transition-colors" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {selectedJob && (
        <JobApplicationsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  )
}

interface JobApplicationsModalProps {
  job: Job
  onClose: () => void
}

function JobApplicationsModal({ job, onClose }: JobApplicationsModalProps) {
  const { getApplicationsByJob, updateApplicationStatus } = useApp()
  const applications = getApplicationsByJob(job.id)

  const handleStatusUpdate = (applicationId: string, status: 'accepted' | 'rejected') => {
    updateApplicationStatus(applicationId, status)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-card border border-border-color rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Applications</h2>
              <p className="text-secondary">{job.title}</p>
            </div>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        
        <div className="p-6 overflow-auto max-h-96">
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-secondary">No applications yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="bg-bg-tertiary rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{application.workerAvatar}</div>
                      <div>
                        <h4 className="font-medium">{application.workerName}</h4>
                        <p className="text-sm text-secondary">
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        application.status === 'accepted' ? 'success' : 
                        application.status === 'rejected' ? 'error' : 'warning'
                      }
                    >
                      {application.status}
                    </Badge>
                  </div>
                  
                  {application.message && (
                    <p className="text-sm text-secondary mb-4 bg-bg-secondary p-3 rounded">
                      "{application.message}"
                    </p>
                  )}
                  
                  {application.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="success"
                        onClick={() => handleStatusUpdate(application.id, 'accepted')}
                      >
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger"
                        onClick={() => handleStatusUpdate(application.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

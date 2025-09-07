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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-lg">My Jobs</h1>
          <p className="text-secondary">Manage your job postings and applications</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === 'all'
                ? 'bg-accent-primary text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card'
            )}
          >
            All ({jobs.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === 'active'
                ? 'bg-accent-primary text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card'
            )}
          >
            Active ({jobs.filter(j => j.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === 'closed'
                ? 'bg-accent-primary text-bg-primary'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card'
            )}
          >
            Closed ({jobs.filter(j => j.status === 'closed').length})
          </button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent className="p-8">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-lg font-medium mb-3">No jobs found</h3>
            <p className="text-secondary mb-6">
              {filter === 'all' 
                ? "You haven't posted any jobs yet. Click 'Post a Gig' to get started!"
                : `No ${filter} jobs found. Try changing the filter.`
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => {
                const event = new CustomEvent('openPostJobModal')
                window.dispatchEvent(event)
              }}>
                Post Your First Job
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job, index) => {
            const applications = getApplicationsByJob(job.id)
            const pendingCount = applications.filter(app => app.status === 'pending').length
            
            return (
              <Card key={job.id} className={`hover-lift group relative overflow-hidden glass-card animate-fadeInUp stagger-${Math.min(index + 1, 4)} h-fit`}>
                <CardContent className="p-7 relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-lg font-semibold text-text-primary">{job.title}</h3>
                        <Badge variant={job.status === 'active' ? 'success' : 'error'}>
                          {job.status}
                        </Badge>
                        {pendingCount > 0 && (
                          <Badge variant="warning">
                            {pendingCount} new application{pendingCount > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <p className="text-secondary text-sm mb-4 line-clamp-2">{job.description}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 text-sm">
                        <div className="flex items-center gap-3 text-text-secondary">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-secondary">
                          <DollarSign className="w-4 h-4" />
                          <span>${job.pay}{job.payType === 'hourly' ? '/hr' : ''}</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-secondary">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(job.date)} at {formatTime(job.time)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-secondary">
                          <Clock className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-6">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => setSelectedJob(job)}
                        className="gap-3"
                      >
                        <Users className="w-4 h-4" />
                        Applications ({applications.length})
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5 pt-5 border-t border-border-color">
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <Eye className="w-4 h-4" />
                      <span>Posted {formatDate(job.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <Users className="w-4 h-4" />
                      <span>{applications.length} total applications</span>
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

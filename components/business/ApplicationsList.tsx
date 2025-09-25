'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp, Application } from '@/contexts/AppContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Calendar, MapPin, DollarSign } from 'lucide-react'
import clsx from 'clsx'

export function ApplicationsList() {
  const { user } = useAuth()
  const { jobs, applications, updateApplicationStatus } = useApp()
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')

  // Get all applications for jobs posted by this business
  const businessJobs = jobs.filter(job => job.businessId === user?.id)
  const businessApplications = applications.filter(app => 
    businessJobs.some(job => job.id === app.jobId)
  )

  const filteredApplications = businessApplications.filter(app => 
    filter === 'all' || app.status === filter
  )

  const getJobForApplication = (jobId: string) => {
    return businessJobs.find(job => job.id === jobId)
  }

  const handleStatusUpdate = (applicationId: string, status: 'accepted' | 'rejected') => {
    updateApplicationStatus(applicationId, status)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const statusCounts = {
    all: businessApplications.length,
    pending: businessApplications.filter(app => app.status === 'pending').length,
    accepted: businessApplications.filter(app => app.status === 'accepted').length,
    rejected: businessApplications.filter(app => app.status === 'rejected').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-lg">Applications</h1>
          <p className="text-secondary">Manage applications for your job postings</p>
        </div>
        
        <div className="flex gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                filter === status
                  ? 'bg-accent-primary text-bg-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card'
              )}
            >
              {status} ({count})
            </button>
          ))}
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent className="p-8">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-lg font-medium mb-3">No applications found</h3>
            <p className="text-secondary mb-4">
              {filter === 'all' 
                ? "No one has applied to your jobs yet. Make sure your job postings are attractive and detailed!"
                : `No ${filter} applications found.`
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredApplications.map((application) => {
            const job = getJobForApplication(application.jobId)
            if (!job) return null

            return (
              <Card key={application.id} className="hover-lift group glass-effect border-border-color/30 h-fit">
                <CardContent className="p-7 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-5 flex-1">
                      <div className="text-3xl">{application.workerAvatar}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-lg font-semibold">{application.workerName}</h3>
                          <Badge 
                            variant={
                              application.status === 'accepted' ? 'success' : 
                              application.status === 'rejected' ? 'error' : 'warning'
                            }
                          >
                            {application.status}
                          </Badge>
                        </div>
                        
                        <p className="text-secondary text-sm mb-4">
                          Applied for: <strong>{job.title}</strong>
                        </p>
                        
                        {application.message && (
                          <div className="bg-bg-tertiary p-4 rounded-lg mb-5">
                            <p className="text-sm text-text-secondary">
                              "{application.message}"
                            </p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
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
                            <span>Applied {formatDate(application.appliedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {application.status === 'pending' && (
                      <div className="flex gap-3 ml-6">
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
                  
                  <div className="mt-5 pt-5 border-t border-border-color">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                      <div>
                        <span className="text-text-muted">Job Date: </span>
                        <span className="text-text-secondary">
                          {new Date(job.date).toLocaleDateString()} at {job.time}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-muted">Duration: </span>
                        <span className="text-text-secondary">{job.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

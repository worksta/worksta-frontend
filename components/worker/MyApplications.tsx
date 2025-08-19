'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp, Application } from '@/contexts/AppContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Building2,
  ExternalLink
} from 'lucide-react'
import clsx from 'clsx'

export function MyApplications() {
  const { user } = useAuth()
  const { jobs, getApplicationsByWorker } = useApp()
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')

  const myApplications = getApplicationsByWorker(user?.id || '')
  const filteredApplications = myApplications.filter(app => 
    filter === 'all' || app.status === filter
  )

  const getJobForApplication = (jobId: string) => {
    return jobs.find(job => job.id === jobId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const statusCounts = {
    all: myApplications.length,
    pending: myApplications.filter(app => app.status === 'pending').length,
    accepted: myApplications.filter(app => app.status === 'accepted').length,
    rejected: myApplications.filter(app => app.status === 'rejected').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-lg">My Applications</h1>
          <p className="text-secondary">Track your job applications and their status</p>
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
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">No applications found</h3>
            <p className="text-secondary mb-4">
              {filter === 'all' 
                ? "You haven't applied to any jobs yet. Start browsing available opportunities!"
                : `No ${filter} applications found.`
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => {
                // Navigate to search tab - this would be handled by parent component
                const event = new CustomEvent('navigateToSearch')
                window.dispatchEvent(event)
              }}>
                Browse Jobs
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((application) => {
            const job = getJobForApplication(application.jobId)
            if (!job) return null

            return (
              <Card key={application.id} className="hover-lift group glass-effect border-border-color/30">
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-text-muted" />
                          <span className="text-sm text-text-muted">{job.businessName}</span>
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
                      
                      <h3 className="text-xl font-semibold text-text-primary mb-2">{job.title}</h3>
                      <p className="text-secondary mb-4 line-clamp-2">{job.description}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-accent-primary">
                            ${job.pay}{job.payType === 'hourly' ? '/hr' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(job.date)} at {formatTime(job.time)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Clock className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                      </div>
                      
                      {application.message && (
                        <div className="bg-bg-tertiary p-3 rounded-lg mb-4">
                          <p className="text-sm text-text-muted mb-1">Your message:</p>
                          <p className="text-sm text-text-secondary">"{application.message}"</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6">
                      {application.status === 'accepted' && (
                        <Button variant="success" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Contact Business
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border-color">
                    <div className="text-sm text-text-muted">
                      Applied {formatDate(application.appliedAt)}
                    </div>
                    <div className="text-sm">
                      {application.status === 'pending' && (
                        <span className="text-yellow-400">⏳ Waiting for response</span>
                      )}
                      {application.status === 'accepted' && (
                        <span className="text-green-400">🎉 Congratulations! You got the job</span>
                      )}
                      {application.status === 'rejected' && (
                        <span className="text-red-400">😔 Not selected this time</span>
                      )}
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

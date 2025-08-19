'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp, Job } from '@/contexts/AppContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Building2,
  Search,
  Filter,
  CheckCircle
} from 'lucide-react'

export function JobSearch() {
  const { user } = useAuth()
  const { jobs, applyToJob, getApplicationsByWorker } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [payFilter, setPayFilter] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const myApplications = getApplicationsByWorker(user?.id || '')
  const appliedJobIds = myApplications.map(app => app.jobId)

  const availableJobs = jobs.filter(job => job.status === 'active')

  const filteredJobs = availableJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = locationFilter === '' || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase())
    
    const matchesPay = payFilter === '' || job.pay >= parseInt(payFilter)

    return matchesSearch && matchesLocation && matchesPay
  })

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

  const isJobApplied = (jobId: string) => {
    return appliedJobIds.includes(jobId)
  }

  const handleApply = (job: Job) => {
    setSelectedJob(job)
  }

  const submitApplication = (message?: string) => {
    if (selectedJob && user) {
      applyToJob(selectedJob.id, user.id, user.name, user.avatar || '👤', message)
      setSelectedJob(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-lg">Find Jobs</h1>
          <p className="text-secondary">Discover available gigs in your area</p>
        </div>
        <Badge variant="info" className="px-3 py-1">
          {filteredJobs.length} jobs available
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                className="form-input pl-10"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                className="form-input pl-10"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                className="form-input pl-10"
                placeholder="Min. pay"
                type="number"
                value={payFilter}
                onChange={(e) => setPayFilter(e.target.value)}
              />
            </div>
            
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">No jobs found</h3>
            <p className="text-secondary">
              Try adjusting your search filters or check back later for new opportunities.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job, index) => {
            const applied = isJobApplied(job.id)
            
            return (
              <Card key={job.id} className={`hover-lift group relative overflow-hidden glass-card animate-fadeInUp stagger-${Math.min(index + 1, 4)}`}>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-text-muted" />
                          <span className="text-sm text-text-muted">{job.businessName}</span>
                        </div>
                        {applied && (
                          <Badge variant="success" className="gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Applied
                          </Badge>
                        )}
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
                      
                      {job.requirements.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-text-primary mb-2">Requirements:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="info" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6">
                      <Button
                        onClick={() => handleApply(job)}
                        disabled={applied}
                        variant={applied ? 'secondary' : 'primary'}
                        className="min-w-[120px]"
                      >
                        {applied ? 'Applied' : 'Apply Now'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border-color">
                    <div className="text-sm text-text-muted">
                      Posted {formatDate(job.createdAt)}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {job.payType === 'fixed' ? 'Fixed Rate' : 'Hourly Rate'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSubmit={submitApplication}
        />
      )}
    </div>
  )
}

interface ApplicationModalProps {
  job: Job
  onClose: () => void
  onSubmit: (message?: string) => void
}

function ApplicationModal({ job, onClose, onSubmit }: ApplicationModalProps) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(message)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-card border border-border-color rounded-lg w-full max-w-lg">
        <div className="p-6 border-b border-border-color">
          <h2 className="text-xl font-semibold">Apply for Job</h2>
          <p className="text-secondary">{job.title} at {job.businessName}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="bg-bg-tertiary p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">Location: </span>
                  <span className="text-text-secondary">{job.location}</span>
                </div>
                <div>
                  <span className="text-text-muted">Pay: </span>
                  <span className="text-accent-primary font-semibold">
                    ${job.pay}{job.payType === 'hourly' ? '/hr' : ''}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Date: </span>
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

            <label className="form-label">Cover Message (Optional)</label>
            <textarea
              className="form-input form-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the employer why you're a great fit for this job..."
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" loading={loading} className="flex-1">
              Submit Application
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

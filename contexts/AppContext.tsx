'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { workstaApi } from '@/api/api'
import type { JobPosting, WorkerApplicationItem } from '@/api/api'
import { useAuth } from '@/contexts/AuthContext'

export interface Job {
  id: string
  businessId: string
  businessName: string
  title: string
  description: string
  location: string
  pay: number
  payType: 'hourly' | 'fixed'
  date: string
  time: string
  duration: string
  status: 'active' | 'closed'
  createdAt: string
  requirements: string[]
}

export interface Application {
  id: string
  jobId: string                      // shiftId
  workerId: string
  workerName: string
  workerAvatar: string
  status: 'pending' | 'accepted' | 'rejected'
  appliedAt: string
  message?: string

  // Snapshot fields to render even if the related job isn't in the list
  postingId?: string                 // postingId from backend
  title?: string
  date?: string
  startTime?: string                 // "HH:MM:SS"
  endTime?: string                   // "HH:MM:SS"
}

interface AppContextType {
  jobs: Job[]
  applications: Application[]
  addJob: (job: {
    title: string
    description: string
    location: string
    requirements: string[]
    shifts: Array<{
      date: string
      startTime: string
      endTime: string
      payType: 'hourly' | 'fixed'
      pay: number
    }>
  }) => void
  applyToJob: (jobId: string, workerId: string, workerName: string, workerAvatar: string, message?: string) => Promise<void>
  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => Promise<void>
  getJobsByBusiness: (businessId: string) => Job[]
  getApplicationsByWorker: (workerId: string) => Application[]
  getApplicationsByJob: (jobId: string) => Application[]
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void
  removeNotification: (id: string) => void
  notifications: Notification[]
}

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  timestamp: string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Cookie reader to hydrate token (client-only)
const TOKEN_COOKIE = 'worksta_jwt'
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie ? document.cookie.split('; ') : []
  for (const c of cookies) {
    const [k, v] = c.split('=')
    if (k === name) return decodeURIComponent(v || '')
  }
  return null
}

// JWT helpers (base64url decode) to derive business UUID from token
function decodeJWTPayload(token: string): any | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

function deriveBusinessIdFromToken(): string | null {
  const token = getCookie(TOKEN_COOKIE)
  if (!token) return null
  const payload = decodeJWTPayload(token)
  if (!payload || typeof payload !== 'object') return null
  // Prefer common id claims
  const id = (payload.sub || payload.id || payload.uid) as string | undefined
  const role = (payload.role || payload.type || payload.scope) as string | undefined
  if (!id) return null
  if (typeof role === 'string' && role.toLowerCase().includes('business')) {
    return id
  }
  // If role unknown, still return id (backend enforces access)
  return id
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()

  // Helpers to map API data into local Job shape
  const toHM = (t: string) => t.slice(0, 5)

  function computeDuration(startTime: string, endTime: string): string {
    const [sh, sm, ss] = startTime.split(':').map(Number)
    const [eh, em, es] = endTime.split(':').map(Number)
    const start = (sh || 0) * 3600 + (sm || 0) * 60 + (ss || 0)
    const end = (eh || 0) * 3600 + (em || 0) * 60 + (es || 0)
    const diffMin = Math.max(0, Math.round((end - start) / 60))
    const hours = Math.floor(diffMin / 60)
    const minutes = diffMin % 60
    if (minutes === 0) return `${hours} hours`
    return `${hours}h ${minutes}m`
  }

  function mapPostingsToJobs(postings: JobPosting[]): Job[] {
    const result: Job[] = []
    postings.forEach((p) => {
      const reqs = (p.jobRequirements && p.jobRequirements.length > 0 ? p.jobRequirements : p.tags) || []
      p.shifts.forEach((s) => {
        const payType: 'hourly' | 'fixed' = s.hourlyRate != null ? 'hourly' : 'fixed'
        const pay = s.hourlyRate != null ? s.hourlyRate : (s.fixedAmount ?? 0)
        result.push({
          id: s.id,
          businessId: p.businessId,
          businessName: '',
          title: p.title,
          description: p.description,
          location: p.location,
          pay,
          payType,
          date: s.date,
          time: toHM(s.startTime),
          duration: computeDuration(s.startTime, s.endTime),
          status: 'active',
          createdAt: new Date().toISOString(),
          requirements: reqs
        })
      })
    })
    return result
  }

  // Build applications list for business from jobApplications on each shift
  function mapBusinessApplications(postings: JobPosting[]): Application[] {
    const apps: Application[] = []
    postings.forEach((p) => {
      p.shifts.forEach((s) => {
        if (s.jobApplications && s.jobApplications.length > 0) {
          s.jobApplications.forEach((ja) => {
            apps.push({
              id: `${s.id}:${ja.workerID}`,
              jobId: s.id,
              workerId: ja.workerID,
              workerName: ja.workerID, // no profile API available; show workerID
              workerAvatar: '',
              status: ja.accepted ? 'accepted' : 'pending',
              appliedAt: new Date().toISOString(),
              message: ja.coverMessage || undefined,
              postingId: p.id,
              title: p.title,
              date: s.date,
              startTime: s.startTime,
              endTime: s.endTime,
            })
          })
        }
      })
    })
    return apps
  }

  useEffect(() => {
    let cancelled = false

    // Hydrate API token from cookie so authorized calls work after reload
    const token = getCookie(TOKEN_COOKIE)
    if (token) {
      workstaApi.setToken(token)
    }

    const fetchJobs = async () => {
      try {
        const postings = await workstaApi.getJobs()
        if (!cancelled) {
          const mapped = mapPostingsToJobs(postings)
          setJobs(mapped)
        }
      } catch (err) {
        console.error('Failed to fetch jobs from API.', err)
        if (!cancelled) {
          setJobs([])
        }
      }
    }

    // Initial fetch
    fetchJobs()

    // Polling: refresh periodically to reflect jobs created by others
    const interval = setInterval(fetchJobs, 20000)

    // Refetch on tab focus/visibility
    const onFocus = () => fetchJobs()
    const onVisibility = () => {
      if (document.visibilityState === 'visible') fetchJobs()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      clearInterval(interval)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

    const addJob = (job: {
      title: string
      description: string
      location: string
      requirements: string[]
      shifts: Array<{
        date: string
        startTime: string
        endTime: string
        payType: 'hourly' | 'fixed'
        pay: number
      }>
    }) => {
      const toHHMMSS = (t: string) => `${t.length === 5 ? t : '00:00'}:00`

      const apiShifts = job.shifts.map(s => {
        const startTime = toHHMMSS(s.startTime)
        const endTime = toHHMMSS(s.endTime)
        return {
          date: s.date,
          startTime,
          endTime,
          ...(s.payType === 'hourly' ? { hourlyRate: s.pay } : { fixedAmount: s.pay })
        }
      })

      const payload = {
        title: job.title,
        description: job.description,
        location: job.location,
        jobRequirements: job.requirements || [],
        tags: job.requirements || [],
        shifts: apiShifts
    } as const

    workstaApi
      .createJob(payload)
      .then(async () => {
        try {
          // Immediate refresh to include jobs created by anyone
          const fresh = await workstaApi.getJobs()
          const mapped = mapPostingsToJobs(fresh)
          setJobs(mapped)
          addNotification('Job created successfully!', 'success')
        } catch (e) {
          addNotification('Job created, but failed to refresh list. Please reload.', 'info')
        }
      })
      .catch((err) => {
        console.error('Failed to create job via API:', err)
        addNotification('Failed to create job. Please try again.', 'error')
      })
  }

  const applyToJob = async (jobId: string, workerId: string, workerName: string, workerAvatar: string, message?: string) => {
    try {
      await workstaApi.applyToShift(jobId, { coverMessage: (message || '').trim() })
      const newApplication: Application = {
        id: Date.now().toString(),
        jobId,
        workerId,
        workerName,
        workerAvatar,
        status: 'pending',
        appliedAt: new Date().toISOString(),
        message
      }
      setApplications(prev => [...prev, newApplication])
      addNotification('Application submitted successfully!', 'success')
    } catch (e) {
      console.error('Failed to apply to shift:', e)
      addNotification('Failed to submit application.', 'error')
    }
  }

  const updateApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
    const app = applications.find(a => a.id === applicationId)
    if (!app) return

    if (status === 'accepted') {
      try {
        await workstaApi.acceptApplication(app.jobId, app.workerId)
        // Optimistically update local state
        setApplications(prev =>
          prev.map(a => (a.id === applicationId ? { ...a, status: 'accepted' } : a))
        )
        addNotification('Application accepted.', 'success')

        // Refresh jobs to reflect shift closed
        try {
          const fresh = await workstaApi.getJobs()
          setJobs(mapPostingsToJobs(fresh))
        } catch {
          // ignore
        }

        // Immediate refresh of business applications using business UUID from JWT
        const businessUUID = deriveBusinessIdFromToken()
        if (businessUUID) {
          try {
            const postings = await workstaApi.getJobs({ bid: businessUUID })
            setApplications(mapBusinessApplications(postings))
          } catch {
            // ignore; polling/focus refetch will catch up
          }
        }
      } catch {
        addNotification('Failed to accept application.', 'error')
      }
    } else {
      // No reject API specified; local-only update
      setApplications(prev =>
        prev.map(a => (a.id === applicationId ? { ...a, status: 'rejected' } : a))
      )
      addNotification('Application rejected.', 'info')
    }
  }

  const getJobsByBusiness = (businessId: string) => {
    return jobs.filter(job => job.businessId === businessId)
  }

  const getApplicationsByWorker = (workerId: string) => {
    return applications.filter(app => app.workerId === workerId)
  }

  const getApplicationsByJob = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId)
  }

  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toISOString()
    }
    setNotifications(prev => [notification, ...prev])

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Keep business applications in sync if a business is authenticated
  useEffect(() => {
    if (!user || user.type !== 'business') return

    let cancelled = false
    const businessUUID = deriveBusinessIdFromToken()
    if (!businessUUID) return

    const fetchBusinessApps = async () => {
      try {
        const postings = await workstaApi.getJobs({ bid: businessUUID })
        if (!cancelled) {
          const apps = mapBusinessApplications(postings)
          setApplications(apps)
        }
      } catch {
        if (!cancelled) setApplications([])
      }
    }

    fetchBusinessApps()
    const interval = setInterval(fetchBusinessApps, 20000)
    const onFocus = () => fetchBusinessApps()
    const onVisibility = () => {
      if (document.visibilityState === 'visible') fetchBusinessApps()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      clearInterval(interval)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [user])

  // Keep worker applications in sync if a worker is authenticated
  useEffect(() => {
    if (!user || user.type !== 'worker') return

    let cancelled = false

    const fetchMyApps = async () => {
      try {
        const items = await workstaApi.getMyApplications()
        if (!cancelled) {
          setApplications(items.map((it) => ({
            id: `${it.shiftId}:${user.id}`,
            jobId: it.shiftId,
            workerId: user.id,
            workerName: user.name,
            workerAvatar: user.avatar || '',
            status: it.accepted ? 'accepted' : 'pending',
            appliedAt: new Date().toISOString(),
              postingId: it.postingId,
              title: it.title,
              date: it.date,
              startTime: it.startTime,
              endTime: it.endTime,
          })))
        }
      } catch {
        if (!cancelled) setApplications([])
      }
    }

    fetchMyApps()
    const interval = setInterval(fetchMyApps, 20000)
    const onFocus = () => fetchMyApps()
    const onVisibility = () => {
      if (document.visibilityState === 'visible') fetchMyApps()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      clearInterval(interval)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [user])

  return (
    <AppContext.Provider value={{
      jobs,
      applications,
      addJob,
      applyToJob,
      updateApplicationStatus,
      getJobsByBusiness,
      getApplicationsByWorker,
      getApplicationsByJob,
      addNotification,
      removeNotification,
      notifications
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

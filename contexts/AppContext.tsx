'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

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
  jobId: string
  workerId: string
  workerName: string
  workerAvatar: string
  status: 'pending' | 'accepted' | 'rejected'
  appliedAt: string
  message?: string
}

interface AppContextType {
  jobs: Job[]
  applications: Application[]
  addJob: (job: Omit<Job, 'id' | 'createdAt'>) => void
  applyToJob: (jobId: string, workerId: string, workerName: string, workerAvatar: string, message?: string) => void
  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => void
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

const demoJobs: Job[] = [
  {
    id: '1',
    businessId: '1',
    businessName: 'Sakura Restaurant',
    title: 'Urgent: Evening Server Needed',
    description: 'We need an experienced server for tonight\'s dinner service. Must have experience with Japanese cuisine and be able to handle busy periods.',
    location: 'Orchard Road, Singapore',
    pay: 18,
    payType: 'hourly',
    date: '2024-01-20',
    time: '17:00',
    duration: '5 hours',
    status: 'active',
    createdAt: '2024-01-19T10:00:00Z',
    requirements: ['Experience with Japanese cuisine', 'Professional appearance', 'Good English communication']
  },
  {
    id: '2',
    businessId: '2',
    businessName: 'Noodle House',
    title: 'Kitchen Assistant - Weekend',
    description: 'Looking for a reliable kitchen assistant to help with food prep and cleaning during weekend rush.',
    location: 'Chinatown, Singapore',
    pay: 250,
    payType: 'fixed',
    date: '2024-01-21',
    time: '10:00',
    duration: '8 hours',
    status: 'active',
    createdAt: '2024-01-19T08:30:00Z',
    requirements: ['Basic kitchen experience', 'Ability to work fast', 'Team player']
  },
  {
    id: '3',
    businessId: '1',
    businessName: 'Sakura Restaurant',
    title: 'Bartender for Private Event',
    description: 'Need an experienced bartender for a private corporate event. Must know classic cocktails and sake service.',
    location: 'Marina Bay, Singapore',
    pay: 25,
    payType: 'hourly',
    date: '2024-01-22',
    time: '18:00',
    duration: '6 hours',
    status: 'active',
    createdAt: '2024-01-19T15:20:00Z',
    requirements: ['Certified bartender', 'Corporate event experience', 'Knowledge of sake']
  },
  {
    id: '4',
    businessId: '2',
    businessName: 'Noodle House',
    title: 'Delivery Driver',
    description: 'Need a reliable driver with own vehicle for food delivery during lunch hours.',
    location: 'Central Singapore',
    pay: 15,
    payType: 'hourly',
    date: '2024-01-20',
    time: '11:00',
    duration: '4 hours',
    status: 'closed',
    createdAt: '2024-01-18T12:00:00Z',
    requirements: ['Own motorcycle/car', 'Valid driving license', 'GPS navigation skills']
  }
]

const demoApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    workerId: '3',
    workerName: 'Alex Chen',
    workerAvatar: '👨‍🍳',
    status: 'pending',
    appliedAt: '2024-01-19T12:00:00Z',
    message: 'I have 3 years of experience working at Japanese restaurants and am familiar with traditional service protocols.'
  },
  {
    id: '2',
    jobId: '2',
    workerId: '4',
    workerName: 'Maria Santos',
    workerAvatar: '👩‍🍳',
    status: 'accepted',
    appliedAt: '2024-01-19T09:15:00Z',
    message: 'I have worked in busy kitchens and am very efficient with food prep. Available all weekend.'
  },
  {
    id: '3',
    jobId: '3',
    workerId: '3',
    workerName: 'Alex Chen',
    workerAvatar: '👨‍🍳',
    status: 'rejected',
    appliedAt: '2024-01-19T16:30:00Z',
    message: 'I am a certified bartender with experience in high-end venues and knowledge of Japanese sake.'
  }
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedJobs = localStorage.getItem('worksta_jobs')
      const storedApplications = localStorage.getItem('worksta_applications')

      if (storedJobs) {
        setJobs(JSON.parse(storedJobs))
      } else {
        setJobs(demoJobs)
        localStorage.setItem('worksta_jobs', JSON.stringify(demoJobs))
      }

      if (storedApplications) {
        setApplications(JSON.parse(storedApplications))
      } else {
        setApplications(demoApplications)
        localStorage.setItem('worksta_applications', JSON.stringify(demoApplications))
      }
    } else {
      // Set default data for server-side rendering
      setJobs(demoJobs)
      setApplications(demoApplications)
    }
  }, [])

  const addJob = (job: Omit<Job, 'id' | 'createdAt'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    if (typeof window !== 'undefined') {
      localStorage.setItem('worksta_jobs', JSON.stringify(updatedJobs))
    }
  }

  const applyToJob = (jobId: string, workerId: string, workerName: string, workerAvatar: string, message?: string) => {
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
    const updatedApplications = [...applications, newApplication]
    setApplications(updatedApplications)
    if (typeof window !== 'undefined') {
      localStorage.setItem('worksta_applications', JSON.stringify(updatedApplications))
    }
    addNotification('Application submitted successfully!', 'success')
  }

  const updateApplicationStatus = (applicationId: string, status: 'accepted' | 'rejected') => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    )
    setApplications(updatedApplications)
    if (typeof window !== 'undefined') {
      localStorage.setItem('worksta_applications', JSON.stringify(updatedApplications))
    }
    addNotification(`Application ${status}!`, status === 'accepted' ? 'success' : 'info')
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

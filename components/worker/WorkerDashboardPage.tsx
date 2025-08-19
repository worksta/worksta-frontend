'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  Briefcase, 
  Clock, 
  Star, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Target,
  Award,
  CheckCircle
} from 'lucide-react'

export function WorkerDashboardPage() {
  const { user } = useAuth()
  const { getApplicationsByWorker, jobs } = useApp()
  
  const myApplications = getApplicationsByWorker(user?.id || '')
  const acceptedJobs = myApplications.filter(app => app.status === 'accepted')
  const pendingApplications = myApplications.filter(app => app.status === 'pending')
  
  const stats = [
    {
      title: 'Applications Sent',
      value: myApplications.length.toString(),
      icon: Briefcase,
      color: 'purple',
      description: 'Total job applications'
    },
    {
      title: 'Jobs Completed',
      value: acceptedJobs.length.toString(),
      icon: CheckCircle,
      color: 'green',
      description: 'Successfully finished'
    },
    {
      title: 'Success Rate',
      value: myApplications.length > 0 ? `${Math.round((acceptedJobs.length / myApplications.length) * 100)}%` : '0%',
      icon: Target,
      color: 'blue',
      description: 'Application to hire ratio'
    },
    {
      title: 'Rating',
      value: '4.8',
      icon: Star,
      color: 'yellow',
      description: 'Average employer rating'
    }
  ]

  const recentActivity = [
    {
      type: 'application',
      title: 'Applied to Server Position',
      company: 'Sakura Restaurant',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'accepted',
      title: 'Hired for Kitchen Assistant',
      company: 'Noodle House',
      time: '1 day ago',
      status: 'accepted'
    },
    {
      type: 'completed',
      title: 'Completed Bartender Shift',
      company: 'Sakura Restaurant',
      time: '3 days ago',
      status: 'completed'
    }
  ]

  const availableJobs = jobs.filter(job => job.status === 'active').slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              👋 Welcome back, {user?.name}!
            </h1>
            <p className="text-text-secondary text-lg mb-4">
              Ready to find your next amazing gig opportunity?
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {pendingApplications.length} Pending Applications
              </span>
              <span className="flex items-center gap-2 text-purple-400">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                {availableJobs.length} New Jobs Available
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-3xl mb-2">
              {user?.avatar}
            </div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className={`glass-card hover-lift animate-fadeInUp stagger-${index + 1}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-text-primary mb-1">
                  {stat.title}
                </div>
                <div className="text-xs text-text-muted">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-bg-tertiary rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                    activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {activity.status === 'accepted' ? '✅' :
                     activity.status === 'pending' ? '⏳' : '🎉'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{activity.title}</div>
                    <div className="text-sm text-text-muted">{activity.company}</div>
                  </div>
                  <div className="text-xs text-text-muted">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">This Week</div>
                  <div className="text-sm text-text-muted">Applications sent</div>
                </div>
                <div className="text-2xl font-bold text-purple-400">3</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">Earnings</div>
                  <div className="text-sm text-text-muted">This month</div>
                </div>
                <div className="text-2xl font-bold text-green-400">$1,240</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">Hours Worked</div>
                  <div className="text-sm text-text-muted">This month</div>
                </div>
                <div className="text-2xl font-bold text-blue-400">64</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              Recommended Jobs
            </span>
            <Badge variant="info" className="px-3 py-1">
              {availableJobs.length} available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableJobs.map((job, index) => (
              <div key={job.id} className={`p-4 bg-gradient-to-br from-purple-500/5 to-purple-600/5 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer hover:scale-105 animate-fadeInUp stagger-${index + 1}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm">
                    🏢
                  </div>
                  <span className="text-sm text-purple-300 font-medium">{job.businessName}</span>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{job.title}</h4>
                <p className="text-sm text-text-muted mb-3 line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-400">
                    ${job.pay}{job.payType === 'hourly' ? '/hr' : ''}
                  </span>
                  <span className="text-xs text-text-muted">{job.location}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg">
                <span className="text-lg">📝</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">Update Profile</div>
                  <div className="text-xs text-text-muted">Add skills & experience</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg">
                <span className="text-lg">🔍</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">Browse Jobs</div>
                  <div className="text-xs text-text-muted">Find new opportunities</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg">
                <span className="text-lg">🏆</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">Top Performer</div>
                  <div className="text-xs text-text-muted">5.0 star rating</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                <span className="text-lg">💯</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">Reliable Worker</div>
                  <div className="text-xs text-text-muted">100% completion rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <div className="text-2xl font-bold text-green-400">$1,240</div>
                <div className="text-sm text-text-muted">This month</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-400">$18.5</div>
                  <div className="text-xs text-text-muted">Avg/hour</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-400">64h</div>
                  <div className="text-xs text-text-muted">Total hours</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

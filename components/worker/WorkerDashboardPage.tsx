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
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Zap,
  Heart,
  Users
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
      color: 'from-violet-500 to-purple-600',
      bgColor: 'from-violet-500/10 to-purple-600/10',
      borderColor: 'border-violet-500/20',
      description: 'Total job applications'
    },
    {
      title: 'Jobs Completed',
      value: acceptedJobs.length.toString(),
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-500/10 to-green-600/10',
      borderColor: 'border-emerald-500/20',
      description: 'Successfully finished'
    },
    {
      title: 'Success Rate',
      value: myApplications.length > 0 ? `${Math.round((acceptedJobs.length / myApplications.length) * 100)}%` : '0%',
      icon: Target,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-500/10 to-cyan-600/10',
      borderColor: 'border-blue-500/20',
      description: 'Application to hire ratio'
    },
    {
      title: 'Rating',
      value: '4.8',
      icon: Star,
      color: 'from-amber-500 to-yellow-600',
      bgColor: 'from-amber-500/10 to-yellow-600/10',
      borderColor: 'border-amber-500/20',
      description: 'Average employer rating'
    }
  ]

  const recentActivity = [
    {
      type: 'application',
      title: 'Applied to Server Position',
      company: 'Sakura Restaurant',
      time: '2 hours ago',
      status: 'pending',
      icon: '📝',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30'
    },
    {
      type: 'accepted',
      title: 'Hired for Kitchen Assistant',
      company: 'Noodle House',
      time: '1 day ago',
      status: 'accepted',
      icon: '🎉',
      color: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-500/30'
    },
    {
      type: 'completed',
      title: 'Completed Bartender Shift',
      company: 'Sakura Restaurant',
      time: '3 days ago',
      status: 'completed',
      icon: '✨',
      color: 'from-violet-500/20 to-purple-500/20',
      borderColor: 'border-violet-500/30'
    }
  ]

  const availableJobs = jobs.filter(job => job.status === 'active').slice(0, 3)

  return (
    <div className="space-y-8 p-2">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-pink-500/20 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-violet-100 to-purple-100 bg-clip-text text-transparent">
                    Welcome back, {user?.name}! 👋
                  </h1>
                  <p className="text-white/80 text-lg font-medium">
                    Ready to discover your next amazing opportunity?
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-emerald-300 font-medium">{pendingApplications.length} Pending</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full backdrop-blur-sm">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
                  <span className="text-violet-300 font-medium">{availableJobs.length} New Jobs</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center text-4xl mb-3 shadow-xl shadow-violet-500/25">
                  {user?.avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-white/90 mb-1">
                  {stat.title}
                </div>
                <div className="text-xs text-white/60">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className={`group p-4 rounded-2xl bg-gradient-to-r ${activity.color} border ${activity.borderColor} hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{activity.title}</div>
                      <div className="text-sm text-white/70">{activity.company}</div>
                    </div>
                    <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-6">
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-violet-500/10 to-purple-600/10 rounded-2xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">This Week</div>
                    <div className="text-sm text-white/60">Applications sent</div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">3</div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-green-600/10 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Earnings</div>
                    <div className="text-sm text-white/60">This month</div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">$1,240</div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Hours Worked</div>
                    <div className="text-sm text-white/60">This month</div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">64</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Jobs */}
      <Card className="border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5"></div>
        <CardHeader className="relative z-10 border-b border-white/10">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              Recommended Jobs
            </span>
            <Badge variant="info" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-300">
              {availableJobs.length} available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableJobs.map((job, index) => (
              <div key={job.id} className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-violet-400/40 hover:scale-105 transition-all duration-500 cursor-pointer backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg shadow-lg">
                      🏢
                    </div>
                    <span className="text-sm text-violet-300 font-medium">{job.businessName}</span>
                  </div>
                  <h4 className="font-bold text-white text-lg mb-3 group-hover:text-violet-200 transition-colors duration-300">{job.title}</h4>
                  <p className="text-sm text-white/70 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                      ${job.pay}{job.payType === 'hourly' ? '/hr' : ''}
                    </span>
                    <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full">{job.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Steps */}
        <Card className="border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300">
                <span className="text-xl">📝</span>
                <div>
                  <div className="text-sm font-semibold text-white">Update Profile</div>
                  <div className="text-xs text-white/60">Add skills & experience</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                <span className="text-xl">🔍</span>
                <div>
                  <div className="text-sm font-semibold text-white">Browse Jobs</div>
                  <div className="text-xs text-white/60">Find new opportunities</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="text-sm font-semibold text-white">Top Performer</div>
                  <div className="text-xs text-white/60">5.0 star rating</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                <span className="text-xl">💯</span>
                <div>
                  <div className="text-sm font-semibold text-white">Reliable Worker</div>
                  <div className="text-xs text-white/60">100% completion rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings */}
        <Card className="border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-4">
            <div className="text-center space-y-4">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">$1,240</div>
                <div className="text-sm text-white/60">This month</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl border border-violet-500/20">
                  <div className="text-lg font-bold text-violet-300">$18.5</div>
                  <div className="text-xs text-white/60">Avg/hour</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-300">64h</div>
                  <div className="text-xs text-white/60">Total hours</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

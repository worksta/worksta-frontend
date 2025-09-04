'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Star, 
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Award
} from 'lucide-react'

export function AnalyticsPage() {
  const reportingPeriod = new Date().toLocaleString(undefined, {
    month: 'long',
    year: 'numeric'
  })
  const stats = [
    {
      title: 'Total Job Posts',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: BarChart3,
      color: 'purple'
    },
    {
      title: 'Applications Received',
      value: '89',
      change: '+24%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Successful Hires',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Average Response Time',
      value: '2.4h',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      color: 'orange'
    }
  ]

  const recentMetrics = [
    { label: 'Jobs Posted This Week', value: '6', color: 'purple' },
    { label: 'Active Applications', value: '23', color: 'blue' },
    { label: 'Workers Hired', value: '4', color: 'green' },
    { label: 'Average Rating', value: '4.8', color: 'yellow' }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
              📊 Business Analytics
            </h1>
            <p className="text-text-secondary text-lg">
              Track your hiring performance and optimize your recruitment strategy
            </p>
          </div>
          <div aria-label="Reporting period" className="px-3 py-1 rounded-lg bg-bg-tertiary border border-border-color text-text-secondary text-sm">
            This Month • {reportingPeriod}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`glass-card hover-lift animate-fadeInUp stagger-${index + 1}`}
              onClick={() => console.debug('Open detailed view for', stat.title)}
            >
              <CardContent className="p-6" aria-label={`${stat.title} summary`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card" onClick={() => console.debug('Open hiring trends breakdown')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Hiring Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-text-primary">Server Positions</div>
                    <div className="text-sm text-text-muted">Most in-demand role</div>
                  </div>
                  <span className="text-lg font-bold text-purple-400">68%</span>
                </div>
                <div className="w-full h-2 rounded bg-bg-tertiary overflow-hidden" aria-hidden="true">
                  <div className="h-full bg-purple-500" style={{ width: '68%' }} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-text-primary">Kitchen Staff</div>
                    <div className="text-sm text-text-muted">High demand</div>
                  </div>
                  <span className="text-lg font-bold text-blue-400">24%</span>
                </div>
                <div className="w-full h-2 rounded bg-bg-tertiary overflow-hidden" aria-hidden="true">
                  <div className="h-full bg-blue-500" style={{ width: '24%' }} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-text-primary">Bartenders</div>
                    <div className="text-sm text-text-muted">Specialty roles</div>
                  </div>
                  <span className="text-lg font-bold text-green-400">8%</span>
                </div>
                <div className="w-full h-2 rounded bg-bg-tertiary overflow-hidden" aria-hidden="true">
                  <div className="h-full bg-green-500" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card" onClick={() => console.debug('Open performance metrics')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 bg-bg-tertiary rounded-lg border border-border-color"
                  title={metric.label}
                  aria-label={`${metric.label} value`}
                >
                  <span className="text-text-secondary">{metric.label}</span>
                  <span className={`px-2 py-1 rounded-md text-sm font-bold bg-${metric.color}-500/10 border border-${metric.color}-500/20 text-${metric.color}-400`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="glass-card" onClick={() => console.debug('Open monthly stats')}>
          <CardHeader className="mt-2 flex items-center justify-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">12</div>
                <div className="text-sm text-text-muted">Jobs Posted</div>
              </div>
              <div className="h-20 w-full overflow-hidden rounded-xl bg-bg-tertiary/60 border border-border-color">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                  <polyline fill="none" stroke="#a855f7" strokeWidth="2" points="0,22 10,20 20,18 30,24 40,16 50,14 60,12 70,18 80,10 90,8 100,6" />
                  <linearGradient id="monthFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(168,85,247,0.3)" />
                    <stop offset="100%" stopColor="rgba(168,85,247,0.0)" />
                  </linearGradient>
                  <polygon points="0,30 0,22 10,20 20,18 30,24 40,16 50,14 60,12 70,18 80,10 90,8 100,6 100,30" fill="url(#monthFill)" />
                  <circle cx="100" cy="6" r="1.8" fill="#a855f7" stroke="#ffffff" strokeWidth="0.6" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-400">8</div>
                  <div className="text-xs text-text-muted">Successful</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-yellow-400">4</div>
                  <div className="text-xs text-text-muted">Pending</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card" onClick={() => console.debug('Open spend analysis')}>
          <CardHeader className="mt-2 flex items-center justify-center">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Spend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">$2,840</div>
                <div className="text-sm text-text-muted" title="All costs including platform fees">Total Spent</div>
              </div>
              <div className="h-20 w-full overflow-hidden rounded-xl bg-bg-tertiary/60 border border-border-color">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                  <polyline fill="none" stroke="#22c55e" strokeWidth="2" points="0,25 10,22 20,24 30,18 40,20 50,14 60,16 70,10 80,12 90,8 100,12" />
                  <linearGradient id="spendFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(34,197,94,0.3)" />
                    <stop offset="100%" stopColor="rgba(34,197,94,0.0)" />
                  </linearGradient>
                  <polygon points="0,30 0,25 10,22 20,24 30,18 40,20 50,14 60,16 70,10 80,12 90,8 100,12 100,30" fill="url(#spendFill)" />
                  <circle cx="100" cy="12" r="1.8" fill="#22c55e" stroke="#ffffff" strokeWidth="0.6" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-purple-400">$237</div>
                  <div className="text-xs text-text-muted" title="Average spend per successful hire">Avg per hire</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-400">5%</div>
                  <div className="text-xs text-text-muted" title="Fee charged by Worksta for transactions">Platform fee</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card" onClick={() => console.debug('Open top performer profile')}>
          <CardHeader className="mt-2 flex items-center justify-center">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 opacity-[0.35]" style={{
                background: 'radial-gradient(1200px 300px at 50% -10%, rgba(250,204,21,0.25), transparent 60%)'
              }} />
              <div className="text-center space-y-4 relative z-10 p-4">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg ring-4 ring-yellow-400/10">
                  🏆
                </div>
                <div>
                  <div className="font-bold text-text-primary text-xl">Alex Chen</div>
                  <div className="text-sm text-text-muted">Bartender • 5.0 rating • 3 jobs completed</div>
                </div>
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current drop-shadow" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-bg-tertiary border border-border-color text-text-secondary">Mixology</span>
                  <span className="text-xs px-2 py-1 rounded bg-bg-tertiary border border-border-color text-text-secondary">Customer Service</span>
                  <span className="text-xs px-2 py-1 rounded bg-bg-tertiary border border-border-color text-text-secondary">Night Shift</span>
                </div>
                <div className="flex justify-center gap-3 mt-2">
                  <button className="btn btn-secondary btn-sm">View Profile</button>
                  <button className="btn btn-primary btn-sm">Message</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card" onClick={() => console.debug('Open quick insights')}
        >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            Quick Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-text-primary mb-1">Fast Hiring</div>
              <div className="text-sm text-text-muted">Average 2.4 hours response time</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl">
              <div className="text-2xl mb-2">💯</div>
              <div className="font-semibold text-text-primary mb-1">High Success</div>
              <div className="text-sm text-text-muted">87% of applications result in hires</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-text-primary mb-1">Quality Workers</div>
              <div className="text-sm text-text-muted">4.8/5 average worker rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

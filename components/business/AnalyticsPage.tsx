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
          <CardHeader className="px-8 py-6">
            <CardTitle className="flex items-center gap-4 text-xl font-semibold text-text-primary">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              Hiring Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 py-6 pt-0">
            <div className="space-y-6">
              {/* Row 1 */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/15 to-purple-600/15 border border-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-text-primary text-lg">Server Positions</div>
                    <div className="text-sm text-text-muted mt-1">Most in-demand role</div>
                  </div>
                  <span className="text-2xl font-bold text-purple-400 bg-purple-500/10 px-4 py-2 rounded-lg">68%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-bg-tertiary overflow-hidden shadow-inner" aria-hidden="true">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full shadow-sm" style={{ width: '68%' }} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/15 to-blue-600/15 border border-blue-500/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-text-primary text-lg">Kitchen Staff</div>
                    <div className="text-sm text-text-muted mt-1">High demand</div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg">24%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-bg-tertiary overflow-hidden shadow-inner" aria-hidden="true">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-sm" style={{ width: '24%' }} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/15 to-green-600/15 border border-green-500/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-text-primary text-lg">Bartenders</div>
                    <div className="text-sm text-text-muted mt-1">Specialty roles</div>
                  </div>
                  <span className="text-2xl font-bold text-green-400 bg-green-500/10 px-4 py-2 rounded-lg">8%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-bg-tertiary overflow-hidden shadow-inner" aria-hidden="true">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full shadow-sm" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-xl transition-all duration-300" onClick={() => console.debug('Open performance metrics')}>
          <CardHeader className="px-8 py-6">
            <CardTitle className="flex items-center gap-4 text-xl font-semibold text-text-primary">
              <Star className="w-6 h-6 text-yellow-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 py-6 pt-0">
            <div className="space-y-5">
              {recentMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-bg-tertiary/50 to-bg-secondary/30 rounded-xl border border-border-color/50 hover:bg-gradient-to-r hover:from-bg-secondary/60 hover:to-bg-tertiary/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] shadow-sm"
                  title={metric.label}
                  aria-label={`${metric.label} value`}
                >
                  <span className="text-text-secondary font-semibold text-lg">{metric.label}</span>
                  <span className={`px-4 py-3 rounded-xl text-base font-bold bg-${metric.color}-500/15 border border-${metric.color}-500/30 text-${metric.color}-400 hover:scale-110 transition-all duration-200 shadow-md`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Card className="glass-card hover:shadow-xl transition-all duration-300" onClick={() => console.debug('Open monthly stats')}>
          <CardHeader className="pb-4 pt-6 px-7">
            <CardTitle className="flex items-center justify-center gap-3 text-lg">
              <Calendar className="w-6 h-6 text-purple-400" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="px-7 pb-7">
            <div className="space-y-6">
              <div className="text-center py-2">
                <div className="text-4xl font-bold text-purple-400 mb-2">12</div>
                <div className="text-sm text-text-muted font-medium">Jobs Posted</div>
              </div>
              <div className="h-24 w-full rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 p-4 flex items-center justify-center">
                <div className="w-full flex items-end justify-between h-16 gap-1">
                  {[3, 5, 4, 7, 6, 8, 9, 6, 10, 8, 12, 11].map((height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-sm flex-1 transition-all duration-500 hover:scale-110 animate-pulse"
                      style={{ 
                        height: `${height * 4}px`,
                        animationDelay: `${i * 100}ms`,
                        minWidth: '6px'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center pt-2">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400 mb-1">8</div>
                  <div className="text-xs text-text-muted font-medium">Successful</div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">4</div>
                  <div className="text-xs text-text-muted font-medium">Pending</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-xl transition-all duration-300" onClick={() => console.debug('Open spend analysis')}>
          <CardHeader className="pb-4 pt-6 px-7">
            <CardTitle className="flex items-center justify-center gap-3 text-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
              Spend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="px-7 pb-7">
            <div className="space-y-6">
              <div className="text-center py-2">
                <div className="text-4xl font-bold text-green-400 mb-2">$2,840</div>
                <div className="text-sm text-text-muted font-medium" title="All costs including platform fees">Total Spent</div>
              </div>
              <div className="h-24 w-full rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 p-4">
                <div className="w-full h-16 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-8 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-pulse" style={{ width: '73%' }}></div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-green-400">$2,840</div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-text-muted">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full flex justify-between">
                    {[2, 4, 3, 6, 5, 8, 7, 9].map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-green-400 rounded-full animate-pulse"
                        style={{ 
                          height: `${height * 2}px`,
                          animationDelay: `${i * 150}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center pt-2">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400 mb-1">$237</div>
                  <div className="text-xs text-text-muted font-medium" title="Average spend per successful hire">Avg per hire</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 mb-1">5%</div>
                  <div className="text-xs text-text-muted font-medium" title="Fee charged by Worksta for transactions">Platform fee</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-xl transition-all duration-300" onClick={() => console.debug('Open top performer profile')}>
          <CardHeader className="pb-4 pt-6 px-7">
            <CardTitle className="flex items-center justify-center gap-3 text-lg">
              <Award className="w-6 h-6 text-yellow-400" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent className="px-7 pb-7">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 opacity-[0.35]" style={{
                background: 'radial-gradient(1200px 300px at 50% -10%, rgba(250,204,21,0.25), transparent 60%)'
              }} />
              <div className="text-center space-y-5 relative z-10 p-6">
                <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl shadow-xl ring-4 ring-yellow-400/20 hover:scale-105 transition-transform duration-300">
                  🏆
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-text-primary text-xl">Alex Chen</div>
                  <div className="text-sm text-text-muted font-medium">Bartender • 5.0 rating • 3 jobs completed</div>
                </div>
                <div className="flex justify-center py-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-lg" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                  <span className="text-xs px-3 py-2 rounded-lg bg-bg-tertiary border border-border-color text-text-secondary font-medium hover:bg-bg-secondary transition-colors">Mixology</span>
                  <span className="text-xs px-3 py-2 rounded-lg bg-bg-tertiary border border-border-color text-text-secondary font-medium hover:bg-bg-secondary transition-colors">Customer Service</span>
                  <span className="text-xs px-3 py-2 rounded-lg bg-bg-tertiary border border-border-color text-text-secondary font-medium hover:bg-bg-secondary transition-colors">Night Shift</span>
                </div>
                <div className="flex justify-center gap-4 pt-3">
                  <button className="btn btn-secondary btn-sm px-4 py-2 hover:scale-105 transition-transform">View Profile</button>
                  <button className="btn btn-primary btn-sm px-4 py-2 hover:scale-105 transition-transform">Message</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card hover:shadow-xl transition-all duration-300" onClick={() => console.debug('Open quick insights')}
        >
        <CardHeader className="pb-5 pt-6 px-7">
          <CardTitle className="flex items-center gap-3 text-lg">
            <PieChart className="w-6 h-6 text-purple-400" />
            Quick Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="px-7 pb-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl mb-3">⚡</div>
              <div className="font-semibold text-text-primary mb-2 text-lg">Fast Hiring</div>
              <div className="text-sm text-text-muted font-medium">Average 2.4 hours response time</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl mb-3">💯</div>
              <div className="font-semibold text-text-primary mb-2 text-lg">High Success</div>
              <div className="text-sm text-text-muted font-medium">87% of applications result in hires</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl mb-3">🎯</div>
              <div className="font-semibold text-text-primary mb-2 text-lg">Quality Workers</div>
              <div className="text-sm text-text-muted font-medium">4.8/5 average worker rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

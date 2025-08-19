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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          📊 Business Analytics
        </h1>
        <p className="text-text-secondary text-lg">
          Track your hiring performance and optimize your recruitment strategy
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Hiring Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">Server Positions</div>
                  <div className="text-sm text-text-muted">Most in-demand role</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-400">68%</div>
                  <div className="text-xs text-text-muted">of total posts</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">Kitchen Staff</div>
                  <div className="text-sm text-text-muted">High demand</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-400">24%</div>
                  <div className="text-xs text-text-muted">of total posts</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">Bartenders</div>
                  <div className="text-sm text-text-muted">Specialty roles</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">8%</div>
                  <div className="text-xs text-text-muted">of total posts</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg">
                  <span className="text-text-secondary">{metric.label}</span>
                  <span className={`font-bold text-${metric.color}-400`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
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

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Spend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">$2,840</div>
                <div className="text-sm text-text-muted">Total Spent</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-purple-400">$237</div>
                  <div className="text-xs text-text-muted">Avg per hire</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-400">5%</div>
                  <div className="text-xs text-text-muted">Platform fee</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto text-2xl">
                🏆
              </div>
              <div>
                <div className="font-bold text-text-primary">Alex Chen</div>
                <div className="text-sm text-text-muted">5.0 rating • 3 jobs completed</div>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
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

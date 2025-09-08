'use client'

import { useState } from 'react'
import { Users, Target, Award, Heart, ArrowRight, Star, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: '👩‍💼',
    bio: 'Former tech executive with 15+ years experience building platforms that connect people.',
    linkedin: '#'
  },
  {
    name: 'Mike Chen',
    role: 'CTO',
    image: '👨‍💻',
    bio: 'Full-stack engineer passionate about creating seamless user experiences.',
    linkedin: '#'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Operations',
    image: '👩‍🎯',
    bio: 'Operations expert focused on scaling businesses and improving efficiency.',
    linkedin: '#'
  },
  {
    name: 'David Kim',
    role: 'Head of Design',
    image: '👨‍🎨',
    bio: 'Design leader creating beautiful, intuitive interfaces that users love.',
    linkedin: '#'
  }
]

const stats = [
  { number: '50K+', label: 'Active Users', icon: '👥' },
  { number: '100K+', label: 'Jobs Completed', icon: '✅' },
  { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
  { number: '24/7', label: 'Support Available', icon: '🛟' }
]

const values = [
  {
    icon: '🤝',
    title: 'Trust & Safety',
    description: 'We verify all users and provide secure payment processing to ensure safe transactions for everyone.'
  },
  {
    icon: '⚡',
    title: 'Speed & Efficiency',
    description: 'Connect with workers quickly and get your tasks done faster than traditional hiring methods.'
  },
  {
    icon: '💰',
    title: 'Fair Pricing',
    description: 'Transparent pricing with no hidden fees. You only pay when the job is completed successfully.'
  },
  {
    icon: '🌟',
    title: 'Quality Work',
    description: 'Our rating system ensures you get high-quality work from experienced, reliable professionals.'
  }
]

export default function About() {
  const [activeTab, setActiveTab] = useState('story')

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              About Worksta
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing how people find work and get things done. 
              Connecting businesses with skilled workers for on-demand tasks.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Join Our Mission
              </Button>
              <Button className="border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-text-primary mb-2">{stat.number}</div>
                <div className="text-text-secondary font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-bg-secondary/50 p-2 rounded-2xl border border-border-color/30">
            <div className="flex space-x-2">
              {[
                { id: 'story', label: '📖 Our Story', icon: '📖' },
                { id: 'mission', label: '🎯 Mission', icon: '🎯' },
                { id: 'team', label: '👥 Team', icon: '👥' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label.split(' ').slice(1).join(' ')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'story' && (
          <div className="space-y-12">
            <Card className="glass-card border border-border-color/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span>📖</span>
                  Our Story
                </h2>
                <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-6">
                  <p>
                    Worksta was born from a simple observation: there are millions of people who need help with everyday tasks, 
                    and millions of skilled workers looking for flexible opportunities. Yet, connecting them was unnecessarily 
                    complicated and expensive.
                  </p>
                  <p>
                    Founded in 2023, we set out to create a platform that makes finding and hiring workers as easy as 
                    ordering food online. We believe that everyone deserves access to reliable help when they need it, 
                    and every worker deserves fair opportunities to earn income on their own terms.
                  </p>
                  <p>
                    Today, Worksta serves thousands of businesses and workers across the country, facilitating everything 
                    from home cleaning and handyman services to event support and delivery tasks. We're proud to be 
                    building a more connected, efficient economy where work gets done faster and better.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Values Section */}
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">💎 Our Values</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{value.icon}</div>
                        <div>
                          <h4 className="text-lg font-semibold text-text-primary mb-2">{value.title}</h4>
                          <p className="text-text-secondary leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mission' && (
          <Card className="glass-card border border-border-color/50">
            <CardContent className="p-8">
              <div className="text-center space-y-8">
                <h2 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                  <span>🎯</span>
                  Our Mission
                </h2>
                <div className="max-w-4xl mx-auto space-y-6">
                  <p className="text-xl text-text-secondary leading-relaxed">
                    To democratize access to work opportunities and make it effortless for people to get help 
                    with their tasks, while empowering workers to build sustainable, flexible careers.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto">
                        <Users className="w-10 h-10 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary">For Businesses</h3>
                      <p className="text-text-secondary">
                        Access to reliable, skilled workers whenever you need them. 
                        No contracts, no overhead, just results.
                      </p>
                    </div>
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                        <Target className="w-10 h-10 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary">For Workers</h3>
                      <p className="text-text-secondary">
                        Flexible earning opportunities that fit your schedule. 
                        Build your reputation and grow your income.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'team' && (
          <div className="space-y-12">
            <Card className="glass-card border border-border-color/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-text-primary mb-8 text-center flex items-center justify-center gap-3">
                  <span>👥</span>
                  Meet Our Team
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <div className="text-6xl mb-4">{member.image}</div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">{member.name}</h3>
                        <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">{member.bio}</p>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                          Connect
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Join Team CTA */}
            <Card className="glass-card border border-border-color/50 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-4">🚀 Join Our Team</h3>
                <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                  We're always looking for talented, passionate people to join our mission. 
                  Help us build the future of work.
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
                  <span>View Open Positions</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

    </div>
  )
}

'use client'

import React from 'react'
import { ArrowLeft, Target, Users, Globe, Zap, Heart, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function About() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="secondary" 
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              About Worksta
            </h1>
            <p className="text-text-muted">Connecting Southeast Asia's gig economy</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Revolutionizing F&B Staffing in Southeast Asia
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
                Worksta bridges the gap between talented gig workers and F&B businesses in need of 
                flexible staffing solutions. Our platform enables real-time connections, making it 
                easier than ever to find the right talent for the right job.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary leading-relaxed">
                  To empower the F&B industry with flexible, reliable staffing solutions while 
                  providing gig workers with meaningful opportunities to build their careers and 
                  earn a sustainable income.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary leading-relaxed">
                  To become Southeast Asia's leading gig economy platform, creating a thriving 
                  ecosystem where businesses and workers can connect, collaborate, and grow together 
                  in the digital age.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                Why Choose Worksta?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Lightning Fast</h4>
                  <p className="text-sm text-text-muted">
                    Find and hire workers in minutes, not days. Our real-time matching system 
                    connects you instantly.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Built for F&B</h4>
                  <p className="text-sm text-text-muted">
                    Designed specifically for the food and beverage industry with features 
                    tailored to your unique needs.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Quality Assured</h4>
                  <p className="text-sm text-text-muted">
                    All workers are verified and rated by the community, ensuring you get 
                    reliable, skilled professionals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-bg-tertiary p-6 rounded-xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    500+
                  </div>
                  <p className="text-sm text-text-muted">Active Businesses</p>
                </div>
                <div className="bg-bg-tertiary p-6 rounded-xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
                    2.5K+
                  </div>
                  <p className="text-sm text-text-muted">Registered Workers</p>
                </div>
                <div className="bg-bg-tertiary p-6 rounded-xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
                    10K+
                  </div>
                  <p className="text-sm text-text-muted">Jobs Completed</p>
                </div>
                <div className="bg-bg-tertiary p-6 rounded-xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent mb-2">
                    4.8★
                  </div>
                  <p className="text-sm text-text-muted">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary mb-6 text-center">
                We're a passionate team of technologists and F&B industry experts committed to 
                transforming how businesses find talent in Southeast Asia.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">AK</span>
                  </div>
                  <h4 className="font-semibold text-text-primary">Alex Kim</h4>
                  <p className="text-sm text-text-muted mb-2">CEO & Co-founder</p>
                  <p className="text-xs text-text-muted">
                    Former F&B operations manager with 10+ years of industry experience
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">SP</span>
                  </div>
                  <h4 className="font-semibold text-text-primary">Sarah Patel</h4>
                  <p className="text-sm text-text-muted mb-2">CTO & Co-founder</p>
                  <p className="text-xs text-text-muted">
                    Tech veteran with expertise in marketplace platforms and mobile apps
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">ML</span>
                  </div>
                  <h4 className="font-semibold text-text-primary">Michael Lee</h4>
                  <p className="text-sm text-text-muted mb-2">Head of Operations</p>
                  <p className="text-xs text-text-muted">
                    Scaling operations across Southeast Asian markets with local expertise
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm">📧</span>
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">Email</p>
                        <p className="text-text-muted text-sm">hello@worksta.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm">📍</span>
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">Address</p>
                        <p className="text-text-muted text-sm">123 Business District<br />Singapore 123456</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm">📞</span>
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">Phone</p>
                        <p className="text-text-muted text-sm">+65 6123 4567</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-4">Business Hours</h4>
                  <div className="bg-bg-tertiary p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Monday - Friday</span>
                        <span className="text-text-primary">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Saturday</span>
                        <span className="text-text-primary">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Sunday</span>
                        <span className="text-text-primary">Closed</span>
                      </div>
                      <hr className="my-2 border-border-color" />
                      <p className="text-xs text-text-muted">
                        Platform support available 24/7 through our help center
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

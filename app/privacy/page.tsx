'use client'

import React from 'react'
import { ArrowLeft, Shield, Eye, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-text-muted">Last updated: January 2024</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary leading-relaxed">
                At Worksta, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our platform that connects 
                F&B businesses with gig workers across Southeast Asia.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Personal Information</h4>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>Name, email address, and phone number</li>
                  <li>Business information (for business accounts)</li>
                  <li>Work experience and skills (for worker accounts)</li>
                  <li>Profile photos and avatars</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Usage Information</h4>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>Job posting and application data</li>
                  <li>Communication between users</li>
                  <li>Platform usage analytics</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Primary Uses</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Facilitate job matching and applications</li>
                    <li>• Process payments and transactions</li>
                    <li>• Provide customer support</li>
                    <li>• Send important notifications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Secondary Uses</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Improve our services</li>
                    <li>• Prevent fraud and abuse</li>
                    <li>• Comply with legal requirements</li>
                    <li>• Marketing (with consent)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-bg-tertiary p-4 rounded-lg">
                  <h5 className="font-semibold text-text-primary mb-2">Encryption</h5>
                  <p className="text-sm text-text-muted">All data transmitted is encrypted using industry-standard protocols</p>
                </div>
                <div className="bg-bg-tertiary p-4 rounded-lg">
                  <h5 className="font-semibold text-text-primary mb-2">Access Control</h5>
                  <p className="text-sm text-text-muted">Strict access controls limit who can view your information</p>
                </div>
                <div className="bg-bg-tertiary p-4 rounded-lg">
                  <h5 className="font-semibold text-text-primary mb-2">Regular Audits</h5>
                  <p className="text-sm text-text-muted">We regularly audit our security practices and systems</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-text-secondary">
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center mt-0.5">
                        <span className="text-blue-400 text-sm">•</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-text-primary">Access</h5>
                        <p className="text-sm text-text-muted">Request copies of your personal data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center mt-0.5">
                        <span className="text-blue-400 text-sm">•</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-text-primary">Rectification</h5>
                        <p className="text-sm text-text-muted">Request correction of inaccurate data</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center mt-0.5">
                        <span className="text-blue-400 text-sm">•</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-text-primary">Erasure</h5>
                        <p className="text-sm text-text-muted">Request deletion of your data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center mt-0.5">
                        <span className="text-blue-400 text-sm">•</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-text-primary">Portability</h5>
                        <p className="text-sm text-text-muted">Request transfer of your data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-bg-tertiary p-4 rounded-lg">
                <div className="space-y-2">
                  <p className="text-text-primary"><strong>Email:</strong> privacy@worksta.com</p>
                  <p className="text-text-primary"><strong>Address:</strong> 123 Business District, Singapore 123456</p>
                  <p className="text-text-primary"><strong>Phone:</strong> +65 6123 4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

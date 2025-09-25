'use client'

import React from 'react'
import { ArrowLeft, FileText, Users, Gavel, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="text-text-muted">Last updated: January 2024</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary leading-relaxed">
                By accessing and using Worksta, you accept and agree to be bound by the terms and 
                provision of this agreement. These Terms of Service govern your use of our platform 
                that connects F&B businesses with gig workers across Southeast Asia.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-3">For Businesses</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Provide accurate job descriptions and requirements</li>
                  <li>• Pay workers according to agreed terms</li>
                  <li>• Maintain a safe working environment</li>
                  <li>• Comply with local labor laws and regulations</li>
                  <li>• Provide timely feedback on applications</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-3">For Workers</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Provide accurate skills and experience information</li>
                  <li>• Fulfill job commitments as agreed</li>
                  <li>• Maintain professional conduct</li>
                  <li>• Report any issues or concerns promptly</li>
                  <li>• Respect business property and guidelines</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Acceptable Use</h4>
                <p className="text-text-secondary mb-3">
                  You agree to use Worksta only for lawful purposes and in accordance with these Terms.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h5 className="font-medium text-green-400 mb-2">✓ Allowed Activities</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Posting legitimate job opportunities</li>
                    <li>• Applying for suitable positions</li>
                    <li>• Professional communication</li>
                    <li>• Providing honest feedback and reviews</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h5 className="font-medium text-red-400 mb-2">✗ Prohibited Activities</h5>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Posting false or misleading information</li>
                  <li>• Harassment or discriminatory behavior</li>
                  <li>• Attempting to circumvent platform fees</li>
                  <li>• Sharing contact information before hiring</li>
                  <li>• Any illegal or unethical activities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Gavel className="w-4 h-4 text-white" />
                </div>
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Service Fees</h4>
                  <div className="space-y-3">
                    <div className="bg-bg-tertiary p-3 rounded-lg">
                      <p className="text-sm font-medium text-text-primary">Business Accounts</p>
                      <p className="text-xs text-text-muted">5% fee on successful hires</p>
                    </div>
                    <div className="bg-bg-tertiary p-3 rounded-lg">
                      <p className="text-sm font-medium text-text-primary">Worker Accounts</p>
                      <p className="text-xs text-text-muted">3% fee on completed jobs</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Payment Processing</h4>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    <li>• Payments processed securely through our platform</li>
                    <li>• Funds held in escrow until job completion</li>
                    <li>• Automatic release after successful completion</li>
                    <li>• Dispute resolution available if needed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <p className="text-yellow-400 font-medium mb-2">Important Notice</p>
                <p className="text-text-secondary text-sm">
                  Worksta acts as a platform to connect businesses and workers. We are not responsible 
                  for the actions, conduct, or quality of work provided by users.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Platform Limitations</h4>
                  <ul className="space-y-1 text-text-secondary text-sm">
                    <li>• We do not guarantee job availability or hiring success</li>
                    <li>• We are not liable for disputes between users</li>
                    <li>• Service may be interrupted for maintenance or updates</li>
                    <li>• Users are responsible for their own tax obligations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Maximum Liability</h4>
                  <p className="text-text-secondary text-sm">
                    Our maximum liability to any user shall not exceed the total fees paid by that 
                    user in the 12 months preceding the claim.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-text-secondary">
                  We encourage users to resolve disputes amicably. If direct resolution is not possible:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-bg-tertiary p-4 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                    <h5 className="font-medium text-text-primary mb-1">Contact Support</h5>
                    <p className="text-xs text-text-muted">Report the issue through our platform</p>
                  </div>
                  <div className="bg-bg-tertiary p-4 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-400 font-bold">2</span>
                    </div>
                    <h5 className="font-medium text-text-primary mb-1">Mediation</h5>
                    <p className="text-xs text-text-muted">We facilitate discussion between parties</p>
                  </div>
                  <div className="bg-bg-tertiary p-4 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-400 font-bold">3</span>
                    </div>
                    <h5 className="font-medium text-text-primary mb-1">Resolution</h5>
                    <p className="text-xs text-text-muted">Final decision made within 7 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Users will be notified of 
                significant changes via email or platform notification. Continued use of the platform 
                after changes constitutes acceptance of the new terms.
              </p>
              
              <div className="bg-bg-tertiary p-4 rounded-lg">
                <h5 className="font-semibold text-text-primary mb-2">Contact Information</h5>
                <div className="space-y-1 text-sm">
                  <p className="text-text-secondary"><strong>Email:</strong> legal@worksta.com</p>
                  <p className="text-text-secondary"><strong>Address:</strong> 123 Business District, Singapore 123456</p>
                  <p className="text-text-secondary"><strong>Phone:</strong> +65 6123 4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

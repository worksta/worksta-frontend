'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Search,
  ChevronRight,
  Book,
  Video,
  FileText,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'

export function HelpSupportPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqCategories = [
    { id: 'all', label: 'All Topics', icon: Book },
    { id: 'getting-started', label: 'Getting Started', icon: Users },
    { id: 'jobs', label: 'Finding Jobs', icon: Search },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CheckCircle },
    { id: 'account', label: 'Account Settings', icon: Users }
  ]

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I create a compelling worker profile?',
      answer: 'A great profile includes a professional photo, detailed work experience, relevant skills, and positive reviews. Make sure to highlight your F&B experience and availability.'
    },
    {
      category: 'jobs',
      question: 'How do I find jobs that match my skills?',
      answer: 'Use our smart job search filters to find opportunities based on location, pay rate, job type, and required skills. Set up job alerts to get notified of new opportunities.'
    },
    {
      category: 'applications',
      question: 'How long does it take to hear back from employers?',
      answer: 'Most employers respond within 24-48 hours. You can track your application status in the "My Applications" section of your dashboard.'
    },
    {
      category: 'payments',
      question: 'When and how do I get paid?',
      answer: 'Payments are processed within 24 hours of job completion. You can receive payments via bank transfer, PayNow, or GrabPay depending on your preferences.'
    },
    {
      category: 'account',
      question: 'How do I update my availability?',
      answer: 'Go to your Profile Settings and update your availability schedule. This helps employers know when you\'re available for work.'
    },
    {
      category: 'jobs',
      question: 'What should I do if I need to cancel a job?',
      answer: 'Contact the employer immediately through the app. Frequent cancellations may affect your rating, so only cancel in emergencies.'
    }
  ]

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs.filter(faq => faq.category === selectedCategory && (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase())))

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'from-[#A259FF] to-[#8B5CF6]',
      available: '24/7',
      action: 'Start Chat'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      color: 'from-[#2D9CFF] to-[#1e40af]',
      available: 'Response in 2-4 hours',
      action: 'Send Email'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our team',
      icon: Phone,
      color: 'from-[#22c55e] to-[#16a34a]',
      available: 'Mon-Fri 9AM-6PM',
      action: 'Call Now'
    }
  ]

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#A259FF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2D9CFF]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#A259FF]/5 to-[#2D9CFF]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Premium Header Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-[26px] p-8 border border-white/10 relative overflow-hidden"
          style={{
            boxShadow: `
              0 32px 64px rgba(0, 0, 0, 0.4),
              0 16px 32px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[26px]"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#A259FF] to-[#2D9CFF] flex items-center justify-center mx-auto mb-4"
              style={{ boxShadow: '0 8px 32px rgba(162, 89, 255, 0.3)' }}
            >
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-[32px] font-black text-white mb-2 tracking-[0.02em]">
              Help & Support
            </h1>
            <p className="text-[#c0c0c0] text-[16px] max-w-md mx-auto">
              We're here to help you succeed on Worksta. Find answers or get in touch with our support team.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-[20px] p-6 border border-white/10"
          style={{
            boxShadow: `
              0 16px 32px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-white/8 to-white/4 border border-white/10 rounded-[16px] text-white placeholder-[#999999] text-[16px] focus:outline-none focus:border-[#A259FF] focus:ring-2 focus:ring-[#A259FF]/25 transition-all duration-300"
              style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.05)' }}
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <div key={index} 
                className="bg-white/5 backdrop-blur-xl rounded-[20px] p-6 border border-white/10 relative overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: `
                    0 16px 32px rgba(0, 0, 0, 0.3),
                    0 8px 16px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color.replace('from-', 'from-').replace('to-', 'to-')}/10 pointer-events-none rounded-[20px]`}></div>
                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto mb-4`}
                    style={{ boxShadow: '0 4px 16px rgba(162, 89, 255, 0.2)' }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-[#c0c0c0] text-sm mb-3">{option.description}</p>
                  <div className="flex items-center justify-center gap-2 text-[#A259FF] text-sm mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{option.available}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/20 text-white font-medium py-2 px-4 rounded-[12px] text-[14px] transition-all duration-300">
                    {option.action}
                  </button>
                </div>
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-[24px] p-8 border border-white/10 relative overflow-hidden"
          style={{
            boxShadow: `
              0 24px 48px rgba(0, 0, 0, 0.3),
              0 12px 24px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-[24px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-[24px] font-bold text-white mb-6">Frequently Asked Questions</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {faqCategories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-[#A259FF]/20 to-[#2D9CFF]/20 border border-[#A259FF]/30 text-white'
                        : 'bg-gradient-to-r from-white/5 to-white/3 border border-white/10 text-[#c0c0c0] hover:border-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                )
              })}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/3 rounded-[16px] border border-white/10 cursor-pointer hover:border-white/20 transition-all duration-300">
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-[#A259FF] transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="mt-2 p-4 bg-gradient-to-r from-white/3 to-white/2 rounded-[16px] border border-white/5">
                    <p className="text-[#c0c0c0] leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-[#666] mx-auto mb-4" />
                <p className="text-[#c0c0c0]">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

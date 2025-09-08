'use client'

import { useState } from 'react'
import { Search, MessageCircle, Phone, Mail, ChevronDown, ChevronRight, Star, Clock, Users, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I post a job on Worksta?',
    answer: 'To post a job, go to your business dashboard and click "Post a Gig". Fill out the job details including title, description, location, pay rate, and requirements. Your job will be visible to workers immediately after posting.',
    category: 'posting'
  },
  {
    id: '2',
    question: 'How much does it cost to post a job?',
    answer: 'Posting jobs on Worksta is completely free! You only pay when you hire someone and complete the work. We charge a small service fee only after successful job completion.',
    category: 'pricing'
  },
  {
    id: '3',
    question: 'How do I find reliable workers?',
    answer: 'All workers on Worksta are verified and rated by previous employers. You can view their profiles, ratings, reviews, and work history before making a hiring decision. Look for workers with high ratings and positive reviews.',
    category: 'hiring'
  },
  {
    id: '4',
    question: 'What if I\'m not satisfied with the work?',
    answer: 'We have a satisfaction guarantee. If you\'re not happy with the work, contact our support team within 24 hours. We\'ll work with you and the worker to resolve the issue or provide a refund if necessary.',
    category: 'support'
  },
  {
    id: '5',
    question: 'How do payments work?',
    answer: 'Payments are processed securely through our platform. You can pay by credit card, debit card, or bank transfer. Payment is only released to the worker after you confirm the job is completed satisfactorily.',
    category: 'payments'
  },
  {
    id: '6',
    question: 'Can I cancel a job after posting?',
    answer: 'Yes, you can cancel a job anytime before a worker is hired. If you need to cancel after hiring, please contact the worker directly and our support team if needed.',
    category: 'posting'
  },
  {
    id: '7',
    question: 'How do I contact a worker?',
    answer: 'Once you receive applications, you can message workers directly through our platform. All communication is tracked for your safety and security.',
    category: 'communication'
  },
  {
    id: '8',
    question: 'What types of jobs can I post?',
    answer: 'You can post various types of jobs including cleaning, handyman work, delivery, pet care, tutoring, event help, and more. Jobs must be legal and comply with our terms of service.',
    category: 'posting'
  }
]

const categories = [
  { id: 'all', name: 'All Topics', icon: '📚' },
  { id: 'posting', name: 'Posting Jobs', icon: '📝' },
  { id: 'hiring', name: 'Hiring Workers', icon: '👥' },
  { id: 'payments', name: 'Payments', icon: '💳' },
  { id: 'support', name: 'Support', icon: '🛟' },
  { id: 'communication', name: 'Communication', icon: '💬' }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              🆘 Help Center
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Get answers to your questions and learn how to make the most of Worksta. 
              We're here to help you succeed!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-text-muted w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-lg placeholder:text-text-muted"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card border border-border-color/50 sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <span>📂</span>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* Quick Contact */}
                <div className="mt-8 pt-6 border-t border-border-color/30">
                  <h4 className="text-md font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <span>📞</span>
                    Need More Help?
                  </h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                      <MessageCircle className="w-5 h-5" />
                      Live Chat
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      Email Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">24/7 Support</h3>
                  <p className="text-text-secondary text-sm">Get help anytime, anywhere</p>
                </CardContent>
              </Card>
              <Card className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Expert Team</h3>
                  <p className="text-text-secondary text-sm">Knowledgeable support staff</p>
                </CardContent>
              </Card>
              <Card className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Secure Platform</h3>
                  <p className="text-text-secondary text-sm">Your data is protected</p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="glass-card border border-border-color/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">❓ Frequently Asked Questions</h2>
                  <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                    {filteredFAQs.length} results
                  </div>
                </div>
                
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No results found</h3>
                    <p className="text-text-secondary">Try adjusting your search or browse different categories</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-border-color/30 rounded-xl overflow-hidden hover:border-border-color/50 transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full text-left p-6 hover:bg-bg-tertiary/30 transition-all duration-300 flex items-center justify-between group"
                        >
                          <span className="font-semibold text-text-primary group-hover:text-purple-400 transition-colors">
                            {faq.question}
                          </span>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFAQ === faq.id ? (
                              <ChevronDown className="w-5 h-5 text-text-muted transition-transform duration-300" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-text-muted transition-transform duration-300" />
                            )}
                          </div>
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-border-color/20 bg-bg-tertiary/20">
                            <div className="pt-4">
                              {faq.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="glass-card border border-border-color/50 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-4">💬 Still Need Help?</h3>
                <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is here to help you with any questions or issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    Start Live Chat
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    Call Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
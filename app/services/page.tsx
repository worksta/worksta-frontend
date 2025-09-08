'use client'

import { useState } from 'react'
import { Home, Wrench, Truck, Heart, GraduationCap, Calendar, Star, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const serviceCategories = [
  {
    id: 'home',
    name: 'Home Services',
    icon: '🏠',
    color: 'from-blue-500 to-cyan-500',
    description: 'Professional home maintenance and improvement services',
    services: [
      { name: 'House Cleaning', price: '$25-50/hr', rating: 4.9, icon: '🧹' },
      { name: 'Plumbing', price: '$40-80/hr', rating: 4.8, icon: '🔧' },
      { name: 'Electrical Work', price: '$45-90/hr', rating: 4.9, icon: '⚡' },
      { name: 'Painting', price: '$30-60/hr', rating: 4.7, icon: '🎨' },
      { name: 'Gardening', price: '$20-40/hr', rating: 4.8, icon: '🌱' },
      { name: 'Handyman', price: '$35-70/hr', rating: 4.8, icon: '🔨' }
    ]
  },
  {
    id: 'delivery',
    name: 'Delivery & Transport',
    icon: '🚚',
    color: 'from-green-500 to-emerald-500',
    description: 'Fast and reliable delivery and transportation services',
    services: [
      { name: 'Food Delivery', price: '$15-25/hr', rating: 4.9, icon: '🍕' },
      { name: 'Package Delivery', price: '$18-30/hr', rating: 4.8, icon: '📦' },
      { name: 'Moving Help', price: '$25-45/hr', rating: 4.7, icon: '📦' },
      { name: 'Grocery Shopping', price: '$20-35/hr', rating: 4.8, icon: '🛒' },
      { name: 'Furniture Assembly', price: '$30-50/hr', rating: 4.9, icon: '🪑' },
      { name: 'Pickup & Drop-off', price: '$20-40/hr', rating: 4.8, icon: '🚗' }
    ]
  },
  {
    id: 'personal',
    name: 'Personal Care',
    icon: '💆',
    color: 'from-purple-500 to-pink-500',
    description: 'Personal care and wellness services at your convenience',
    services: [
      { name: 'Pet Sitting', price: '$20-40/hr', rating: 4.9, icon: '🐕' },
      { name: 'Elderly Care', price: '$25-50/hr', rating: 4.9, icon: '👵' },
      { name: 'Babysitting', price: '$15-30/hr', rating: 4.8, icon: '👶' },
      { name: 'Personal Training', price: '$40-80/hr', rating: 4.8, icon: '💪' },
      { name: 'Massage Therapy', price: '$50-100/hr', rating: 4.9, icon: '💆' },
      { name: 'Hair & Beauty', price: '$30-80/hr', rating: 4.7, icon: '💄' }
    ]
  },
  {
    id: 'events',
    name: 'Events & Hospitality',
    icon: '🎉',
    color: 'from-orange-500 to-red-500',
    description: 'Professional event support and hospitality services',
    services: [
      { name: 'Event Staff', price: '$20-40/hr', rating: 4.8, icon: '🎪' },
      { name: 'Catering Help', price: '$18-35/hr', rating: 4.7, icon: '🍽️' },
      { name: 'Photography', price: '$50-150/hr', rating: 4.9, icon: '📸' },
      { name: 'DJ Services', price: '$75-200/hr', rating: 4.8, icon: '🎵' },
      { name: 'Event Planning', price: '$40-100/hr', rating: 4.9, icon: '📋' },
      { name: 'Security', price: '$25-50/hr', rating: 4.8, icon: '🛡️' }
    ]
  },
  {
    id: 'business',
    name: 'Business Services',
    icon: '💼',
    color: 'from-indigo-500 to-purple-500',
    description: 'Professional business and administrative support',
    services: [
      { name: 'Data Entry', price: '$15-30/hr', rating: 4.8, icon: '⌨️' },
      { name: 'Virtual Assistant', price: '$20-45/hr', rating: 4.9, icon: '💻' },
      { name: 'Bookkeeping', price: '$25-60/hr', rating: 4.8, icon: '📊' },
      { name: 'Content Writing', price: '$30-80/hr', rating: 4.9, icon: '✍️' },
      { name: 'Social Media', price: '$25-55/hr', rating: 4.7, icon: '📱' },
      { name: 'Customer Service', price: '$18-35/hr', rating: 4.8, icon: '📞' }
    ]
  },
  {
    id: 'education',
    name: 'Education & Tutoring',
    icon: '📚',
    color: 'from-teal-500 to-blue-500',
    description: 'Expert tutoring and educational support services',
    services: [
      { name: 'Math Tutoring', price: '$25-60/hr', rating: 4.9, icon: '🔢' },
      { name: 'Language Lessons', price: '$20-50/hr', rating: 4.8, icon: '🗣️' },
      { name: 'Music Lessons', price: '$30-70/hr', rating: 4.9, icon: '🎵' },
      { name: 'Test Prep', price: '$35-80/hr', rating: 4.8, icon: '📝' },
      { name: 'Computer Skills', price: '$25-55/hr', rating: 4.7, icon: '💻' },
      { name: 'Art Classes', price: '$20-50/hr', rating: 4.8, icon: '🎨' }
    ]
  }
]

const features = [
  {
    icon: '⚡',
    title: 'Instant Booking',
    description: 'Book services in minutes and get matched with available workers instantly.'
  },
  {
    icon: '🛡️',
    title: 'Verified Workers',
    description: 'All workers are background-checked and verified for your safety and peace of mind.'
  },
  {
    icon: '💳',
    title: 'Secure Payments',
    description: 'Safe and secure payment processing with multiple payment options available.'
  },
  {
    icon: '⭐',
    title: 'Quality Guarantee',
    description: 'Satisfaction guaranteed or your money back. We stand behind our workers.'
  },
  {
    icon: '📱',
    title: 'Real-time Tracking',
    description: 'Track your worker\'s arrival and progress in real-time through our app.'
  },
  {
    icon: '🎯',
    title: 'Perfect Matches',
    description: 'Our AI matches you with the best workers based on your specific needs.'
  }
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('home')
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const currentCategory = serviceCategories.find(cat => cat.id === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              🛠️ Our Services
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              From home maintenance to personal care, find skilled professionals for any task. 
              Quality work, fair prices, guaranteed satisfaction.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Book a Service
              </Button>
              <Button className="border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Become a Worker
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">✨ Why Choose Worksta?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">🎯 Service Categories</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50 border border-border-color/30'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Category Content */}
          {currentCategory && (
            <div className="space-y-8">
              <Card className="glass-card border border-border-color/50">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{currentCategory.icon}</div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{currentCategory.name}</h3>
                    <p className="text-text-secondary max-w-2xl mx-auto">{currentCategory.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCategory.services.map((service, index) => (
                      <div 
                        key={index}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredService(service.name)}
                        onMouseLeave={() => setHoveredService(null)}
                      >
                        <Card className="glass-card border border-border-color/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <CardContent className="p-6">
                            <div className="text-center space-y-4">
                              <div className="text-4xl">{service.icon}</div>
                              <h4 className="text-lg font-semibold text-text-primary">{service.name}</h4>
                              <div className="flex items-center justify-center gap-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-text-secondary font-medium">{service.rating}</span>
                              </div>
                              <div className="text-purple-400 font-bold text-lg">{service.price}</div>
                              <Button 
                                className={`w-full rounded-xl font-semibold transition-all duration-300 ${
                                  hoveredService === service.name
                                    ? `bg-gradient-to-r ${currentCategory.color} text-white shadow-lg scale-105`
                                    : 'border border-border-color/50 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50'
                                }`}
                              >
                                Book Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* How It Works */}
        <Card className="glass-card border border-border-color/50 mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">🚀 How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Choose Service', description: 'Select the service you need from our categories', icon: '🎯' },
                { step: '2', title: 'Get Matched', description: 'We find the perfect worker for your specific needs', icon: '🤝' },
                { step: '3', title: 'Book & Pay', description: 'Schedule your service and pay securely through our platform', icon: '💳' },
                { step: '4', title: 'Get It Done', description: 'Enjoy quality work completed by verified professionals', icon: '✅' }
              ].map((step, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="text-sm font-bold text-purple-400 mb-2">STEP {step.step}</div>
                  <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="glass-card border border-border-color/50 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold text-text-primary mb-4">🎉 Ready to Get Started?</h3>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied customers who trust Worksta for their service needs. 
              Quality work, fair prices, guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                <span>Book Your First Service</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button className="border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { X, Info, Clipboard, ChevronDown } from 'lucide-react'

interface PostJobModalProps {
  onClose: () => void
}

export function PostJobModal({ onClose }: PostJobModalProps) {
  const { user } = useAuth()
  const { addJob } = useApp()
  const [loading, setLoading] = useState(false)
  const [showGuide, setShowGuide] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    pay: '',
    payType: 'hourly' as 'hourly' | 'fixed',
    date: '',
    time: '',
    duration: '',
    requirements: ['']
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const helperId = 'gig-posting-helper'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.location) newErrors.location = 'Location is required'
    if (!formData.pay) newErrors.pay = 'Pay is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (!formData.duration) newErrors.duration = 'Duration is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    addJob({
      businessId: user?.id || '',
      businessName: user?.name || '',
      title: formData.title,
      description: formData.description,
      location: formData.location,
      pay: parseFloat(formData.pay),
      payType: formData.payType,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      status: 'active',
      requirements: formData.requirements.filter(req => req.trim() !== '')
    })

    setLoading(false)
    onClose()
  }

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-effect border border-border-color rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl bg-gradient-to-br from-bg-primary via-bg-primary to-bg-secondary/50">
        <div className="relative p-8 border-b border-border-color/50 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                🚀 Post a New Gig
              </h2>
              <p className="text-text-secondary">Connect with talented workers in your area</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-bg-tertiary/50 rounded-xl transition-all duration-300 hover:scale-110 border border-border-color/30"
            >
              <X className="w-6 h-6 text-text-muted hover:text-text-primary transition-colors" />
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-t-2xl"></div>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="w-full flex items-center justify-between px-6 py-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl text-left hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
              aria-expanded={showGuide}
              aria-controls={helperId}
            >
              <span className="flex items-center gap-4 text-text-secondary group-hover:text-text-primary transition-colors">
                <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <Info className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-lg font-semibold">💡 How to write a great gig</span>
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showGuide ? 'rotate-180' : ''}`} />
            </button>
            {showGuide && (
              <div id={helperId} className="mt-4 p-5 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-sm text-text-secondary space-y-3">
                <p className="text-text-secondary">
                  Please fill out the details below to create a clear and comprehensive gig posting that attracts the right candidates for your F&B role. Be as specific as possible to set expectations and help candidates self-assess fit:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><span className="text-text-primary font-medium">Job Title</span>: The name of the role you want to fill (e.g., Barista, Kitchen Helper).</li>
                  <li><span className="text-text-primary font-medium">Description & Responsibilities</span>: Outline main tasks and duties involved.</li>
                  <li><span className="text-text-primary font-medium">Location</span>: Where the job will take place (address or region).</li>
                  <li><span className="text-text-primary font-medium">Pay Amount & Type</span>: Specify the salary and whether it's hourly, fixed, or includes tips.</li>
                  <li><span className="text-text-primary font-medium">Date & Time</span>: When the gig starts and its expected duration or schedule type.</li>
                  <li><span className="text-text-primary font-medium">Requirements & Skills</span>: List mandatory certifications, experience level, and special skills.</li>
                  <li><span className="text-text-primary font-medium">Shift Details</span>: Include breaks, physical demands, equipment provided, and any special conditions.</li>
                  <li><span className="text-text-primary font-medium">Additional Info</span>: Benefits offered, cancellation policy, contact details, and application deadline.</li>
                  <li><span className="text-text-primary font-medium">Attachments</span>: Upload any supporting documents or flyers to provide more context.</li>
                </ul>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`Please fill out the details below to create a clear and comprehensive gig posting that attracts the right candidates for your F&B role. Be as specific as possible to set expectations and help candidates self-assess fit:\n\nJob Title: The name of the role you want to fill (e.g., Barista, Kitchen Helper).\n\nDescription & Responsibilities: Outline main tasks and duties involved.\n\nLocation: Where the job will take place (address or region).\n\nPay Amount & Type: Specify the salary and whether it's hourly, fixed, or includes tips.\n\nDate & Time: When the gig starts and its expected duration or schedule type.\n\nRequirements & Skills: List mandatory certifications, experience level, and special skills.\n\nShift Details: Include breaks, physical demands, equipment provided, and any special conditions.\n\nAdditional Info: Benefits offered, cancellation policy, contact details, and application deadline.\n\nAttachments: Upload any supporting documents or flyers to provide more context.\n\nThis detailed information ensures your posting clearly communicates the job and helps you find the best gig workers for your F&B business.`)
                    }}
                    aria-label="Copy helper text"
                  >
                    <Clipboard className="w-4 h-4" /> Copy prompt
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      description: prev.description?.trim() ? prev.description : `Description & Responsibilities:\n- Main tasks:\n- Duties:\n\nRequirements & Skills:\n- Certifications:\n- Experience level:\n- Special skills:\n\nShift Details:\n- Breaks:\n- Physical demands:\n- Equipment provided:\n- Special conditions:\n\nAdditional Info:\n- Benefits:\n- Cancellation policy:\n- Contact details:\n- Application deadline:`
                    }))}
                  >
                    Use template
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-auto max-h-[calc(85vh-60px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Job Title *
              </label>
              <div className="relative">
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  error={errors.title}
                  placeholder="e.g., Evening Server Needed"
                  className="px-6 py-4 text-lg border-2 border-border-color/50 focus:ring-purple-500/50 focus:border-purple-500/50 rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Description *
              </label>
              <div className="relative">
                <textarea
                  id="job-description"
                  className="w-full px-6 py-4 rounded-xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none placeholder:text-text-muted"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the job in detail. What needs to be done? Any specific requirements? Be as detailed as possible to attract the right candidates."
                  rows={5}
                  aria-describedby={helperId}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 pointer-events-none"></div>
              </div>
              <div className="text-sm text-text-muted flex items-center gap-2">
                <span>💡 Tip: Include specific tasks, timeline, and any special requirements</span>
              </div>
              {errors.description && (
                <p className="text-sm text-red-400 mt-1">{errors.description}</p>
              )}
            </div>

            <div className="lg:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Location *
              </label>
              <div className="relative">
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  error={errors.location}
                  placeholder="e.g., Orchard Road, Singapore, or 'Remote'"
                  className="px-6 py-4 text-lg border-2 border-border-color/50 focus:ring-green-500/50 focus:border-green-500/50 rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Pay Amount *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted text-lg font-semibold">$</div>
                <input
                  type="number"
                  value={formData.pay}
                  onChange={(e) => setFormData(prev => ({ ...prev, pay: e.target.value }))}
                  className="w-full pl-10 pr-6 py-4 rounded-xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 text-lg placeholder:text-text-muted"
                  placeholder="25.00"
                  min="0"
                  step="0.01"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/5 to-orange-500/5 pointer-events-none"></div>
              </div>
              {errors.pay && (
                <p className="text-sm text-red-400 mt-1">{errors.pay}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                Pay Type *
              </label>
              <div className="relative">
                <select
                  value={formData.payType}
                  onChange={(e) => setFormData(prev => ({ ...prev, payType: e.target.value as 'hourly' | 'fixed' }))}
                  className="w-full px-6 py-4 rounded-xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 text-lg appearance-none cursor-pointer"
                  required
                >
                  <option value="hourly">💰 Per Hour</option>
                  <option value="fixed">💵 Fixed Amount</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-text-muted" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/5 to-red-500/5 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-6 py-4 rounded-xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 text-lg"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-rose-500/5 pointer-events-none"></div>
              </div>
              {errors.date && (
                <p className="text-sm text-red-400 mt-1">{errors.date}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                Start Time *
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-6 py-4 rounded-xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 text-lg"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
              </div>
              {errors.time && (
                <p className="text-sm text-red-400 mt-1">{errors.time}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                Duration *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-6 py-4 rounded-xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-lg placeholder:text-text-muted"
                  placeholder="e.g., 5 hours, Full day, 2-3 days"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
              </div>
              {errors.duration && (
                <p className="text-sm text-red-400 mt-1">{errors.duration}</p>
              )}
              <div className="text-sm text-text-muted flex items-center gap-2">
                <span>⏱️ Tip: Be specific about expected work duration</span>
              </div>
            </div>

            <div></div>

            <div className="lg:col-span-2 space-y-4">
              <label className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Requirements & Skills
              </label>
              <div className="space-y-4">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-3 group">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        className="w-full px-6 py-4 rounded-xl border-2 border-border-color/50 bg-bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 placeholder:text-text-muted"
                        placeholder="e.g., Must have own cleaning supplies, 2+ years experience"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 pointer-events-none"></div>
                    </div>
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="p-4 text-red-400 hover:text-red-300 hover:bg-red-400/20 rounded-xl transition-all duration-300 border border-red-400/30 hover:border-red-400/50 hover:scale-105"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="w-full px-6 py-4 border-2 border-dashed border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-medium hover:scale-[1.02]"
                >
                  <div className="p-1 rounded-lg bg-emerald-500/20">
                    <span className="text-lg">+</span>
                  </div>
                  Add Requirement
                </button>
              </div>
              <div className="text-sm text-text-muted flex items-center gap-2">
                <span>💡 Tip: Add specific skills, tools, or experience needed for the job</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 mt-8 pt-5 border-t border-border-color/50">
            <div className="sticky bottom-0 bg-gradient-to-r from-bg-primary via-bg-primary to-bg-secondary/30 border-t border-border-color/50 p-8 rounded-b-xl">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-sm text-text-muted flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Your job will be visible to workers immediately after posting</span>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="px-8 py-4 rounded-xl border-2 border-border-color/50 text-text-secondary hover:text-text-primary hover:border-border-color transition-all duration-300 font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <span>🚀</span>
                        <span>Post Job</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect border border-border-color rounded-xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-border-color/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">✨ Post a New Gig</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-tertiary rounded-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="w-full flex items-center justify-between px-4 py-3 bg-bg-tertiary border border-border-color rounded-lg text-left hover:bg-bg-card transition-colors"
              aria-expanded={showGuide}
              aria-controls={helperId}
            >
              <span className="flex items-center gap-2 text-text-secondary"><Info className="w-4 h-4 text-purple-400" /> How to write a great gig</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showGuide ? 'rotate-180' : ''}`} />
            </button>
            {showGuide && (
              <div id={helperId} className="mt-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-sm text-text-secondary space-y-2">
                <p className="text-text-secondary">
                  Please fill out the details below to create a clear and comprehensive gig posting that attracts the right candidates for your F&B role. Be as specific as possible to set expectations and help candidates self-assess fit:
                </p>
                <ul className="list-disc ml-6 space-y-1">
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
                <div className="flex gap-2 pt-1">
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

        <form onSubmit={handleSubmit} className="p-4 overflow-auto max-h-[calc(85vh-60px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <Input
                label="Job Title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                error={errors.title}
                placeholder="e.g., Evening Server Needed"
                className="px-5px"
              />
            </div>

            <div className="lg:col-span-2">
              <div className="form-group">
                <label className="form-label" htmlFor="job-description">Description</label>
                <textarea
                  id="job-description"
                  className="form-input form-textarea px-5px py-5px"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the job, requirements, and expectations..."
                  rows={3}
                  aria-describedby={helperId}
                />
                {errors.description && (
                  <p className="text-sm text-red-400 mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                error={errors.location}
                placeholder="e.g., Orchard Road, Singapore"
                className="px-5px"
              />
            </div>

            <Input
              label="Pay Amount"
              type="number"
              value={formData.pay}
              onChange={(e) => setFormData(prev => ({ ...prev, pay: e.target.value }))}
              error={errors.pay}
              placeholder="0"
              className="px-5px"
            />

            <div className="form-group">
              <label className="form-label">Pay Type</label>
              <select
                className="form-input form-select px-5px py-5px"
                value={formData.payType}
                onChange={(e) => setFormData(prev => ({ ...prev, payType: e.target.value as 'hourly' | 'fixed' }))}
              >
                <option value="hourly">Per Hour</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              error={errors.date}
              className="px-5px"
            />

            <Input
              label="Start Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              error={errors.time}
              className="px-5px"
            />

            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              error={errors.duration}
              placeholder="e.g., 5 hours"
              className="px-5px"
            />

            <div></div>

            <div className="lg:col-span-2">
              <div className="form-group">
                <label className="form-label">Requirements</label>
                <div className="space-y-2">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className="form-input flex-1 px-5px py-5px"
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {formData.requirements.length > 1 && (
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => removeRequirement(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={addRequirement}
                  >
                    Add Requirement
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex gap-3 mt-6 pt-4 border-t border-border-color/50 sticky bottom-0 bg-bg-secondary/80 backdrop-blur-sm p-4 rounded-b-xl">
            <Button type="submit" loading={loading} className="flex-1 h-12">
              {loading ? '🚀 Posting...' : '🎯 Post Job'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className="px-8">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

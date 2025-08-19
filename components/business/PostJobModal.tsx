'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { X } from 'lucide-react'

interface PostJobModalProps {
  onClose: () => void
}

export function PostJobModal({ onClose }: PostJobModalProps) {
  const { user } = useAuth()
  const { addJob } = useApp()
  const [loading, setLoading] = useState(false)
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
            <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Post a New Gig</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-tertiary rounded-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
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
              />
            </div>

            <div className="lg:col-span-2">
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the job, requirements, and expectations..."
                  rows={3}
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
              />
            </div>

            <Input
              label="Pay Amount"
              type="number"
              value={formData.pay}
              onChange={(e) => setFormData(prev => ({ ...prev, pay: e.target.value }))}
              error={errors.pay}
              placeholder="0"
            />

            <div className="form-group">
              <label className="form-label">Pay Type</label>
              <select
                className="form-input form-select"
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
            />

            <Input
              label="Start Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              error={errors.time}
            />

            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              error={errors.duration}
              placeholder="e.g., 5 hours"
            />

            <div></div>

            <div className="lg:col-span-2">
              <div className="form-group">
                <label className="form-label">Requirements</label>
                <div className="space-y-2">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className="form-input flex-1"
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

          <div className="lg:col-span-2 flex gap-3 mt-6 pt-4 border-t border-border-color/50">
            <Button type="submit" loading={loading} className="flex-1 h-12">
              {loading ? 'Posting...' : 'Post Job'}
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

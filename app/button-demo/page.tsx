'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ButtonDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Apple Glass Effect Buttons
        </h1>
        
        {/* Glass Button Variants */}
        <div className="space-y-12">
          {/* Standard Button Variants */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Standard Button Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Button variant="primary" size="lg">
                Primary Button
              </Button>
              <Button variant="secondary" size="lg">
                Secondary Button
              </Button>
              <Button variant="success" size="lg">
                Success Button
              </Button>
              <Button variant="danger" size="lg">
                Danger Button
              </Button>
              <Button variant="ghost" size="lg">
                Ghost Button
              </Button>
              <Button variant="glass" size="lg">
                Glass Button
              </Button>
            </div>
          </section>

          {/* Glass Effect Divs */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Glass Effect Divs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Glass Button */}
              <div className="glass-button p-4 rounded-lg cursor-pointer text-center text-white font-medium">
                Basic Glass Div
              </div>
              
              {/* Primary Glass Button */}
              <div className="glass-button-primary p-4 rounded-lg cursor-pointer text-center text-white font-medium">
                Primary Glass Div
              </div>
              
              {/* Success Glass Button */}
              <div className="glass-button-success p-4 rounded-lg cursor-pointer text-center text-white font-medium">
                Success Glass Div
              </div>
            </div>
          </section>

          {/* Interactive Glass Cards */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Interactive Glass Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3">Glass Card</h3>
                <p className="text-gray-300 mb-4">
                  This is a glass card with backdrop blur and subtle transparency effects.
                </p>
                <div className="glass-button p-3 rounded-lg cursor-pointer text-center text-white font-medium">
                  Glass Action
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3">Glass Effect</h3>
                <p className="text-gray-300 mb-4">
                  Another glass effect variant with different styling properties.
                </p>
                <div className="glass-button-primary p-3 rounded-lg cursor-pointer text-center text-white font-medium">
                  Primary Action
                </div>
              </div>
            </div>
          </section>

          {/* Button Sizes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Glass Button Sizes</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="glass" size="sm">
                Small Glass
              </Button>
              <Button variant="glass" size="md">
                Medium Glass
              </Button>
              <Button variant="glass" size="lg">
                Large Glass
              </Button>
            </div>
          </section>

          {/* Custom Glass Buttons */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Custom Glass Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-button p-4 rounded-full cursor-pointer text-center text-white font-medium">
                Rounded
              </div>
              <div className="glass-button-primary p-4 rounded-none cursor-pointer text-center text-white font-medium">
                Square
              </div>
              <div className="glass-button-success p-6 rounded-2xl cursor-pointer text-center text-white font-medium">
                Large Radius
              </div>
              <div className="glass-button p-2 rounded-md cursor-pointer text-center text-white font-medium text-sm">
                Compact
              </div>
            </div>
          </section>

          {/* Glass Input Effects */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Glass Input Effects</h2>
            <div className="space-y-8">
              {/* Standard Glass Inputs */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Standard Glass Inputs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    variant="glass"
                    placeholder="Enter your name..."
                    size="lg"
                  />
                  <Input
                    variant="glass"
                    placeholder="Enter your email..."
                    type="email"
                    size="lg"
                  />
                </div>
              </div>

              {/* Glass Input Sizes */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Glass Input Sizes</h3>
                <div className="space-y-4">
                  <Input
                    variant="glass"
                    placeholder="Small glass input..."
                    size="sm"
                  />
                  <Input
                    variant="glass"
                    placeholder="Medium glass input..."
                    size="default"
                  />
                  <Input
                    variant="glass"
                    placeholder="Large glass input..."
                    size="lg"
                  />
                </div>
              </div>

              {/* Custom Glass Form Elements */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Custom Glass Form Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Custom glass input with enhanced placeholder..."
                      className="glass-input glass-input-animated w-full px-4 py-3 rounded-xl"
                    />
                    <textarea
                      placeholder="Glass textarea with beautiful placeholder styling and backdrop blur effects..."
                      className="glass-textarea w-full px-4 py-3 rounded-xl"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-4">
                    <select className="glass-select w-full px-4 py-3 rounded-xl">
                      <option value="">Choose an option...</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <div className="glass-input-floating">
                      <input
                        type="text"
                        placeholder=" "
                        className="glass-input w-full px-4 py-3 rounded-xl"
                      />
                      <label className="floating-label">Floating Label Input</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glass Form Example */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Complete Glass Form</h3>
                <div className="glass-card p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-white mb-4">Contact Form</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      variant="glass"
                      placeholder="First Name"
                      size="lg"
                    />
                    <Input
                      variant="glass"
                      placeholder="Last Name"
                      size="lg"
                    />
                    <div className="md:col-span-2">
                      <Input
                        variant="glass"
                        placeholder="Email Address"
                        type="email"
                        size="lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <textarea
                        placeholder="Your message..."
                        className="glass-textarea w-full px-4 py-3 rounded-xl"
                        rows={4}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Button variant="glass" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
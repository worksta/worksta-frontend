import React from 'react'
import clsx from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md shadow-purple-500/20 focus:ring-purple-500',
        secondary: 'bg-bg-tertiary border border-border-color hover:border-purple-400/50 hover:bg-bg-card text-text-primary focus:ring-purple-400',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md shadow-red-500/20 focus:ring-red-500',
        success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md shadow-green-500/20 focus:ring-green-500',
        ghost: 'bg-transparent hover:bg-purple-500/10 text-purple-400 hover:text-purple-300',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-lg',
        md: 'h-11 px-4 py-2',
        lg: 'h-14 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  loading?: boolean
}

export function Button({ 
  variant, 
  size, 
  children, 
  loading = false,
  className,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        buttonVariants({ variant, size }),
        loading && 'relative',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className={clsx('flex items-center gap-2', loading && 'opacity-0')}>
        {children}
      </span>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  )
}

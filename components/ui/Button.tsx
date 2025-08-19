import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  loading?: boolean
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  loading = false,
  className,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        loading && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

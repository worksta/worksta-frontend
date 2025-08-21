import React from 'react'
import clsx from 'clsx'
import { cva } from 'class-variance-authority'

type InputSize = 'default' | 'sm' | 'lg'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  variant?: 'default' | 'filled'
  size?: InputSize
}

const inputVariants = cva(
  'form-input w-full px-4 py-3 bg-bg-tertiary border border-border-color rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        filled: 'bg-bg-tertiary',
      },
      size: {
        sm: 'px-3 py-2 text-sm rounded-lg',
        default: 'px-4 py-3 rounded-xl',
        lg: 'px-5 py-4 text-lg rounded-xl',
      },
      error: {
        true: 'border-red-500 focus:ring-red-500/20 focus:border-red-400',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      error: false,
    },
  }
);

export function Input({ label, error, className, variant, size, ...props }: InputProps) {
  return (
    <div className="form-group space-y-2">
      {label && (
        <label className="form-label text-sm font-medium text-text-secondary" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={clsx(
          inputVariants({ variant, size, error: !!error }),
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  )
}

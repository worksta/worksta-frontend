import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={clsx(
          'form-input',
          error && 'border-red-500',
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

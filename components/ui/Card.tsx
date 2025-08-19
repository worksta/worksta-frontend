import React from 'react'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export function Card({ children, className, onClick, hover = true }: CardProps) {
  return (
    <div
      className={clsx(
        'card',
        onClick && 'cursor-pointer',
        !hover && 'hover:transform-none hover:shadow-none',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('card-header', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={clsx('card-title', className)}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('card-content', className)}>
      {children}
    </div>
  )
}

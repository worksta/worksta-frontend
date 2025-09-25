import React from 'react'
import clsx from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'rounded-xl border border-border-color bg-bg-card shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-bg-card',
        glass: 'bg-bg-card/80 backdrop-blur-lg border-purple-500/20',
        gradient: 'bg-gradient-to-br from-bg-card to-bg-tertiary',
      },
      hover: {
        true: 'hover:shadow-md hover:border-border-hover hover:translate-y-[-2px]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: true,
    },
  }
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className, onClick, variant, hover }: CardProps) {
  return (
    <div
      className={clsx(
        cardVariants({ variant, hover }),
        onClick && 'cursor-pointer',
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
    <div className={clsx('px-6 py-5', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={clsx('text-xl font-semibold text-text-primary', className)}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('px-6 py-5 pt-0', className)}>
      {children}
    </div>
  )
}

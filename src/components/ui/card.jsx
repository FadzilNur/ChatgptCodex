import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return <section className={cn('glass-panel', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col gap-1.5 p-5 pb-3', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-base font-semibold tracking-wide text-white', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm leading-6 text-slate-400', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-5 pt-3', className)} {...props} />
}

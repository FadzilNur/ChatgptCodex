import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return <div className={cn('forensic-panel', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('p-5 pb-3', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-base font-semibold tracking-wide text-slate-100', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-5 pt-3', className)} {...props} />
}

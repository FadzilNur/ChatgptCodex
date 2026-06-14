import { cn } from '../../lib/utils'
export function Card({ className, ...props }) { return <div className={cn('rounded-2xl border border-slate-700/70 bg-slate-900/70 shadow-xl shadow-sky-950/20 backdrop-blur', className)} {...props} /> }
export function CardHeader({ className, ...props }) { return <div className={cn('p-5 pb-2', className)} {...props} /> }
export function CardTitle({ className, ...props }) { return <h3 className={cn('text-sm font-semibold tracking-wide text-slate-100', className)} {...props} /> }
export function CardContent({ className, ...props }) { return <div className={cn('p-5', className)} {...props} /> }

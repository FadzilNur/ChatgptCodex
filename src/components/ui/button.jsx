import { cn } from '../../lib/utils'

export function Button({ className, variant = 'primary', size = 'default', ...props }) {
  const variants = {
    primary: 'bg-cyan text-slate-950 shadow-glow hover:bg-sky-300',
    secondary: 'border border-slate-600 bg-slate-900/70 text-slate-100 hover:bg-slate-800',
    ghost: 'text-slate-300 hover:bg-slate-800/80',
    danger: 'border border-rose-500/50 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25',
  }
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-xs',
  }

  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className)} {...props} />
}

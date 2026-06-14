import { cn } from '../../lib/utils'
export function Button({ className, variant='default', size='default', ...props }) {
 const variants={default:'bg-sky-500 text-slate-950 hover:bg-sky-400',outline:'border border-slate-600 bg-slate-900/60 text-slate-200 hover:bg-slate-800',destructive:'bg-rose-500/20 text-rose-200 border border-rose-500/40 hover:bg-rose-500/30',ghost:'text-slate-300 hover:bg-slate-800/80'}
 const sizes={default:'h-10 px-4 py-2',sm:'h-8 px-3 text-xs'}
 return <button className={cn('inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50', variants[variant], sizes[size], className)} {...props}/>
}

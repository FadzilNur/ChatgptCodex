import { cn } from '../../lib/utils'

export function Badge({ className, tone = 'slate', ...props }) {
  const tones = {
    sky: 'border-sky-400/40 bg-sky-500/15 text-sky-200',
    emerald: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200',
    amber: 'border-amber-400/40 bg-amber-500/15 text-amber-200',
    rose: 'border-rose-400/40 bg-rose-500/15 text-rose-200',
    slate: 'border-slate-400/30 bg-slate-500/15 text-slate-200',
  }

  return <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', tones[tone], className)} {...props} />
}

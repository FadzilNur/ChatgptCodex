import { cn } from '../../lib/utils'
export function Tabs({ tabs, active, onChange }) { return <div className="flex flex-wrap gap-2 rounded-xl border border-slate-700 bg-slate-950/40 p-1">{tabs.map(t=><button key={t} onClick={()=>onChange(t)} className={cn('rounded-lg px-4 py-2 text-sm transition',active===t?'bg-sky-500 text-slate-950':'text-slate-300 hover:bg-slate-800')}>{t}</button>)}</div> }

import { cn } from '../../lib/utils'

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-slate-700 bg-slate-950/60 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn('rounded-lg px-4 py-2 text-sm font-medium transition', active === tab ? 'bg-sky-400 text-slate-950 shadow-glow' : 'text-slate-300 hover:bg-slate-800')}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

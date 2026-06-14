import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, BrainCircuit, Database, FileArchive, FileText, Fingerprint, Gauge, Home, Layers3, Map, Radar, ShieldCheck, UploadCloud } from 'lucide-react'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Tabs } from './components/ui/tabs'

const modules = [
  ['Dashboard', Home],
  ['Case Management', FileArchive],
  ['Evidence Management', Database],
  ['Visual Analysis (CNN)', BrainCircuit],
  ['Telemetry Analysis (LSTM)', Activity],
  ['Fusion Analysis', Layers3],
  ['Explainable AI', Radar],
  ['Reporting', FileText],
]

const cases = [
  ['UAV-DFI-026-014', 'Airport perimeter incursion', 'Dr. Maya Chen', 'Active', '2026-06-14'],
  ['UAV-DFI-026-011', 'Stadium surveillance breach', 'James Okafor', 'Review', '2026-06-03'],
  ['UAV-DFI-026-008', 'Cargo yard reconnaissance', 'Elena Rossi', 'Active', '2026-05-28'],
  ['UAV-DFI-026-003', 'Critical infrastructure flyover', 'A. Al-Khatib', 'Closed', '2026-05-11'],
]

const evidence = [
  ['DJI_thermal_2034.jpg', 'Thermal image', '7f4a9b72a10c18e92', 'Verified'],
  ['flightlog_20260614.csv', 'Telemetry log', 'c91d0ee61244aa71', 'Verified'],
  ['controller_dump.bin', 'Controller image', '9aa40c4834e7f210', 'Pending'],
  ['payload_video_4k.mp4', 'Optical video', '1d91ab4439090bd1', 'Verified'],
]

const modelMetrics = [
  { name: 'CNN', accuracy: 96.8, precision: 94.9 },
  { name: 'LSTM', accuracy: 93.4, precision: 91.2 },
  { name: 'Fusion', accuracy: 98.1, precision: 97.4 },
]

const flightTrace = [
  { time: '00:00', altitude: 42, anomaly: 8 },
  { time: '02:00', altitude: 86, anomaly: 16 },
  { time: '04:00', altitude: 131, anomaly: 44 },
  { time: '06:00', altitude: 119, anomaly: 86 },
  { time: '08:00', altitude: 68, anomaly: 39 },
]

function AppShell({ page, setPage, children }) {
  return (
    <div className="min-h-screen bg-ink bg-mesh text-slate-100">
      <div className="fixed inset-0 -z-10 bg-grid grid-overlay" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-800 bg-ink/95 p-5 shadow-forensic backdrop-blur-xl lg:flex lg:flex-col">
        <div className="mb-8 rounded-2xl border border-cyan/25 bg-cyan/10 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan/20 p-3 text-cyan shadow-glow"><ShieldCheck /></div>
            <div>
              <h1 className="text-lg font-bold text-white">UAV-DFI Workbench</h1>
              <p className="text-xs text-slate-400">Forensic research prototype</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {modules.map(([name, Icon]) => (
            <button
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${page === name ? 'bg-cyan/15 text-sky-100 ring-1 ring-cyan/40 shadow-glow' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              key={name}
              onClick={() => setPage(name)}
            >
              <Icon size={18} />
              {name}
            </button>
          ))}
        </nav>
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Integrity Monitor</p>
          <p className="mt-2 text-sm font-semibold text-white">Chain of custody locked</p>
          <p className="mt-1 text-xs text-slate-400">Mock artifacts are SHA256 indexed.</p>
        </div>
      </aside>
      <main className="lg:pl-72">
        <div className="sticky top-0 z-20 border-b border-slate-800 bg-ink/90 p-4 backdrop-blur lg:hidden">
          <select className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white" onChange={(event) => setPage(event.target.value)} value={page}>
            {modules.map(([name]) => <option key={name}>{name}</option>)}
          </select>
        </div>
        <section className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          <header className="mb-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-forensic backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan">Supervisor review prototype</p>
            <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{page}</h2>
                <p className="mt-3 max-w-3xl text-slate-400">Presentation-quality UAV digital investigation workflow inspired by Autopsy, FTK, Magnet AXIOM, and Cellebrite.</p>
              </div>
              <Badge tone="emerald">Research enclave online</Badge>
            </div>
          </header>
          {children}
        </section>
      </main>
    </div>
  )
}

function KpiCard({ label, value, detail, tone = 'sky', Icon = Fingerprint }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan/10 blur-2xl" />
      <CardContent className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-2 text-cyan"><Icon size={20} /></div>
        </div>
        <Badge className="mt-4" tone={tone}>{detail}</Badge>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }) {
  const tone = status === 'Verified' || status === 'Closed' ? 'emerald' : status === 'Pending' || status === 'Review' ? 'amber' : 'sky'
  return <Badge tone={tone}>{status}</Badge>
}

function DataTable({ headers, rows, actions }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-950/80 text-xs uppercase tracking-wide text-slate-400">
          <tr>{headers.map((header) => <th className="px-4 py-3" key={header}>{header}</th>)}{actions && <th className="px-4 py-3">Actions</th>}</tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/35">
          {rows.map((row) => (
            <tr className="text-slate-200 transition hover:bg-slate-800/50" key={row[0]}>
              {row.map((cell, index) => <td className="px-4 py-3" key={`${row[0]}-${cell}`}>{index === 3 ? <StatusBadge status={cell} /> : cell}</td>)}
              {actions && <td className="flex flex-wrap gap-2 px-4 py-3"><Button size="sm" variant="secondary">View</Button><Button size="sm" variant="ghost">Edit</Button><Button size="sm" variant="danger">Close Case</Button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Dashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard label="Total Cases" value="42" detail="6 active" Icon={FileArchive} />
        <KpiCard label="Evidence Files" value="1,284" detail="3.8 TB indexed" Icon={Database} />
        <KpiCard label="CNN Accuracy" value="96.8%" detail="visual classifier" Icon={BrainCircuit} />
        <KpiCard label="LSTM Accuracy" value="93.4%" detail="telemetry model" Icon={Activity} />
        <KpiCard label="Fusion Accuracy" value="98.1%" detail="cross-modal" Icon={Layers3} />
        <KpiCard label="System Status" value="Online" detail="secure" tone="emerald" Icon={ShieldCheck} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <Card><CardHeader><CardTitle>Recent Investigations</CardTitle><CardDescription>Priority UAV incidents under review.</CardDescription></CardHeader><CardContent><DataTable headers={['Case ID', 'Case Name', 'Investigator', 'Status', 'Date Created']} rows={cases} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Model Performance</CardTitle><CardDescription>Validated research-model metrics.</CardDescription></CardHeader><CardContent className="h-80"><ResponsiveContainer><BarChart data={modelMetrics}><CartesianGrid stroke="#1e293b" vertical={false} /><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" domain={[80, 100]} /><Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }} /><Bar dataKey="accuracy" fill="#38bdf8" radius={[8, 8, 0, 0]} /><Bar dataKey="precision" fill="#64748b" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      </div>
    </>
  )
}

function CaseManagement() {
  return <Card><CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle>Case Management</CardTitle><CardDescription>Create, inspect, edit, and close UAV forensic cases.</CardDescription></div><Button>Create Case</Button></CardHeader><CardContent><DataTable headers={['Case ID', 'Case Name', 'Investigator', 'Status', 'Date Created']} rows={cases} actions /></CardContent></Card>
}

function EvidenceManagement() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-2"><CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle>Evidence Repository</CardTitle><CardDescription>Hash-verified artifacts and acquisition metadata.</CardDescription></div><Button><UploadCloud size={16} />Upload Evidence</Button></CardHeader><CardContent><DataTable headers={['File Name', 'Evidence Type', 'SHA256 Hash', 'Verification Status']} rows={evidence} /></CardContent></Card>
      <Card><CardHeader><CardTitle>Evidence Preview</CardTitle><CardDescription>Selected artifact triage summary.</CardDescription></CardHeader><CardContent><div className="rounded-2xl border border-dashed border-cyan/40 bg-slate-950/70 p-6 text-center"><Database className="mx-auto text-cyan" size={56} /><h3 className="mt-4 font-semibold text-white">flightlog_20260614.csv</h3><p className="mt-2 text-sm leading-6 text-slate-400">GPS, IMU, altitude, yaw, payload state, home-point drift, and command-channel events.</p></div></CardContent></Card>
    </div>
  )
}

function VisualAnalysis() {
  return <AnalysisLayout uploadTitle="Image Upload" uploadText="Optical, thermal, and multispectral frames" resultTitle="CNN Prediction Result" result="Unauthorized perimeter reconnaissance" score="Confidence Score: 96.8%" visual="Grad-CAM heatmap" />
}

function TelemetryAnalysis() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <UploadPanel title="Telemetry File Upload" text="CSV, JSON, GPX, and controller telemetry exports" />
      <Card><CardHeader><CardTitle>Behaviour Classification</CardTitle><CardDescription>LSTM temporal anomaly model output.</CardDescription></CardHeader><CardContent><p className="text-2xl font-bold text-sky-200">Loitering + no-fly-zone approach</p><p className="mt-2 text-slate-400">Anomaly Score: 0.84</p><div className="mt-4 h-64 rounded-2xl border border-slate-800 bg-slate-950/50 p-3"><ResponsiveContainer><LineChart data={flightTrace}><CartesianGrid stroke="#1e293b" vertical={false} /><XAxis dataKey="time" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }} /><Line dataKey="altitude" stroke="#38bdf8" strokeWidth={3} dot={false} /><Line dataKey="anomaly" stroke="#fb7185" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div><p className="mt-4 text-sm text-slate-400">GPS Route Visualization: restricted perimeter arc near 37.618°N, 122.375°W. Flight timeline overlays altitude and anomaly scores.</p><Button className="mt-5">Run Analysis</Button></CardContent></Card>
    </div>
  )
}

function FusionAnalysis() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader><CardTitle>Fusion Summary</CardTitle><CardDescription>Multi-modal evidence correlation.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><KpiCard label="CNN Result" value="Recon" detail="96.8% confidence" /><KpiCard label="LSTM Result" value="Loiter" detail="0.84 anomaly" /><KpiCard label="Correlation" value="0.91" detail="high coupling" /><KpiCard label="Final Risk" value="Severe" detail="escalate" tone="rose" /></CardContent></Card>
      <Card><CardHeader><CardTitle>Risk Gauge</CardTitle><CardDescription>Supervisor-facing threat score.</CardDescription></CardHeader><CardContent className="h-96"><ResponsiveContainer><PieChart><Pie data={[{ name: 'Risk', value: 86 }, { name: 'Residual', value: 14 }]} dataKey="value" endAngle={0} innerRadius={90} outerRadius={130} startAngle={180}><Cell fill="#fb7185" /><Cell fill="#1e293b" /></Pie></PieChart></ResponsiveContainer><p className="-mt-28 text-center text-4xl font-bold text-rose-300">86 / 100</p><p className="mt-2 text-center text-sm text-slate-400">Probable hostile reconnaissance requiring escalation.</p></CardContent></Card>
    </div>
  )
}

function ExplainableAI() {
  const [tab, setTab] = useState('Grad-CAM')
  return <Card><CardHeader><CardTitle>Explainable AI</CardTitle><CardDescription>Transparent model evidence for forensic defensibility.</CardDescription></CardHeader><CardContent><Tabs active={tab} onChange={setTab} tabs={['Grad-CAM', 'SHAP', 'LIME']} /><div className="mt-6 grid gap-6 md:grid-cols-3"><HeatPanel label={`${tab} heatmap`} /><InfoPanel title="Feature Importance" text="Altitude deviation, waypoint dwell time, restricted-zone bearing, payload thermal signature, and return-to-home suppression." /><InfoPanel title="Local Explanation" text="The decision is driven by repeated elliptical passes, abnormal yaw corrections, and perimeter-facing camera orientation." /></div></CardContent></Card>
}

function Reporting() {
  return <Card><CardHeader className="flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><div><CardTitle>Generated Reports</CardTitle><CardDescription>Supervisor and evidentiary export packages.</CardDescription></div><div className="flex flex-wrap gap-2"><Button>Export PDF</Button><Button variant="secondary">Export CSV</Button><Button variant="secondary">Export JSON</Button></div></CardHeader><CardContent><DataTable headers={['Report ID', 'Case', 'Type', 'Status', 'Generated']} rows={[[ 'RPT-014-A', 'Airport perimeter incursion', 'Fusion forensic brief', 'Verified', '2026-06-14' ], [ 'RPT-011-X', 'Stadium surveillance breach', 'XAI appendix', 'Review', '2026-06-04' ]]} /></CardContent></Card>
}

function AnalysisLayout({ uploadTitle, uploadText, resultTitle, result, score, visual }) {
  return <div className="grid gap-6 xl:grid-cols-2"><UploadPanel title={uploadTitle} text={uploadText} /><Card><CardHeader><CardTitle>{resultTitle}</CardTitle><CardDescription>Research model inference output.</CardDescription></CardHeader><CardContent><p className="text-2xl font-bold text-sky-200">{result}</p><p className="mt-2 text-slate-400">{score}</p><HeatPanel label={visual} /><Button className="mt-5">Run Analysis</Button></CardContent></Card></div>
}

function UploadPanel({ title, text }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{text}</CardDescription></CardHeader><CardContent><div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-950/65 p-8 text-center"><UploadCloud className="text-cyan" size={64} /><h3 className="mt-5 text-xl font-semibold text-white">Secure forensic upload</h3><p className="mt-2 max-w-sm text-slate-400">Mock acquisition records hash, timestamp, operator, evidence source, and notes.</p><Button className="mt-6" variant="secondary">Select Artifact</Button></div></CardContent></Card>
}

function HeatPanel({ label }) {
  return <div className="mt-4 min-h-56 rounded-2xl border border-slate-700 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,.56),transparent_22%),radial-gradient(circle_at_70%_55%,rgba(244,63,94,.52),transparent_18%),linear-gradient(135deg,#0f172a,#1e293b)] p-5 shadow-inner"><Map className="text-slate-200" /><p className="mt-32 font-semibold text-white">{label}</p></div>
}

function InfoPanel({ title, text }) {
  return <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 shadow-glow"><Gauge className="text-cyan" /><h3 className="mt-4 font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>
}

const pageMap = {
  Dashboard: <Dashboard />,
  'Case Management': <CaseManagement />,
  'Evidence Management': <EvidenceManagement />,
  'Visual Analysis (CNN)': <VisualAnalysis />,
  'Telemetry Analysis (LSTM)': <TelemetryAnalysis />,
  'Fusion Analysis': <FusionAnalysis />,
  'Explainable AI': <ExplainableAI />,
  Reporting: <Reporting />,
}

export default function App() {
  const [page, setPage] = useState('Dashboard')
  return <AppShell page={page} setPage={setPage}>{pageMap[page]}</AppShell>
}

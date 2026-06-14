import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  BrainCircuit,
  ChevronRight,
  Database,
  FileArchive,
  FileText,
  Fingerprint,
  Gauge,
  Home,
  Layers3,
  Map,
  Radar,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Tabs } from './components/ui/tabs'

const navItems = [
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
  ['UAV-DFI-2026-014', 'Restricted Airspace Incursion', 'Dr. Maya Chen', 'Active', '2026-06-04'],
  ['UAV-DFI-2026-011', 'Stadium Surveillance Breach', 'James Okafor', 'Review', '2026-05-28'],
  ['UAV-DFI-2026-008', 'Cargo Yard Reconnaissance', 'Elena Rossi', 'Closed', '2026-05-17'],
  ['UAV-DFI-2026-006', 'Airport Perimeter Flyover', 'Dr. Aaron Patel', 'Active', '2026-05-09'],
]

const evidence = [
  ['IMG_2034_THERMAL.jpg', 'Thermal Image', '7f4a9b72a10c18e92', 'Verified'],
  ['flightlog_0614.csv', 'Telemetry Log', 'c91d0ee61244aa71', 'Verified'],
  ['controller_dump.bin', 'Firmware Dump', '9aa40c4834e7f210', 'Pending'],
  ['payload_video.mp4', 'Optical Video', '1d91ab4439090bd1', 'Verified'],
]

const performance = [
  { name: 'CNN', accuracy: 96.8, f1: 94.9 },
  { name: 'LSTM', accuracy: 93.4, f1: 91.2 },
  { name: 'Fusion', accuracy: 98.1, f1: 97.4 },
]

const telemetry = [
  { t: '00:00', altitude: 40, anomaly: 12 },
  { t: '02:00', altitude: 88, anomaly: 18 },
  { t: '04:00', altitude: 132, anomaly: 41 },
  { t: '06:00', altitude: 121, anomaly: 84 },
  { t: '08:00', altitude: 64, anomaly: 36 },
]

function Sidebar({ page, setPage }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-800/80 bg-forensic-950/95 p-5 shadow-forensic backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3">
        <div className="rounded-xl bg-sky-400/20 p-3 text-sky-300 shadow-glow">
          <ShieldCheck />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">UAV-DFI Lab</h1>
          <p className="text-xs text-slate-400">Digital Forensic Platform</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => setPage(name)}
            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all ${
              page === name
                ? 'bg-sky-500/15 text-sky-100 ring-1 ring-sky-400/40 shadow-glow'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
            }`}
          >
            <Icon size={18} />
            <span>{name}</span>
            <ChevronRight className="ml-auto opacity-50 transition group-hover:translate-x-0.5" size={15} />
          </button>
        ))}
      </nav>

      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Evidence Integrity</p>
        <p className="mt-2 text-sm font-semibold text-slate-100">Chain-of-custody monitor active</p>
        <p className="mt-1 text-xs text-slate-400">All mock artifacts are hash-verified.</p>
      </div>
    </aside>
  )
}

function StatCard({ label, value, sub, tone = 'sky', icon: Icon = Fingerprint }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl" />
      <CardContent className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">{label}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</h2>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-2 text-sky-300">
            <Icon size={20} />
          </div>
        </div>
        <Badge className="mt-4" tone={tone}>{sub}</Badge>
      </CardContent>
    </Card>
  )
}

function DataTable({ headers, rows, actions = false }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-slate-950/80 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            {headers.map((header) => <th className="px-4 py-3" key={header}>{header}</th>)}
            {actions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 bg-slate-900/35">
          {rows.map((row) => (
            <tr className="text-slate-200 transition hover:bg-slate-800/50" key={row[0]}>
              {row.map((cell, index) => (
                <td className="px-4 py-3" key={`${row[0]}-${cell}`}>
                  {index === 3 ? <StatusBadge status={cell} /> : cell}
                </td>
              ))}
              {actions && (
                <td className="flex flex-wrap gap-2 px-4 py-3">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="ghost">Edit</Button>
                  <Button size="sm" variant="destructive">Close Case</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }) {
  const tone = status === 'Closed' || status === 'Verified' ? 'emerald' : status === 'Pending' || status === 'Draft' ? 'amber' : 'sky'
  return <Badge tone={tone}>{status}</Badge>
}

function Dashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total Cases" value="42" sub="+6 this month" icon={FileArchive} />
        <StatCard label="Evidence Files" value="1,284" sub="3.8 TB indexed" icon={Database} />
        <StatCard label="CNN Accuracy" value="96.8%" sub="ResNet-50" icon={BrainCircuit} />
        <StatCard label="LSTM Accuracy" value="93.4%" sub="sequence model" icon={Activity} />
        <StatCard label="Fusion Accuracy" value="98.1%" sub="validated" icon={Layers3} />
        <StatCard label="System Status" value="Online" sub="secure enclave" tone="emerald" icon={ShieldCheck} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable headers={['Case ID', 'Case Name', 'Investigator', 'Status', 'Date Created']} rows={cases} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer>
              <BarChart data={performance}>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[80, 100]} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }} />
                <Bar dataKey="accuracy" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="f1" fill="#64748b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function CaseManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Case Management</CardTitle>
        <Button>Create Case</Button>
      </CardHeader>
      <CardContent>
        <DataTable headers={['Case ID', 'Case Name', 'Investigator', 'Status', 'Date Created']} rows={cases} actions />
      </CardContent>
    </Card>
  )
}

function EvidenceManagement() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Evidence Repository</CardTitle>
          <Button><UploadCloud size={16} />Upload Evidence</Button>
        </CardHeader>
        <CardContent>
          <DataTable headers={['File Name', 'Evidence Type', 'SHA256 Hash', 'Verification Status']} rows={evidence} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>File Preview</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-dashed border-sky-500/40 bg-slate-950/70 p-6 text-center">
            <Database className="mx-auto text-sky-300" size={56} />
            <h3 className="mt-4 font-semibold text-white">flightlog_0614.csv</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">GPS, IMU, altitude, yaw, and controller event stream. SHA256 verified and chain-of-custody locked.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function VisualAnalysis() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <UploadPanel title="Image Upload" desc="Drop optical, thermal, or multispectral UAV imagery" />
      <Card>
        <CardHeader><CardTitle>Prediction Result</CardTitle></CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-sky-200">Unauthorized Perimeter Reconnaissance</p>
          <p className="mt-2 text-slate-400">Confidence Score: 96.8%</p>
          <HeatPanel title="Grad-CAM Visualization" />
          <Button className="mt-5">Run Analysis</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function TelemetryAnalysis() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <UploadPanel title="Telemetry File Upload" desc="CSV, JSON, GPX flight logs and controller exports" />
      <Card>
        <CardHeader><CardTitle>Behaviour Classification</CardTitle></CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-sky-200">Loitering + No-Fly Zone Approach</p>
          <p className="mt-2 text-slate-400">Anomaly Score: 0.84</p>
          <div className="mt-4 h-56 rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
            <ResponsiveContainer>
              <LineChart data={telemetry}>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="t" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }} />
                <Line dataKey="altitude" stroke="#38bdf8" strokeWidth={3} dot={false} />
                <Line dataKey="anomaly" stroke="#fb7185" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-slate-400">GPS Route Visualization: 37.618°N, 122.375°W perimeter arc. Flight Timeline includes altitude and anomaly overlays.</p>
          <Button className="mt-5">Run Analysis</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function FusionAnalysis() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Fusion Summary Card</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <StatCard label="CNN Result" value="Recon" sub="96.8% confidence" />
          <StatCard label="LSTM Result" value="Loiter" sub="0.84 anomaly" />
          <StatCard label="Correlation Score" value="0.91" sub="high coupling" />
          <StatCard label="Final Risk" value="Severe" sub="escalate" tone="rose" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Risk Gauge</CardTitle></CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={[{ name: 'Risk', value: 86 }, { name: 'Residual', value: 14 }]} innerRadius={90} outerRadius={130} startAngle={180} endAngle={0} dataKey="value">
                <Cell fill="#fb7185" />
                <Cell fill="#1e293b" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="-mt-28 text-center text-4xl font-bold text-rose-300">86 / 100</p>
          <p className="mt-2 text-center text-sm text-slate-400">Multi-modal correlation indicates probable hostile reconnaissance.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ExplainableAI() {
  const [tab, setTab] = useState('Grad-CAM')
  return (
    <Card>
      <CardHeader><CardTitle>Explainable AI</CardTitle></CardHeader>
      <CardContent>
        <Tabs tabs={['Grad-CAM', 'SHAP', 'LIME']} active={tab} onChange={setTab} />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <HeatPanel title={`${tab} Heatmaps`} />
          <InfoPanel title="Feature Importance" text="Altitude deviation, waypoint dwell time, restricted-zone bearing, thermal payload signature." />
          <InfoPanel title="Local Explanations" text="Decision attributed to repeated elliptical passes near perimeter sensors and abnormal yaw corrections." />
        </div>
      </CardContent>
    </Card>
  )
}

function Reporting() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <CardTitle>Generated Reports</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button>Export PDF</Button>
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline">Export JSON</Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          headers={['Report ID', 'Case', 'Type', 'Status', 'Generated']}
          rows={[
            ['RPT-014-A', 'Restricted Airspace Incursion', 'Fusion Forensic Brief', 'Verified', '2026-06-14'],
            ['RPT-011-X', 'Stadium Surveillance Breach', 'XAI Appendix', 'Draft', '2026-06-02'],
          ]}
        />
      </CardContent>
    </Card>
  )
}

function UploadPanel({ title, desc }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-950/60 p-8 text-center">
          <UploadCloud className="text-sky-300" size={64} />
          <h3 className="mt-5 text-xl font-semibold text-white">Secure forensic upload</h3>
          <p className="mt-2 max-w-sm text-slate-400">{desc}. Mock acquisition preserves hash, timestamp, and investigator notes.</p>
          <Button className="mt-6" variant="outline">Select Artifact</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function HeatPanel({ title }) {
  return (
    <div className="mt-4 min-h-56 rounded-2xl border border-slate-700 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,.55),transparent_22%),radial-gradient(circle_at_70%_55%,rgba(244,63,94,.55),transparent_18%),linear-gradient(135deg,#0f172a,#1e293b)] p-5 shadow-inner">
      <Map className="text-slate-200" />
      <p className="mt-32 font-semibold text-slate-100">{title}</p>
    </div>
  )
}

function InfoPanel({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 shadow-glow">
      <Gauge className="text-sky-300" />
      <h3 className="mt-4 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  )
}

const pages = {
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

  return (
    <div className="min-h-screen bg-forensic-950 bg-forensic-grid cyber-grid text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,.16),transparent_35%),linear-gradient(135deg,#050b14,#07111f_45%,#111827)]" />
      <Sidebar page={page} setPage={setPage} />

      <main className="lg:pl-72">
        <div className="sticky top-0 z-20 border-b border-slate-800 bg-forensic-950/85 p-4 backdrop-blur-xl lg:hidden">
          <select className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-100" value={page} onChange={(event) => setPage(event.target.value)}>
            {navItems.map(([name]) => <option key={name}>{name}</option>)}
          </select>
        </div>

        <section className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          <header className="mb-8 rounded-3xl border border-slate-800 bg-slate-950/50 p-6 shadow-forensic backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Research Prototype</p>
            <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{page}</h2>
                <p className="mt-3 max-w-3xl text-slate-400">Blue-grey cybersecurity workspace for UAV digital forensic acquisition, AI analysis, explainability, and evidentiary reporting.</p>
              </div>
              <Badge tone="emerald">Secure demo environment</Badge>
            </div>
          </header>

          {pages[page]}
        </section>
      </main>
    </div>
  )
}

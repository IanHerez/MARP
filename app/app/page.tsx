import { AgentFeed } from '@/components/marp/AgentFeed'
import { ReportPanel } from '@/components/marp/ReportPanel'

export default function DashboardPage() {
    return (
        <main className="min-h-screen font-mono text-marp-green">
            <div className="max-w-7xl mx-auto p-4">
                <div className="mb-6">
                    <h1 className="text-xs tracking-[0.3em] text-marp-green/40 mb-1">DASHBOARD</h1>
                    <p className="text-sm text-marp-green/60">Monitor agents, report outcomes, stake on trust.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-12rem)]">
                    <div className="min-h-[400px] lg:min-h-0">
                        <AgentFeed />
                    </div>
                    <div className="min-h-[400px] lg:min-h-0">
                        <ReportPanel />
                    </div>
                </div>
            </div>
        </main>
    )
}

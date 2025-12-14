import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { ReportsList } from '@/components/dashboard/reports-list'
import { CleaningReport } from '@/types/report'

// Revalidate data every 60 seconds
export const revalidate = 60

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch reports - only "清掃完了" status to show photos
    const { data: reports, error } = await supabase
        .from('cleaning_reports')
        .select('*')
        .eq('status', '清掃完了')
        .order('report_date', { ascending: false })
        .limit(20)

    // Handle errors or empty data gracefully
    const cleanReports = (reports || []) as CleaningReport[]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Sakurai Cleaning
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500 hidden sm:inline-block">
                                {user?.email}
                            </span>
                            <form action="/auth/signout" method="post">
                                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">
                                    ログアウト
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">清掃報告レポート</h1>
                            <p className="text-slate-500 mt-2">最新の清掃状況と活動ログを確認できます。</p>
                        </div>
                        {/* Future: Add Filter Buttons here */}
                    </div>

                    {/* Reports Grid */}
                    <ReportsList reports={cleanReports} />
                </div>
            </main>
        </div>
    )
}

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'

interface FilterBarProps {
    stores: string[]
    currentStore: string
    currentMonth: string
}

export function FilterBar({ stores, currentStore, currentMonth }: FilterBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        // Reset to page 1 when filter changes
        params.delete('page')
        router.push(`/dashboard?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push('/dashboard')
    }

    const hasFilters = currentStore || currentMonth

    // Generate month options (last 12 months)
    const monthOptions: { value: string; label: string }[] = []
    const now = new Date()
    for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const label = `${date.getFullYear()}年${date.getMonth() + 1}月`
        monthOptions.push({ value, label })
    }

    return (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">フィルター</span>
            </div>

            {/* Store filter */}
            <select
                value={currentStore}
                onChange={(e) => updateFilter('store', e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="">すべての店舗</option>
                {stores.map((store) => (
                    <option key={store} value={store}>
                        {store}
                    </option>
                ))}
            </select>

            {/* Month filter */}
            <select
                value={currentMonth}
                onChange={(e) => updateFilter('month', e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="">すべての期間</option>
                {monthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Clear button */}
            {hasFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-slate-500 hover:text-slate-900 gap-1"
                >
                    <X className="w-4 h-4" />
                    クリア
                </Button>
            )}
        </div>
    )
}

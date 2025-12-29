'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
}

export function Pagination({ currentPage, totalPages, totalCount, pageSize }: PaginationProps) {
    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalCount)

    if (totalPages <= 1) {
        return (
            <div className="text-center text-sm text-slate-500">
                全 {totalCount} 件
            </div>
        )
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            {/* Item count display */}
            <div className="text-sm text-slate-500">
                {totalCount} 件中 {startItem}〜{endItem} 件を表示
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
                {/* First page */}
                <Button
                    variant="outline"
                    size="icon"
                    asChild
                    disabled={currentPage <= 1}
                    className="h-9 w-9"
                >
                    {currentPage > 1 ? (
                        <Link href={`/dashboard?page=1`}>
                            <ChevronsLeft className="h-4 w-4" />
                        </Link>
                    ) : (
                        <span><ChevronsLeft className="h-4 w-4" /></span>
                    )}
                </Button>

                {/* Previous page */}
                <Button
                    variant="outline"
                    size="icon"
                    asChild
                    disabled={currentPage <= 1}
                    className="h-9 w-9"
                >
                    {currentPage > 1 ? (
                        <Link href={`/dashboard?page=${currentPage - 1}`}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    ) : (
                        <span><ChevronLeft className="h-4 w-4" /></span>
                    )}
                </Button>

                {/* Page indicator */}
                <div className="flex items-center gap-1 px-3">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {currentPage}
                    </span>
                    <span className="text-sm text-slate-500">/</span>
                    <span className="text-sm text-slate-500">
                        {totalPages}
                    </span>
                </div>

                {/* Next page */}
                <Button
                    variant="outline"
                    size="icon"
                    asChild
                    disabled={currentPage >= totalPages}
                    className="h-9 w-9"
                >
                    {currentPage < totalPages ? (
                        <Link href={`/dashboard?page=${currentPage + 1}`}>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    ) : (
                        <span><ChevronRight className="h-4 w-4" /></span>
                    )}
                </Button>

                {/* Last page */}
                <Button
                    variant="outline"
                    size="icon"
                    asChild
                    disabled={currentPage >= totalPages}
                    className="h-9 w-9"
                >
                    {currentPage < totalPages ? (
                        <Link href={`/dashboard?page=${totalPages}`}>
                            <ChevronsRight className="h-4 w-4" />
                        </Link>
                    ) : (
                        <span><ChevronsRight className="h-4 w-4" /></span>
                    )}
                </Button>
            </div>
        </div>
    )
}

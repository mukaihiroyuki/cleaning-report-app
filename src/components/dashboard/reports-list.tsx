'use client'

import { CleaningReport } from '@/types/report'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CalendarDays, MapPin, User, CheckCircle2, Clock, AlertCircle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Helper for status colors
const getStatusColor = (status: string) => {
    if (status.includes('完')) return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20'
    if (status.includes('中')) return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20'
    return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20'
}

const getStatusIcon = (status: string) => {
    if (status.includes('完')) return <CheckCircle2 className="w-3 h-3 mr-1" />
    if (status.includes('中')) return <Clock className="w-3 h-3 mr-1" />
    return <AlertCircle className="w-3 h-3 mr-1" />
}

// Helper to format date (YYYY-MM-DD)
const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '日付不明'
    // Check if it's a full timestamp like 2025-10-31T00:00:00+00:00
    // If so, just take the first part
    if (dateString.includes('T')) {
        return dateString.split('T')[0]
    }
    return dateString
}

export function ReportsList({ reports }: { reports: CleaningReport[] }) {
    if (!reports || reports.length === 0) {
        return (
            <div className="text-center p-12 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">レポートがありません</h3>
                <p className="text-slate-500 dark:text-slate-400">現在表示できる清掃報告は見つかりませんでした。</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
                <Dialog key={report.id}>
                    <DialogTrigger asChild>
                        <Card
                            className="group overflow-hidden border-0 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-xl ring-1 ring-slate-200 dark:ring-slate-800"
                        >
                            {/* Header Image Area */}
                            <div className="h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                                {((report.photo_paths && report.photo_paths.length > 0) || (report.photos && report.photos.length > 0)) ? (
                                    <img
                                        src={(report.photo_paths?.[0]) || (report.photos?.[0])}
                                        alt={report.store_names || report.store_name || 'Store'}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50">
                                        <MapPin className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <Badge variant="outline" className={`backdrop-blur-md border ${getStatusColor(report.status || '未完了')}`}>
                                        {getStatusIcon(report.status || '未完了')}
                                        {report.status || '未完了'}
                                    </Badge>
                                </div>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-3">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {report.store_names || report.store_name || '店舗名不明'}
                                    </h3>
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1">
                                        <CalendarDays className="w-4 h-4 mr-1.5 opacity-70" />
                                        {formatDate(report.report_date || report.cleaning_date)}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="w-6 h-6 border bg-slate-100">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${report.cleaner_name}`} />
                                            <AvatarFallback><User className="w-3 h-3" /></AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{report.cleaner_name}</span>
                                    </div>
                                    <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                        詳細を見る &rarr;
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </DialogTrigger>

                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-slate-50 dark:bg-slate-900 border-none overflow-hidden rounded-2xl">
                        <div className="grid md:grid-cols-2 h-full">
                            {/* Left Side: Images Carousel */}
                            <div className="bg-black/5 dark:bg-black/20 p-6 flex items-center justify-center min-h-[300px] md:h-full">
                                {((report.photo_paths && report.photo_paths.length > 0) || (report.photos && report.photos.length > 0)) ? (
                                    <Carousel className="w-full max-w-xs mx-auto">
                                        <CarouselContent>
                                            {(report.photo_paths || report.photos || []).map((photo, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="p-1">
                                                        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg relative aspect-square">
                                                            <img
                                                                src={photo}
                                                                alt={`Photo ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                    </Carousel>
                                ) : (
                                    <div className="text-slate-400 flex flex-col items-center">
                                        <MapPin className="w-16 h-16 mb-2 opacity-50" />
                                        <span>No Photos</span>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Details */}
                            <div className="p-6 md:p-8 space-y-6 bg-white dark:bg-slate-900 overflow-y-auto">
                                <DialogHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className={getStatusColor(report.status || '未完了')}>
                                            {report.status || '未完了'}
                                        </Badge>
                                        <span className="text-xs text-slate-500">{formatDate(report.report_date || report.cleaning_date)}</span>
                                    </div>
                                    <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {report.store_names || report.store_name || '店舗名不明'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        清掃報告詳細
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">

                                    {/* Cleaner Info */}
                                    <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                        <Avatar className="w-10 h-10 border border-slate-200 mr-3">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${report.cleaner_name}`} />
                                            <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-xs text-slate-500">担当者</p>
                                            <p className="font-medium text-slate-900 dark:text-white">{report.cleaner_name}</p>
                                        </div>
                                    </div>

                                    {/* Note / Remarks (if available in schema) */}
                                    {/* Currently we don't assume column names, but if we had 'remarks', it would go here */}

                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" />
                                            ステータス確認
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            この報告は {report.status || 'ステータス不明'} です。
                                            {report.status === 'Completed' ? 'すべての清掃作業が完了し、報告が提出されました。' : '現在作業中または確認待ちです。'}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                    {report.report_link && (
                                        <Button variant="outline" asChild className="gap-2">
                                            <a href={report.report_link} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4" />
                                                Notionで開く
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    )
}

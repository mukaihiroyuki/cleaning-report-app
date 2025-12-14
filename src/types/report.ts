export type CleaningReport = {
    id: string
    created_at?: string
    notion_page_id?: string
    // Date fields
    report_date?: string
    cleaning_date?: string // alias for compatibility
    timestamp?: string
    // Store info
    store_names?: string // actual column name in Supabase
    store_name?: string  // alias for compatibility
    // Time and plan
    usage_time?: string
    plan_name?: string
    category?: string
    // Cleaner info
    cleaner_name?: string
    // Status
    status?: 'Completed' | 'Pending' | 'In Progress' | string
    // Photos
    photos?: string[] | null
    photo_paths?: string[] | null // actual column name in Supabase
    report_link?: string
}

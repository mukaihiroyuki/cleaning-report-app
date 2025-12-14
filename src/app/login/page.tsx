'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 shadow-2xl relative z-10 text-white">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center tracking-tight text-white">
                        Sakurai Cleaning
                    </CardTitle>
                    <CardDescription className="text-center text-slate-300">
                        管理者ログイン
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-200">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-200">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                        </div>
                        {error && (
                            <div className="text-red-300 text-sm text-center bg-red-900/20 p-2 rounded border border-red-500/20">
                                {error}
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {loading ? 'ログイン中...' : 'ログイン'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

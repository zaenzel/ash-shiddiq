import { LoginForm } from '@/domains/user'
import React from 'react'

const page = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">
                    Ringkasan Keuangan
                </h2>
                <p className="text-sm text-muted-foreground">
                    Overview pemasukan dan pengeluaran bulan ini
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border bg-card p-4">
                    Total Pemasukan
                </div>
                <div className="rounded-2xl border bg-card p-4">
                    Total Pengeluaran
                </div>
                <div className="rounded-2xl border bg-card p-4">
                    Saldo Akhir
                </div>
            </div>
        </div>
    )
}

export default page
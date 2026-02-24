import { Modal } from '@/components/shared/Modal'
import React from 'react'
import { IFinancialRecord } from '../types/financial.types'
import { useModalStore } from '@/shared/store'
import { formatDate } from '@/shared'

export const GetFinancialRecordModal = () => {
  const { isOpen, data, type } = useModalStore()

  const isLoading = isOpen && type === "GET_FINANCIAL_RECORD" && !data
  const isError = isOpen && type === "GET_FINANCIAL_RECORD" && data === null

  if (!isOpen || type !== "GET_FINANCIAL_RECORD") return null

  const record = data as IFinancialRecord
  
  return (
    <Modal size="lg" title="Detail Transaksi">
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="h-20 bg-muted rounded" />
          <div className="h-6 bg-muted rounded w-1/2" />
          <div className="h-6 bg-muted rounded w-1/4" />
        </div>
      )}

      {isError && (
        <div className="text-center py-10">
          <p className="text-destructive font-medium">
            Gagal memuat data transaksi.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Silakan coba lagi nanti.
          </p>
        </div>
      )}

      {!isLoading && !isError && record && (
        <div className="space-y-6">
          {/* Title & Type */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">{record.title}</h2>
              <p className="text-sm text-muted-foreground">
                {record.category}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${record.type === "INCOME"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {record.type === "INCOME" ? "Pemasukan" : "Pengeluaran"}
            </span>
          </div>

          {/* Amount */}
          <div className="p-4 rounded-xl bg-muted/40">
            <p className="text-sm text-muted-foreground">Nominal</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(record.amount)}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Tanggal Transaksi</p>
              <p className="font-medium">
                {new Intl.DateTimeFormat("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(record.transaction_date))}
              </p>
            </div>

            {record.created_at && (
              <div>
                <p className="text-muted-foreground">Dibuat Pada</p>
                <p className="font-medium">
                  {formatDate(record.created_at)}
                </p>
              </div>
            )}

             {record.updated_at && (
              <div>
                <p className="text-muted-foreground">Diubah Pada</p>
                <p className="font-medium">
                  {formatDate(record.updated_at)}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {record.description && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Keterangan
              </p>
              <div className="p-4 rounded-xl border bg-background text-sm leading-relaxed">
                {record.description}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

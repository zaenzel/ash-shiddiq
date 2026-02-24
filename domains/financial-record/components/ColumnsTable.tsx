"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IFinancialRecord } from "../types/financial.types"
import { ModalType } from "@/shared/store"

export const getFinancialRecordColumns = (
  openModal: (type: ModalType, payload?: any) => void
): ColumnDef<IFinancialRecord>[] => [
    {
      accessorKey: "title",
      header: "JUDUL",
    },
    {
      accessorKey: "category",
      header: "KATEGORI",
    },
    {
      accessorKey: "type",
      header: "TIPE",
      cell: ({ row }) => {
        const type = row.original.type

        return (
          <span
            className={`px-2 py-1 rounded-lg text-xs font-medium ${type === "INCOME"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
              }`}
          >
            {type === "INCOME" ? "Pemasukan" : "Pengeluaran"}
          </span>
        )
      },
    },
    {
      accessorKey: "amount",
      header: "NOMINAL",
      cell: ({ row }) => {
        const amount = row.original.amount

        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount)
      },
    },
    {
      accessorKey: "transaction_date",
      header: "TANGGAL",
      cell: ({ row }) => {
        const date = new Date(row.original.transaction_date)

        return new Intl.DateTimeFormat("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(date)
      },
    },
    {
      id: "actions",
      header: () => null,
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="flex items-center gap-2 justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => openModal('GET_FINANCIAL_RECORD', data)}
                  className="rounded-lg"
                  variant="secondary"
                  size="icon"
                >
                  <Eye size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Detail</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => openModal("UPDATE_FINANCIAL_RECORD", data)}
                  className="rounded-lg"
                  variant="outline"
                  size="icon"
                >
                  <Pencil size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => openModal("DELETE_FINANCIAL_RECORD", data)}
                  className="rounded-lg"
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Hapus</TooltipContent>
            </Tooltip>
          </div>
        )
      },
    },
  ]
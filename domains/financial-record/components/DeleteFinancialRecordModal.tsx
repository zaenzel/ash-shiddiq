"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useModalStore } from "@/shared/store"
import { Modal } from "@/components/shared/Modal"
import { ConfirmDelete } from "@/components/shared/ConfirmDelete"
import { deleteFinancialRecordService } from "@/domains/financial-record"

export const DeleteFinancialRecordModal = () => {
  const { isOpen, type, data, closeModal } = useModalStore()
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || type !== "DELETE_FINANCIAL_RECORD") return null

  const handleDelete = async () => {
    try {
      setIsLoading(true)

      await deleteFinancialRecordService(data.id)

      toast("Berhasil", {
        description: "Data berhasil dihapus",
        position: "top-center",
      })

      closeModal()
    } catch (error: any) {
      console.error(error)

      toast.error("Gagal", {
        description: "Data gagal dihapus",
        position: "top-center",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal size="sm" title="Hapus Data">
      <ConfirmDelete
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </Modal>
  )
}
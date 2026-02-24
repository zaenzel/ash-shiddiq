"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useModalStore } from "@/shared/store"

interface ConfirmDeleteProps {
    title?: string
    description?: string
    isLoading?: boolean
    onConfirm: () => Promise<void> | void
}

export function ConfirmDelete({
    description = "Data yang dihapus tidak dapat dikembalikan.",
    isLoading = false,
    onConfirm,
}: ConfirmDeleteProps) {

    const { isOpen, closeModal } = useModalStore();

    if (!isOpen) return null

    return (
        <div className="space-y-6">
            <div className="text-sm text-muted-foreground leading-relaxed">
                {description}
            </div>

            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    disabled={isLoading}
                >
                    Batal
                </Button>

                <Button
                    type="button"
                    variant="destructive"
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Menghapus...
                        </span>
                    ) : (
                        "Ya, Hapus"
                    )}
                </Button>
            </div>
        </div>
    )
}
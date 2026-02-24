"use client"

import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { IEXPENSE_CATEGORIES, IINCOME_CATEGORIES } from "@/shared/constants"
import { useEffect } from "react"

const formSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    amount: z.number().min(1),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string(),
    customCategory: z.string().optional(),
    transaction_date: z.string(),
}).superRefine((data, ctx) => {
    const categories =
        data.type === "EXPENSE"
            ? IEXPENSE_CATEGORIES
            : IINCOME_CATEGORIES;

    if (!categories.includes(data.category as any)) {
        ctx.addIssue({
            path: ["category"],
            code: z.ZodIssueCode.custom,
            message: "Kategori tidak valid",
        });
    }

    if (data.category === "OTHER" && !data.customCategory?.trim()) {
        ctx.addIssue({
            path: ["customCategory"],
            code: z.ZodIssueCode.custom,
            message: "Isi kategori lain terlebih dahulu",
        });
    }
});

type FormValues = z.infer<typeof formSchema>

interface Props {
    mode?: "create" | "edit"
    defaultValues?: Partial<FormValues>
    onSubmit: (values: FormValues) => Promise<void> | void
    isLoading?: boolean
}

export function FinancialRecordForm({
    onSubmit,
    isLoading = false,
    defaultValues
}: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "INCOME",
            ...defaultValues,
        },
    })

    const selectedType = watch("type")

    const categories =
        selectedType === "EXPENSE"
            ? IEXPENSE_CATEGORIES
            : IINCOME_CATEGORIES;

    useEffect(() => {
        if (!defaultValues) return

        const categories =
            defaultValues.type === "EXPENSE"
                ? IEXPENSE_CATEGORIES
                : IINCOME_CATEGORIES

        if (
            defaultValues.category &&
            !categories.includes(defaultValues.category as any)
        ) {
            reset({
                ...defaultValues,
                category: "OTHER",
                customCategory: defaultValues.category,
            })
        } else {
            reset(defaultValues)
        }
    }, [defaultValues, reset])

    return (
        <Card className="p-6 rounded-2xl space-y-6 w-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Judul</label>
                    <Input {...register("title")} placeholder="Contoh: Donasi Jumat" />
                    {errors.title && (
                        <p className="text-xs text-destructive">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Amount */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Nominal</label>
                    <Input
                        type="number"
                        {...register("amount", { valueAsNumber: true })}
                        placeholder="Masukkan nominal"
                    />
                    {errors.amount && (
                        <p className="text-xs text-destructive">
                            {errors.amount.message}
                        </p>
                    )}
                </div>

                {/* Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tipe</label>
                    <Select
                        value={selectedType}
                        onValueChange={(value) =>
                            setValue("type", value as "INCOME" | "EXPENSE")
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="INCOME">Pemasukan</SelectItem>
                            <SelectItem value="EXPENSE">Pengeluaran</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Category */}
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kategori</label>

                            <Select
                                onValueChange={field.onChange}
                                // defaultValue={field.value}
                                value={field.value}
                            >
                                <SelectTrigger className="h-11 rounded-xl">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>

                                <SelectContent>
                                    {
                                        categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))
                                    }

                                </SelectContent>
                                {watch("category") === "OTHER" && (
                                    <Input
                                        placeholder="Masukkan kategori lain"
                                        {...register("customCategory")}
                                    />
                                )}
                            </Select>
                        </div>
                    )}
                />

                {/* Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal Transaksi</label>
                    <Input type="date" {...register("transaction_date")} />
                    {errors.transaction_date && (
                        <p className="text-xs text-destructive">
                            {errors.transaction_date.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Keterangan (Opsional)</label>
                    <Textarea
                        {...register("description")}
                        placeholder="Tambahkan detail tambahan..."
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Menyimpan..." : "Simpan Data"}
                </Button>
            </form>
        </Card>
    )
}
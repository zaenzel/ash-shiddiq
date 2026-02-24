'use client'

import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { getFinancialRecordColumns, getFinancialRecordsService } from '@/domains/financial-record'
import { IFinancialRecord } from '@/domains/financial-record/types/financial.types'
import { useModalStore } from '@/shared/store'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

export const FINANCIAL_RECORD_DUMMY: IFinancialRecord[] = [
  {
    id: "fr-001",
    is_active: true,
    title: "Donasi Jumat Pekan 1",
    description: "Donasi jamaah setelah sholat Jumat",
    amount: 2750000,
    type: "INCOME",
    category: "Donasi",
    transaction_date: new Date("2026-02-07"),
    created_at: new Date("2026-02-07"),
    updated_at: new Date("2026-02-07"),
    created_by: "admin-001",
    updated_by: "admin-001",
  },
  {
    id: "fr-002",
    is_active: true,
    title: "Pembayaran Listrik",
    description: "Tagihan listrik bulan Januari",
    amount: 850000,
    type: "EXPENSE",
    category: "Utilitas",
    transaction_date: new Date("2026-02-10"),
    created_at: new Date("2026-02-10"),
    updated_at: new Date("2026-02-10"),
    created_by: "admin-001",
    updated_by: "admin-001",
  },
  {
    id: "fr-003",
    is_active: true,
    title: "Pembelian Karpet Sajadah",
    description: "Penggantian karpet lama ruang utama",
    amount: 3200000,
    type: "EXPENSE",
    category: "Perlengkapan",
    transaction_date: new Date("2026-02-15"),
    created_at: new Date("2026-02-15"),
    updated_at: new Date("2026-02-15"),
    created_by: "admin-002",
    updated_by: "admin-002",
  },
  {
    id: "fr-004",
    is_active: true,
    title: "Donasi Kotak Amal Harian",
    description: "Rekap kotak amal minggu kedua",
    amount: 1450000,
    type: "INCOME",
    category: "Donasi",
    transaction_date: new Date("2026-02-18"),
    created_at: new Date("2026-02-18"),
    updated_at: new Date("2026-02-18"),
    created_by: "admin-001",
    updated_by: "admin-001",
  },
  {
    id: "fr-005",
    is_active: true,
    title: "Perbaikan Sound System",
    description: "Servis mic dan amplifier",
    amount: 1200000,
    type: "EXPENSE",
    category: "Perawatan",
    transaction_date: new Date("2026-02-20"),
    created_at: new Date("2026-02-20"),
    updated_at: new Date("2026-02-20"),
    created_by: "admin-002",
    updated_by: "admin-002",
  },
]

const page = () => {
  const { openModal } = useModalStore()
  const [data, setData] = useState<IFinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const columns = getFinancialRecordColumns(openModal);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFinancialRecordsService();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className=''>
      <div className="flex w-full justify-end">
        <Button onClick={() => openModal('ADD_FINANCIAL_RECORD')}>
          <Plus />  
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default page
"use client";

import { useState } from "react";
import { useModalStore } from "@/shared/store";
import { Modal } from "../../../components/shared/Modal/Modal";
import { FinancialRecordForm, createFinancialRecordService } from "@/domains/financial-record";
import { toast } from "sonner";

export const AddFinancialRecordModal = () => {
  const { closeModal } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    const finalCategory =
      values.category === "OTHER"
        ? values.customCategory!
        : values.category;

    const payload = {
      ...values,
      category: finalCategory,
      transaction_date: new Date(values.transaction_date),
    };

    delete (payload as any).customCategory;

    try {
      setIsLoading(true);
      await createFinancialRecordService(values);
      toast(
        "Berhasil", {
        description: "Data berhasil ditambahkan",
        position: "top-center"
      }
      );
      closeModal();
    }
    catch (error) {
      toast.error(
        "Gagal", {
        description: `Data gagal ditambahkan, ${error}`,
        position: "top-center"

      }
      )
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size="lg"
      title="Tambah Catatan Keuangan">
      <FinancialRecordForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
};
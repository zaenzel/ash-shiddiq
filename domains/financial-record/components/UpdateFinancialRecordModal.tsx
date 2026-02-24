"use client";

import { useState } from "react";
import { useModalStore } from "@/shared/store";
import { Modal } from "../../../components/shared/Modal/Modal";
import { FinancialRecordForm, updateFinancialRecordService } from "@/domains/financial-record";
import { toast } from "sonner";

export const UpdateFinancialRecordModal = () => {
  const { closeModal, data } = useModalStore();
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
      await updateFinancialRecordService(data.id, values)
      toast(
        "Berhasil", {
        description: "Data berhasil diedit",
        position: "top-center"
      }
      );
      closeModal();
    }
    catch (error) {
      console.log(error);
      toast.error(
        "Gagal", {
        description: `Data gagal diedit, ${error}`,
        position: "top-center"      }
      )
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size="lg"
      title="Edit Catatan Keuangan">
      <FinancialRecordForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        defaultValues={data}
      />
    </Modal>
  );
};
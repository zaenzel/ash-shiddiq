// domains/financial-record/service/create-financial-record.service.ts

import { financialRecordRepository } from "../repository/financial-record.repository";

export const createFinancialRecordService = async (input: any) => {
  // business rule
  if (input.amount <= 0) {
    throw new Error("Amount harus lebih dari 0");
  }

  // bisa tambah logic lain di sini nanti
  return await financialRecordRepository.create(input);
};
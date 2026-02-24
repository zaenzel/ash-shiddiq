import { financialRecordRepository } from "../repository/financial-record.repository";
import { IFinancialRecord } from "../types/financial.types";

export const getFinancialRecordsService = async (): Promise<IFinancialRecord[]> => {
  const data = await financialRecordRepository.getAllActive();

  return data.map((item: any) => ({
    ...item,
    transaction_date: item.transaction_date?.toDate?.() ?? new Date(),
  }));
};
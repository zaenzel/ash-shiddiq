import { IBaseEntity } from "@/shared/entities/base.entity";

export type IFinancialRecordType = "INCOME" | "EXPENSE";

export interface IFinancialRecord extends IBaseEntity {
  title: string;
  description?: string;
  amount: number;
  type: IFinancialRecordType;
  category: string;
  transaction_date: Date;
}

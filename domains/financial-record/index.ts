/**
 * Example Domain Public API
 *
 * Export all public interfaces for this domain.
 * Components outside this domain should import from here.
 */

export { useExample } from "./hooks/useExample";
export { ExampleComponent } from "./components/ExampleComponent";
export { FinancialRecordForm } from "./components/FinancialRecordForm";
export { AddFinancialRecordModal } from "./components/AddFinancialRecordModal";
export { GetFinancialRecordModal } from "./components/GetFinancialRecordModal";
export { getFinancialRecordColumns } from "./components/ColumnsTable";
export { DeleteFinancialRecordModal } from "./components/DeleteFinancialRecordModal";

export { createFinancialRecordService } from "./services/create.api";
export { getFinancialRecordsService } from "./services/getAll.api";
export { updateFinancialRecordService } from "./services/update.api";
export { deleteFinancialRecordService } from "./services/delete.api";

export type {
  ExampleItem,
  CreateExampleItemDto,
  UpdateExampleItemDto,
} from "./types/example.types";

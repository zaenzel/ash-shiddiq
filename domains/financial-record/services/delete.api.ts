import { doc, updateDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function deleteFinancialRecordService(id: string) {
  const docRef = doc(db, "financial_records", id)

  await updateDoc(docRef, {
    is_active: false,
    updated_at: Timestamp.now(),
  })
}
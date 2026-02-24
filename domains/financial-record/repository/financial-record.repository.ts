import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export const financialRecordRepository = {
  async create(data: any) {
    return await addDoc(collection(db, "financial_records"), {
      ...data,
      is_active: true,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });
  },

  async getAllActive() {
    const q = query(
      collection(db, "financial_records"),
      where("is_active", "==", true),
      orderBy("transaction_date", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async update(id: string, data: any) {
    const docRef = doc(db, "financial_records", id);

    const finalCategory =
      data.category === "OTHER"
        ? data.customCategory?.trim() || "OTHER"
        : data.category;

    const payload = {
      title: data.title,
      description: data.description || "",
      amount: data.amount,
      type: data.type,
      category: finalCategory,
      transaction_date: Timestamp.fromDate(new Date(data.transaction_date)),
      updated_at: Timestamp.now(),
    };

    await updateDoc(docRef, payload);

    return { success: true };
  },
};

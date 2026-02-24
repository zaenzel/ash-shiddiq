"use client";

import { useState } from "react";
import { createUser } from "../services/user.api";
import { toast } from "sonner";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    try {
      setError(null);

      // 🔎 Validasi business rule
      if (!email || !password) {
        throw new Error("Email dan password wajib diisi");
      }

      if (password.length < 6) {
        throw new Error("Password minimal 6 karakter");
      }

      setLoading(true);

      await createUser(email, password);

      toast.success("Berhasil 🎉", {
        description: "Akun berhasil dibuat",
        position: "top-center",
      });

      // Tidak perlu update store manual.
      // Firebase akan trigger listener.
    } catch (err: any) {
      setError(err.message);
      toast.error("Gagal", {
        description: err.message,
        position: "top-center",
      });
      console.log(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
  };
};

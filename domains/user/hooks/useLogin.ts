"use client";

import { useState } from "react";
import { loginUser } from "../services/user.api";
import { toast } from "sonner";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
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
      
      await loginUser(email, password);
      
      toast.success("Berhasil 🎉", {
        description: "Login berhasil",
        position: "top-center",
      });
    } catch (err: any) {
      setError(err.message);
      toast.error("Gagal", {
        description: err.message,
        position: "top-center",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

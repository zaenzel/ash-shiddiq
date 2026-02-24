"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutUser } from "../services/user.api";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      toast("Berhasil logout", {
        description: "Sampai jumpa lagi 👋",
      });

      router.replace("/auth/login");
    } catch (err: any) {
      toast("Logout gagal", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

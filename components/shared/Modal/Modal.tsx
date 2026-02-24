"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useModalStore } from "@/shared/store";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
}

export const Modal = ({
  title,
  children,
  size = "md",
}: ModalProps) => {
  const { isOpen, closeModal } = useModalStore();

  // Scroll lock body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Card */}
      <div
        className={clsx(
          "relative w-full transform overflow-hidden rounded-2xl bg-white transition-all flex flex-col",
          "max-h-[90vh]",
          sizeClass
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          {title ? (
            <h2 className="text-lg font-semibold text-gray-700">
              {title}
            </h2>
          ) : (
            <div />
          )}

          <Button
            onClick={closeModal}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};
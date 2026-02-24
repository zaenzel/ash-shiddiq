"use client";

import { useEffect, useState } from "react";
import { useModalStore } from "@/shared/store";
import { NavigationModal } from "./NavigationModal";
import { AddFinancialRecordModal, DeleteFinancialRecordModal, GetFinancialRecordModal } from "@/domains/financial-record";
import { UpdateFinancialRecordModal } from "@/domains/financial-record/components/UpdateFinancialRecordModal";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { type, isOpen, data } = useModalStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isOpen || !type) return null;

    switch (type) {
        case "NAVIGATION_MODAL":
            return <NavigationModal />;

        case "ADD_FINANCIAL_RECORD":
            return (
                <AddFinancialRecordModal />
            );

        case "GET_FINANCIAL_RECORD":
            return <GetFinancialRecordModal />


        case "UPDATE_FINANCIAL_RECORD":
            return <UpdateFinancialRecordModal />


        case "DELETE_FINANCIAL_RECORD":
            return <DeleteFinancialRecordModal />

        default:
            return null;
    }
};
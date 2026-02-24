"use client"

import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { createContext, useContext, useEffect, useState } from "react"
import { CustomSidebar } from '../CustomSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Navbar } from '../Navbar'
import { ProtectedRoute } from "@/domains/user"

export interface LayoutWrapperTypes {
    children: React.ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperTypes) => {

    return (
        <ProtectedRoute>
            <SidebarProvider>
                <CustomSidebar />
                <div className='w-full container 
                mx-auto px-2 py-3 
                md:pl-2 md:pr-6 md:pt-6 max-w-6xl'>
                    <Navbar />
                    <main className='mt-4'>
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </ProtectedRoute>
    )
}

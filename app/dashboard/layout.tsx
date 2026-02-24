import { LayoutWrapper } from "@/components/shared/LayoutWrapper/LayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Company Dashboard",
    description: "Company Dashboard ICONNECT",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LayoutWrapper>
            {children}
        </LayoutWrapper>
    );
}
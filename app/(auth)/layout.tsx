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
        <div className="min-h-screen bg-[#f6f4ef] flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-neutral-800">
                        Ash Shiddiq
                    </h1>
                    {/* <p className="text-sm text-neutral-500 mt-2">
                        Sistem Keuangan Musala
                    </p> */}
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl shadow-sm p-8">
                    {children}
                </div>

                <p className="text-xs text-center text-neutral-400 mt-6">
                    © {new Date().getFullYear()} Musala Ash Shiddiq
                </p>
            </div>
        </div>
    )
}
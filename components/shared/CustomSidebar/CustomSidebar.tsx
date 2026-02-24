'use client'

import Link from "next/link"
import { User2 } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { isActiveLink, NAVIGATION_LINKS } from "@/shared/constants"
import { usePathname } from "next/navigation"

export const CustomSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className='relative'>
            <Sidebar variant="floating">
                <SidebarHeader className='text-center p-6' >
                    <h1 className='text-xl font-bold'>ASH SHIDDIQ</h1>
                </SidebarHeader>
                <SidebarContent className='px-2'>
                    <SidebarGroup>
                        <SidebarMenu>
                            {
                                NAVIGATION_LINKS.map((link) => {
                                    const active = isActiveLink(pathname, link.href);
                                    const IconComponent = link.icon;

                                    return (
                                        <SidebarMenuItem
                                            key={link.label}
                                            className={`
                                    group
                                    cursor-pointer
                                    transition-all
                                    duration-200
                                    rounded-xl
                                    `}
                                        >
                                            <SidebarMenuButton asChild className={`
                                            p-6
                                            ${active && 'bg-accent'}
                                            `
                                            }>
                                                <Link href={link.href}>
                                                    {
                                                        IconComponent && (
                                                            <IconComponent className={`${active && 'text-primary font-black'}`} />)
                                                    }
                                                    <span className={`${active && 'text-primary font-black'}`}>
                                                        {link.label}
                                                    </span>
                                                </Link>

                                            </SidebarMenuButton>


                                            {/* pake kalo ada sub menu */}
                                            {/* <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton />
                                                </SidebarMenuSubItem>
                                        </SidebarMenuSub> */}

                                        </SidebarMenuItem>
                                    )
                                })
                            }


                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <User2 />  © {new Date().getFullYear()}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar >
        </aside>
    )
}

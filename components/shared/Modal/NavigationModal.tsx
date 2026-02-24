import React from 'react'
import { Modal } from './Modal';
import { isActiveLink, NAVIGATION_LINKS } from '@/shared/constants';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useModalStore } from '@/shared/store';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/domains/user';
import { ROUTES } from '@/shared/routes';

export const NavigationModal = () => {
    const pathname = usePathname();
    const { closeModal } = useModalStore();
    const { loading, logout } = useLogout()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        closeModal()
        router.push(ROUTES.LOGIN)
    }

    return (
        <Modal title="">
            <div className="flex flex-col gap-6 items-center w-full">
                {
                    NAVIGATION_LINKS.map((link, index) => {
                        const active = isActiveLink(pathname, link.href);
                        const IconComponent = link.icon;
                        return (
                            <React.Fragment key={link.label}>
                                <Link
                                    href={link.href}
                                    onClick={closeModal}
                                    className={`
                                                group relative flex items-center gap-4 w-full p-4 
                                                rounded-2xl transition-all duration-200
                                                ${active
                                            ? 'shadow-neu-in text-primary font-black'
                                            : 'text-gray-600 hover:text-primary'
                                        }
                                        `}
                                >
                                    {/* Icon Container */}
                                    <div className={`flex items-center justify-center ${active ? 'scale-110' : ''} transition-transform`}>
                                        {IconComponent && (
                                            <IconComponent size={22} className={active ? 'text-primary' : 'text-gray-500'} />
                                        )}
                                    </div>

                                    {/* Label */}
                                    <span className="text-lg tracking-wide">
                                        {link.label}
                                    </span>
                                </Link>
                            </React.Fragment>
                        )
                    })
                }
                <Button
                    onClick={handleLogout}
                    className='w-full'
                    variant={'destructive'}
                    disabled={loading}
                >
                    {
                        loading ? 'Loading..' : 'Logout'

                    }
                </Button>
            </div>
        </Modal>
    )
}
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { SidebarLink } from "@/lib/sidebar-config"
import { motion } from "framer-motion"

interface SidebarItemProps {
    link: SidebarLink
    onClick?: () => void
}

export function SidebarItem({ link, onClick }: SidebarItemProps) {
    const pathname = usePathname()
    const isActive = pathname === link.href
    const Icon = link.icon

    const content = (
        <motion.div
            whileHover={{ x: 4 }}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
        >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{link.name}</span>
        </motion.div>
    )

    if (link.external) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className="block"
            >
                {content}
            </a>
        )
    }

    return (
        <Link href={link.href} onClick={onClick} className="block">
            {content}
        </Link>
    )
}

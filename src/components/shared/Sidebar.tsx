"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { SidebarItem } from "@/components/shared/SidebarItem"
import { sidebarConfig } from "@/lib/sidebar-config"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Sidebar() {
    return (
        <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom easing for fluid feel
            className="flex flex-col h-[calc(100vh-2rem)] sticky top-4 w-full ml-4 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-2xl shadow-xl supports-[backdrop-filter]:bg-background/40 overflow-hidden"
        >
            <ScrollArea className="flex-1 px-4 py-6">
                {/* Logo/Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 mb-6 group rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-base tracking-tight group-hover:text-primary transition-colors">
                        Geo's Stories
                    </span>
                </Link>

                {/* Navigation Groups */}
                <Accordion
                    type="multiple"
                    defaultValue={sidebarConfig.map((group) => group.title)}
                    className="space-y-4"
                >
                    {sidebarConfig.map((group) => (
                        <AccordionItem
                            key={group.title}
                            value={group.title}
                            className="border-none"
                        >
                            <AccordionTrigger className="px-4 py-2 hover:no-underline text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                                {group.title}
                            </AccordionTrigger>
                            <AccordionContent className="pb-2 pt-1">
                                <div className="space-y-1">
                                    {group.links.map((link) => (
                                        <SidebarItem key={link.href} link={link} />
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>

            {/* Theme Toggle at Bottom */}
            <div className="p-4 border-t border-white/5 bg-white/5 backdrop-blur-md">
                <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Appearance
                    </span>
                    <ThemeToggle />
                </div>
            </div>
        </motion.div>
    )
}

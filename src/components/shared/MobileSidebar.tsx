"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
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
import { Menu, Sparkles } from "lucide-react"
import Link from "next/link"

export function MobileSidebar() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <ScrollArea className="h-full px-3 py-4">
                    {/* Logo/Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 mb-4"
                        onClick={() => setOpen(false)}
                    >
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-purple-600">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-sm">GeoPortfolio</span>
                    </Link>

                    <Separator className="mb-4" />

                    {/* Navigation Groups */}
                    <Accordion
                        type="multiple"
                        defaultValue={sidebarConfig.map((group) => group.title)}
                        className="space-y-2"
                    >
                        {sidebarConfig.map((group) => (
                            <AccordionItem
                                key={group.title}
                                value={group.title}
                                className="border-none"
                            >
                                <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-accent rounded-lg text-sm font-semibold">
                                    {group.title}
                                </AccordionTrigger>
                                <AccordionContent className="pb-2 pt-1">
                                    <div className="space-y-1">
                                        {group.links.map((link) => (
                                            <SidebarItem
                                                key={link.href}
                                                link={link}
                                                onClick={() => setOpen(false)}
                                            />
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Theme Toggle */}
                    <div className="mt-6 pt-4 border-t">
                        <div className="flex items-center justify-between px-3">
                            <span className="text-sm font-medium text-muted-foreground">
                                Theme
                            </span>
                            <ThemeToggle />
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

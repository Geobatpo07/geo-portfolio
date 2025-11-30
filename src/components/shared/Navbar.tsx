"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { MobileSidebar } from "@/components/shared/MobileSidebar"
import { Sparkles } from "lucide-react"

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40">
            <div className="container flex h-16 items-center justify-between">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-8 flex items-center space-x-3 group">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="hidden font-bold text-lg tracking-tight sm:inline-block group-hover:text-primary transition-colors">
                            Geo's Stories
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-2 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-primary relative group",
                                    pathname === item.href ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex md:hidden">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Geo's Stories</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <ThemeToggle />
                    <MobileSidebar />
                </div>
            </div>
        </header>
    )
}

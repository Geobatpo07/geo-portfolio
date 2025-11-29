"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Email", href: "mailto:email@example.com", icon: Mail },
]

const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
]

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">GeoPortfolio</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Building the future with data science, machine learning, and analytics.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all hover:-translate-y-1"
                                        aria-label={link.name}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Newsletter or CTA */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground">
                            Follow my journey in data science and engineering.
                        </p>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">
                        Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by{" "}
                        <Link href="/" className="font-medium hover:text-primary transition-colors">
                            Geo
                        </Link>
                    </p>
                    <p>
                        © {new Date().getFullYear()} GeoPortfolio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

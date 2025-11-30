"use client"

import { Github, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-muted-foreground/10 bg-background/50 backdrop-blur-sm">
            <div className="container flex flex-col items-center justify-center gap-4 py-6 md:flex-row md:justify-between">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Geo's Stories. All rights reserved.
                </p>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/geobatpo07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="h-4 w-4" />
                    </a>
                    <a
                        href="https://linkedin.com/in/geobatpo07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

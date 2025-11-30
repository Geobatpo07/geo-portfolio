"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function AuthorProfile() {
    return (
        <div className="flex items-center gap-6 p-8 rounded-2xl bg-muted/30 border mt-16">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarImage src="/avatar.png" alt="Geovany" />
                <AvatarFallback>GP</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Written by Geovany</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Data Science & Analytics Engineer passionate about building scalable systems and solving complex problems with data.
                </p>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="https://github.com/geobatpo07" target="_blank">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="https://linkedin.com/in/geobatpo07" target="_blank">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

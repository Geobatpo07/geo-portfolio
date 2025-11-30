"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TOCItem {
    id: string
    text: string
    level: number
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([])
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("article h2, article h3"))
            .map((elem, index) => {
                if (!elem.id) {
                    elem.id = `heading-${index}`
                }
                return {
                    id: elem.id,
                    text: elem.textContent || "",
                    level: Number(elem.tagName.substring(1)),
                }
            })
        setHeadings(elements)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "0% 0% -80% 0%" }
        )

        elements.forEach((elem) => {
            const el = document.getElementById(elem.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    if (headings.length === 0) return null

    return (
        <nav className="sticky top-24 hidden xl:block w-64 pl-8 border-l">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                On This Page
            </h4>
            <ul className="space-y-3 text-sm">
                {headings.map((heading, index) => (
                    <li
                        key={`${heading.id}-${index}`}
                        style={{ paddingLeft: (heading.level - 2) * 16 }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block transition-colors hover:text-primary line-clamp-1",
                                activeId === heading.id
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

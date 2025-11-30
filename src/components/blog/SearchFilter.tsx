"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchFilterProps {
    tags: string[]
    onSearch: (query: string) => void
    onTagSelect: (tag: string | null) => void
    selectedTag: string | null
}

export function SearchFilter({ tags, onSearch, onTagSelect, selectedTag }: SearchFilterProps) {
    const [query, setQuery] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        onSearch(newQuery)
    }

    const clearSearch = () => {
        setQuery("")
        onSearch("")
    }

    return (
        <div className="space-y-6 mb-12">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search articles..."
                    value={query}
                    onChange={handleInputChange}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-2 focus:border-primary transition-all"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge
                    variant={selectedTag === null ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
                    onClick={() => onTagSelect(null)}
                >
                    All
                </Badge>
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className={cn(
                            "cursor-pointer transition-colors px-4 py-2 text-sm",
                            selectedTag === tag
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                        )}
                        onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    )
}

"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    className?: string
}

export function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
    return (
        <div className={cn("border rounded-lg overflow-hidden bg-white dark:bg-black", className)}>
            <Tabs defaultValue="write" className="w-full">
                <div className="border-b px-4 py-2 bg-muted/20">
                    <TabsList>
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="write" className="p-0 m-0">
                    <Textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Write your post content here using Markdown..."
                        className="min-h-[500px] border-0 focus-visible:ring-0 rounded-none resize-y p-4 font-mono"
                    />
                </TabsContent>
                <TabsContent value="preview" className="p-0 m-0">
                    <div className="prose dark:prose-invert max-w-none p-6 min-h-[500px] overflow-y-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {value || "*Nothing to preview*"}
                        </ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

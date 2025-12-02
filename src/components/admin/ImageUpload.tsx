"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const supabase = createClient()

    async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setUploading(true)
            const file = event.target.files?.[0]
            if (!file) return

            const fileExt = file.name.split(".").pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from("blog-images")
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath)
            onChange(data.publicUrl)
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Error uploading image")
        } finally {
            setUploading(false)
        }
    }

    if (value) {
        return (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                <div className="absolute top-2 right-2 z-10">
                    <Button type="button" onClick={onRemove} variant="destructive" size="icon">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <Image
                    fill
                    src={value}
                    alt="Cover Image"
                    className="object-cover"
                />
            </div>
        )
    }

    return (
        <div className="w-full h-64 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800">
                <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="text-center">
                <Button disabled={uploading} variant="secondary" className="relative">
                    {uploading ? "Uploading..." : "Upload Cover Image"}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                    />
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                    SVG, PNG, JPG or GIF (max. 2MB)
                </p>
            </div>
        </div>
    )
}

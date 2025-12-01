"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Send, User2, Mail, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react"

export function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // 🔥 FIX: Capture the form BEFORE async operations
        const form = event.currentTarget

        setLoading(true)
        setError(null)
        setSuccess(false)

        const formData = new FormData(form)
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Something went wrong")
            }

            setSuccess(true)

            // 🔥 FIX: Use stored "form" reference (never null)
            form.reset()

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send message")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-2 hover:border-primary/30 transition-all backdrop-blur-sm bg-background/70">
            <CardHeader>
                <CardTitle className="text-2xl">Send me a message</CardTitle>
                <CardDescription>
                    I’d love to hear from you. Whether it’s a project, a collaboration, or a question—reach out anytime.
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">

                    {/* Success */}
                    {success && (
                        <div className="p-3 rounded-md bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/20 flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Message sent successfully! I'll get back to you soon.</span>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="p-3 rounded-md bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none">
                            Name
                        </label>
                        <div className="relative">
                            <User2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                                disabled={loading}
                                className="pl-10 border-2 focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                required
                                disabled={loading}
                                className="pl-10 border-2 focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none">
                            Message
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Tell me about your project or inquiry..."
                                required
                                disabled={loading}
                                className="min-h-[150px] pl-10 border-2 focus:border-primary transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                        You can also reach me via LinkedIn or email.
                    </p>
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

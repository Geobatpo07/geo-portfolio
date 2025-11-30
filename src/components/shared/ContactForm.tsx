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
import { Send, User2, Mail, MessageSquare } from "lucide-react"

export function ContactForm() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        // TODO: Connect to email API, FormSubmit, Resend, etc.
        setTimeout(() => {
            setLoading(false)
            alert("Message sent successfully! I'll get back to you soon.")
        }, 800)
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

                    {/* Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none"
                        >
                            Name
                        </label>
                        <div className="relative">
                            <User2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="name"
                                placeholder="Your name"
                                required
                                className="pl-10 border-2 focus:border-primary transition-colors acted"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                required
                                className="pl-10 border-2 focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label
                            htmlFor="message"
                            className="text-sm font-medium leading-none"
                        >
                            Message
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                                id="message"
                                placeholder="Tell me about your project or inquiry..."
                                required
                                className="min-h-[150px] pl-10 border-2 focus:border-primary transition-colors resize-none"
                            />
                        </div>
                    </div>

                    {/* Contact hint */}
                    <p className="text-xs text-muted-foreground text-center">
                        You can also reach me via LinkedIn or email.
                    </p>
                </CardContent>

                {/* Submit */}
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

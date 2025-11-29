"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

export function ContactForm() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // Handle form submission here (e.g., send to API or service)
        alert("Thank you for your message! (This is a demo)")
    }

    return (
        <Card className="border-2 hover:border-primary/30 transition-all">
            <CardHeader>
                <CardTitle className="text-2xl">Send me a message</CardTitle>
                <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Name
                        </label>
                        <Input
                            id="name"
                            placeholder="Your name"
                            required
                            className="border-2 focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                            className="border-2 focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Message
                        </label>
                        <Textarea
                            id="message"
                            placeholder="Tell me about your project or inquiry..."
                            required
                            className="min-h-[150px] border-2 focus:border-primary transition-colors resize-none"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                        size="lg"
                    >
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

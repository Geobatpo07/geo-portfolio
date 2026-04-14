"use client"

import { useState } from "react"
import { ContactForm } from "@/components/shared/ContactForm"
import { CalendlyBookingCard } from "@/components/shared/CalendlyBookingCard"
import { CalendarClock, Github, Linkedin, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"

const socialLinks = [
    {
        name: "Email",
        href: "mailto:lgeobatpo98@gmail.com",
        icon: Mail,
        label: "lgeobatpo98@gmail.com",
        color: "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/geobatpo07",
        icon: Linkedin,
        label: "Connect on LinkedIn",
        color: "hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50"
    },
    {
        name: "GitHub",
        href: "https://github.com/geobatpo07",
        icon: Github,
        label: "Follow on GitHub",
        color: "hover:bg-purple-500/10 hover:text-purple-500 hover:border-purple-500/50"
    }
]

export default function ContactPage() {
    const [contactMode, setContactMode] = useState<"message" | "meeting">("message")

    return (
        <div className="container py-16 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-12 text-center"
            >
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Let&apos;s <span className="gradient-text">Connect</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have a project in mind or just want to chat? Feel free to reach out through any of these channels.
                </p>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-5 mt-16">
                {/* Contact Methods - Left Side */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-primary" />
                            Get in Touch
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {socialLinks.map((link, index) => {
                            const Icon = link.icon
                            return (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-start h-auto py-4 px-6 border-2 transition-all duration-300 ${link.color}`}
                                        asChild
                                    >
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            <Icon className="mr-3 h-5 w-5" />
                                            <div className="text-left">
                                                <div className="font-semibold">{link.name}</div>
                                                <div className="text-sm text-muted-foreground">{link.label}</div>
                                            </div>
                                        </a>
                                    </Button>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Decorative Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-primary/20">
                            <h3 className="font-semibold mb-2">Quick Response</h3>
                            <p className="text-sm text-muted-foreground">
                                I typically respond within 24-48 hours. For urgent matters, please reach out via email.
                            </p>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Contact Form - Right Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-3 space-y-6"
                >
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background/90 to-background/70 p-4 md:p-6 backdrop-blur-sm">
                        <div className="space-y-5">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-1.5">
                                <div className="grid grid-cols-2 gap-1.5">
                                    <Button
                                        type="button"
                                        variant={contactMode === "message" ? "default" : "ghost"}
                                        className={`rounded-xl ${contactMode === "message" ? "gradient-primary text-white" : "text-foreground/80 hover:text-foreground"}`}
                                        onClick={() => setContactMode("message")}
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Write a message
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={contactMode === "meeting" ? "default" : "ghost"}
                                        className={`rounded-xl ${contactMode === "meeting" ? "gradient-primary text-white" : "text-foreground/80 hover:text-foreground"}`}
                                        onClick={() => setContactMode("meeting")}
                                    >
                                        <CalendarClock className="mr-2 h-4 w-4" />
                                        Book a meeting
                                    </Button>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {contactMode === "message" ? (
                                    <motion.div
                                        key="message-mode"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <ContactForm embedded />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="meeting-mode"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <CalendlyBookingCard embedded />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

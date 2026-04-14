"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, CalendarClock, Sparkles, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"

const calendlyUrl = "https://calendly.com/geobatpo07/30-minutes-de-causerie"
const calendlyEmbedUrl = `${calendlyUrl}?hide_gdpr_banner=1&primary_color=6366f1`

type CalendlyBookingCardProps = {
    embedded?: boolean
}

export function CalendlyBookingCard({ embedded = false }: CalendlyBookingCardProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className={`relative overflow-hidden ${embedded ? "rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/5 via-sky-500/5 to-fuchsia-500/5 p-4 md:p-5" : "rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-fuchsia-500/10 p-5 md:p-7"}`}
        >
            <div className="pointer-events-none absolute -top-10 -right-6 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-cyan-500/15 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5">
                <div className="inline-flex w-fit items-center rounded-full border border-indigo-300/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    Talk Data, Strategy, and Ideas
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        Book a 30-minute strategy call
                    </h2>
                    <p className="text-sm text-foreground/80 md:text-base">
                        A focused, no-friction conversation to discuss your data project, research idea, or collaboration opportunity.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                        <Timer className="mr-2 h-3.5 w-3.5 text-indigo-300" />
                        30 minutes
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                        <CalendarClock className="mr-2 h-3.5 w-3.5 text-indigo-300" />
                        Live availability
                    </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-2 backdrop-blur-sm">
                    <iframe
                        title="Calendly booking"
                        src={calendlyEmbedUrl}
                        width="100%"
                        height={embedded ? "920" : "1120"}
                        className="w-full rounded-xl"
                    />
                </div>

                <div className="flex justify-end">
                    <Button asChild className="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 text-white hover:from-indigo-500 hover:to-cyan-500">
                        <a href={calendlyUrl} target="_blank" rel="noreferrer">
                            Open in Calendly
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </motion.section>
    )
}

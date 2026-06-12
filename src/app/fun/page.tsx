"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Camera,
    Music2,
    Palette,
    MapPin,
    Sparkles,
    BookOpen,
    Heart,
    Coffee,
    Piano,
    Video,
} from "lucide-react"
import { motion } from "framer-motion"

const artisticActivities = [
    {
        title: "Visual creativity",
        description:
            "Photography, graphic compositions, and color exploration to capture everyday moods and atmospheres.",
        icon: Camera,
        tags: ["Photography", "Composition", "Color"],
    },
    {
        title: "Cultural experiences",
        description:
            "Exhibitions, concerts, gallery openings, and moments that recharge my inspiration through other forms of expression.",
        icon: Music2,
        tags: ["Concerts", "Exhibitions", "Culture"],
    },
    {
        title: "Creative notebook",
        description:
            "Sketches, notes, personal project ideas, and small experiments in writing or design.",
        icon: Palette,
        tags: ["Sketches", "Notes", "Ideas"],
    },
]

const pianoVideos = [
    {
        title: "River Flows in You",
        composer: "Yiruma",
        description:
            "Piano cover performance recorded by Geovany.",
        src: "/fun/river-flows-in-you-yiruma-geovany.mp4",
    },
]

const outings = [
    "City walks to discover new places and observe architecture.",
    "Hangouts with friends around a good meal, coffee, or a concert.",
    "Short getaways to clear my mind, walk, and take photos.",
    "Simple moments that keep a healthy balance between work, study, and personal life.",
]

const extraActivities = [
    "Reading books about creativity, science, and life journeys.",
    "Joining community or academic events.",
    "Continuing to learn outside of work.",
    "Taking offline time to reflect, write, and imagine what comes next.",
]

export default function FunPage() {
    return (
        <div className="container py-16 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 mb-12"
            >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20">
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">Fun Corner</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    A more <span className="gradient-text">personal side</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl">
                    This space highlights what keeps me balanced outside of work: artistic activities,
                    outings, discoveries, and small moments that keep creativity moving every day.
                </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all">
                            <div className="h-2 bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400" />
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Palette className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Artistic activities</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                {artisticActivities.map((item, index) => {
                                    const Icon = item.icon

                                    return (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, y: 14 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="rounded-2xl border bg-muted/30 p-5 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                {item.description}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {item.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all">
                            <div className="h-2 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500" />
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Piano className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Piano performances</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {pianoVideos.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="rounded-2xl border bg-background/70 p-5 hover:bg-background/90 transition-colors"
                                    >
                                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Video className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{item.composer}</p>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {item.description}
                                        </p>
                                        <div className="mt-4 overflow-hidden rounded-xl border bg-black">
                                            <video
                                                className="h-auto w-full"
                                                controls
                                                preload="metadata"
                                            >
                                                <source src={item.src} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                    >
                        <Card className="border-2 hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Outings & discoveries</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {outings.map((item, index) => (
                                        <motion.li
                                            key={item}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.08 }}
                                            className="flex items-start gap-3 text-muted-foreground"
                                        >
                                            <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-2 hover:border-primary/30 transition-all bg-gradient-to-br from-primary/10 via-transparent to-fuchsia-500/10">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Heart className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>What else matters</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    Between projects, I like to keep room for curiosity, rest, and the people and
                                    experiences that bring energy back.
                                </p>
                                <Separator />
                                <div className="space-y-3">
                                    {extraActivities.map((item, index) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, y: 8 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.08 }}
                                            className="rounded-xl border bg-background/70 px-4 py-3 text-sm text-muted-foreground"
                                        >
                                            {item}
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                    >
                        <Card className="border-2 hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Coffee className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Why this page exists</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    This section shows a more personal side of the portfolio, keeping the tone simple,
                                    warm, and consistent with the rest of the site.
                                </p>
                                <p>
                                    It can grow over time with videos, photos, albums, events, or even a small journal
                                    of outings and discoveries.
                                </p>
                                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted/40 text-foreground">
                                    <BookOpen className="mr-2 h-3.5 w-3.5" />
                                    Piano videos now live
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
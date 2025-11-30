"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function TextSimilarityDemo() {
    const [text1, setText1] = useState("Machine learning is fascinating")
    const [text2, setText2] = useState("AI is very interesting")
    const [similarity, setSimilarity] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    const calculateSimilarity = () => {
        setLoading(true)
        // Simulate API call / calculation
        setTimeout(() => {
            // Simple Jaccard similarity simulation for demo
            const set1 = new Set(text1.toLowerCase().split(" "))
            const set2 = new Set(text2.toLowerCase().split(" "))
            const intersection = new Set([...set1].filter(x => set2.has(x)))
            const union = new Set([...set1, ...set2])
            const score = (intersection.size / union.size) * 100 + (Math.random() * 20) // Add some randomness for "AI" feel

            setSimilarity(Math.min(100, Math.max(0, score)))
            setLoading(false)
        }, 800)
    }

    return (
        <Card className="w-full max-w-2xl mx-auto my-8">
            <CardHeader>
                <CardTitle>Text Similarity Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Text A</label>
                        <Input value={text1} onChange={(e) => setText1(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Text B</label>
                        <Input value={text2} onChange={(e) => setText2(e.target.value)} />
                    </div>
                </div>

                <Button onClick={calculateSimilarity} disabled={loading} className="w-full">
                    {loading ? "Calculating..." : "Compare Texts"}
                </Button>

                {similarity !== null && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Similarity Score</span>
                            <span className="font-bold">{similarity.toFixed(1)}%</span>
                        </div>
                        <Progress value={similarity} className="h-2" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, RefreshCw } from "lucide-react"

export function MLDemo() {
    const [inputText, setInputText] = useState("")
    const [prediction, setPrediction] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handlePredict = () => {
        if (!inputText) return
        setLoading(true)
        // Simulate ML inference
        setTimeout(() => {
            const sentiments = ["Positive", "Negative", "Neutral"]
            const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
            setPrediction(randomSentiment)
            setLoading(false)
        }, 1000)
    }

    return (
        <Card className="my-8 border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Sentiment Analysis Demo
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Type something to analyze..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="bg-background"
                    />
                    <Button onClick={handlePredict} disabled={loading || !inputText}>
                        {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Analyze"}
                    </Button>
                </div>

                {prediction && (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                        <span className="text-sm font-medium">Prediction:</span>
                        <Badge
                            variant={prediction === "Positive" ? "default" : prediction === "Negative" ? "destructive" : "secondary"}
                            className="text-base px-4 py-1"
                        >
                            {prediction}
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, RefreshCw } from "lucide-react"

type Sentiment = "Positive" | "Negative" | "Neutral"

export function MLDemo() {
  const [inputText, setInputText] = useState("")
  const [enrichmentJson, setEnrichmentJson] = useState(
    `[{"text":"i really love this","label":"Positive"}]`
  )
  const [prediction, setPrediction] = useState<Sentiment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setPrediction(null)
    setError(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          enrichmentData: enrichmentJson.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed")
      }

      setPrediction(data.prediction)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error")
    } finally {
      setLoading(false)
    }
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
            onChange={(e) => {
              setInputText(e.target.value)
              setPrediction(null)
              setError(null)
            }}
            className="bg-background"
          />

          <Button onClick={handlePredict} disabled={loading || !inputText.trim()}>
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              "Analyze"
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="font-medium">Model enrichment JSON</span>
            <span className="text-muted-foreground">
              Array of {`{ text, label }`} entries in English
            </span>
          </div>

          <Textarea
            value={enrichmentJson}
            onChange={(e) => setEnrichmentJson(e.target.value)}
            placeholder='[{"text":"great product","label":"Positive"}]'
            className="min-h-28 bg-background font-mono text-sm"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {prediction && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <span className="text-sm font-medium">Prediction:</span>
            <Badge
              variant={
                prediction === "Positive"
                  ? "default"
                  : prediction === "Negative"
                  ? "destructive"
                  : "secondary"
              }
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
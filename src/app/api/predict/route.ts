import { NextResponse } from "next/server"

type Sentiment = "Positive" | "Negative" | "Neutral"

type TrainingExample = {
  text: string
  label: Sentiment
}

type RequestBody = {
  text?: unknown
  enrichmentData?: unknown
}

const trainingData: TrainingExample[] = [
  { text: "i love this product", label: "Positive" },
  { text: "this is amazing and awesome", label: "Positive" },
  { text: "what a great experience", label: "Positive" },
  { text: "very good and excellent", label: "Positive" },
  { text: "i am happy with the result", label: "Positive" },
  { text: "this is nice and wonderful", label: "Positive" },

  { text: "i hate this", label: "Negative" },
  { text: "this is terrible and awful", label: "Negative" },
  { text: "what a bad experience", label: "Negative" },
  { text: "this is the worst product", label: "Negative" },
  { text: "i am sad and angry", label: "Negative" },
  { text: "very poor quality", label: "Negative" },

  { text: "it is okay", label: "Neutral" },
  { text: "this is average", label: "Neutral" },
  { text: "nothing special", label: "Neutral" },
  { text: "it works as expected", label: "Neutral" },
  { text: "this is normal", label: "Neutral" },
  { text: "fine and acceptable", label: "Neutral" },
]

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
}

function trainNaiveBayes(data: TrainingExample[]) {
  const classDocCounts: Record<Sentiment, number> = {
    Positive: 0,
    Negative: 0,
    Neutral: 0,
  }

  const wordCounts: Record<Sentiment, Record<string, number>> = {
    Positive: {},
    Negative: {},
    Neutral: {},
  }

  const totalWordsInClass: Record<Sentiment, number> = {
    Positive: 0,
    Negative: 0,
    Neutral: 0,
  }

  const vocabulary = new Set<string>()

  for (const example of data) {
    classDocCounts[example.label] += 1
    const tokens = tokenize(example.text)

    for (const token of tokens) {
      vocabulary.add(token)
      wordCounts[example.label][token] =
        (wordCounts[example.label][token] || 0) + 1
      totalWordsInClass[example.label] += 1
    }
  }

  return {
    classDocCounts,
    wordCounts,
    totalWordsInClass,
    vocabulary,
    totalDocs: data.length,
  }
}

function isSentiment(value: unknown): value is Sentiment {
  return value === "Positive" || value === "Negative" || value === "Neutral"
}

function parseEnrichmentData(value: unknown): TrainingExample[] {
  if (value == null) {
    return []
  }

  const parsedValue = typeof value === "string" ? JSON.parse(value) : value

  if (!Array.isArray(parsedValue)) {
    throw new Error("enrichmentData must be a JSON array")
  }

  return parsedValue.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`enrichmentData[${index}] must be an object`)
    }

    const entry = item as { text?: unknown; label?: unknown }
    const text = typeof entry.text === "string" ? entry.text.trim() : ""

    if (!text) {
      throw new Error(`enrichmentData[${index}].text is required`)
    }

    if (!isSentiment(entry.label)) {
      throw new Error(
        `enrichmentData[${index}].label must be Positive, Negative, or Neutral`
      )
    }

    return {
      text,
      label: entry.label,
    }
  })
}

function predictSentiment(text: string): Sentiment {
  const model = trainNaiveBayes(trainingData)
  const tokens = tokenize(text)
  const classes: Sentiment[] = ["Positive", "Negative", "Neutral"]
  const vocabSize = model.vocabulary.size

  let bestClass: Sentiment = "Neutral"
  let bestScore = -Infinity

  for (const label of classes) {
    const prior =
      Math.log(model.classDocCounts[label] / model.totalDocs)

    let logProbability = prior

    for (const token of tokens) {
      const tokenCount = model.wordCounts[label][token] || 0

      const conditionalProbability =
        (tokenCount + 1) /
        (model.totalWordsInClass[label] + vocabSize)

      logProbability += Math.log(conditionalProbability)
    }

    if (logProbability > bestScore) {
      bestScore = logProbability
      bestClass = label
    }
  }

  return bestClass
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody
    const text = typeof body.text === "string" ? body.text.trim() : ""
    const enrichmentData = parseEnrichmentData(body.enrichmentData)

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    const model = trainNaiveBayes([...trainingData, ...enrichmentData])
    const prediction = predictSentimentWithModel(text, model)

    return NextResponse.json({ prediction })
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Invalid request",
      },
      { status: 400 }
    )
  }
}

function predictSentimentWithModel(text: string, model: ReturnType<typeof trainNaiveBayes>): Sentiment {
  const tokens = tokenize(text)
  const classes: Sentiment[] = ["Positive", "Negative", "Neutral"]
  const vocabSize = model.vocabulary.size

  let bestClass: Sentiment = "Neutral"
  let bestScore = -Infinity

  for (const label of classes) {
    const prior = Math.log(model.classDocCounts[label] / model.totalDocs)

    let logProbability = prior

    for (const token of tokens) {
      const tokenCount = model.wordCounts[label][token] || 0

      const conditionalProbability =
        (tokenCount + 1) / (model.totalWordsInClass[label] + vocabSize)

      logProbability += Math.log(conditionalProbability)
    }

    if (logProbability > bestScore) {
      bestScore = logProbability
      bestClass = label
    }
  }

  return bestClass
}
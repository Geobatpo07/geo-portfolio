import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, Lightbulb, Quote } from "lucide-react"

interface CalloutProps {
    type?: "default" | "warning" | "danger" | "info" | "success" | "tip" | "quote"
    title?: string
    children: React.ReactNode
}

export function Callout({ type = "default", title, children }: CalloutProps) {
    const icons = {
        default: Info,
        warning: AlertCircle,
        danger: AlertCircle,
        info: Info,
        success: CheckCircle2,
        tip: Lightbulb,
        quote: Quote,
    }

    const Icon = icons[type] || Info

    return (
        <div
            className={cn(
                "my-6 flex items-start rounded-md border p-4 transition-all hover:shadow-sm",
                {
                    "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/20": type === "info",
                    "border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-950/20": type === "warning",
                    "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20": type === "danger",
                    "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20": type === "success",
                    "border-purple-200 bg-purple-50 dark:border-purple-900/50 dark:bg-purple-950/20": type === "tip",
                    "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50": type === "default",
                    "border-l-4 border-primary bg-muted/50 italic": type === "quote",
                }
            )}
        >
            {type !== "quote" && <Icon className="mt-0.5 h-5 w-5 shrink-0 mr-3 opacity-80" />}
            <div className="flex-1">
                {title && <h5 className="mb-2 font-medium leading-none tracking-tight">{title}</h5>}
                <div className="text-sm [&>p]:leading-relaxed">{children}</div>
            </div>
        </div>
    )
}

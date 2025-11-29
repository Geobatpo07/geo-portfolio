"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface SkillBadgeProps {
    name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Badge
                variant="secondary"
                className="text-sm py-1.5 px-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default border border-transparent hover:border-primary/50"
            >
                {name}
            </Badge>
        </motion.div>
    )
}

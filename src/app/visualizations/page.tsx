"use client"

import { motion } from "framer-motion"
import { CycloneChart } from "@/components/visualizations/CycloneChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Activity } from "lucide-react"

export default function VisualizationsPage() {
    return (
        <div className="container py-16 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-12"
            >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20">
                    <BarChart3 className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">Data Visualizations</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Interactive <span className="gradient-text">Visualizations</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl">
                    Explore interactive data visualizations and scientific computing demonstrations showcasing mathematical modeling and data analysis techniques.
                </p>
            </motion.div>

            <div className="space-y-8">
                {/* Cyclone Modeling Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="border-2 hover:border-primary/30 transition-all">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Activity className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">Cyclone Radial Profile</CardTitle>
                            </div>
                            <CardDescription>
                                Mathematical modeling of cyclone dynamics using ODE/PDE numerical solutions.
                                This visualization demonstrates the radial velocity profile near the cyclone's eye.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CycloneChart />
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Placeholder for Future Visualizations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid gap-6 md:grid-cols-2"
                >
                    <Card className="border-2 border-dashed hover:border-primary/30 transition-all">
                        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                            <TrendingUp className="h-12 w-12 text-muted-foreground/50 mb-4" />
                            <h3 className="font-semibold mb-2">Time Series Analysis</h3>
                            <p className="text-sm text-muted-foreground">
                                Coming soon: Interactive time series forecasting and anomaly detection visualizations
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-dashed hover:border-primary/30 transition-all">
                        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                            <BarChart3 className="h-12 w-12 text-muted-foreground/50 mb-4" />
                            <h3 className="font-semibold mb-2">ML Model Performance</h3>
                            <p className="text-sm text-muted-foreground">
                                Coming soon: Interactive dashboards for model evaluation and feature importance
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

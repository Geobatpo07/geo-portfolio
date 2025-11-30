"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag, FileText } from "lucide-react"
import Link from "next/link"

export default function HaitiClimateModelingPage() {
    return (
        <div className="container py-16 max-w-4xl">
            <Button
                variant="ghost"
                asChild
                className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
            >
                <Link href="/case-studies">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
                </Link>
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Header */}
                <div className="space-y-4">
                    <Badge variant="outline">Scientific Research</Badge>

                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Mathematical Modeling of Haiti's Tropical Climate
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>2025-11-25</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Research Project</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {["Mathematics", "Climate Science", "ODE/PDE", "Scientific Computing", "Python"].map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <Card className="border-2">
                    <CardContent className="pt-6 prose dark:prose-invert max-w-none">
                        <h2>Executive Summary</h2>
                        <p>
                            This case study explores the application of mathematical modeling techniques to understand and simulate
                            the tropical climate dynamics of Haiti. Using Ordinary Differential Equations (ODEs) and Partial Differential
                            Equations (PDEs), we developed computational models to analyze temperature variations, precipitation patterns,
                            and seasonal climate shifts characteristic of Haiti's tropical environment.
                        </p>

                        <h2>Problem Statement</h2>
                        <p>
                            Haiti's tropical climate is influenced by complex interactions between atmospheric pressure systems,
                            ocean currents, topographical features, and seasonal weather patterns. Understanding these dynamics is
                            critical for:
                        </p>
                        <ul>
                            <li>Predicting seasonal rainfall and drought patterns</li>
                            <li>Supporting agricultural planning and disaster preparedness</li>
                            <li>Analyzing long-term climate trends and variability</li>
                            <li>Informing policy decisions related to environmental sustainability</li>
                        </ul>

                        <h2>Methodology</h2>

                        <h3>1. Mathematical Framework</h3>
                        <p>
                            The climate model was built using a system of coupled differential equations representing:
                        </p>
                        <ul>
                            <li><strong>Temperature Dynamics</strong>: Heat transfer equations modeling solar radiation absorption,
                                atmospheric convection, and surface-atmosphere energy exchange</li>
                            <li><strong>Precipitation Modeling</strong>: Moisture transport equations incorporating evaporation,
                                condensation, and rainfall mechanisms</li>
                            <li><strong>Pressure Systems</strong>: Atmospheric pressure gradients driving wind patterns and
                                tropical storm formation</li>
                        </ul>

                        <h3>2. Numerical Methods</h3>
                        <p>
                            To solve the governing equations, we implemented several numerical techniques:
                        </p>
                        <ul>
                            <li><strong>Finite Difference Methods</strong>: For spatial discretization of PDEs</li>
                            <li><strong>Runge-Kutta Schemes</strong>: For time-stepping in ODE systems</li>
                            <li><strong>Implicit Solvers</strong>: For handling stiff equations in atmospheric dynamics</li>
                            <li><strong>Adaptive Mesh Refinement</strong>: To capture fine-scale climate features</li>
                        </ul>

                        <h3>3. Data Sources</h3>
                        <p>
                            The model was calibrated and validated using:
                        </p>
                        <ul>
                            <li>Historical climate data from Haitian meteorological stations</li>
                            <li>Satellite-based temperature and precipitation measurements</li>
                            <li>Reanalysis datasets (ERA5, NCEP/NCAR)</li>
                            <li>Topographical and land-use data</li>
                        </ul>

                        <h2>Technical Implementation</h2>
                        <p>
                            The computational model was developed in <strong>Python</strong> using:
                        </p>
                        <ul>
                            <li><strong>NumPy/SciPy</strong>: For numerical computations and ODE/PDE solvers</li>
                            <li><strong>Matplotlib/Seaborn</strong>: For visualization of climate patterns</li>
                            <li><strong>Pandas</strong>: For data preprocessing and time-series analysis</li>
                            <li><strong>Custom Solvers</strong>: Tailored numerical schemes for specific climate equations</li>
                        </ul>

                        <h2>Key Findings</h2>
                        <ul>
                            <li>The model successfully reproduced Haiti's bimodal rainfall pattern with peaks in May and October</li>
                            <li>Temperature variations showed strong correlation with elevation and coastal proximity</li>
                            <li>Seasonal transitions were accurately captured through the differential equation framework</li>
                            <li>The model identified critical sensitivity to initial conditions in precipitation forecasting</li>
                        </ul>

                        <h2>Challenges & Solutions</h2>

                        <h3>Challenge 1: Data Scarcity</h3>
                        <p>
                            <strong>Problem</strong>: Limited availability of high-resolution climate data for Haiti.<br />
                            <strong>Solution</strong>: Combined multiple data sources and used statistical interpolation techniques
                            to fill gaps in the observational record.
                        </p>

                        <h3>Challenge 2: Computational Complexity</h3>
                        <p>
                            <strong>Problem</strong>: High computational cost of solving coupled PDE systems.<br />
                            <strong>Solution</strong>: Implemented parallel computing strategies and optimized numerical algorithms
                            for efficiency.
                        </p>

                        <h3>Challenge 3: Model Validation</h3>
                        <p>
                            <strong>Problem</strong>: Ensuring model accuracy across different climate regimes.<br />
                            <strong>Solution</strong>: Performed extensive sensitivity analysis and cross-validation against
                            independent datasets.
                        </p>

                        <h2>Impact & Applications</h2>
                        <p>
                            This research contributes to:
                        </p>
                        <ul>
                            <li><strong>Scientific Understanding</strong>: Enhanced knowledge of tropical climate dynamics in the Caribbean region</li>
                            <li><strong>Practical Applications</strong>: Tools for seasonal forecasting and climate risk assessment</li>
                            <li><strong>Educational Value</strong>: Demonstration of mathematical modeling in environmental science</li>
                            <li><strong>Future Research</strong>: Foundation for more complex climate-impact studies</li>
                        </ul>

                        <h2>Conclusions</h2>
                        <p>
                            Mathematical modeling using ODE/PDE frameworks provides a powerful approach to understanding
                            Haiti's tropical climate. This case study demonstrates the effectiveness of computational methods
                            in climate science and highlights the importance of interdisciplinary approaches combining
                            mathematics, physics, and data science.
                        </p>

                        <h2>Future Work</h2>
                        <ul>
                            <li>Incorporating machine learning techniques for improved pattern recognition</li>
                            <li>Extending the model to include climate change scenarios</li>
                            <li>Developing real-time forecasting capabilities</li>
                            <li>Integrating socio-economic impact assessments</li>
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

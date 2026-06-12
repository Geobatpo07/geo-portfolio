"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, FileText } from "lucide-react"
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
                        Mathematical Modeling of Haiti&apos;s Tropical Climate
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
                            This case study documents an early research phase on cyclone modeling with ODE/PDE formulations.
                            The current focus is on exploring numerical schemes and understanding their stability and behavior,
                            not on delivering calibrated forecasts.
                        </p>

                        <h2>Problem Statement</h2>
                        <p>
                            Cyclone dynamics involve nonlinear interactions between pressure gradients, advection, diffusion,
                            and rotating-frame effects. At this stage, the objective is to build a reliable numerical foundation
                            before moving to calibration and operational interpretation.
                        </p>
                        <ul>
                            <li>Test candidate equation sets for simplified cyclone dynamics</li>
                            <li>Compare time-stepping and flux schemes under controlled scenarios</li>
                            <li>Identify numerical artifacts versus physically plausible behavior</li>
                            <li>Prepare a clean path toward later model calibration</li>
                        </ul>

                        <h2>Methodology</h2>

                        <h3>1. Mathematical Framework</h3>
                        <p>
                            The work currently uses simplified ODE/PDE prototypes that represent key cyclone mechanisms:
                        </p>
                        <ul>
                            <li><strong>Advection-dominated transport</strong> for idealized flow behavior</li>
                            <li><strong>Diffusion and damping terms</strong> to study smoothing and stiffness effects</li>
                            <li><strong>Reduced radial formulations</strong> to inspect near-eye behavior</li>
                        </ul>

                        <h3>2. Numerical Methods</h3>
                        <p>
                            The core of the current phase is numerical experimentation:
                        </p>
                        <ul>
                            <li><strong>Lax-Friedrichs</strong> for baseline hyperbolic PDE tests</li>
                            <li><strong>Runge-Kutta schemes</strong> for explicit ODE/PDE time integration studies</li>
                            <li><strong>Implicit Euler and theta-method variants</strong> for stiff behavior checks</li>
                            <li><strong>Cross-method comparisons</strong> to evaluate stability and sensitivity</li>
                        </ul>

                        <h3>3. Data Sources</h3>
                        <p>
                            Calibration is not done yet. Data integration is being prepared for later stages.
                        </p>
                        <ul>
                            <li>Definition of target variables and candidate observation sources</li>
                            <li>Design of preprocessing steps for future assimilation workflows</li>
                            <li>Early checks on data quality, coverage, and temporal consistency</li>
                        </ul>

                        <h2>Technical Implementation</h2>
                        <p>
                            Prototypes are developed in <strong>Python</strong> with an emphasis on fast iteration:
                        </p>
                        <ul>
                            <li><strong>NumPy/SciPy</strong> for numerical routines and baseline solvers</li>
                            <li><strong>Matplotlib</strong> for diagnostic plots and stability inspection</li>
                            <li><strong>Small custom solver scripts</strong> for controlled experiments</li>
                            <li><strong>Reproducible notebooks/scripts</strong> to compare schemes consistently</li>
                        </ul>

                        <h2>Current Observations</h2>
                        <ul>
                            <li>Scheme choice strongly affects numerical diffusion and stability margins</li>
                            <li>Explicit methods are informative for behavior analysis but require tighter step control</li>
                            <li>Implicit variants improve robustness in stiff scenarios at higher computational cost</li>
                            <li>Some trajectories are highly sensitive to initial and boundary choices</li>
                        </ul>

                        <h2>Limitations at This Stage</h2>
                        <ul>
                            <li>No calibrated parameter set yet</li>
                            <li>No final validation against a fixed benchmark dataset</li>
                            <li>No operational forecasting claim</li>
                            <li>Results should be read as exploratory and methodological</li>
                        </ul>

                        <h2>Challenges and Mitigations</h2>

                        <h3>Challenge 1: Numerical Stability Trade-offs</h3>
                        <p>
                            <strong>Problem</strong>: Different schemes behave very differently under the same setup.<br />
                            <strong>Mitigation</strong>: Standardized test cases and side-by-side solver diagnostics.
                        </p>

                        <h3>Challenge 2: Parameter Uncertainty</h3>
                        <p>
                            <strong>Problem</strong>: Early prototypes have broad plausible parameter ranges.<br />
                            <strong>Mitigation</strong>: Sensitivity sweeps to identify influential parameters before calibration.
                        </p>

                        <h3>Challenge 3: Physical vs Numerical Effects</h3>
                        <p>
                            <strong>Problem</strong>: Distinguishing true model behavior from discretization artifacts.<br />
                            <strong>Mitigation</strong>: Multi-resolution checks and cross-method comparisons.
                        </p>

                        <h2>Planned Next Steps</h2>
                        <p>
                            The next phase will focus on moving from exploratory numerics to a defensible calibrated model:
                        </p>
                        <ul>
                            <li>Define calibration protocol and objective metrics</li>
                            <li>Connect selected data sources and lock validation splits</li>
                            <li>Tune parameters with transparent reproducibility criteria</li>
                            <li>Only then report quantitative performance claims</li>
                        </ul>

                        <h2>Positioning</h2>
                        <p>
                            This project is intentionally presented as work in progress. The value today is in the numerical
                            exploration and method selection process. Calibration and validated conclusions are part of the
                            upcoming stages.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const data = [
    { time: '0h', windSpeed: 45, pressure: 1008 },
    { time: '6h', windSpeed: 55, pressure: 1002 },
    { time: '12h', windSpeed: 75, pressure: 995 },
    { time: '18h', windSpeed: 95, pressure: 980 },
    { time: '24h', windSpeed: 110, pressure: 970 },
    { time: '30h', windSpeed: 135, pressure: 960 },
    { time: '36h', windSpeed: 120, pressure: 975 },
    { time: '48h', windSpeed: 85, pressure: 990 },
]

export function CycloneChart() {
    return (
        <Card className="w-full max-w-3xl mx-auto my-8">
            <CardHeader>
                <CardTitle>Cyclone Intensity Simulation</CardTitle>
                <CardDescription>Wind speed (km/h) vs Pressure (hPa) over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="time" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" domain={[950, 1020]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                            />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="windSpeed"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                name="Wind Speed"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="pressure"
                                stroke="#ef4444"
                                strokeWidth={2}
                                name="Pressure"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

"use client"

import type { UserData } from "@/types/user-data"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface NationalityDistributionChartProps {
  data: UserData[]
}

export function NationalityDistributionChart({ data }: NationalityDistributionChartProps) {
  // Count users by nationality
  const nationalityCount: Record<string, number> = {}

  data.forEach((user) => {
    const nationality = user.nation
    nationalityCount[nationality] = (nationalityCount[nationality] || 0) + 1
  })

  // Sort by count and take top 10
  const chartData = Object.entries(nationalityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([nationality, count]) => ({
      nationality,
      count,
    }))

  return (
    <ChartContainer
      config={{
        count: {
          label: "Users",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="w-full h-full"
    >
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        width={500}
        height={300}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="nationality"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          width={80}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  )
}

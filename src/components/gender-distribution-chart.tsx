"use client"

import type { UserData } from "@/types/user-data"
import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface GenderDistributionChartProps {
  data: UserData[]
}

export function GenderDistributionChart({ data }: GenderDistributionChartProps) {
  // Count users by gender
  const genderCount: Record<string, number> = {}

  data.forEach((user) => {
    const gender = user.sex
    genderCount[gender] = (genderCount[gender] || 0) + 1
  })

  const chartData = Object.entries(genderCount).map(([gender, count]) => ({
    gender,
    count,
  }))

  const COLORS = ["#4f46e5", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]

  return (
    <ChartContainer
      config={{
        count: {
          label: "Users",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="w-full h-full"
    >
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={40}
          fill="#8884d8"
          dataKey="count"
          nameKey="gender"
          label={({ gender, percent }) => `${gender}: ${(percent * 100).toFixed(0)}%`}
          paddingAngle={2}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

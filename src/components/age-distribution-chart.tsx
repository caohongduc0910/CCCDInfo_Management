"use client"

import type { UserData } from "@/types/user-data"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AgeDistributionChartProps {
  data: UserData[]
}

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    try {
      // Parse DD/MM/YYYY format
      const parts = dob.split("/")
      if (parts.length !== 3) return 0

      const day = Number.parseInt(parts[0], 10)
      const month = Number.parseInt(parts[1], 10) - 1 // Month is 0-indexed in JS Date
      const year = Number.parseInt(parts[2], 10)

      const birthDate = new Date(year, month, day)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    } catch (e) {
      return 0
    }
  }

  // Group users by age ranges
  const ageGroups = {
    "0-18": 0,
    "19-30": 0,
    "31-45": 0,
    "46-60": 0,
    "61+": 0,
  }

  data.forEach((user) => {
    const age = calculateAge(user.dob)

    if (age <= 18) ageGroups["0-18"]++
    else if (age <= 30) ageGroups["19-30"]++
    else if (age <= 45) ageGroups["31-45"]++
    else if (age <= 60) ageGroups["46-60"]++
    else ageGroups["61+"]++
  })

  const chartData = Object.entries(ageGroups).map(([range, count]) => ({
    range,
    count,
  }))

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
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} tick={{ fontSize: 12 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
      </BarChart>
    </ChartContainer>
  )
}

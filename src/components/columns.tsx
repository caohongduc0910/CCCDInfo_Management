"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserData } from "@/types/user-data"

export const columns: ColumnDef<UserData>[] = [
  {
    id: "order",
    header: "STT",
    cell: ({ row }) => {
      // Use the row index + 1 for the order
      return <div>{row.index + 1}</div>
    },
  },
  {
    accessorKey: "id_number",
    header: "Số CCCD",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Họ tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "dob",
    header: "Ngày sinh",
  },
  {
    accessorKey: "nation",
    header: "Quốc tịch",
  },
  {
    accessorKey: "sex",
    header: "Giới tính",
  },
  {
    accessorKey: "home",
    header: "Quê quán",
  },
  {
    accessorKey: "address",
    header: "Nơi thường trú",
  },
  {
    accessorKey: "doe",
    header: "Có giá trị đến",
  },
]

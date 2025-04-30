"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { FieldTemplate } from "@/types/field-template"

interface FieldTemplateColumnsProps {
  onEdit: (template: FieldTemplate) => void
  onDelete: (id: string) => void
}

export const getFieldTemplateColumns = ({
  onEdit,
  onDelete,
}: FieldTemplateColumnsProps): ColumnDef<FieldTemplate>[] => [
  {
    id: "order",
    header: "STT",
    cell: ({ row }) => {
      // Use the row index + 1 for the order
      return <div>{row.index + 1}</div>
    },
  },
  {
    accessorKey: "field_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Tên trường
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "label",
    header: "Nhãn",
  },
  {
    accessorKey: "type",
    header: "Loại",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const typeMap: Record<string, string> = {
        text: "Văn bản",
        textarea: "Văn bản dài",
        number: "Số",
        date: "Ngày tháng",
        email: "Email",
        tel: "Điện thoại",
        select: "Lựa chọn",
        checkbox: "Hộp kiểm",
        radio: "Nút radio",
        image: "Hình ảnh",
        signature: "Chữ ký",
      }
      return typeMap[type] || type
    },
  },
  {
    accessorKey: "required",
    header: "Bắt buộc",
    cell: ({ row }) => {
      const required = row.getValue("required") as boolean
      return <Checkbox checked={required} disabled />
    },
  },
  {
    accessorKey: "regex",
    header: "Mẫu Regex",
    cell: ({ row }) => {
      const regex = row.getValue("regex") as string
      return regex ? (
        <code className="px-2 py-1 bg-muted rounded text-xs font-mono">{regex}</code>
      ) : (
        <span className="text-muted-foreground text-xs">Không có</span>
      )
    },
  },
  {
    accessorKey: "region",
    header: "Vùng",
    cell: ({ row }) => {
      const region = row.getValue("region") as { x: number; y: number; width: number; height: number }
      return (
        <span className="text-xs">
          x: {region.x}, y: {region.y}, w: {region.width}, h: {region.height}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      const template = row.original

      return (
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(template)} className="cursor-pointer">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Sửa</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(template.id)} className="cursor-pointer">
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Xóa</span>
          </Button>
        </div>
      )
    },
  },
]

"use client"

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { FieldTemplate } from "@/types/field-template"
import { getFieldTemplateColumns } from "./field-template-columns"
import { FieldTemplateDialog } from "./field-template-dialog"
import { Plus } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { fieldTemplatesApi } from "@/lib/api"

interface FieldTemplatesTableProps {
  data: FieldTemplate[]
  onUpdate: (templates: FieldTemplate[]) => void
  onRefresh: () => void
}

export function FieldTemplatesTable({ data, onUpdate, onRefresh }: FieldTemplatesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [editingTemplate, setEditingTemplate] = useState<FieldTemplate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleEdit = (template: FieldTemplate) => {
    setEditingTemplate(template)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  // const confirmDelete = async () => {
  //   if (deleteId) {
  //     setIsLoading(true)
  //     try {
  //       await fieldTemplatesApi.delete(deleteId)

  //       // Cập nhật state cục bộ
  //       const updatedTemplates = data.filter((template) => template.id !== deleteId)
  //       onUpdate(updatedTemplates)

  //       toast({
  //         title: "Xóa thành công",
  //         description: "Mẫu biểu đã được xóa thành công",
  //       })

  //       // Làm mới dữ liệu từ server
  //       onRefresh()
  //     } catch (error) {
  //       console.error("Error deleting template:", error)
  //       toast({
  //         title: "Lỗi",
  //         description: error instanceof Error ? error.message : "Không thể xóa mẫu biểu. Vui lòng thử lại sau.",
  //         variant: "destructive",
  //       })
  //     } finally {
  //       setIsLoading(false)
  //       setDeleteId(null)
  //     }
  //   }
  // }

  const confirmDelete = async () => {
    if (deleteId) {
      setIsLoading(true)
      try {
        await fieldTemplatesApi.delete(deleteId)
  
        toast({
          title: "Xóa thành công",
          description: "Mẫu biểu đã được xóa thành công",
        })
  
        // 👉 Gọi lại dữ liệu mới từ server thay vì tự lọc
        await onRefresh()
      } catch (error) {
        console.error("Error deleting template:", error)
        toast({
          title: "Lỗi",
          description: error instanceof Error ? error.message : "Không thể xóa mẫu biểu. Vui lòng thử lại sau.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
        setDeleteId(null)
      }
    }
  }
  

  const handleSave = async (template: FieldTemplate) => {
    setIsLoading(true)
    try {
      // let response
      let updatedTemplates

      if (editingTemplate) {
        await fieldTemplatesApi.update(template.id, template)

        updatedTemplates = data.map((t) => (t.id === template.id ? template : t))
        toast({
          title: "Cập nhật thành công",
          description: "Mẫu biểu đã được cập nhật thành công",
        })
      } else {
        const { id, ...createPayload } = template
      const newTemplate = await fieldTemplatesApi.create(createPayload)
      updatedTemplates = [...data, newTemplate]
        toast({
          title: "Thêm thành công",
          description: "Mẫu biểu mới đã được thêm thành công",
        })
      }

      onUpdate(updatedTemplates)
      setEditingTemplate(null)

      onRefresh()
    } catch (error) {
      console.error("Error saving template:", error)
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể lưu mẫu biểu. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const columns = getFieldTemplateColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Lọc theo tên trường..."
          value={(table.getColumn("field_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("field_name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={onRefresh} className="cursor-pointer" disabled={isLoading}>
            Làm mới
          </Button>
          <Button
            onClick={() => {
              setEditingTemplate(null)
              setIsDialogOpen(true)
            }}
            className="cursor-pointer"
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm mẫu biểu
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không tìm thấy mẫu biểu nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="cursor-pointer"
        >
          Trước
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="cursor-pointer"
        >
          Sau
        </Button>
      </div>

      <FieldTemplateDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        template={editingTemplate}
        onSave={handleSave}
        isLoading={isLoading}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn mẫu biểu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

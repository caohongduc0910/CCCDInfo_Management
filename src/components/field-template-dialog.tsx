"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FieldTemplate } from "@/types/field-template"

interface FieldTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: FieldTemplate | null
  onSave: (template: FieldTemplate) => void
}

const fieldTypes = [
  { value: "text", label: "Văn bản" },
  { value: "textarea", label: "Văn bản dài" },
  { value: "number", label: "Số" },
  { value: "date", label: "Ngày tháng" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Điện thoại" },
  { value: "select", label: "Lựa chọn" },
  { value: "checkbox", label: "Hộp kiểm" },
  { value: "radio", label: "Nút radio" },
  { value: "image", label: "Hình ảnh" },
  { value: "signature", label: "Chữ ký" },
]

export function FieldTemplateDialog({ open, onOpenChange, template, onSave }: FieldTemplateDialogProps) {
  const [formData, setFormData] = useState<FieldTemplate>({
    id: "",
    field_name: "",
    label: "",
    type: "text",
    required: false,
    regex: "",
    region: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  })

  useEffect(() => {
    if (template) {
      setFormData(template)
    } else {
      setFormData({
        id: crypto.randomUUID(),
        field_name: "",
        label: "",
        type: "text",
        required: false,
        regex: "",
        region: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      })
    }
  }, [template, open])

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRegionChange = (field: string, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setFormData((prev) => ({
      ...prev,
      region: {
        ...prev.region,
        [field]: numValue,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{template ? "Chỉnh Sửa Mẫu Biểu" : "Thêm Mẫu Biểu Mới"}</DialogTitle>
            <DialogDescription>
              {template ? "Chỉnh sửa thông tin cho mẫu biểu này." : "Thêm mẫu biểu mới vào bộ sưu tập của bạn."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="field_name" className="text-right">
                Tên trường
              </Label>
              <Input
                id="field_name"
                value={formData.field_name}
                onChange={(e) => handleChange("field_name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Nhãn
              </Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => handleChange("label", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Loại
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn loại trường" />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="regex" className="text-right">
                Mẫu Regex
              </Label>
              <Input
                id="regex"
                value={formData.regex}
                onChange={(e) => handleChange("regex", e.target.value)}
                className="col-span-3"
                placeholder="Ví dụ: ^[A-Za-z0-9]+$"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="required" className="text-right">
                Bắt buộc
              </Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="required"
                  checked={formData.required}
                  onCheckedChange={(checked) => handleChange("required", !!checked)}
                />
                <label
                  htmlFor="required"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Trường này là bắt buộc
                </label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Vùng</Label>
              <div className="col-span-3 grid grid-cols-4 gap-2">
                <div>
                  <Label htmlFor="x" className="text-xs">
                    X
                  </Label>
                  <Input
                    id="x"
                    type="number"
                    value={formData.region.x}
                    onChange={(e) => handleRegionChange("x", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="y" className="text-xs">
                    Y
                  </Label>
                  <Input
                    id="y"
                    type="number"
                    value={formData.region.y}
                    onChange={(e) => handleRegionChange("y", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="width" className="text-xs">
                    Rộng
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    value={formData.region.width}
                    onChange={(e) => handleRegionChange("width", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-xs">
                    Cao
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.region.height}
                    onChange={(e) => handleRegionChange("height", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{template ? "Lưu thay đổi" : "Thêm mẫu"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

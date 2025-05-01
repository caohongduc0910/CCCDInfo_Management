import { NextResponse } from "next/server"
import type { FieldTemplate } from "@/types/field-template"

// Mock data for field templates
const fieldTemplates: FieldTemplate[] = [
  {
    id: "1",
    field_name: "name",
    label: "Họ và tên",
    type: "text",
    required: true,
    regex: "^[\\p{L} .'-]+$",
    region: {
      x: 120,
      y: 60,
      width: 400,
      height: 50,
    },
  },
  {
    id: "2",
    field_name: "dob",
    label: "Ngày sinh",
    type: "date",
    required: true,
    regex: "^\\d{4}-\\d{2}-\\d{2}$",
    region: {
      x: 120,
      y: 120,
      width: 200,
      height: 50,
    },
  },
  {
    id: "7",
    field_name: "sex",
    label: "Giới tính",
    type: "select",
    required: true,
    region: {
      x: 120,
      y: 470,
      width: 150,
      height: 50,
    },
  },
  {
    id: "8",
    field_name: "nation",
    label: "Quốc tịch",
    type: "text",
    required: true,
    region: {
      x: 120,
      y: 530,
      width: 250,
      height: 50,
    },
  },
  {
    id: "3",
    field_name: "id_number",
    label: "Số CMND/CCCD",
    type: "text",
    required: true,
    regex: "^\\d{9}|\\d{12}$",
    region: {
      x: 120,
      y: 180,
      width: 250,
      height: 50,
    },
  },
  {
    id: "4",
    field_name: "address",
    label: "Địa chỉ",
    type: "textarea",
    required: false,
    region: {
      x: 120,
      y: 240,
      width: 500,
      height: 100,
    },
  },
  {
    id: "6",
    field_name: "home",
    label: "Quê quán",
    type: "email",
    required: false,
    region: {
      x: 120,
      y: 410,
      width: 350,
      height: 50,
    },
  },
  {
    id: "9",
    field_name: "doe",
    label: "Có giá trị đến",
    type: "text",
    required: true,
    regex: "^\\d{4}-\\d{2}-\\d{2}$",
    region: {
      x: 120,
      y: 590,
      width: 250,
      height: 50,
    },
  },
]


// export async function GET() {
//   // Simulate API delay 
//   await new Promise((resolve) => setTimeout(resolve, 500))

//   return NextResponse.json(mockFieldTemplates)
// }

// GET all field templates
export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return NextResponse.json(fieldTemplates)
}

// POST - Create a new field template
export async function POST(request: Request) {
  try {
    const newTemplate = await request.json()

    // Validate required fields
    if (!newTemplate.field_name || !newTemplate.label || !newTemplate.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    console.log(newTemplate)
    // Add the new template
    fieldTemplates.push(newTemplate)

    return NextResponse.json(newTemplate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
  }
}
import { FieldTemplate } from "@/types/field-template"
import { UserData } from "@/types/user-data"

// Cấu hình API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"


// Hàm tiện ích để gọi API
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `API request failed with status ${response.status}`)
  }

  if (response.status !== 204) {
    return await response.json()
  }

  return {} as T
}

// API cho Field Templates
export const fieldTemplatesApi = {
  getAll: () => fetchApi<FieldTemplate[]>("/field-template"),

  getById: (id: string) => fetchApi<FieldTemplate>(`/field-template/${id}`),

  create: (template: Omit<FieldTemplate, "id">) =>
    fetchApi<FieldTemplate>("/field-template", {
      method: "POST",
      body: JSON.stringify(template),
    }),

  update: (id: string, template: FieldTemplate) =>
    fetchApi<FieldTemplate>(`/field-template/${id}`, {
      method: "PATCH",
      body: JSON.stringify(template),
    }),

  delete: (id: string) =>
    fetchApi<void>(`/field-template/${id}`, {
      method: "DELETE",
    }),
}

// API cho User Data
export const userDataApi = {
  getAll: () => fetchApi<UserData[]>("/cccd-info"),
}

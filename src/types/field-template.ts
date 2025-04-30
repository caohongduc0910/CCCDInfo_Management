export interface FieldTemplate {
    id: string
    field_name: string
    label: string
    type: string
    required: boolean
    regex?: string,
    region: {
      x: number
      y: number
      width: number
      height: number
    }
  }
  
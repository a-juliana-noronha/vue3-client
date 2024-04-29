export type iStatus = 'active' | 'inactive'

export type iTimestamps = {
  created_at: string
  updated_at: string
}

export type iDropdownOption = {
  id: number | string
  name: string
}

export type iPartial<T> = {
  [P in keyof T]?: T[P]
}

export type iBreadcrumbItem = {
  label?: string
  icon?: string
  route?: { name: string }
}

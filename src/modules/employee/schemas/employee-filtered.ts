export interface EmployeeFiltered {
    name?: string
    roleId?: number
    location?: string
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING'
}
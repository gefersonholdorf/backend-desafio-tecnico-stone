export interface Employee {
    id?: number
    name: string
    email: string
    location: string
    dateContract: Date
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
    roleId: number
    createdAt?: Date
    updatedAt?: Date
}
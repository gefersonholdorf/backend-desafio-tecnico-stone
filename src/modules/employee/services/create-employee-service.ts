import type { PrismaEmployeeRepository } from "../repositories/prisma/prisma-employee-repository";

export interface CreateEmployeeServiceRequest {
    name: string
    email: string
    location: string
    dateContract: Date
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
    roleId: number
}

export interface CreateEmployeeServiceResponse {
    employeeId: number
}

export class CreateEmployeeService {
    constructor(private readonly employeeRepository: PrismaEmployeeRepository) {}

    async execute({name, email, location, dateContract, status, roleId}: CreateEmployeeServiceRequest): Promise<CreateEmployeeServiceResponse> {
        const newEmployee = await this.employeeRepository.create({
            name, email,location, dateContract, status, roleId
        })

        const { employeeId } = newEmployee

        return {
            employeeId
        }
    }
}
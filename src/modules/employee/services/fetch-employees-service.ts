import type { PaginationParams } from "../../../utils/pagination-params";
import type { PrismaEmployeeRepository } from "../repositories/prisma/prisma-employee-repository";
import type { EmployeeFiltered } from "../schemas/employee-filtered";
import type { FetchEmployeeResponseRepository } from "../schemas/fetch-employee-response-repository";

export interface FetchEmployeesServiceRequest {
    pagination: PaginationParams
    filtered: EmployeeFiltered
}

export interface FetchEmployeesServiceResponse extends FetchEmployeeResponseRepository {}

export class FecthEmployeesService {
    constructor(private readonly employeeRepository: PrismaEmployeeRepository) {}

    async execute({pagination, filtered}: FetchEmployeesServiceRequest): Promise<FetchEmployeesServiceResponse> {
        const employees = await this.employeeRepository.findAll(pagination, filtered)

        return employees
    }
}
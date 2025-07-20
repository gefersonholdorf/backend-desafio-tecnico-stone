import type { PaginationParams } from "../../../utils/pagination-params";
import type { Employee } from "../schemas/employee";
import type { EmployeeFiltered } from "../schemas/employee-filtered";
import type { FetchEmployeeResponseRepository } from "../schemas/fetch-employee-response-repository";

export interface EmployeeRepository {
    create(employee: Employee): Promise<{employeeId: number}>
    findById(id: number): Promise<Employee | null>
    findAll(paginationParams: PaginationParams, employeeFiltered: EmployeeFiltered): Promise<FetchEmployeeResponseRepository>
    save(employee: Employee, id: number): Promise<{employeeId: number}>
}
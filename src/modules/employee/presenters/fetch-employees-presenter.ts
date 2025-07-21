import type { Employees, Roles } from "../../../generated/prisma";

export interface FetchEmployeePresenter extends Employees {
    role: Roles
}

export class FetchEmployeePresenter {
    static toHttp(employees: FetchEmployeePresenter[]) {
        return employees.map((employee) => {
            return {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                location: employee.location,
                dateContract: employee.dateContract.toISOString(),
                status: employee.status,
                roleId: employee.role.id,
                role: employee.role.name
            }
        })
    }
}
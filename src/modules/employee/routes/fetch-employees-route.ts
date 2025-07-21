import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { PrismaEmployeeRepository } from "../repositories/prisma/prisma-employee-repository";
import { FecthEmployeesService } from "../services/fetch-employees-service";
import type { PaginationParams } from "../../../utils/pagination-params";
import type { EmployeeFiltered } from "../schemas/employee-filtered";
import { FetchEmployeePresenter } from "../presenters/fetch-employees-presenter";

const employeeRepository = new PrismaEmployeeRepository()
const fetchEmployeeService = new FecthEmployeesService(employeeRepository)

export const fetchEmployeesRoute: FastifyPluginCallbackZod = async (app) => {
    app.get('/employees', {
        schema: {
            querystring: z.object({
                page: z.coerce.number().optional(),
                totalPerPage: z.coerce.number().optional(),
                orderBy: z.string().optional(),
                direction: z.enum(['asc', 'desc']).optional(),
                name: z.string().optional(),
                roleId: z.coerce.number().optional(),
                location: z.string().optional(),
                status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).optional()
            })
        }
    }, async (request, reply) => {
        const {
            page, totalPerPage, orderBy, direction, name, roleId, location, status
        } = request.query

        const paginationParams: PaginationParams = {
            page,
            totalPerPage,
            orderBy,
            direction
        }

        const employeeFilter: EmployeeFiltered = {
            name,
            roleId,
            location,
            status
        }

        const result = await fetchEmployeeService.execute({
            pagination: paginationParams,
            filtered: employeeFilter
        })

        const employeesPresenter = FetchEmployeePresenter.toHttp(result.employees)

        return reply.status(200).send({
            total: result.total,
            page: result.page,
            totalPerPage: result.totalPerPage,
            totalPages: result.totalPages,
            employees: employeesPresenter
        })
    })
}
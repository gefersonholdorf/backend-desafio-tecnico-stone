import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { PrismaEmployeeRepository } from "../repositories/prisma/prisma-employee-repository";
import { CreateEmployeeService } from "../services/create-employee-service";

const employeeRepository = new PrismaEmployeeRepository()
const createEmployeeService = new CreateEmployeeService(employeeRepository)

export const createEmployeeRoute: FastifyPluginCallbackZod = async (app) => {
    app.post('/employees', {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string(),
                location: z.string(),
                dateContract: z.coerce.date(),
                status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
                roleId: z.coerce.number()
            })
        }
    }, async (request, reply) => {
        const { name, email, location, dateContract, status, roleId } = request.body

        const { employeeId } = await createEmployeeService.execute({
            name, email, location, dateContract, status, roleId
        })

        return reply.status(201).send({
            employeeId
        })
    })
}
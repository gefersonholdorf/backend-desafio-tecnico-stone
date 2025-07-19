import { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { PrismaRoleRepository } from "../repositories/prisma/prisma-role-repository";
import { CreateRoleService } from "../services/create-role-service";

const roleRepository = new PrismaRoleRepository()
const createRoleService = new CreateRoleService(roleRepository)

export const createRoleRoute: FastifyPluginCallbackZod = async (app) => {
    app.post('/roles', {
        schema: {
            body: z.object({
                name: z.string(),
                description: z.string()
            })
        }},
        async (request, reply) => {
            const {name, description} = request.body

            const createdRole = await createRoleService.execute({
                name, description
            })

            return reply.status(201).send({
                roleId: createdRole.roleId
            })
        }
    ) 
}

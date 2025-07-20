import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { PrismaRoleRepository } from "../repositories/prisma/prisma-role-repository";
import { FetchRolesService } from "../services/fetch-roles-service";

const roleRepository = new PrismaRoleRepository()
const fetchRolesService = new FetchRolesService(roleRepository)

export const fetchRolesRoute: FastifyPluginCallbackZod = async (app) => {
    app.get('/roles', async (request, reply) => {
        const { roles } = await fetchRolesService.execute()

        return reply.status(200).send({
            roles
        })
    })
}
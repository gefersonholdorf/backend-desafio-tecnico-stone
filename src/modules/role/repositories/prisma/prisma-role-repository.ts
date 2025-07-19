import { prismaClient } from "../../../../config/db/prisma-client";
import { Role } from "../../schemas/role";
import { RoleRepository } from "../role-repository";

export class PrismaRoleRepository implements RoleRepository {
    
    async create(role: Role): Promise<{ roleId: number; }> {
        const { name, description} = role
        const createdRole = await prismaClient.roles.create({
            data: {
                name,
                description,
            },
        });
        return { roleId: createdRole.id };
    }

    async save(role: Role, roleId: number): Promise<{ roleId: number; }> {
        const updatedRole = await prismaClient.roles.update({
            data: {
                name: role.name,
                description: role.description,
            },
            where: {
                id: roleId,
            }
        })
        return { roleId: updatedRole.id}
    }

    async findById(roleId: number): Promise< Role | null > {
       const role = await prismaClient.roles.findUnique({
            where: {
                id: roleId
            }
       }) 

       if(!role) {
        return null
       }

       return role
    }

    async findAll(): Promise<Role[]> {
        const roles = await prismaClient.roles.findMany()

        return roles
    }
}

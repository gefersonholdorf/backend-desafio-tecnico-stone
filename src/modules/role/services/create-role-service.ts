import { PrismaRoleRepository } from "../repositories/prisma/prisma-role-repository";

export interface CreateRoleServiceRequest {
    name: string
    description: string
}

export interface CreateRoleServiceResponse {
    roleId: number
}

export class CreateRoleService {
    constructor(private readonly roleRepository: PrismaRoleRepository) {}

    async execute({ name, description}: CreateRoleServiceRequest): Promise<CreateRoleServiceResponse> {
        const roleId = await this.roleRepository.create({
            name, description
        })

        return roleId
    }
}
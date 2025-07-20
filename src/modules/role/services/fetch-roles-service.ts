import { PrismaRoleRepository } from "../repositories/prisma/prisma-role-repository";
import type { Role } from "../schemas/role";

export interface FetchRolesServiceResponse {
    roles: Role[]
}

export class FetchRolesService {
    constructor(private readonly roleRepository: PrismaRoleRepository) {}

    async execute(): Promise<FetchRolesServiceResponse> {
        const roles = await this.roleRepository.findAll()

        return {
            roles
        }
    }
}
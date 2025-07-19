import type { Role } from "../schemas/role";

export interface RoleRepository {
    create(role: Role): Promise<{roleId: number}>
    save(role: Role, roleId: number): Promise<{roleId: number}>
    findById(roleId: number): Promise<Role | null>
    findAll(): Promise<Role[]>
}
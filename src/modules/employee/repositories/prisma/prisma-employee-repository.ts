import { prismaClient } from "../../../../config/db/prisma-client";
import type { Prisma } from "../../../../generated/prisma";
import type { PaginationParams } from "../../../../utils/pagination-params";
import type { Employee } from "../../schemas/employee";
import type { EmployeeFiltered } from "../../schemas/employee-filtered";
import type { EmployeeRepository } from "../employee-repository";

export class PrismaEmployeeRepository implements EmployeeRepository{
  async create(data: Employee) {
    const newEmployee = await prismaClient.employees.create({
        data
    })

    return {employeeId: newEmployee.id}
  }

  async findById(id: number) {
    const employee = await prismaClient.employees.findUnique({
        where: {
            id
        }
    })

    if(!employee) {
        return null
    }

    return employee
  }

  async save(data: Employee, id: number) {
    const employee = await prismaClient.employees.update({
        data,
        where: {
            id
        }
    })

    return {employeeId: employee.id}
  }

  async findAll(paginationParams: PaginationParams, employeeFiltered: EmployeeFiltered) {
    const {
        page = 1,
        totalPerPage = 10,
        orderBy = 'id',
        direction = 'desc'
    } = paginationParams

    const {
        name,
        location,
        roleId,
        status
    } = employeeFiltered

    const where: Prisma.EmployeesWhereInput = {}

    if (name) {
        where.name = {
            contains: name
        }   
    }

    if (location) {
        where.location = {
            contains: location,
        }
    }

    if (roleId) {
        where.roleId = roleId
    }

    if (status) {
        where.status = status
    }

    const employees = await prismaClient.employees.findMany({
        where,
        take: totalPerPage,
        skip: (page - 1) * totalPerPage,
        orderBy: {
            [orderBy]: direction
        },
        include: {
            role: true
        }
    })

    const total = await prismaClient.employees.count({ where })

    return {
        total,
        page,
        totalPerPage,
        totalPages: Math.ceil(total / totalPerPage),
        employees
    }
  }
}
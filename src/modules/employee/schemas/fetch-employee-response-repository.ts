import type { FetchEmployeePresenter } from "../presenters/fetch-employees-presenter"
import type { Employee } from "./employee"

export interface FetchEmployeeResponseRepository {
    total: number
    page: number
    totalPerPage: number
    totalPages: number
    employees: FetchEmployeePresenter[]
}
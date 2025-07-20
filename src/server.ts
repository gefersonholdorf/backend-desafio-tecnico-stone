import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "./config/env";
import { createRoleRoute } from "./modules/role/routes/create-role-route";
import { fetchRolesRoute } from "./modules/role/routes/fetch-roles-route";
import { fetchEmployeesRoute } from "./modules/employee/routes/fetch-employees-route";
import { createEmployeeRoute } from "./modules/employee/routes/create-employee-route";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: true
})

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', async () => {
    return {
        API: 'Running'
    }
})

app.register(createRoleRoute)
app.register(fetchRolesRoute)

app.register(fetchEmployeesRoute)
app.register(createEmployeeRoute)

app.listen({port: env.PORT})


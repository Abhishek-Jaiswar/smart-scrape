import {z} from 'zod'

export const createWorkflowSchema = z.object({
    name: z.string().max(20),
    description: z.string().max(80).optional()
})
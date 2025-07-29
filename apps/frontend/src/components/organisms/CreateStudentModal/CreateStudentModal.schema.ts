import { z } from 'zod';

export const createStudentSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido' }),
  username: z.string().min(1, { message: 'El nombre de usuario es requerido' }),
  email: z.email({ message: 'El formato del email no es válido' }),
  phone: z.string().min(9, { message: 'El móvil debe tener al menos 9 dígitos' }).optional().or(z.literal(''))
});

export type CreateStudentFormValues = z.infer<typeof createStudentSchema>;

import { z } from 'zod';

export const addDoctorValidator = z.object({
	name: z
		.string({ message: 'name must be provided' })
		.min(2, 'Name must be at least 2 characters'),
	age: z
		.number({ message: 'age must be provided' })
		.min(15, 'minimum age must be at least 15 years'),
	specialty: z.string().optional(),
	contact: z.string().optional(),
	description: z.string().optional(),
	location: z
		.object({
			latitude: z.string({ message: 'please provide latitude' }),
			longitude: z.string({ message: 'please provide longitude' }),
		})
		.optional(),
	imageUrl: z.string().optional(),
});

export const updateDoctorValidator = z.object({
	name: z
		.string({ message: 'name must be provided' })
		.min(2, 'Name must be at least 2 characters')
		.optional(),
	age: z
		.number({ message: 'age must be provided' })
		.min(15, 'minimum age must be at least 15 years')
		.optional(),
	specialty: z.string().optional(),
	contact: z.string().optional(),
	description: z.string().optional(),
	location: z
		.object({
			latitude: z.string({ message: 'please provide latitude' }),
			longitude: z.string({ message: 'please provide longitude' }),
		})
		.optional(),
	imageUrl: z.string().optional(),
});

export type AddDoctor = z.infer<typeof addDoctorValidator>;

export type UpdateDoctor = z.infer<typeof updateDoctorValidator>;

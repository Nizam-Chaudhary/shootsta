import { z } from 'zod';

export const addAmbulanceValidator = z.object({
	title: z
		.string({ message: 'title is required' })
		.min(2, 'title must be of at least 2 characters'),
	contact: z.string().optional(),
	description: z.string().optional(),
	location: z
		.object({
			latitude: z.string({ message: 'latitude is required' }),
			longitude: z.string({ message: 'longitude is required' }),
		})
		.optional(),
	imageUrl: z.string().optional(),
});

export const updateAmbulanceValidator = z.object({
	title: z
		.string({ message: 'title is required' })
		.min(2, 'title must be of at least 2 characters')
		.optional(),
	contact: z.string().optional(),
	description: z.string().optional(),
	location: z
		.object({
			latitude: z.string({ message: 'latitude is required' }),
			longitude: z.string({ message: 'longitude is required' }),
		})
		.optional(),
	imageUrl: z.string().optional(),
});

export type AddAmbulance = z.infer<typeof addAmbulanceValidator>;

export type UpdateAmbulance = z.infer<typeof updateAmbulanceValidator>;

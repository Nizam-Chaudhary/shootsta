import { and, count, eq, sql } from 'drizzle-orm';
import { db } from '../db/index';
import { ambulances } from '../db/schema/schema';
import AppError from '../utils/appError';
import { AddAmbulance, UpdateAmbulance } from '../validators/ambulance';

export async function addAmbulance(ambulance: AddAmbulance) {
	const newAmbulance = await db
		.insert(ambulances)
		.values(ambulance)

		.returning();

	if (!newAmbulance) {
		throw new Error('Error adding ambulance details');
	}

	return {
		status: true,
		message: 'Ambulance details added successfully',
		data: newAmbulance,
	};
}

export async function updateAmbulance(id: number, ambulance: UpdateAmbulance) {
	const updatedAmbulance = await db
		.update(ambulances)
		.set({
			...ambulance,
			updatedAt: sql`CURRENT_TIMESTAMP`,
		})
		.where(and(eq(ambulances.id, id), eq(ambulances.isDeleted, false)))
		.returning();

	if (!updatedAmbulance) {
		throw new AppError('Ambulance not found', 404);
	}

	return {
		status: true,
		message: 'Ambulance details updated successfully',
		data: updatedAmbulance,
	};
}

export async function getAmbulances(page = 1, limit = 10) {
	const offset = (page - 1) * limit;

	const ambulanceListPromise = db.query.ambulances.findMany({
		where: eq(ambulances.isDeleted, false),
		limit: limit,
		offset: offset,
	});

	const countPromise = db
		.select({ count: count() })
		.from(ambulances)
		.where(eq(ambulances.isDeleted, false));

	const [total, ambulanceList] = await Promise.all([
		countPromise,
		ambulanceListPromise,
	]);

	return {
		status: true,
		message: 'Ambulance list fetched successfully',
		page: page,
		total: total[0].count,
		ambulances: ambulanceList,
	};
}

export async function getAmbulanceById(id: number) {
	const ambulance = await db.query.ambulances.findFirst({
		where: and(eq(ambulances.id, id), eq(ambulances.isDeleted, false)),
	});

	if (!ambulance) {
		throw new AppError('Ambulance not found', 404);
	}

	return {
		status: true,
		message: 'Ambulance details fetched successfully',
		ambulance: ambulance,
	};
}

export async function softDeleteAmbulance(id: number) {
	const ambulance = await db
		.update(ambulances)
		.set({
			isDeleted: true,
			deletedAt: sql`CURRENT_TIMESTAMP`,
		})
		.where(and(eq(ambulances.id, id), eq(ambulances.isDeleted, false)))
		.returning();

	if (ambulance.length <= 0) {
		throw new AppError('Ambulance not found', 404);
	}

	return {
		status: true,
		message: 'Ambulance removed successfully',
		ambulance: ambulance,
	};
}

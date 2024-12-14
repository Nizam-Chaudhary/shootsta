import { count, eq } from 'drizzle-orm';
import { db } from '../db/index';
import { ambulances } from '../db/schema/schema';

export async function addAmbulance(ambulance: any) {
	// TODO: add better types
	const newAmbulance = await db.insert(ambulances).values(ambulance);

	if (!newAmbulance) {
		throw new Error('Error adding ambulance details');
	}

	return {
		status: true,
		message: 'Ambulance details added successfully',
		data: newAmbulance,
	};
}

export async function updateAmbulance(ambulance: any) {
	// TODO: add better types
	const updatedAmbulance = await db.update(ambulances).set(ambulance);

	if (!ambulance) {
		throw new Error('Error updating ambulance details');
	}

	return {
		status: true,
		message: 'Ambulance details updated successfully',
		data: updatedAmbulance,
	};
}

export async function getAmbulances(page = 1, limit = 10) {
	const offset = (page - 1) * limit;

	const totalAmbulances = await db.select({ count: count() }).from(ambulances);

	const ambulanceList = await db.query.ambulances.findMany({
		limit: limit,
		offset: offset,
	});

	return {
		status: true,
		message: 'Ambulance list fetched successfully',
		page: page,
		total: totalAmbulances,
		ambulances: ambulanceList,
	};
}

export async function getAmbulanceById(id: number) {
	const ambulance = await db.query.ambulances.findFirst({
		where: eq(ambulances.id, id),
	});

	return {
		status: true,
		message: 'Ambulance list fetched successfully',
		ambulance: ambulance,
	};
}

export async function removeAmbulance(id: number) {
	const ambulance = await db.delete(ambulances).where(eq(ambulances.id, id));

	return {
		status: true,
		message: 'Ambulance removed successfully',
		ambulance: ambulance,
	};
}

import { and, count, eq, sql } from 'drizzle-orm';
import { db } from '../db/index';
import { doctors } from '../db/schema/schema';
import AppError from '../utils/appError';
import { AddDoctor, UpdateDoctor } from '../validators/doctor';

export async function addDoctor(doctor: AddDoctor) {
	const newDoctor = await db.insert(doctors).values(doctor).returning();

	if (!doctor) {
		throw new Error('Error adding doctor details');
	}

	return {
		status: true,
		message: 'Doctor details added successfully',
		data: newDoctor,
	};
}

export async function updateDoctor(id: number, doctor: UpdateDoctor) {
	const updatedDoctor = await db
		.update(doctors)
		.set({
			...doctor,
			updatedAt: sql`CURRENT_TIMESTAMP`,
		})
		.where(and(eq(doctors.id, id), eq(doctors.isDeleted, false)))
		.returning();

	if (updatedDoctor.length <= 0) {
		throw new AppError('Doctor not found', 404);
	}
}

export async function getDoctors(page = 1, limit = 10) {
	const offset = (page - 1) * limit;

	const countPromise = db
		.select({ count: count() })
		.from(doctors)
		.where(eq(doctors.isDeleted, false));

	const doctorListPromise = db.query.doctors.findMany({
		where: eq(doctors.isDeleted, false),
		limit: limit,
		offset: offset,
	});

	const [total, doctorList] = await Promise.all([
		countPromise,
		doctorListPromise,
	]);

	return {
		status: true,
		message: 'Doctor list fetched successfully',
		page: page,
		total: total[0].count,
		doctors: doctorList,
	};
}

export async function getDoctorById(id: number) {
	const doctor = await db.query.doctors.findFirst({
		where: and(eq(doctors.id, id), eq(doctors.isDeleted, false)),
	});

	if (!doctor) {
		throw new AppError('Doctor not found', 404);
	}

	return {
		status: true,
		message: 'Doctor details fetched successfully',
		doctor: doctor,
	};
}

export async function softDeleteDoctor(id: number) {
	const doctor = await db
		.update(doctors)
		.set({
			isDeleted: true,
			deletedAt: sql`CURRENT_TIMESTAMP`,
		})
		.where(and(eq(doctors.id, id), eq(doctors.isDeleted, false)))
		.returning();

	if (doctor.length <= 0) {
		throw new AppError('Doctor not found', 404);
	}

	return {
		status: true,
		message: 'Doctor removed successfully',
		doctor: doctor,
	};
}

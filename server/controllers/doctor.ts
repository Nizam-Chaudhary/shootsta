import { Request, Response } from 'express';
import { z } from 'zod';
import * as doctorService from '../services/doctor';
import {
	addDoctorValidator,
	updateDoctorValidator,
} from '../validators/doctor';

export async function addDoctor(req: Request, res: Response) {
	const body = addDoctorValidator.parse(req.body);
	const response = await doctorService.addDoctor(body);

	return res.status(201).json(response);
}

export async function updateDoctor(req: Request, res: Response) {
	const id = z.coerce.number().parse(req.params.id);
	const body = updateDoctorValidator.parse(req.body);

	const response = await doctorService.updateDoctor(id, body);

	return res.status(200).json(response);
}

export async function getDoctors(_req: Request, res: Response) {
	const response = await doctorService.getDoctors();

	res.status(200).json(response);
}

export async function getDoctorById(req: Request, res: Response) {
	const id = z.coerce.number().parse(req.params.id);

	const response = await doctorService.getDoctorById(id);

	return res.status(200).json(response);
}

export async function removeDoctor(req: Request, res: Response) {
	const id = z.coerce.number().parse(req.params.id);

	const response = await doctorService.removeDoctor(id);

	return res.status(200).json(response);
}

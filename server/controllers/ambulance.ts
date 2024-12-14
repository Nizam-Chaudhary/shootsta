import { Request, Response } from 'express';
import * as ambulanceService from '../services/ambulance';

export async function addAmbulance(req: Request, res: Response) {
	const body = req.body;
	const response = await ambulanceService.addAmbulance(body);

	res.send(201).json(response);
}

export async function updateAmbulance(req: Request, res: Response) {
	const body = req.body;

	const response = await ambulanceService.updateAmbulance(body);

	res.send(200).json(response);
}

export async function getAmbulances(req: Request, res: Response) {
	const response = await ambulanceService.getAmbulances();

	res.send(200).json(response);
}

export async function getAmbulanceById(req: Request, res: Response) {
	const response = await ambulanceService.getAmbulanceById(1);

	res.send(200).json(response);
}

export async function removeAmbulance(req: Request, res: Response) {
	const response = await ambulanceService.removeAmbulance(1);

	res.send(200).json(response);
}

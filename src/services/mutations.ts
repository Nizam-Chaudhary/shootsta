import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormData from 'form-data';
import {
	addAmbulanceDetails,
	addDoctorDetails,
	deleteFile,
	removeAmbulance,
	removeDoctor,
	updateAmbulanceDetails,
	updateDoctorDetails,
	uploadFile,
} from './api';

export function useAddDoctor(doctor: any) {
	return useMutation({
		mutationKey: ['doctors', { name: doctor.name }],
		mutationFn: () => addDoctorDetails(doctor),
	});
}

export function useUpdateDoctor(id: number, doctor: any) {
	return useMutation({
		mutationKey: ['doctors', { id }],
		mutationFn: () => updateDoctorDetails(id, doctor),
	});
}

export function useDeleteDoctor() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => removeDoctor(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['doctors'] });
		},
	});
}

export function useAddAmbulance(ambulance: any) {
	return useMutation({
		mutationKey: ['ambulances', { name: ambulance.title }],
		mutationFn: () => addAmbulanceDetails(ambulance),
	});
}

export function useUpdateAmbulance(id: number, ambulance: any) {
	return useMutation({
		mutationKey: ['ambulances', { id }],
		mutationFn: () => updateAmbulanceDetails(id, ambulance),
	});
}

export function useDeleteAmbulance() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => removeAmbulance(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ambulances'] });
		},
	});
}

export function useUploadFile(formData: FormData) {
	return useMutation({
		mutationKey: ['files'],
		mutationFn: () => uploadFile(formData),
	});
}

export function useDeleteFile(fileKey: string) {
	return useMutation({
		mutationKey: ['files'],
		mutationFn: () => deleteFile(fileKey),
	});
}

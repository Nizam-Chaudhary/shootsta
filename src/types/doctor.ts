export type Doctor = {
	id: number;
	name: string;
	age: number;
	specialty?: string;
	contact?: string;
	description?: string;
	location?: {
		latitude: string;
		longitude: string;
	};
	image_file_key: string;
	isDeleted: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
};

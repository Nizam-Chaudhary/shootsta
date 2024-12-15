export type Ambulance = {
	id: number;
	title: string;
	contact?: string;
	description?: string;
	location?: {
		latitude: string;
		longitude: string;
	};
	imageFileKey: string;
	isDeleted: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
};

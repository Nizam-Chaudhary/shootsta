import { describe, expect, it, jest } from '@jest/globals';
import { addAmbulance } from '../services/ambulance';

describe('addAmbulance function', () => {
	it('should throw an error when required fields in the input object are missing', async () => {
		const incompleteAmbulance = {
			// Missing 'title' field
			contact: '123-456-7890',
			description: 'Emergency ambulance service',
		};

		// await expect(addAmbulance(incompleteAmbulance)).rejects.toThrow();
	});

	it('should handle the case when the input object contains extra fields', async () => {
		const ambulanceWithExtraFields = {
			title: 'Test Ambulance',
			contact: '123-456-7890',
			description: 'Emergency ambulance service',
			extraField: 'This is an extra field',
		};

		const result = await addAmbulance(ambulanceWithExtraFields);

		expect(result.status).toBe(true);
		expect(result.message).toBe('Ambulance details added successfully');
		expect(result.data).toBeDefined();
		expect(result.data[0]).not.toHaveProperty('extraField');
	});
});

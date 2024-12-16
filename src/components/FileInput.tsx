import { Input } from '@/components/ui/input'; // Assuming you have a basic Input component
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import FormData from 'form-data';
import { useUploadFile } from '@/services/mutations';

type FileInputProps = {
	id: string;
	name: string;
	label: string;
	required?: boolean;
};

const FileInput = ({ id, name, label, required = false }: FileInputProps) => {
	const {
		register,
		setValue,
	} = useFormContext();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const fileUploadMutation = useUploadFile()

	// Handle file change
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		const formData = new FormData();
		formData.append('file', file);

		console.log('formData', formData)
		fileUploadMutation.mutate(formData, {
		onSuccess: (data) => {
			console.log('File upload successful:', data);
			setValue("file", data);
		},	
		onError: (error) => {
			console.error('File upload failed:', error);
		},
	});
	};

	return (
		<div className="space-y-2">
			<label htmlFor={id} className="block text-sm font-medium">
				{label}
			</label>
			<Input
				id={id}
				type="file"
				{...register(name, { required: required })}
				onChange={handleFileChange}
				className="border p-2"
			/>
			<div>
				{fileInputRef.current?.files && fileInputRef.current?.files[0] && (
					<p className="text-sm text-gray-500 mt-2">
						File selected: {fileInputRef.current.files[0].name}
					</p>
				)}
			</div>
		</div>
	);
};

export default FileInput;

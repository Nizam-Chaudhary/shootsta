import { Input } from '@/components/ui/input'; // Assuming you have a basic Input component 
import { useFormContext } from 'react-hook-form';
import FormData from 'form-data';
import { useUploadFile } from '@/services/mutations';

type FileInputProps = {
	id: string;
	name: string;
	label: string;
	value?: string;
	required?: boolean;
	setUpload ?:any
	upload ?:any
};

const FileInput = ({ id, name, label, value ,required = false, setUpload, upload }: FileInputProps) => {
	const {
		register,
		setValue,
	} = useFormContext(); 
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
			setUpload(data);
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
				onChange={handleFileChange}
				className="border p-2"
			/>
			<div>
				{value && (
					<p className="text-sm text-gray-500 mt-2">
						File selected: {value}
					</p>
				)}
			</div>
		</div>
	);
};

export default FileInput;

import { Input } from '@/components/ui/input'; // Assuming you have a basic Input component
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

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
		formState: { errors },
	} = useFormContext();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Handle file change
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setValue(name, file); // Set the selected file to React Hook Form's value
		}
		console.log(file);
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

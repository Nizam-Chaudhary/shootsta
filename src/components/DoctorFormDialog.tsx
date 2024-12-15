import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form'; // Import FormProvider
import { z } from 'zod';
import FileInput from './FileInput'; // Assuming FileInput is in the same directory

// Zod schema
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	age: z
		.number()
		.min(1, 'Age must be greater than 0')
		.max(120, 'Age must be less than 120'),
	specialty: z.string().min(1, 'Specialty is required'),
	contact: z
		.string()
		.min(1, 'Contact is required')
		.email('Invalid email address'),
	description: z.string().min(1, 'Description is required'),
	location: z.string().min(1, 'Location is required'),
	file: z
		.any()
		.refine((file) => file?.length > 0, 'File is required')
		.optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
	open: boolean;
	setOpen: any;
};

const DoctorFormDialog = ({ open, setOpen }: Props) => {
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const {
		handleSubmit,
		reset,
		formState: { errors },
	} = methods;

	const onSubmit = (data: FormData) => {
		console.log(data);
		reset(); // Reset form after submit
		setOpen(false); // Close dialog after submit
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6 opacity-100">
				<DialogHeader>
					<h2>Add Doctor</h2>
				</DialogHeader>

				<FormProvider {...methods}>
					{' '}
					{/* Wrap form in FormProvider */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-sm font-medium">
								Name
							</label>
							<Input
								id="name"
								{...methods.register('name')}
								placeholder="Enter doctor's name"
								className="mt-1"
							/>
							{errors.name && (
								<p className="text-red-600 text-xs">{errors.name.message}</p>
							)}
						</div>

						<div>
							<label htmlFor="age" className="block text-sm font-medium">
								Age
							</label>
							<Input
								id="age"
								{...methods.register('age', { valueAsNumber: true })}
								type="number"
								placeholder="Enter doctor's age"
								className="mt-1"
							/>
							{errors.age && (
								<p className="text-red-600 text-xs">{errors.age.message}</p>
							)}
						</div>

						<div>
							<label htmlFor="specialty" className="block text-sm font-medium">
								Specialty
							</label>
							<Input
								id="specialty"
								{...methods.register('specialty')}
								placeholder="Enter doctor's specialty"
								className="mt-1"
							/>
							{errors.specialty && (
								<p className="text-red-600 text-xs">
									{errors.specialty.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor="contact" className="block text-sm font-medium">
								Contact
							</label>
							<Input
								id="contact"
								{...methods.register('contact')}
								placeholder="Enter doctor's contact"
								className="mt-1"
							/>
							{errors.contact && (
								<p className="text-red-600 text-xs">{errors.contact.message}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium"
							>
								Description
							</label>
							<Textarea
								id="description"
								{...methods.register('description')}
								placeholder="Enter description"
								className="mt-1"
							/>
							{errors.description && (
								<p className="text-red-600 text-xs">
									{errors.description.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor="location" className="block text-sm font-medium">
								Location
							</label>
							<Input
								id="location"
								{...methods.register('location')}
								placeholder="Enter location"
								className="mt-1"
							/>
							{errors.location && (
								<p className="text-red-600 text-xs">
									{errors.location.message}
								</p>
							)}
						</div>

						<div>
							<FileInput
								id="file"
								name="file"
								label="Upload File"
								required={true}
							/>
							{errors.file && (
								<p className="text-red-600 text-xs">File is required</p>
							)}
						</div>

						<DialogFooter>
							<Button type="submit">Submit</Button>
							<DialogClose asChild>
								<Button variant="outline" type="button">
									Cancel
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};

export default DoctorFormDialog;

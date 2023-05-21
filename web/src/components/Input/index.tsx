import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
	errors: FieldErrors<FieldValues>;
	register: UseFormRegister<FieldValues>;
	spanTitle: string;
	label: string;
}

export default function Input(props: IInput) {
	const { errors, register, label, spanTitle, ...rest } = props;

	return (
		<label htmlFor={label} className="relative mt-4">
			<input
				id={"input-" + label}
				className="peer relative  w-80 border-b bg-transparent pl-2 text-right text-gray-50 outline-none"
				{...register(label)}
				{...rest}
			/>
			<span className="absolute left-0 top-0 mr-4 duration-100 ease-in peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-gray-300">
				{spanTitle}
			</span>
			{errors?.[label]?.message && (
				<p className="mt-2 text-xs italic text-red-500">
					{errors?.[label]?.message + ""}
				</p>
			)}
		</label>
	);
}

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@/components/index";
import * as z from "zod";

const formSchema = z
	.object({
		name: z.string(),
		email: z.string().email({ message: "E-mail must be provided" }),
		password: z
			.string()
			.min(6, { message: "Password must be atleast 6 characters" }),
		confirmPassword: z
			.string()
			.min(6, { message: "Password must be atleast 6 characters" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Password don't match",
	});

type formSchemaType = z.infer<typeof formSchema>;

const inputsList = [
	{ label: "name", type: "text", spanTitle: "Name:" },
	{ label: "email", type: "email", spanTitle: "E-mail:" },
	{ label: "password", type: "password", spanTitle: "Password:" },
	{
		label: "confirmPassword",
		type: "password",
		spanTitle: "Confirm Password:",
	},
];

export default function Home() {
	const [loading, setLoading] = useState(false);

	const {
		register,
		formState: { errors },
	} = useForm({ resolver: zodResolver(formSchema) });

	const callHandler = async (data: any) => {
		data.preventDefault();
		const inputs = [
			...data.target?.querySelectorAll("form > label > input"),
		];
		const form: formSchemaType = inputs.reduce((acc, input) => {
			return {
				...acc,
				[input.name]: input.value,
			};
		}, {});

		try {
			setLoading(true);
			const response = await fetch("/api/users", {
				method: "POST",
				body: JSON.stringify({
					name: form.name,
					email: form.email,
					password: form.password,
					confirmPassword: form.confirmPassword,
				}),
			});
			console.log(await response.json());
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-950 to-gray-900 p-6 text-gray-100">
			<h1 className="mb-8 text-4xl">Login:</h1>
			<form
				onSubmit={callHandler}
				className="flex flex-col items-center justify-center"
			>
				{inputsList.map((input, idx) => {
					const { ...rest } = input;
					return (
						<Input
							key={idx + input.label}
							errors={errors}
							register={register}
							autoComplete="off"
							{...rest}
						/>
					);
				})}

				<Button
					animate
					internText="Enviar"
					loadingText="Enviando"
					disabled={loading}
					loading={loading}
				/>
			</form>
		</div>
	);
}

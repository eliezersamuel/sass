"use server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const delay = (time = 5000) => {
	return new Promise((resolve) => setTimeout(resolve, time));
};

const expiringDate = (timeInTenSeconds = 1) => {
	const timeToAdd = 1000 * 10 * timeInTenSeconds;
	const date = new Date();
	const expiryTime = date.getTime() + timeToAdd;
	date.setTime(expiryTime);
	return date.toUTCString();
};

export async function POST(req: NextRequest) {
	const body = await req.json();

	console.log(body);

	const requestSchema = z
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

	const { name, email, password } = requestSchema.parse(body);

	await delay();

	const csrf = req.cookies.get("csrf-token");

	return new NextResponse(JSON.stringify({ status: 200, message: "ok" }), {
		headers: {
			"set-cookie": `csrf-token=123456; Expires=${expiringDate()};HttpOnly; path=/`,
		},
	});
}

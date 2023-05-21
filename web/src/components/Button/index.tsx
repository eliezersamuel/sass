import { CircleNotch } from "@phosphor-icons/react";

const TypeOfButton = {
	default:
		"mt-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 hover:scale-105 ease-in	duration-100",
};

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading: boolean;
	internText: string;
	loadingText: string;
	animate: boolean;
	typeOfButton?: keyof typeof TypeOfButton;
}

export default function Button(props: IButton) {
	const {
		loading,
		internText,
		loadingText,
		animate,
		typeOfButton = "default",
		...rest
	} = props;
	return (
		<button className={TypeOfButton[typeOfButton]} {...rest}>
			{!loading ? (
				internText
			) : (
				<div className="flex flex-row">
					{animate && (
						<CircleNotch
							size={32}
							className="mr-3 h-5 w-5 animate-spin"
						/>
					)}
					<span>{loadingText}</span>
				</div>
			)}
		</button>
	);
}

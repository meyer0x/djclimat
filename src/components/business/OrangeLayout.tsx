import { PropsWithChildren } from "react";

const OrangeLayout = ({
	title,
	children,
	subtitle,
}: PropsWithChildren & { title: string; subtitle?: string }) => {
	return (
		<div className="rounded-3xl bg-primary px-40 py-14 w-2/3 flex flex-col gap-12 relative">
			<div className="flex flex-col items-center">
				{!!subtitle && (
					<p className="text-black text-lg font-bold uppercase">{subtitle}</p>
				)}
				<h1 className="text-primary-foreground font-bold text-4xl w-full text-center">
					{title}
				</h1>
			</div>
			{children}
		</div>
	);
};

export default OrangeLayout;

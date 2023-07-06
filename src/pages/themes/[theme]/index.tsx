/* eslint-disable @next/next/no-img-element */
import HeartIcon from "@/components/business/HearthIcon";
import OrangeLayout from "@/components/business/OrangeLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Theme, themes } from "../../../../questions";

const getTheme = (slug: string) => {
	return themes.find(theme => theme.slug.toLowerCase() === slug.toLowerCase());
};

const getColorsByPoints = (
	points: number,
): { primary: string; secondary: string } => {
	const primaryColor = "#A1E367"; // Couleur de l'eau
	const secondaryColor = "#2394E0"; // Couleur de la terre

	const maxPoints = 100; // Nombre maximal de points
	const maxRottenness = 0.8; // Pourcentage maximal de pourrissement

	const rottenness = 1 - (points / maxPoints) * maxRottenness; // Calcul du pourrissement en fonction des points

	// Calcul des couleurs en fonction du pourrissement
	const primary = blendColors(primaryColor, "#000000", rottenness);
	const secondary = blendColors(secondaryColor, "#000000", rottenness);

	return { primary, secondary };
};

// Fonction pour mélanger deux couleurs en fonction d'un facteur
const blendColors = (
	color1: string,
	color2: string,
	factor: number,
): string => {
	let result = color1.slice(0, 1); // Ignorer le signe '#'

	for (let i = 1; i <= 6; i += 2) {
		const component1 = parseInt(color1.slice(i, i + 2), 16); // Convertir la composante en décimal
		const component2 = parseInt(color2.slice(i, i + 2), 16); // Convertir la composante en décimal

		const blendedComponent = Math.round(
			component1 * (1 - factor) + component2 * factor,
		); // Calculer la composante mélangée

		const blendedHex = blendedComponent.toString(16).padStart(2, "0"); // Convertir la composante mélangée en hexadécimal

		result += blendedHex; // Ajouter la composante mélangée au résultat
	}

	return result.replaceAll("-", "");
};

type Props = Theme;

const ThemePage: NextPage<Props> = ({ questions, name }) => {
	const [points, setPoints] = useState(100);
	const [currentIndex, setCurrentIndex] = useState(0);

	const currentQuestion = useMemo(
		() => questions[currentIndex],
		[currentIndex, questions],
	);

	const [selected, setSelected] = useState<Record<number, string[]>>([]);

	const currentSelected = useMemo(
		() => selected[currentIndex],
		[selected, currentIndex],
	);

	const [isViewSensibility, setIsViewSensibility] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);

	if (isGameOver) {
		return (
			<div className="flex items-center justify-center min-h-screen relative">
				<OrangeLayout
					title={"Vous avez détruit la terre !"}
					subtitle={"GAME OVER"}
				>
					<iframe
						src="https://gfycat.com/ifr/BewitchedIlliterateAnnelid"
						width="640"
						height="404"
					/>
					<p>
						{" "}
						<a href="https://gfycat.com/bewitchedilliterateannelid">
							via Gfycat
						</a>
					</p>
					<Link
						className={buttonVariants({ variant: "outline" })}
						href={"/themes"}
					>
						Voir les thèmes
					</Link>
				</OrangeLayout>
			</div>
		);
	}

	if (isFinished) {
		return (
			<div className="flex items-center justify-center min-h-screen relative">
				<OrangeLayout
					title={"Vous avez terminé et garder la terre en vie !"}
					subtitle={"BRAVO !"}
				>
					<div className={"h-32 w-32 self-center"}>
						<HeartIcon {...getColorsByPoints(points)} />
						<p className="text-center mt-4 font-bold text-lg text-destructive">
							{points} points sur 100
						</p>
					</div>
					<Link
						className={buttonVariants({ variant: "outline" })}
						href={"/themes"}
					>
						Voir les thèmes
					</Link>
				</OrangeLayout>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen relative">
			<div
				className={cn(
					"bg-white rounded-lg p-4 flex flex-col items-center justify-center absolute left-10 gap-2 border-2",
				)}
			>
				<div className={"h-32 w-32"}>
					<HeartIcon {...getColorsByPoints(points)} />
				</div>
				<p className="text-sm font-bold text-black">Garder la terre en vie !</p>
				<p className="text-sm font-bold text-black">
					Il vous reste {points} sur 100 points !
				</p>
			</div>
			<OrangeLayout title={currentQuestion.question} subtitle={name}>
				{isViewSensibility ? (
					<div className="flex flex-col gap-4">
						{currentQuestion.responses.map(currentResponse => {
							return (
								<div
									className={cn("flex flex-col gap-2 rounded-lg py-4 px-6", {
										"bg-green-500 text-green-950":
											currentResponse?.color === "green",
										"bg-red-500 text-red-950": currentResponse?.color === "red",
										"bg-orange-500 text-orange-950":
											currentResponse?.color === "orange",
									})}
									key={currentResponse.label}
								>
									<p className="font-bold text-lg">{currentResponse?.label}</p>
									<p>{currentResponse?.text}</p>
								</div>
							);
						})}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 px-24">
						{questions.map((question, index) =>
							question.responses.map(response => (
								<div
									className={cn(
										"flex flex-col items-center gap-2 cursor-pointer hover:bg-black p-4 rounded-lg transition-all duration-300 group hover:text-white",
										{
											"bg-black text-white": currentSelected?.includes(
												response.label,
											),
										},
									)}
									key={response.label}
									onClick={() => {
										setSelected(prev => ({
											...prev,
											[index]: !prev?.[index]?.includes(response.label)
												? [...(prev[index] || []), response.label]
												: prev[index].filter(p => p !== response.label),
										}));
									}}
								>
									<img
										src={"https://picsum.photos/200"}
										alt={response.label}
										className="rounded-lg"
									/>
									<p className="font-bold self-center ">{response.label}</p>
								</div>
							)),
						)}
					</div>
				)}
				<Button
					variant={"secondary"}
					className="self-center font-bold"
					onClick={() => {
						if (isViewSensibility) {
							if (points <= 0) {
								setIsGameOver(true);
							} else {
								if (currentIndex >= questions.length - 1) {
									setIsFinished(true);
								} else {
									setCurrentIndex(prev => prev + 1);
									setIsViewSensibility(false);
								}
							}
						} else {
							const responsesSelected = currentSelected.map(selected =>
								currentQuestion.responses.find(
									response => response.label === selected,
								),
							);

							setPoints(
								prev =>
									prev +
									responsesSelected.reduce(
										(prev, curr) => prev + (curr?.points || 0),
										0,
									),
							);
							setIsViewSensibility(true);
						}
					}}
				>
					{isViewSensibility ? "Continuer" : "Confirmer"}
				</Button>
			</OrangeLayout>
		</div>
	);
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
	const slug = params?.theme as string;

	const foundedTheme = getTheme(slug);
	// Vérifiez si le thème existe
	if (!foundedTheme) {
		return {
			notFound: true, // Renvoie une erreur 404 si le thème n'existe pas
		};
	}

	// Récupérez ici les questions du thème

	return {
		props: {
			...foundedTheme,
		},
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	const paths = themes.map(theme => ({
		params: { theme: theme.slug },
	}));

	return { paths, fallback: false };
};
export default ThemePage;

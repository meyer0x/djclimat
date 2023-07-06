type Question = {
	question: string;
	responses: {
		img: string;
		label: string;
		text: string;
		points?: number;
		color: "green" | "orange" | "red";
	}[];
};

export type Theme = {
	slug: string;
	name: string;
	image: string;
	questions: Question[];
};

export const themes: Theme[] = [
	{
		slug: "theme-1",
		name: "Transport et mobilité",
		image: "/transport.png",
		questions: [
			{
				question: "Quels sont les modes de transport les plus écologiques ?",
				responses: [
					{
						img: "chemin/vers/image.jpg",
						label: "Transport en commun",
						text: "Le transport en commun réduit les émissions de gaz à effet de serre et la congestion routière.",
						color: "green",
					},
					{
						img: "chemin/vers/image.jpg",
						label: "Vélo",
						text: "Le vélo est une alternative durable pour les déplacements courts et contribue à la réduction de la pollution atmosphérique.",
						color: "green",
					},
					{
						img: "chemin/vers/image.jpg",
						label: "Voiture individuelle",
						text: "L'utilisation excessive de la voiture individuelle contribue à la pollution de l'air et au réchauffement climatique.",
						color: "red",
						points: -110,
					},
					// Ajoutez d'autres réponses pour cette question
				],
			},
			// Ajoutez d'autres questions pour ce thème
		],
	},
	{
		slug: "depense-personnelle",
		name: "Dépense personnelle",
		image: "/money.png",
		questions: [],
	},
	{
		slug: "alimentation",
		name: "Alimentation",
		image: "/alimentation.png",
		questions: [],
	},
	{
		slug: "dechets",
		name: "Dechets",
		image: "/dechets.png",
		questions: [],
	},
];

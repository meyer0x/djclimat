import Layout from "@/components/business/Layout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const Home = () => {
	return (
		<Layout>
			<div className="flex flex-col gap-6 items-center flex-1 py-24">
				<img
					src="/home.png"
					className="hidden md:block absolute bottom-28 left-0"
					alt="Start"
				/>
				<h1 className="font-bold text-3xl text-center">
					Bienvenue sur DJ du climat
				</h1>
				<p className="text-lg w-2/3 mb-24">
					Plongez au cœur de notre quizz pédagogique captivant sur le climat et
					explorez les enjeux cruciaux de notre époque. Défiez-vous avec des
					questions passionnantes sur les transports écologiques,
					l&apos;alimentation durable, l&apos;optimisation des dépenses
					publiques et la nécessité de surveiller attentivement votre empreinte
					carbone. Relevez le défi, enrichissez vos connaissances et devenez un
					acteur conscient de la préservation de notre planète, tout en vous
					amusant ! Rejoignez-nous pour un voyage éducatif mêlant plaisir et
					sensibilisation à la cause climatique.
				</p>

				<Link href={"/avatar"} className={buttonVariants({ size: "lg" })}>
					Start 🚀
				</Link>
			</div>
		</Layout>
	);
};

export default Home;

/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/business/Layout";
import OrangeLayout from "@/components/business/OrangeLayout";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import Link from "next/link";
import { themes } from "../../../questions";

const ThemesPage: NextPage = () => {
	return (
		<Layout>
			<div className="flex items-center justify-center flex-1">
				<OrangeLayout title="Nos thèmes">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 px-24">
						{themes.map((theme, index) => (
							<Link
								className={cn(
									"flex flex-col items-center gap-2 cursor-pointer hover:bg-black p-4 rounded-lg transition-all duration-300 group",
								)}
								href={`/themes/${theme.slug}`}
								key={theme.slug}
							>
								<img src={theme.image} alt={theme.name} />
								<p className="font-bold self-center group-hover:text-white">
									{theme.name}
								</p>
							</Link>
						))}
					</div>
				</OrangeLayout>
			</div>
		</Layout>
	);
};

export default ThemesPage;

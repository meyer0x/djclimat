import { usernameAtom } from "@/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

const items = [
	{ label: "Accueil", slug: "/" },
	{ label: "Les thèmes", slug: "/themes" },
];

export default function NavigationBar() {
	const router = useRouter();
	const [username, setUsername] = useAtom(usernameAtom);
	return (
		<div className="h-24 flex items-center justify-between px-24 border-b border-black bg-black text-white">
			<Link href="/">
				<img src={"/logo.webp"} className="h-20" alt="Alt" />
			</Link>
			<div className="flex items-center justify-end gap-12 flex-1">
				{items.map(item => (
					<Link
						key={item.label}
						className="rounded-lg px-4 py-2  hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer hover:font-bold"
						href={item.slug}
					>
						<p>{item.label}</p>
					</Link>
				))}
				{!!username && (
					<p
						className="rounded-lg px-4 py-2  hover:bg-primary hover:text-primary-foreground transition-all hover:font-bold cursor-pointer"
						onClick={() => {
							setUsername(undefined);
							router.push("/");
						}}
					>
						Bonjour, {username[0].toUpperCase()}
						{username.slice(1).toLowerCase()} 👋
					</p>
				)}
			</div>
		</div>
	);
}

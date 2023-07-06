import { usernameAtom } from "@/atoms";
import Layout from "@/components/business/Layout";
import OrangeLayout from "@/components/business/OrangeLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const Avatar = () => {
	const router = useRouter();
	const [username, setUsername] = useAtom(usernameAtom);
	const [input, setInput] = useState(username);

	const handleClick = useCallback(() => {
		if (input?.trim()?.length > 3) {
			setUsername(input);
			router.push("/themes");
		}
	}, [input, setUsername, router]);

	return (
		<Layout>
			<form
				className="flex items-center justify-center flex-1"
				noValidate
				onSubmit={e => e.preventDefault()}
			>
				<OrangeLayout title="Créer l'avatar">
					<div className="flex flex-col space-y-2 items-center justify-center">
						<Label className="text-lg">Nom d&apos;utilisateur</Label>
						<Input
							placeholder="Nom d'utilisateur"
							onChange={event => setInput(event.target.value)}
							value={input}
						/>
						<p className="text-slate-50">Exemple : Greta Thundberg</p>
					</div>
					<Button variant={"outline"} onClick={handleClick}>
						Jouer
					</Button>
				</OrangeLayout>
			</form>
		</Layout>
	);
};

export default Avatar;

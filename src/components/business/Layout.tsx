import { PropsWithChildren } from "react";
import NavigationBar from "./NavigationBar";

const Layout = (props: PropsWithChildren) => {
	return (
		<div className="min-h-screen flex flex-col">
			<NavigationBar />

			<div className="flex-1 flex w-full">{props.children}</div>
		</div>
	);
};

export default Layout;

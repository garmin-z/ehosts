import { IntlProvider } from "react-intl";
import zh from "@/locales/zh_CN/index";
import React, { useEffect, Suspense } from "react";
import RouterComp from "@/router";

function App() {
	const messagesInFrench = {
		...zh
	};

	useEffect(() => {
		// login();
	}, []);
	return (
		<Suspense fallback={<div>loading</div>}>
			<IntlProvider messages={messagesInFrench} locale="fr" defaultLocale="en">
				<RouterComp />
			</IntlProvider>
		</Suspense>
	);
}

export default App;

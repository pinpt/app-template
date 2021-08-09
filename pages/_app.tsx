import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '@pinpt/react/dist/base.css';
import '@pinpt/react/dist/entry.css';
import '@pinpt/react/themes/default.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		// remove preload class to enable transitions after initial load
		document.querySelector('body')?.classList.remove('preload');
	}, []);

	return <Component {...pageProps} />;
}
export default MyApp;

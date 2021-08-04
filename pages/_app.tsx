import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '@pinpt/react/dist/base.css';
import '@pinpt/react/themes/default.css';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
export default MyApp;

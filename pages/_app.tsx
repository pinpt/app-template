import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '@pinpt/react/base.css';
import '../theme.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp

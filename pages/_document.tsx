import Document, { Head, Html, Main, NextScript } from 'next/document';
import config from '../pinpoint.config';

const fileApi = `https://file.${config.apihost?.includes('.edge.') ? 'edge.' : ''}pinpoint.com`;

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="preconnect" href={fileApi} />
					<link
						rel="stylesheet"
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"
						href="https://fonts.googleapis.com/css?family=Inter:300,400,500,700&amp;display=swap"
					/>
				</Head>
				<body className="preload Pinpoint">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

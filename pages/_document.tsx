import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
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

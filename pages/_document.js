import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* <link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<meta name="theme-color" content="#fff" /> */}
					{/* <link rel="stylesheet" type="text/css" href="swiper/swiper.min.css" />
					<link rel="stylesheet" type="text/css" href="swiper/components/effect-coverflow/effect-coverflow.min.css" />
					<link rel="stylesheet" type="text/css" href="swiper/components/pagination/pagination.min.css" />
					<link rel="stylesheet" type="text/css" href="swiper/components/navigation/navigation.min.css" /> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

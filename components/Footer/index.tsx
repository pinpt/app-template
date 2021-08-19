import { ISite, Prebuilt } from '@pinpt/react';

export interface FooterProps {
	site: ISite;
}

const Footer = (props: FooterProps) => {
	const { site } = props;
	return <Prebuilt.Footer site={site} />;
};

export default Footer;

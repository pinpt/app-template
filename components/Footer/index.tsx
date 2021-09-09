import { ISite, PrebuiltFooter } from '@pinpt/react';

export interface FooterProps {
	site: ISite;
}

const Footer = (props: FooterProps) => {
	const { site } = props;
	return <PrebuiltFooter site={site} />;
};

export default Footer;

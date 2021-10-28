import { ISite, PrebuiltFooter } from '@pinpt/react';

export interface FooterProps {
	site: ISite;
	noSubscribe?: boolean;
}

const Footer = (props: FooterProps) => {
	const { site, noSubscribe = false } = props;
	return <PrebuiltFooter site={site} renderSubscribe={noSubscribe ? () => <></> : undefined} />;
};

export default Footer;

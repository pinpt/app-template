import { ISite, Prebuilt } from '@pinpt/react';

export interface IFooterProps {
	site: ISite;
}

const Footer = (props: IFooterProps) => {
	const { site } = props;
	return (
		<Prebuilt.Footer site={site} />
	);
};

export default Footer;

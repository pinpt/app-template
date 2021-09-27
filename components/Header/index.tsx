import router from 'next/router';
import { getRouterRelativePath, ISite, PrebuiltHeader } from '@pinpt/react';

export interface HeaderProps {
	site: ISite;
}

const Header = (props: HeaderProps) => {
	const { site } = props;
	return (
		<PrebuiltHeader
			site={site}
			handleSearch={(value) => router.push(getRouterRelativePath(site, `/search?term=${value}`))}
			handleSelectHome={() => router.push(getRouterRelativePath(site, '/'))}
		/>
	);
};

export default Header;

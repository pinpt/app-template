import router from 'next/router';
import { getRouterRelativePath, ISite, PrebuiltHeader } from '@pinpt/react';

export interface HeaderProps {
	site: ISite;
	noSubscribe?: boolean;
}

const Header = (props: HeaderProps) => {
	const { site, noSubscribe = false } = props;
	return (
		<PrebuiltHeader
			site={site}
			handleSearch={(value) => router.push(getRouterRelativePath(site, `/search?term=${value}`))}
			handleSelectHome={() => router.push(getRouterRelativePath(site, '/'))}
			renderSubscribe={noSubscribe ? () => <></> : undefined}
		/>
	);
};

export default Header;

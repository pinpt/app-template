import router from 'next/router';
import { getRouterRelativePath, ISite, PrebuiltHeader } from '@pinpt/react';

export interface HeaderProps {
	site: ISite;
	noSubscribe?: boolean;
	title?: string;
	description?: string;
}

const Header = (props: HeaderProps) => {
	const { site, noSubscribe = false, title, description } = props;
	return (
		<PrebuiltHeader
			site={site}
			handleSearch={(value) => router.push(getRouterRelativePath(site, `/search?term=${value}`))}
			handleSelectHome={() => router.push(getRouterRelativePath(site, '/'))}
			renderSubscribe={noSubscribe ? () => <></> : undefined}
			title={title}
			description={description}
		/>
	);
};

export default Header;

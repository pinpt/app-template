import router from 'next/router';
import { ISite, PrebuiltHeader } from '@pinpt/react';

export interface HeaderProps {
	site: ISite;
}

const Header = (props: HeaderProps) => {
	const { site } = props;
	return (
		<PrebuiltHeader
			site={site}
			handleSearch={(value) => router.push(`/search?term=${value}`)}
			handleSelectHome={() => router.push('/')}
		/>
	);
};

export default Header;

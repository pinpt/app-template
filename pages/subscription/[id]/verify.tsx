import {
	PrebuiltSubscriptionVerify,
	fetchContentPaginated,
	ISite,
	useSubscriptionUpdater,
} from '@pinpt/react';
import config from '../../../pinpoint.config';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const Verify = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const subscriptionId = (router.query.id ?? '') as string;
	const [verified, setVerified] = useState<boolean>(false);
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [pending, setPending] = useState<boolean>(false);
	const { query, loading } = useSubscriptionUpdater(subscriptionId, site, config);

	const performValidation = useCallback(async () => {
		const result = await query({ verified: true });
		setVerified(result.verified ?? false);
		setFirstName(result.firstName ?? '');
		setLastName(result.lastName ?? '');
	}, [query]);

	const handleSave = useCallback(
		async (firstName: string, lastName: string) => {
			try {
				setPending(true);
				const result = await query({ firstName: firstName ?? '', lastName: lastName ?? '' });
				setFirstName(result.firstName ?? '');
				setLastName(result.lastName ?? '');
			} finally {
				setPending(false);
			}
		},
		[query]
	);

	useEffect(() => {
		performValidation();
	}, [performValidation]);

	return (
		<PrebuiltSubscriptionVerify
			site={site}
			renderHeader={(site) => <Header site={site} noSubscribe />}
			renderFooter={(site) => <Footer site={site} noSubscribe />}
			handleSelectHome={() => router.push('/')}
			verified={verified}
			firstName={firstName}
			lastName={lastName}
			loading={loading}
			onSave={handleSave}
			pending={pending}
			className="flex flex-col h-screen"
		/>
	);
};

export default Verify;

export async function getServerSideProps() {
	const pageSize = config.pageSize ?? 11;
	const { site } = await fetchContentPaginated(config, {
		limit: pageSize,
		after: true,
		site: true,
	});

	return {
		props: {
			site,
		},
	};
}

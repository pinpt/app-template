import { PrebuiltSubscriptionVerify, ISite, useSubscriptionUpdater, getRouterRelativePath } from '@pinpt/react';
import config from '../../pinpoint.config';
import Footer from '../Footer';
import Header from '../Header';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const SubscriptionVerify = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const subscriptionId = (router.query.id ?? '') as string;
	const [verified, setVerified] = useState<boolean>(false);
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const { query, loading } = useSubscriptionUpdater(subscriptionId, site, config);

	const performValidation = useCallback(async () => {
		const result = await query({ verified: true });
		setVerified(result.verified ?? false);
		setFirstName(result.firstName ?? '');
		setLastName(result.lastName ?? '');
	}, [query]);

	const handleSave = useCallback(
		async (firstName: string, lastName: string) => {
			const result = await query({ firstName: firstName ?? '', lastName: lastName ?? '' });
			setFirstName(result.firstName ?? '');
			setLastName(result.lastName ?? '');
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
			handleSelectHome={() => router.push(getRouterRelativePath(site, '/'))}
			verified={verified}
			firstName={firstName}
			lastName={lastName}
			loading={loading}
			onSave={handleSave}
			className="flex flex-col h-screen"
		/>
	);
};

export default SubscriptionVerify;

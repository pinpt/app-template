import { PrebuiltSubscriptionVerify, fetchContentPaginated, ISite } from '@pinpt/react';
import config from '../../../pinpoint.config';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const Verify = ({ site }: { site: ISite }) => {
	const router = useRouter();
	const [verified, setVerified] = useState<boolean>(false);
	const [firstName, setFirstName] = useState<string>('Keegan');
	const [lastName, setLastName] = useState<string>('Donley');
	const [loading, setLoading] = useState<boolean>(true);
	const [pending, setPending] = useState<boolean>(false);

	const fetchSubscription = useCallback(() => {
		const subscriptionId = router.query.id;
		console.log('fetching sub', subscriptionId);
		setLoading(false);
		setVerified(true);
	}, [router]);

	const handleSave = useCallback(async (firstName: string, lastName: string) => {
		try {
			setPending(true);
			setFirstName(firstName);
			setLastName(lastName);
		} finally {
			setPending(false);
		}
	}, []);

	useEffect(() => {
		fetchSubscription();
	}, [fetchSubscription]);

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

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
	if (!req.query.contentID) {
		return resp.status(401).json({ message: 'Invalid token' });
	}
	resp.setPreviewData({ commit: req.query.commit }, { maxAge: 10 });
	resp.writeHead(307, { Location: `/entry/${req.query.contentID}` });
	resp.end();
}

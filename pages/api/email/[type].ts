import type { NextApiRequest, NextApiResponse } from 'next';
import { generate } from '@pinpt/email';

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
	if (req.method !== 'POST') {
		resp.status(400).json({ success: false, error: 'Invalid request method' });
		return;
	}
	if (typeof req.body !== 'object') {
		resp.status(400).json({ success: false, error: 'Invalid request body' });
		return;
	}
	const data = { ...req.body };
	const { type } = req.query;
	// by default, we'll pass the data coming in to the template engine to generate the default
	// email body for this content type. if you want to use your own template, you can just return
	// the HTML here using the incoming data object.
	const html = generate(type as string, data);
	resp.json({ success: true, html });
}

import { rest } from 'msw';

export const handlers = [
	rest.delete('http://localhost:4000/api/posts/post_1', (req, res, ctx) => {
		return res(ctx.status(204), ctx.json('ok'));
	}),
];

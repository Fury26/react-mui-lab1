import PostList from '.';

const { renderWithProviders, UserPosts, LoadedUser } = require('tests/redux-provider');

describe(() => {
	it('Coorect number of posts', () => {
		const { getByTestId } = renderWithProviders(<PostList posts={UserPosts.feed.posts} />, {
			preloadedState: { auth: LoadedUser, post: UserPosts },
		});
		const element = getByTestId('feed-stack');
		expect(element.children.length).toBe(2);
	});
});

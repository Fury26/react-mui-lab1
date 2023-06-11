import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deletePost } from 'store/posts';
import { LoadedUser, UserPosts } from 'tests/constants';
import { server } from 'tests/mocks/server';
import { renderWithProviders } from 'tests/redux-provider';

import PostList from '.';

import '@testing-library/jest-dom';

describe('PostList component tests', () => {
	beforeAll(() => server.listen());
	it('Coorect number of posts', () => {
		const { getByTestId } = renderWithProviders(<PostList posts={UserPosts.feed.posts} />, {
			preloadedState: { auth: LoadedUser, post: UserPosts },
		});

		const element = getByTestId('feed-stack');
		expect(element.children.length).toBe(2);
	});

	it('Corect number of posts that have option to delete post', () => {
		const { queryAllByTestId } = renderWithProviders(<PostList posts={UserPosts.feed.posts} />, {
			preloadedState: { auth: LoadedUser, post: UserPosts },
		});

		const actionMenus = queryAllByTestId('action-menu');
		expect(actionMenus.length).toBe(1);
	});

	it('Check delete post', async () => {
		const { queryByTestId, queryAllByTestId, rerender, store } = renderWithProviders(
			<PostList posts={UserPosts.feed.posts} />,
			{
				preloadedState: { auth: LoadedUser, post: UserPosts },
			},
		);

		const actionMenus = queryAllByTestId('action-menu');
		expect(actionMenus.length).toBe(1);

		const target = queryByTestId('menu-button');
		act(() => userEvent.click(target!));
		let deleteButton: HTMLElement | null = null;
		await waitFor(() => {
			deleteButton = queryByTestId('delete-button');
			expect(deleteButton).toBeInTheDocument();
		});

		act(() => userEvent.click(deleteButton!));
		let confirmButton: HTMLElement | null = null;
		await waitFor(() => {
			confirmButton = queryByTestId('confirm-delete-button');
			expect(confirmButton).toBeInTheDocument();
		});

		await store.dispatch(deletePost('post_1'));
		rerender(<PostList posts={store.getState().post.feed.posts} />);
		await waitFor(() => {
			const posts = queryByTestId('feed-stack');
			expect(posts?.children.length).toBe(1);
		});
	});
});

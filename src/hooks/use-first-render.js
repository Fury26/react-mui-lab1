import { useEffect, useRef } from 'react';

export const useFirstNonFalsyRender = (val, fn) => {
	const isRendered = useRef(false);

	useEffect(() => {
		if (!isRendered.current && val) {
			isRendered.current = true;
			fn();
		}
	}, [val, fn]);

	return isRendered.current;
};

import { writable } from 'svelte/store';

/** @type {import('@supabase/supabase-js').AuthUser} */
const initialUserData = null;

const createUserStore = () => {
	const { subscribe, update, set } = writable(initialUserData);

	return {
		subscribe,
		update,
		reset: () => set(initialUserData)
	};
};

export const user = createUserStore();

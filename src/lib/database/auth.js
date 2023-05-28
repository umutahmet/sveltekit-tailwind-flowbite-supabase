import { userStore } from '$lib/store/user';
import { supabase } from '$lib/database/supabase';

supabase.auth.getSession().then(({ data }) => {
	userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
	}
});

export default {
	get user() {
		return userStore;
	},
	signIn(email) {
		return supabase.auth.signInWithOtp({ email });
	},
	signOut() {
		return supabase.auth.signOut();
	}
};

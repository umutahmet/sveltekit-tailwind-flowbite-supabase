import { redirect } from '@sveltejs/kit'

export const load = async ({ url, locals: { getSession } }) => {
	return { url: url.origin }
}

export const actions = {
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession()
		if (session) {
			await supabase.auth.signOut()
			throw redirect(303, '/')
		}
	}
}

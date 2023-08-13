import { redirect } from '@sveltejs/kit'

export const load = async ({ route, locals: { getSession } }) => {
	const session = await getSession()
	
	if (!session && route.id !== '/') {
		throw redirect(303, '/')
	} else if (session && route.id === '/') {
		throw redirect(303, '/dashboard')
	}

	return {
		session
	}
}

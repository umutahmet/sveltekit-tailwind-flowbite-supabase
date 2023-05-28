import { supabase } from '$lib/database/supabase';

const COLLECTION = '';

export default {
	async all() {
		const { data } = await supabase.from(COLLECTION).select('*').order('created');

		return data;
	},

	async get(id) {
		const { data } = await supabase
			.from(COLLECTION)
			.select('id, name, description')
			.eq('id', id)
			.order('created')
			.single();

		return data;
	},

	async create(payload) {
		const { data } = await supabase.from(COLLECTION).insert(payload).select().maybeSingle();

		return data;
	},

	async update(payload) {
		const { data } = await supabase
			.from(COLLECTION)
			.update({ name: payload.name })
			.match({ id: payload.id })
			.select()
			.maybeSingle();

		return data;
	}
};

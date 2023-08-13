<script>
	import '$lib/app.css';
	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';

	import { user } from '$lib/store/user.js';
	import Private from '$lib/components/layouts/Private.svelte';
	import Public from '$lib/components/layouts/Public.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			console.log('onAuthStateChange', { event, _session });
			if (
				_session?.expires_at !== session?.expires_at ||
				(event === 'INITIAL_SESSION' && _session === null)
			) {
				invalidate('supabase:auth');
				user.reset();
			} else if (event == 'SIGNED_OUT') {
				user.reset();
			} else {
				if (_session?.user) {
					user.update(() => _session.user);
				}
				if (event == 'SIGNED_IN' && _session) {
					goto('/dashboard');
				}
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

{#if session?.user}
	<Private>
		<slot />
	</Private>
{:else}
	<Public>
		<slot />
	</Public>
{/if}

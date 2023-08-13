<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { RedirectTo } from '@supabase/auth-ui-shared';

	const authTheme = {
		theme: ThemeSupa,
		variables: {
			default: {
				colors: {
					brand: '#06b6d4',
					brandAccent: '#0891b2'
				}
			}
		}
	};

	export let supabaseClient: SupabaseClient;
	export let redirect: RedirectTo;
</script>

<Auth
	{supabaseClient}
	view="magic_link"
	redirectTo={redirect}
	showLinks={false}
	appearance={authTheme}
	additionalData={{}}
/>

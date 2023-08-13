<script lang="ts">
	import Auth from '$lib/components/auth/Auth.svelte';

	export let data;
</script>

<div class="flex items-center justify-center w-full h-full">
	<div class="w-full max-w-[460px] p-8 rounded bg-white">
		<h1 class="text-xl md:text-3xl font-bold mb-8 text-center">Welcome back!</h1>
		<Auth supabaseClient={data.supabase} redirect={`${data.url}/auth/callback`} />
	</div>
</div>

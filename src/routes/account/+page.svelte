<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, Label, Helper, Button, Checkbox, A } from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	import AvatarUpload from '$lib/components/AvatarUpload.svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>My Account</title>
</svelte:head>

<div class="max-w-xl mx-auto">
	<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
		<AvatarUpload
			{supabase}
			bind:url={avatarUrl}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>
		<div class="mt-8">
			<Label for="email" class="mb-2">Email</Label>
			<Input name="email" id="email" type="text" value={session?.user.email} disabled />
		</div>

		<div class="mt-4">
			<Label for="fullName" class="mb-2">Full Name</Label>
			<Input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div class="mt-4">
			<Label for="username" class="mb-2">Username</Label>
			<Input id="username" name="username" type="text" value={form?.username ?? username} />
		</div>

		<div class="mt-4">
			<Label for="website" class="mb-2">Website</Label>
			<Input id="website" name="website" type="url" value={form?.website ?? website} />
		</div>

		<div class="mt-4">
			<Button type="submit" class="w-full" disabled={loading}>
				{loading ? 'Saving...' : 'Save'}
			</Button>
		</div>
	</form>
</div>

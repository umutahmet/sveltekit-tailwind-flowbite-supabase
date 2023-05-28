<script>
	import { Alert, Button, Label, Input } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import { Mail } from '$lib/icons';
	import auth from '$lib/database/auth';

	/**
	 * @type {any}
	 */
	let email,
		errorMessage = '',
		sending = false,
		sent = false;

	async function submit() {
		sending = true;
		const { error } = await auth.signIn(email);
		if (error) {
			console.error(`Sign in error: ${error.message}`);
			errorMessage = 'Failed to sign in';
		} else {
			sent = true;
		}
		sending = false;
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex items-center justify-center w-full h-full">
	<div class="w-[300px] mx-auto">
		<h1 class="text-3xl font-bold mb-8 text-center">Welcome back!</h1>

		<form on:submit|preventDefault={submit}>
			<div class="mb-2">
				<Label for="email" class="sr-only">E-mail Address</Label>
				<Input
					id="email"
					name="email"
					type="email"
					disabled={sending && !sent}
					class="text-center"
					placeholder="E-mail Address"
					required
					bind:value={email}
				/>
			</div>
			<Button type="submit" class="w-full" disabled={sending && !sent}>
				<Mail class="mr-2" size="22" />
				<span>Send magic link</span>
			</Button>
		</form>

		{#if errorMessage}
			<div class="mt-6" in:fly>
				<Alert color="red">
					<span slot="icon"> ❌ </span>
					<p class="font-bold">Sorry, something went wrong.</p>
					<p class="text-sm">{errorMessage}</p>
				</Alert>
			</div>
		{/if}
		{#if sent}
			<div class="mt-6" in:fly>
				<Alert color="green">
					<p class="text-sm">
						<span class="mr-2">🎉</span>
						<span>Link sent! Check your email.</span>
					</p>
				</Alert>
			</div>
		{/if}
	</div>
</div>

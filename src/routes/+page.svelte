<script>
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	import collection from '$lib/database/collection';
	import { goto } from '$app/navigation';

	/**
	 * @type {string | any[]}
	 */
	let collectionDisplay = [];

	onMount(async () => {
		// @ts-ignore
		collection = await collection.all();
	});

	async function add() {
		const res = await collection.create({
			title: 'Untitled',
			position: collectionDisplay.length
		});
		goto(`/collection/${res?.id}`);
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="max-w-7xl mx-auto">
	<h1 class="text-2xl">Welcome to your dashboard</h1>
	<ul>
		{#each collectionDisplay as collection}
			<li>
				<a href="/collections/{collection.id}">{collection.title}</a>
			</li>
		{/each}

		<li class="add">
			<Button on:click={add}>
				{collectionDisplay.length == 0 ? 'Add a collection' : 'Add another collection'}
			</Button>
		</li>
	</ul>
</div>

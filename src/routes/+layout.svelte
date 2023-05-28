<script>
	import '$lib/app.css';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { Home } from '$lib/icons';
	import auth from '$lib/database/auth';
	import Login from '$lib/components/Login.svelte';

	export const ssr = false;

	let user = auth.user;
</script>

{#if $user}
	<div class="flex w-full h-full">
		<Nav />

		<main class="flex-grow">
			<header class="border-b border-gray-200">
				<Breadcrumb class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
					<BreadcrumbItem href="/" home>
						<svelte:fragment slot="icon">
							<Home class="mr-2" />
						</svelte:fragment>
						My School
					</BreadcrumbItem>
					<BreadcrumbItem href="/">
						<svelte:fragment slot="icon">
							<span class="text-gray-400">/</span>
						</svelte:fragment>
						Dashboard
					</BreadcrumbItem>
				</Breadcrumb>
			</header>

			<div class="w-full h-full p-2">
				<slot />
			</div>
		</main>
	</div>
{:else}
	<Login />
{/if}

<script>
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import Sidebar from '$lib/components/app/Sidebar.svelte';
	import { Home } from '$lib/icons';
</script>

<div class="flex w-full h-full">
	<Sidebar />

	<main class="flex-grow">
		<header class="border-b border-gray-200">
			<Breadcrumb class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
				<BreadcrumbItem href="/" home>
					<svelte:fragment slot="icon">
						<Home class="mr-2" />
					</svelte:fragment>
					Home
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
			<div class="max-w-7xl mx-auto">
				<slot />
			</div>
		</div>
	</main>
</div>

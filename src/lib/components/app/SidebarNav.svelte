<script lang="ts">
	import { page } from '$app/stores';
	import type { SvelteComponent } from 'svelte';
	import {
		Sidebar,
		SidebarWrapper,
		SidebarBrand,
		SidebarItem,
		SidebarGroup,
		Tooltip
	} from 'flowbite-svelte';

	import logo from '$lib/assets/logo.svg';

	type SidebarMenuItem = {
		icon: typeof SvelteComponent;
		label: string;
		url: string;
	};

	export let items: SidebarMenuItem[] = [];

	let site = {
		name: 'Site Name',
		href: '/',
		img: logo
	};

	const sidebarItemAClass =
		'flex items-center justify-center w-full h-10 mb-2 bg-slate-50 hover:bg-slate-100 rounded';
	const sidebarItemActiveClass =
		'flex items-center justify-center w-full h-10 mb-2 ring-2 ring-primary-600 bg-slate-50 hover:bg-slate-100 rounded';
	const sidebarItemSpanClass = 'hidden';
</script>

<Sidebar asideClass="w-full">
	<SidebarWrapper divClass="flex h-full">
		<SidebarGroup ulClass="w-full space-y-2">
			<SidebarBrand
				{site}
				aClass="p-0 flex items-center justify-center"
				imgClass="m-0 max-w-[32px] mx-auto mb-4"
				spanClass="hidden"
			/>
			{#each items as { icon, label, url }}
				<SidebarItem
					id="{label}-menu"
					{label}
					href={url}
					active={($page.route.id || '').includes(url)}
					aClass={sidebarItemAClass}
					spanClass={sidebarItemSpanClass}
					activeClass={sidebarItemActiveClass}
				>
					<svelte:component this={icon} slot="icon" />
				</SidebarItem>
				<Tooltip placement="right" triggeredBy="#{label}-menu">{label}</Tooltip>
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>

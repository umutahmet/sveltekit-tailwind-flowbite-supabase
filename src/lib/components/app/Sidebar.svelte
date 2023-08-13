<script lang="ts">
	import SidebarNav from '$lib/components/app/SidebarNav.svelte';
	import UserMenu from '$lib/components/app/UserMenu.svelte';
	import { sidebarMenuItems } from '$lib/constants/menu';
</script>

<div class="bg-white flex h-full w-14 border-r border-gray-200 p-2">
	<div class="flex flex-col justify-between">
		<SidebarNav items={sidebarMenuItems} />
		<div>
			<UserMenu />
		</div>
	</div>
</div>

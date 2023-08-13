<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		Tooltip
	} from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { User } from '$lib/icons';
	import { user } from '$lib/store/user.js';
	console.log($user);

	const handleSignOut: SubmitFunction = () => {
		return async ({ update }) => update();
	};
</script>

<Avatar id="user-menu" border class="cursor-pointer bg-slate-50 hover:ring-slate-400">
	<User />
</Avatar>

<Tooltip placement="right" triggeredBy="#user-menu">Account & Sign out</Tooltip>

<Dropdown placement="top" triggeredBy="#user-menu">
	<DropdownHeader>
		<span class="block truncate text-sm text-gray-400">{$user.email}</span>
	</DropdownHeader>
	<DropdownItem href="/account">My Account</DropdownItem>
	<DropdownDivider />
	<DropdownItem>
		<form method="post" action="/?/signout" use:enhance={handleSignOut}>
			<button>Sign Out</button>
		</form>
	</DropdownItem>
</Dropdown>

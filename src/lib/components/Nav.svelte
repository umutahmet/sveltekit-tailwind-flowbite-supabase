<script>
	import {
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		Button,
		Tooltip
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import auth from '$lib/database/auth';

	import logo from '$lib/assets/logo.svg';
	import { Home, User, Users, Settings, Reports } from '$lib/icons';

	const user = auth.user;
	const navButtonClass =
		'flex items-center justify-center w-full h-10 mb-2 bg-slate-50 hover:bg-slate-100 rounded';

	const logout = async () => {
		await auth.signOut();
		goto('/');
	};
</script>

<div class="bg-white flex h-full w-14 border-r border-gray-200">
	<div class="flex flex-col justify-between p-2">
		<nav>
			<img src={logo} class="mx-auto mb-4 h-10" alt="KorsCraft Logo" />
			<ul class="mt-4">
				<li class="mt-2 pt-2 border-t border-gray-200" />
				<li>
					<Button id="nav-home" btnClass={navButtonClass}><Home /></Button>
					<Tooltip placement="right" triggeredBy="#nav-home">Home</Tooltip>
				</li>
				<li class="mt-2 pt-2 border-t border-gray-200" />
				<li>
					<Button id="nav-users" btnClass={navButtonClass}><Users /></Button>
					<Tooltip placement="right" triggeredBy="#nav-users">Users</Tooltip>
				</li>
				<li class="mt-2 pt-2 border-t border-gray-200" />
				<li>
					<Button id="nav-reports" btnClass={navButtonClass}><Reports /></Button>
					<Tooltip placement="right" triggeredBy="#nav-reports">Reports</Tooltip>
				</li>
				<li class="mt-2 pt-2 border-t border-gray-200" />
				<li>
					<Button id="nav-settings" btnClass={navButtonClass}><Settings /></Button>
					<Tooltip placement="right" triggeredBy="#nav-settings">Settings</Tooltip>
				</li>
			</ul>
		</nav>
		<div>
			<Avatar
				id="user-menu"
				border
				class="cursor-pointer bg-slate-50 hover:ring-red-400 dark:hover:ring-red-300"
			>
				<User />
			</Avatar>
			<Tooltip placement="right" triggeredBy="#user-menu">Settings & Sign out</Tooltip>
		</div>
	</div>
</div>

<Dropdown placement="top" triggeredBy="#user-menu">
	<DropdownHeader>
		<!-- <span class="block text-sm">Name</span> -->
		<span class="block truncate text-sm font-medium">{$user.email}</span>
	</DropdownHeader>
	<DropdownItem href="/account">My Account</DropdownItem>
	<DropdownDivider />
	<DropdownItem on:click={logout}>Sign out</DropdownItem>
</Dropdown>

import { Home, Users, Settings } from '$lib/icons';

export const sidebarMenuItems = [
	{
		icon: Home,
		label: 'Dashbaord',
		url: '/dashboard'
	},
	{
		icon: Users,
		label: 'Users',
		url: '/users'
	},
	{
		icon: Settings,
		label: 'Settings',
		url: '/settings'
	}
];

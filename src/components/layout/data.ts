import { PageName } from '@/utils/constants';
import type { INavItem } from '@/utils/Types';

export const navItems: INavItem[] = [
  {
    title: 'Dashboard',
    link: '/dashboard/home',
    icon: '/icons/home.svg',
    iconActive: '/icons/home.svg',
    pageName: PageName.DASHBOARD,
  },
  {
    title: 'User Management',
    link: '/dashboard/user-management',
    icon: '/icons/user-circle.svg',
    iconActive: '/icons/user-circle.svg',
    pageName: PageName.USERS,
  },
  {
    title: 'Providers',
    link: '/dashboard/providers',
    icon: '/icons/provider.svg',
    iconActive: '/icons/provider.svg',
    pageName: PageName.PONDS,
  },
];

export const ApplicationPages = {
  manageGym: {
    title: 'Ponds',
    description: 'Here’s total number of ponds you have listed till now.',
  },
  manageClasses: {
    title: 'Users',
    description: 'Here’s total number of users you have listed till now.',
  },
  userManagement: {
    title: 'Bookings',
    description: 'Here’s total number of bookings you have listed till now.',
  },
  payments: {
    title: 'Payments',
    description: 'Here’s total number of your payments.',
  },
  messages: {
    title: 'Analytics',
    description: 'Here you can see all of the analytics chats.',
  },

  settings: {
    title: 'Settings',
    description: 'Here you can see all of the settings of platform.',
  },
};

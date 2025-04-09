const Data = {
  Appsidebar: [
    {
      title: 'Dashboard',
      url: '/',
      icon: 'LayoutDashboard',
    },
    {
      title: 'User Management',
      url: '/',
      icon: 'UserRound',
      isOption: true,
      subOptions: [
        {
          title: 'User Profiles',
          url: '/user-profiles',
          icon: 'UserRound',
        },
        {
          title: 'User Activity',
          url: '/user-activity',
          icon: 'UserRound',
        },
      ],
    },
    {
      title: 'Content Management',
      url: '/content-management',
      icon: 'ClipboardList',
    },
    {
      title: 'AI Rendering Oversight',
      url: '/settings',
      icon: 'Settings',
      isOption: true,
      subOptions: [
        {
          title: 'AI Rendering Image',
          url: '/ai-rendering-image',
          icon: 'UserRound',
        },
        {
          title: 'Furniture Finder Data',
          url: '/furniture-finder-data',
          icon: 'UserRound',
        },
      ],
    },
    {
      title: 'Customer Support',
      url: '/customer-support',
      icon: 'Headset',
    },
    {
      title: 'Security and Payments',
      url: '/settings',
      icon: 'CreditCard',
      isOption: true,
      subOptions: [
        {
          title: 'Transaction Management',
          url: '/transaction-management',
          icon: 'UserRound',
        },
      ],
    },
  ],
  Dashboardlink: [
    {
      title: 'User Management',
      url: '/user-profiles',
      icon: 'UserRound',
    },
    {
      title: 'Content Management',
      url: '/content-management',
      icon: 'ClipboardList',
    },
    {
      title: 'AI Rendering Oversight',
      url: '/ai-rendering-image',
      icon: 'Settings',
    },
    {
      title: 'Customer Support Management',
      url: '/customer-support',
      icon: 'Headset',
    },
    {
      title: 'Security and Payments',
      url: '/transaction-management',
      icon: 'CreditCard',
    },
  ],
};

export default Data;

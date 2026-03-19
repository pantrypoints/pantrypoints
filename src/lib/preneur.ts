export interface Preneur {
	slug: string;
	name: string;
	shortName: string;
	description: string;
	longDescription: string;
	icon: string;
	color: string;
	tags: string[];
	features: string[];
	status: 'live' | 'beta' | 'prototype' | 'coming-soon';
	screenshots: string[];
	nameZh: string;
	descriptionZh: string;
	longDescriptionZh: string;
	featuresZh: string[];
}



export const apps: Preneur[] = [
	{
		slug: 'overview',
		name: 'Pantrypreneur',
		shortName: 'Pantrypreneur',
		nameZh: '农场版',
		description: 'Pantrypreneur is a SaaS for micro-small businesses',
		descriptionZh: '为农民和生产者提供农业积分管理',
		longDescription:
			'Pantrypreneur is a SaaS for micro-small businesses that has modules like Work, Educate, and Health.',
		longDescriptionZh:
			'Pantrypreneur is a SaaS for micro-small businesses that has modules like Work, Educate, and Health.',
		icon: '/icons/p.png',
		color: '#068000',
		youtube: 'zIrblIJF4Nk',
		tags: ['human resources', 'accounting', 'production'],
		features: [
			'Business Administration',
			'Points Accounting'
		],
		featuresZh: ['作物和收获追踪', '积分分配系统', '市场价格发现', '季节性规划工具', '社区食物网络', '导出和报告'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'farm',
		name: 'Pantrypreneur Farm',
		shortName: 'Farm',
		nameZh: '农场版',
		description: 'Agricultural point management for farmers and producers',
		descriptionZh: '为农民和生产者提供农业积分管理',
		longDescription:
			'Pantrypreneur Farm empowers local farmers and agricultural producers to participate in the points economy. Track your harvests, allocate production points, integrate with the local market, and build sustainable food networks without the barriers of traditional currency.',
		longDescriptionZh:
			'Pantrypreneur Farm 让本地农民和农业生产者能够参与积分经济。追踪您的收成、分配生产积分、与本地市场整合，并构建可持续的食物网络，无需传统货币的障碍。',
		icon: '/icons/farm.png',
		color: '#c79604',
		youtube: 'IEtb6uxtk38',
		tags: ['agriculture', 'food', 'production'],
		features: [
			'Crop and harvest tracking',
			'Points allocation system',
			'Market price discovery',
			'Seasonal planning tools',
			'Community food network',
			'Export & reporting'
		],
		featuresZh: ['作物和收获追踪', '积分分配系统', '市场价格发现', '季节性规划工具', '社区食物网络', '导出和报告'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'rewards',
		name: 'Pantrypreneur Rewards',
		shortName: 'Hub',
		nameZh: '中心版',
		description: 'Central coordination platform for points economy networks',
		descriptionZh: '积分经济网络的中央协调平台',
		longDescription:
			'The Hub is the backbone of any Pantrypoints network. It coordinates exchanges between members, manages the points ledger, resolves disputes, and provides analytics for community administrators. Perfect for municipalities, cooperatives, and community groups.',
		longDescriptionZh:
			'Hub 是任何 Pantrypoints 网络的骨干。它协调成员之间的交换、管理积分账本、解决纠纷，并为社区管理员提供分析。非常适合市政机构、合作社和社区团体。',
		icon: '/icons/rewards.png',
		color: '#c75904',
		youtube: '8dUlVl-ApdM',
		tags: ['coordination', 'network', 'admin'],
		features: [
			'Network-wide points ledger',
			'Multi-stakeholder coordination',
			'Dispute resolution tools',
			'Analytics dashboard',
			'Role-based access control',
			'API for integrations'
		],
		featuresZh: ['全网络积分账本', '多方利益相关者协调', '纠纷解决工具', '分析仪表板', '基于角色的访问控制', '集成API'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'health',
		name: 'Pantrypreneur Health',
		shortName: 'Health',
		nameZh: 'Health',
		description: 'Personal health management using points and Bio Superphysics',
		descriptionZh: 'Personal health management using points and Bio Superphysics',
		longDescription:
			'The idea for Pantrypreneur Health arose during the pandemic when people were looking for Covid solutions, and health services were strained. Our solution integrates an offline disease and nutrition reference that focuses on alternative medicine, as well as a points marketplace for herbal remedies',
		longDescriptionZh:
			'The idea for Pantrypreneur Health arose during the pandemic when people were looking for Covid solutions, and health services were strained. Our solution integrates an offline disease and nutrition reference that focuses on alternative medicine, as well as a points marketplace for herbal remedies',
		icon: '/icons/health.png',
		color: '#FF6666',
		youtube: 'M8ztGBQOVDM',
		tags: ['health', 'wellness', 'community'],
		features: [
			'Health service points marketplace',
			'Alternative medicine points marketplace',
			'Offline Disease and Nutrition Reference',
			'Community health fund',
			'Practitioner profiles',
			'Disease Profiling'
		],
		featuresZh: [			
			'Health service points marketplace',
			'Alternative medicine points marketplace',
			'Offline Disease and Nutrition Reference',
			'Community health fund',
			'Practitioner profiles',
			'Disease Profiling'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'work',
		name: 'Pantrypreneur Work',
		shortName: 'Work',
		nameZh: 'Work',
		description: 'Your own jobs site and HR Platform',
		descriptionZh: 'Your own jobs site and HR Platform',
		longDescription:
			'Pantrypreneur work is an HR platform for small and micro businesses.',
		longDescriptionZh:
			'Pantrypreneur work is an HR platform for small and micro businesses.',
		icon: '/icons/work.png',
		color: '#3c95d3',
		tags: ['jobs', 'hr', 'timesheet'],
		features: [
			'Timesheet',
			'Points Compensation',
			'Jobs site',
			'Basic HR Tools'
		],
		featuresZh: [			
			'Timesheet',
			'Points Compensation',
			'Jobs site',
			'Basic HR Tools'],
		status: 'coming-soon',
		youtube: 'H83IsXa2tPk',
		img: 'https://placehold.co/600x400'
		// screenshots: ['/icons/pantry.png', '/icons/pantry.png']
	},
	{
		slug: 'educate',
		name: 'Pantrypreneur Educate',
		shortName: 'Pantrypreneur Educate',
		nameZh: '农场版',
		description: 'Pantrypreneur Educate is a SaaS for micro-small schools and trainers',
		descriptionZh: '为农民和生产者提供农业积分管理',
		longDescription:
			'Pantrypreneur Educate has attendance, grading, and rating systems that connects to Pantrypoints Match',
		longDescriptionZh:
			'Pantrypreneur Educate has attendance, grading, and rating systems that connects to Pantrypoints Match',
		icon: '/icons/educate.png',
		color: '#3d0069',
		youtube: 'By4cXCekyDY',
		tags: ['education', 'attendance', 'grading'],
		features: [
			'Class Administration',
			'Grades'
		],
		featuresZh: ['作物和收获追踪', '积分分配系统', '市场价格发现', '季节性规划工具', '社区食物网络', '导出和报告'],
		status: 'coming-soon',
		screenshots: []
	}	
];

export function getApp(slug: string): Preneur | undefined {
	return apps.find((a) => a.slug === slug);
}

export function searchApps(query: string): Preneur[] {
	const q = query.toLowerCase().trim();
	if (!q) return apps;
	return apps.filter(
		(a) =>
			a.name.toLowerCase().includes(q) ||
			a.description.toLowerCase().includes(q) ||
			a.tags.some((t) => t.includes(q)) ||
			a.nameZh.includes(q) ||
			a.descriptionZh.includes(q)
	);
}

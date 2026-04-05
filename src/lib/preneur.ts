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
		url: 'https://play.google.com/store/apps/details?id=com.pantrypoints.farmsolo',
		name: 'Pantrypreneur Farm',
		shortName: 'Farm',
		nameZh: '农场版',
		description: 'Agricultural point management for farmers and producers',
		descriptionZh: '为农民和生产者提供农业积分管理',
		longDescription:
			'Pantrypreneur Farm Local empowers urban farmers and gardeners to track your harvests while having offline reference for crops and plant nutrition.',
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
		shortName: 'Rewards',
		nameZh: '中心版',
		description: 'Pantrypreneur Rewards 是面向微型和小型企业的忠诚度系统',
		descriptionZh: '积分经济网络的中央协调平台',
		longDescription:
			'Pantrypreneur Rewards lets your customers earn points that they can redeem in the products and services of your business',
		longDescriptionZh:
			'通过 Pantrypreneur Rewards，您的客户可以赚取积分，并用于兑换您业务中的产品和服务',
		icon: '/icons/rewards.png',
		color: '#c75904',
		youtube: '8dUlVl-ApdM',
		tags: ['coordination', 'network', 'admin'],
		features: [
			'Loyalty points',
			'Discounts',
			'Mailing Blast',
			'Points Analytics'
		],
		featuresZh: ['忠诚度积分', '折扣优惠', '群发邮件营销', '积分数据分析'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'health',
		url: 'https://play.google.com/store/apps/details?id=com.pantrypoints.health',
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

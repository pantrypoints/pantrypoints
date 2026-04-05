export interface App {
	slug: string;
	name: string;
	shortName: string;
	description: string;
	longDescription: string;
	icon: string;
	color: string;
	tags: string[];
	features: string[];
	status: 'live' | 'beta' | 'coming-soon';
	screenshots: string[];
	nameZh: string;
	descriptionZh: string;
	longDescriptionZh: string;
	featuresZh: string[];
}

export const apps: App[] = [
	{
		slug: 'build',
		name: 'Pantrypoints Build',
		shortName: 'Build',
		nameZh: '中心版',
		description: 'Build for the Future',
		descriptionZh: '积分经济网络的中央协调平台',
		longDescription:
			'Pantrypoints Build creates the online presence for your business or organization as websites, social media, and AI content and videos .',
		longDescriptionZh:
			'Hub 是任何 Pantrypoints 网络的骨干。它协调成员之间的交换、管理积分账本、解决纠纷，并为社区管理员提供分析。非常适合市政机构、合作社和社区团体。',
		icon: '/icons/build.png',
		color: '#3c95d3',
		youtube: 'zIrblIJF4Nk',
		tags: ['digitization', 'digitalization', 'online'],
		features: [
			'Public-facing Website and Apps', 'Moneyless', 'Tech Consultancy'
		],
		featuresZh: ['Public-facing Website and Apps', 'Moneyless', 'Tech Consultancy'],
		status: 'live',
		screenshots: []
	},
	{
		slug: 'cards',
		name: 'Point Cards',
		shortName: 'Point Cards',
		nameZh: 'Point Cards',
		description: 'Point Cards implement Pantrypoints offline',
		descriptionZh: 'Point Cards implement Pantrypoints offline',
		longDescription:
			'Point Cards implement Pantrypoints offline',
		longDescriptionZh:
			'Point Cards implement Pantrypoints offline',
		icon: '/icons/cards.png',
		color: '#5a5a5c',
		youtube: 'ZErxZt4V2t4',
		tags: ['marketplace', 'trading', 'community'],
		features: [
			'Product & service exchange',
			'Points accounting',
			'Barter Credits',
			'Circular Economy',
			'Donations'
		],
		featuresZh: ['Product & service exchange',
			'Points accounting',
			'Barter Credits',
			'Circular Economy',
			'Donations'],
		status: 'live',
		screenshots: []
	},
	{
		slug: 'match',
		url: 'https://play.google.com/store/apps/details?id=org.superphysics.matchoff',
		name: 'Pantrypoints Match',
		shortName: 'Match',
		nameZh: '健康版',
		description: 'Pantrypoints Match is our matching system',
		descriptionZh: '',
		longDescription:
			'Pantrypoints Match is a matching system using the principles of Superphysics. It can be used for love, health, education, employment, and politics',
		longDescriptionZh:
			'',
		icon: '/icons/match.png',
		color: '#FF6666',
		youtube: 'oBQO5xWr4',
		tags: ['health', 'wellness', 'community'],
		features: [
			'Personality Profiling',
			'Disease Prediction',
			'Political Profiling',
			'Career Matching',
			'Dating Service'
		],
		featuresZh: ['健康服务市场', '预防保健奖励', '社区健康基金', '从业者档案', '预约日程安排', '健康记录摘要'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'tax',
		name: 'Tax',
		shortName: 'Tax',
		nameZh: 'Tax',
		description: 'Moneyless Taxation',
		descriptionZh: 'Moneyless Taxation',
		longDescription:
			'Pantrypoints Tax allows taxation in kind in order to allow people to pay with their productivity instead of being stifled by the financial system that requires money as tax payments.',
		longDescriptionZh:
			'Pantrypoints Tax allows taxation in kind in order to allow people to pay with their productivity instead of being stifled by the financial system that requires money as tax payments.',
		longDescriptionEs: 'Pantrypoints Tax permite la tributación en especie para que las personas puedan pagar con su productividad, en lugar de ser sofocadas por el sistema financiero que exige pagos de impuestos en dinero.',
		longDescriptionFr: 'Pantrypoints Tax permet limposition en nature afin que les gens puissent payer avec leur productivité au lieu dêtre étouffés par le système financier qui exige des paiements dimpôts en argent.',
		longDescriptionVi: 'Pantrypoints Tax cho phép nộp thuế bằng hiện vật, giúp mọi người có thể thanh toán bằng năng suất lao động của mình thay vì bị hệ thống tài chính bóp nghẹt khi yêu cầu nộp thuế bằng tiền mặt.',
		longDescriptionZh: 'Pantrypoints Tax 允许以实物形式纳税，让人们可以用自己的生产力来支付税款，而不是被需要以货币纳税的金融体系所扼杀。',
		icon: '/icons/t.png',
		color: '#00BD6C',
		youtube: 'HOtK8qR7LYI',
		tags: ['tax', 'government', 'moneyless'],
		features: [
			'Points Banking',
			'Surplus goods matching',
			'Moneyless',
			'Tax analytics'
		],
		featuresZh: ['Points Banking',
			'Surplus goods matching',
			'Moneyless',
			'Tax analytics'],
		status: 'coming-soon',
		screenshots: []
	}
];

export function getApp(slug: string): App | undefined {
	return apps.find((a) => a.slug === slug);
}

export function searchApps(query: string): App[] {
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

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
		slug: 'circle',
		name: 'Pantrypoints Circle',
		shortName: 'Circle',
		nameZh: '中心版',
		description: 'The circular economy implemented',
		descriptionZh: '循环经济的实施',
		longDescription:
			'Pantrypoints Circle implements points-based valuation.',
		longDescriptionZh:
			'Pantrypoints Circle 采用积分制估值。',
		icon: '/icons/circle.png',
		color: '#3c95d3',
		youtube: 'zLmW8KqL5SE',
		tags: ['coordination', 'network', 'admin'],
		features: [
			'Network-wide points ledger',
			'Multi-stakeholder coordination',
			'Dispute resolution tools'
		],
		featuresZh: ['全网络积分账本', '多方利益相关者协调', '纠纷解决工具', '分析仪表板', '基于角色的访问控制', '集成API'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'banking',
		name: 'Points Banking',
		shortName: 'Points Banking',
		nameZh: '积分银行',
		description: 'Points Banking uses multilateral clearing',
		descriptionZh: '积分银行采用多边清算方式',
		longDescription:
			'Points Banking uses multilateral clearing to circulate value using points-valuation',
		longDescriptionZh:
			'积分银行利用多边清算，通过积分估值来流通价值',
		icon: '/icons/banking.png',
		color: '#FFA500',
		youtube: 'zOVoXqOcI7E',
		tags: ['points-valuation', 'points-banking', 'community'],
		features: [
			'Product & service listings',
			'Smart points pricing',
			'Reviews & reputation',
			'Location-based discovery',
			'Category filtering',
			'Wishlist & favorites'
		],
		featuresZh: ['产品和服务列表', '智能积分定价', '评价和信誉', '基于位置的发现', '类别过滤', '心愿单和收藏'],
		status: 'coming-soon',
		// youtube: 'WbV48G5dFtc',
		screenshots: []
	},
	{
		slug: 'invesure',
		name: 'Pantrypoints Invesure: Moneyless Investments and Insurance',
		shortName: 'Invesure',
		nameZh: '基本收入版',
		description: 'Pantrypoints Invesure is a moneyless investment system',
		descriptionZh: '由社区积分驱动的全民基本收入系统',
		longDescription:
			'Pantrypoints Invesure is a moneyless investment system that uses points-valuation',
		longDescriptionZh:
			'Pantrypoints Basic Income 为每位社区成员提供有保障的月度积分分配——无需货币的全民基本收入。这些积分可用于社区网络内的食物、服务、教育等，确保没有人被遗漏。',
		icon: '/icons/invesure.png',
		color: '#3c95d3',
		youtube: 'smeI8NEBJ4k',
		tags: ['ubi', 'social', 'equity'],
		features: [
			'Monthly points distribution',
			'Eligibility verification',
			'Transparent allocation rules',
			'Impact reporting'
		],
		featuresZh: ['月度积分分配', '资格验证', '透明的分配规则', '社区治理', '影响报告', '防囤积机制'],
		status: 'coming-soon',
		screenshots: []
	},
	{
		slug: 'world',
		name: 'Pantrypoints World',
		shortName: 'World',
		nameZh: '贸易版',
		description: 'Cross-border trade',
		descriptionZh: '社区间商品交换和贸易平台',
		longDescription:
			'Pantrypoints World extends the moneyless economy beyond individual communities, enabling trade between different Pantrypoints networks. Using a universal points exchange rate, communities can trade surplus goods and specialized services, creating a web of mutual support.',
		longDescriptionZh:
			'Pantrypoints Trade 将无货币经济扩展到个别社区之外，使不同 Pantrypoints 网络之间能够进行贸易。使用通用积分汇率，社区可以交易剩余商品和专业服务，创建相互支持的网络。',
		icon: '/icons/world.png',
		color: '#18348f',
		youtube: 'LsWUjsr0paA',
		tags: ['trade', 'inter-community', 'exchange'],
		features: [ 
			'Cross-network trading',
			'Points exchange rates',
			'Surplus goods matching',
			'Trade agreements',
			'Customs & import tracking',
			'Trade analytics'
		],
		featuresZh: ['跨网络交易', '积分汇率', '剩余商品匹配', '贸易协议', '海关和进口追踪', '贸易分析'],
		status: 'coming-soon',
		screenshots: []
	},
	{
		slug: 'pantrylitics',
		name: 'Pantrylitics',
		shortName: 'Pantrylitics',
		nameZh: '贸易版',
		description: 'Analytics for the Pantrypoints Economy',
		descriptionZh: '社区间商品交换和贸易平台',
		longDescription:
			'Pantrylitics is the analytics for the Pantrypoints system',
		longDescriptionZh:
			'Pantrypoints Trade 将无货币经济扩展到个别社区之外，使不同 Pantrypoints 网络之间能够进行贸易。使用通用积分汇率，社区可以交易剩余商品和专业服务，创建相互支持的网络。',
		icon: '/icons/pantrylitics.png',
		color: '#a62100',
		youtube: 'KOl-RwPLXxY',
		tags: ['trade', 'inter-community', 'exchange'],
		features: [
			'Cross-network trading',
			'Business Intelligence',
			'Trade analytics'
		],
		featuresZh: ['跨网络交易', '积分汇率', '剩余商品匹配', '贸易协议', '海关和进口追踪', '贸易分析'],
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

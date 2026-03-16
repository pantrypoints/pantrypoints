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
		tags: ['coordination', 'network', 'admin'],
		features: [
			'Network-wide points ledger',
			'Multi-stakeholder coordination',
			'Dispute resolution tools'
		],
		featuresZh: ['全网络积分账本', '多方利益相关者协调', '纠纷解决工具', '分析仪表板', '基于角色的访问控制', '集成API'],
		status: 'live',
		screenshots: []
	},
	{
		slug: 'cards',
		name: 'Point Cards',
		shortName: 'Point Cards',
		nameZh: '市场版',
		description: 'Point Cards implement Pantrypoints offline',
		descriptionZh: '用积分交易商品和服务的本地市场',
		longDescription:
			'Point Cards implement Pantrypoints offline',
		longDescriptionZh:
			'Pantrypoints Market 是一个充满活力的本地市场，社区成员可以使用积分列出、发现和交换商品和服务。从手工艺品到专业服务，一切价值都由社区决定。',
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
		featuresZh: ['产品和服务列表', '智能积分定价', '评价和信誉', '基于位置的发现', '类别过滤', '心愿单和收藏'],
		status: 'live',
		screenshots: []
	},
	{
		slug: 'match',
		name: 'Pantrypoints Match',
		shortName: 'Match',
		nameZh: '健康版',
		description: 'Pantrypoints Match',
		descriptionZh: '使用社区积分的医疗经济管理',
		longDescription:
			'Pantrypoints Match is a matching system using the principles of Superphysics',
		longDescriptionZh:
			'Pantrypoints Health 通过社区团结重新构想医疗服务获取。成员为预防性护理、健康服务和社区健康支持赚取和花费健康积分。从业者通过积分提供服务，创建所有人都能获得的医疗网络。',
		icon: '/icons/match.png',
		color: '#FF6666',
		youtube: 'oBQO5xWr4',
		tags: ['health', 'wellness', 'community'],
		features: [
			'Health service marketplace',
			'Preventive care rewards',
			'Community health fund',
			'Practitioner profiles',
			'Appointment scheduling',
			'Health records summary'
		],
		featuresZh: ['健康服务市场', '预防保健奖励', '社区健康基金', '从业者档案', '预约日程安排', '健康记录摘要'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'tax',
		name: 'Tax',
		shortName: 'World',
		nameZh: '贸易版',
		description: 'Cross-border trade',
		descriptionZh: '社区间商品交换和贸易平台',
		longDescription:
			'Pantrypoints World extends the moneyless economy beyond individual communities, enabling trade between different Pantrypoints networks. Using a universal points exchange rate, communities can trade surplus goods and specialized services, creating a web of mutual support.',
		longDescriptionZh:
			'Pantrypoints Trade 将无货币经济扩展到个别社区之外，使不同 Pantrypoints 网络之间能够进行贸易。使用通用积分汇率，社区可以交易剩余商品和专业服务，创建相互支持的网络。',
		icon: '/icons/t.png',
		color: '#00BD6C',
		youtube: 'HOtK8qR7LYI',
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

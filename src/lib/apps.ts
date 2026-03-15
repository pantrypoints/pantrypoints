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
		icon: '🌾',
		color: '#00BD6C',
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
		status: 'live',
		screenshots: []
	},
	{
		slug: 'hub',
		name: 'Pantrypoints Hub',
		shortName: 'Hub',
		nameZh: '中心版',
		description: 'Central coordination platform for points economy networks',
		descriptionZh: '积分经济网络的中央协调平台',
		longDescription:
			'The Hub is the backbone of any Pantrypoints network. It coordinates exchanges between members, manages the points ledger, resolves disputes, and provides analytics for community administrators. Perfect for municipalities, cooperatives, and community groups.',
		longDescriptionZh:
			'Hub 是任何 Pantrypoints 网络的骨干。它协调成员之间的交换、管理积分账本、解决纠纷，并为社区管理员提供分析。非常适合市政机构、合作社和社区团体。',
		icon: '🏛️',
		color: '#3c95d3',
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
		status: 'live',
		screenshots: []
	},
	{
		slug: 'market',
		name: 'Pantrypoints Market',
		shortName: 'Market',
		nameZh: '市场版',
		description: 'Local marketplace for trading goods and services with points',
		descriptionZh: '用积分交易商品和服务的本地市场',
		longDescription:
			'Pantrypoints Market is a vibrant local marketplace where community members can list, discover, and exchange goods and services using points. From handmade crafts to professional services, everything has a points value determined by the community.',
		longDescriptionZh:
			'Pantrypoints Market 是一个充满活力的本地市场，社区成员可以使用积分列出、发现和交换商品和服务。从手工艺品到专业服务，一切价值都由社区决定。',
		icon: '🏪',
		color: '#FFA500',
		tags: ['marketplace', 'trading', 'community'],
		features: [
			'Product & service listings',
			'Smart points pricing',
			'Reviews & reputation',
			'Location-based discovery',
			'Category filtering',
			'Wishlist & favorites'
		],
		featuresZh: ['产品和服务列表', '智能积分定价', '评价和信誉', '基于位置的发现', '类别过滤', '心愿单和收藏'],
		status: 'live',
		screenshots: []
	},
	{
		slug: 'health',
		name: 'Pantrypoints Health',
		shortName: 'Health',
		nameZh: '健康版',
		description: 'Healthcare economy management using community points',
		descriptionZh: '使用社区积分的医疗经济管理',
		longDescription:
			'Pantrypoints Health reimagines healthcare access through community solidarity. Members earn and spend health points for preventive care, wellness services, and community health support. Practitioners offer services in exchange for points, creating a healthcare network accessible to all.',
		longDescriptionZh:
			'Pantrypoints Health 通过社区团结重新构想医疗服务获取。成员为预防性护理、健康服务和社区健康支持赚取和花费健康积分。从业者通过积分提供服务，创建所有人都能获得的医疗网络。',
		icon: '🏥',
		color: '#FF6666',
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
		slug: 'basic-income',
		name: 'Pantrypoints Basic Income',
		shortName: 'Basic Income',
		nameZh: '基本收入版',
		description: 'Universal basic income system powered by community points',
		descriptionZh: '由社区积分驱动的全民基本收入系统',
		longDescription:
			'Pantrypoints Basic Income provides every community member with a guaranteed monthly allocation of points — a universal basic income without money. These points can be used for food, services, education, and more within the community network, ensuring no one goes without.',
		longDescriptionZh:
			'Pantrypoints Basic Income 为每位社区成员提供有保障的月度积分分配——无需货币的全民基本收入。这些积分可用于社区网络内的食物、服务、教育等，确保没有人被遗漏。',
		icon: '🤝',
		color: '#3c95d3',
		tags: ['ubi', 'social', 'equity'],
		features: [
			'Monthly points distribution',
			'Eligibility verification',
			'Transparent allocation rules',
			'Community governance',
			'Impact reporting',
			'Anti-hoarding mechanisms'
		],
		featuresZh: ['月度积分分配', '资格验证', '透明的分配规则', '社区治理', '影响报告', '防囤积机制'],
		status: 'beta',
		screenshots: []
	},
	{
		slug: 'trade',
		name: 'Pantrypoints Trade',
		shortName: 'Trade',
		nameZh: '贸易版',
		description: 'Inter-community goods exchange and trade platform',
		descriptionZh: '社区间商品交换和贸易平台',
		longDescription:
			'Pantrypoints Trade extends the moneyless economy beyond individual communities, enabling trade between different Pantrypoints networks. Using a universal points exchange rate, communities can trade surplus goods and specialized services, creating a web of mutual support.',
		longDescriptionZh:
			'Pantrypoints Trade 将无货币经济扩展到个别社区之外，使不同 Pantrypoints 网络之间能够进行贸易。使用通用积分汇率，社区可以交易剩余商品和专业服务，创建相互支持的网络。',
		icon: '🔄',
		color: '#00BD6C',
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

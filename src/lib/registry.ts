import { apps as trisactions } from './apps';
import { apps as preneur } from './preneur';
import { apps as services } from './services';

const collections: Record<string, any[]> = {
	trisactions,
	pantrypreneur: preneur,
	services
};

const registries = {
    trisactions,
    pantrypreneur: preneur,
    services
};

export function getCollection(type: string) {
	return collections[type] || [];
}

export function getItemFromCollection(type: string, slug: string) {
	const collection = getCollection(type);
	return collection.find((item) => item.slug === slug);
}


export function getRegistry(key: keyof typeof registries) {
    return registries[key];
}
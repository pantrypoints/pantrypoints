import { getRegistry } from '$lib/registry';
export const load = () => ({ items: getRegistry('pantrypreneur') });
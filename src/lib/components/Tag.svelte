<script lang="ts">
	import { page } from '$app/stores';

	export let tag: string;
	export let href: string | null = null;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'default' | 'outline' | 'filled' = 'default';

	const sizeClasses = {
		sm: 'text-xs px-2 py-0.5',
		md: 'text-sm px-2.5 py-1',
		lg: 'text-base px-3 py-1.5'
	};

	const variantClasses = {
		default: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
		outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
		filled: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'
	};
</script>

{#if href}
	<a
		{href}
		class="inline-block rounded-full transition-colors duration-200 {sizeClasses[size]} {variantClasses[variant]}"
	>
		{tag}
	</a>
{:else}
	<span
		class="inline-block rounded-full {sizeClasses[size]} {variantClasses[variant]}"
	>
		{tag}
	</span>
{/if}
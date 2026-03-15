import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function createThemeStore() {
	// Read initial state from DOM (set by the anti-FOUC script in app.html)
	const initial: Theme =
		browser && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

	const { subscribe, set, update } = writable<Theme>(initial);

	function apply(theme: Theme) {
		if (!browser) return;
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		try {
			localStorage.setItem('theme', theme);
		} catch (_) {}
	}

	return {
		subscribe,
		toggle() {
			update((current) => {
				const next: Theme = current === 'dark' ? 'light' : 'dark';
				apply(next);
				return next;
			});
		},
		set(theme: Theme) {
			apply(theme);
			set(theme);
		}
	};
}

export const theme = createThemeStore();
export type { Theme };

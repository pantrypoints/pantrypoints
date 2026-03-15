<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
	<div
		class="font-display mb-4 text-8xl font-800"
		style="background: linear-gradient(135deg, #3c95d3, #00BD6C); -webkit-background-clip: text; -webkit-text-fill-color: transparent"
	>
		{$page.status}
	</div>
	<h1 class="font-display mb-2 text-2xl font-700 text-slate-900">
		{$page.error?.message ?? 'Something went wrong'}
	</h1>
	<p class="mb-8 text-slate-500">The page you were looking for could not be found.</p>
	<a
		href="/"
		class="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
		style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)"
	>
		<ArrowLeft size={15} /> {m.nav_home()}
	</a>
</div>

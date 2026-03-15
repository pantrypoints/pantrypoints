<script lang="ts">
	import { Leaf, Github, Twitter, Mail } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<footer class="mt-24 border-t border-slate-100 bg-slate-50">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-3 lg:grid-cols-4">

			<div class="lg:col-span-2">
				<div class="mb-4 flex items-center gap-2.5">
					<div
						class="flex h-9 w-9 items-center justify-center rounded-xl"
						style="background: linear-gradient(135deg, #3c95d3, #00BD6C)"
					>
						<Leaf size={18} class="text-white" />
					</div>
					<span class="font-display text-lg font-700 text-slate-900">Pantrypoints</span>
				</div>
				<p class="max-w-xs text-sm leading-relaxed text-slate-500">
					<!-- {m.tagline()} -->
				</p>
				<div class="mt-4 flex gap-3">
					<a
						href="https://github.com/pantrypoints"
						target="_blank"
						rel="noopener"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue"
					>
						<Github size={15} />
					</a>
					<a
						href="https://twitter.com/pantrypoints"
						target="_blank"
						rel="noopener"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue"
					>
						<Twitter size={15} />
					</a>
					<a
						href="mailto:hello@pantrypoints.com"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue"
					>
						<Mail size={15} />
					</a>
				</div>
			</div>


			<div>
				<h4 class="font-display mb-3 text-sm font-600 text-slate-900">{m.footer_links()}</h4>
				<ul class="space-y-2 text-sm text-slate-500">
					<li><a href="/" class="transition-colors hover:text-brand-blue">{m.nav_home()}</a></li>
					<li><a href="/apps" class="transition-colors hover:text-brand-blue">{m.nav_apps()}</a></li>
					<li><a href="/news" class="transition-colors hover:text-brand-blue">{m.nav_news()}</a></li>
				</ul>
			</div>

			<div>
				<h4 class="font-display mb-3 text-sm font-600 text-slate-900">{m.footer_contact()}</h4>
				<ul class="space-y-2 text-sm text-slate-500">
					<li>
						<a href="mailto:hello@pantrypoints.com" class="transition-colors hover:text-brand-blue">
							hello@pantrypoints.com
						</a>
					</li>
					<li class="text-slate-400">pantrypoints.com</li>
				</ul>
			</div>
		</div>

		<div class="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
			{m.footer_copyright()}
		</div>
	</div>
</footer>

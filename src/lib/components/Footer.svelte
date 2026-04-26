<script lang="ts">
	import { Facebook, Youtube, Twitter, Mail } from 'lucide-svelte';
	import { t } from '$lib/i18n';
</script>

<footer class="mt-24 border-t border-slate-100 bg-slate-50">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
			<div class="lg:col-span-2">
				<div class="mb-4 flex items-center gap-2.5">
					<img src="/icons/pantry50.png" alt="Pantrypoints icon" class="h-8 w-auto">
					<span class="font-display text-lg font-700 text-slate-900">Pantrypoints</span>
				</div>
				<p class="max-w-xs text-sm leading-relaxed text-slate-500">
					{t('tagline')}
				</p>
				<div class="mt-4 flex gap-3">
					<a href="https://youtube.com/@pantrypoints" target="_blank" rel="noopener"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue">
						<Youtube size={15} />
					</a>
					<a href="https://youtube.com/@superphysics" target="_blank" rel="noopener"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue">
						<Youtube size={15} />
					</a>
					<a href="https://www.facebook.com/pantrypoints" target="_blank" rel="noopener"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue">
						<Facebook size={15} />
					</a>
					<a href="https://twitter.com/pantrypoints" target="_blank" rel="noopener"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue">
						<Twitter size={15} />
					</a>
					<a href="mailto:hello@pantrypoints.com"
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue">
						<Mail size={15} />
					</a>
				</div>
			</div>

			<div>
				<h4 class="font-display mb-3 text-sm font-600 text-slate-900">
					{t('footer_links')}
				</h4>
				<ul class="space-y-2 text-sm text-slate-500">
					<li><a href="/trisactions" class="transition-colors hover:text-brand-blue">Pantrypoints</a></li>
					<li><a href="/pantrypreneur" class="transition-colors hover:text-brand-blue">Pantrypreneur</a></li>
					<li><a href="/services" class="transition-colors hover:text-brand-blue">Services</a></li>
				</ul>
			</div>

			<div>
				<h4 class="font-display mb-3 text-sm font-600 text-slate-900">
					{t('footer_contact')}
				</h4>
				<ul class="space-y-2 text-sm text-slate-500">
					<li>
						<a href="mailto:hello@pantrypoints.com" class="transition-colors hover:text-brand-blue">
							hello@pantrypoints.com
						</a>
					</li>
					<li>
						<a href="/news" class="transition-colors hover:text-brand-blue">
							{t('nav_news')}
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
			{t('footer_copyright')}
		</div>
	</div>
</footer>
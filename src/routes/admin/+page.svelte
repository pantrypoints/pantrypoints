<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, scale } from 'svelte/transition';
	import { Shield, LogOut, Users, TrendingUp, Calendar, Search, Lock, Eye, EyeOff } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';

	let { data, form } = $props();

	let loginSubmitting = $state(false);
	let showPassword = $state(false);
	let searchQuery = $state('');

	let filteredUsers = $derived(
		data.users?.filter(
			(u) =>
				!searchQuery ||
				u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(u.organization ?? '').toLowerCase().includes(searchQuery.toLowerCase())
		) ?? []
	);

	function formatDate(dateStr: string): string {
		try {
			return new Date(dateStr).toLocaleDateString(
				languageTag() === 'zh' ? 'zh-CN' : 'en-US',
				{ year: 'numeric', month: 'short', day: 'numeric' }
			);
		} catch {
			return dateStr;
		}
	}
</script>

<svelte:head>
	<title>{m.admin_title()} — Pantrypoints</title>
</svelte:head>

<div class="page-transition min-h-screen bg-slate-50">
	{#if !data.isAuthenticated}
		<!-- Login -->
		<div class="flex min-h-screen items-center justify-center px-4 py-16">
			<div
				in:scale={{ start: 0.95, duration: 400 }}
				class="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-8 shadow-xl"
			>
				<div class="mb-8 text-center">
					<div
						class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
						style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)"
					>
						<Shield size={24} class="text-white" />
					</div>
					<h1 class="font-display text-2xl font-700 text-slate-900">{m.admin_login_title()}</h1>
					<p class="mt-1 text-sm text-slate-500">{m.admin_login_subtitle()}</p>
				</div>

				{#if form?.error === 'wrong_password'}
					<div
						in:fly={{ y: -6, duration: 200 }}
						class="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
					>
						{m.admin_wrong_password()}
					</div>
				{/if}

				<form
					method="POST"
					action="?/login"
					use:enhance={() => {
						loginSubmitting = true;
						return async ({ update }) => {
							loginSubmitting = false;
							await update();
						};
					}}
				>
					<div>
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="password">
							{m.admin_password_label()}
						</label>
						<div class="relative">
							<Lock size={15} class="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" />
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								required
								placeholder="••••••••"
								class="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 text-sm focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
							>
								{#if showPassword}<EyeOff size={15} />{:else}<Eye size={15} />{/if}
							</button>
						</div>
					</div>

					<button
						type="submit"
						disabled={loginSubmitting}
						class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-60"
						style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)"
					>
						{#if loginSubmitting}
							<span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
						{/if}
						{m.admin_login_btn()}
					</button>
				</form>
			</div>
		</div>
	{:else}
		<!-- Dashboard -->
		<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<!-- Header -->
			<div in:fly={{ y: -15, duration: 400 }} class="mb-8 flex items-center justify-between">
				<div>
					<h1 class="font-display text-3xl font-800 text-slate-900">{m.admin_title()}</h1>
					<p class="mt-1 text-sm text-slate-500">Pantrypoints Admin</p>
				</div>
				<form method="POST" action="?/logout">
					<button
						type="submit"
						class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:text-brand-red"
					>
						<LogOut size={15} />
						{m.admin_logout()}
					</button>
				</form>
			</div>

			<!-- Stats -->
			{#if data.stats}
				<div in:fly={{ y: 15, duration: 400, delay: 100 }} class="mb-8 grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
						<div class="mb-1 flex items-center gap-2 text-sm text-slate-500">
							<Users size={15} class="text-brand-blue" />
							{m.admin_stat_total()}
						</div>
						<div class="font-display text-4xl font-800 text-slate-900">{data.stats.total}</div>
					</div>
					<div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
						<div class="mb-1 flex items-center gap-2 text-sm text-slate-500">
							<TrendingUp size={15} class="text-brand-green" />
							{m.admin_stat_recent()}
						</div>
						<div class="font-display text-4xl font-800 text-slate-900">{data.stats.recent}</div>
					</div>
				</div>
			{/if}

			<!-- Users table -->
			<div
				in:fly={{ y: 20, duration: 400, delay: 200 }}
				class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
			>
				<div class="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 class="font-display font-700 text-slate-900">{m.admin_users_title()}</h2>
					<div class="relative max-w-xs">
						<Search size={14} class="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
						<input
							type="search"
							bind:value={searchQuery}
							placeholder={m.admin_search_placeholder()}
							class="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-sm focus:border-brand-blue focus:outline-none"
						/>
					</div>
				</div>

				{#if filteredUsers.length === 0}
					<div class="py-16 text-center text-slate-400">
						<Users size={36} class="mx-auto mb-3 opacity-40" />
						<p class="text-sm">
							{searchQuery ? m.admin_no_results() : m.admin_no_users()}
						</p>
					</div>
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full min-w-[700px] text-sm">
							<thead class="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
								<tr>
									<th class="px-6 py-3 text-left">{m.admin_col_name()}</th>
									<th class="px-6 py-3 text-left">{m.admin_col_email()}</th>
									<th class="px-6 py-3 text-left">{m.admin_col_org()}</th>
									<th class="px-6 py-3 text-left">{m.admin_col_lang()}</th>
									<th class="px-6 py-3 text-left">{m.admin_col_date()}</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-50">
								{#each filteredUsers as user, i}
									<tr
										in:fly={{ y: 8, duration: 200, delay: i * 20 }}
										class="transition-colors hover:bg-slate-50"
									>
										<td class="px-6 py-3.5">
											<div class="flex items-center gap-2.5">
												<div
													class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
													style="background: linear-gradient(135deg, #3c95d3, #00BD6C)"
												>
													{user.name.charAt(0).toUpperCase()}
												</div>
												<span class="font-medium text-slate-900">{user.name}</span>
											</div>
										</td>
										<td class="px-6 py-3.5 text-slate-600">{user.email}</td>
										<td class="px-6 py-3.5 text-slate-500">{user.organization ?? '—'}</td>
										<td class="px-6 py-3.5">
											<span
												class="rounded-md px-2 py-0.5 text-xs font-medium"
												style={user.lang === 'zh'
													? 'background:#3c95d318; color:#3c95d3'
													: 'background:#00BD6C18; color:#00BD6C'}
											>
												{user.lang === 'zh' ? m.lang_zh() : 'EN'}
											</span>
										</td>
										<td class="px-6 py-3.5">
											<span class="flex items-center gap-1.5 text-slate-400">
												<Calendar size={12} />
												{formatDate(user.createdAt)}
											</span>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<div class="border-t border-slate-100 px-6 py-3 text-right text-xs text-slate-400">
						{filteredUsers.length} {m.admin_records()}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

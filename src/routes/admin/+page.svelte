<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, scale } from 'svelte/transition';
	import { Flower2, BicepsFlexed, Shield, LogOut, Users, TrendingUp, Calendar, Search, Lock, Eye, EyeOff } from 'lucide-svelte';
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
				(u.country ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
				(u.city ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
				(u.subj ?? '').toLowerCase().includes(searchQuery.toLowerCase())
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

	import { User, UserRound, Baby, UserRoundSearch } from 'lucide-svelte';
	
	// Helper function to get age-based color
	function getAgeColor(age: number | null | undefined): string {
		if (!age) return '#3c95d3'; // Default blue if no age
		
		if (age <= 19) return '#FFB6C1'; // Light pink for young
		if (age <= 29) return '#FF69B4'; // Medium-light pink
		if (age <= 39) return '#FF1493'; // Medium pink
		if (age <= 49) return '#DB7093'; // Medium-dark pink
		if (age <= 59) return '#C71585'; // Dark pink
		if (age <= 69) return '#8B008B'; // Darker magenta
		if (age <= 79) return '#800080'; // Very dark purple
		return '#4B0082'; // Darkest indigo for 80-99
	}
	
	// Helper function to get gender-based color
	function getGenderColor(gender: string | null | undefined, age: number | null | undefined): string {
		const ageColor = getAgeColor(age);
		
		if (gender === 'male') {
			// Blue gradient with age-based darkness
			if (!age) return 'linear-gradient(135deg, #3c95d3, #2a7ab8)';
			if (age <= 19) return 'linear-gradient(135deg, #4aa3e0, #3c95d3)';
			if (age <= 39) return 'linear-gradient(135deg, #3c95d3, #2a7ab8)';
			if (age <= 59) return 'linear-gradient(135deg, #2a7ab8, #1a5a8a)';
			if (age <= 79) return 'linear-gradient(135deg, #1a5a8a, #0f3a5a)';
			return 'linear-gradient(135deg, #0f3a5a, #081f2f)';
		} else if (gender === 'female') {
			// Pink gradient with age-based darkness
			if (!age) return 'linear-gradient(135deg, #FF69B4, #FF1493)';
			if (age <= 19) return 'linear-gradient(135deg, #FFB6C1, #FF69B4)';
			if (age <= 39) return 'linear-gradient(135deg, #FF69B4, #FF1493)';
			if (age <= 59) return 'linear-gradient(135deg, #FF1493, #DB7093)';
			if (age <= 79) return 'linear-gradient(135deg, #DB7093, #C71585)';
			return 'linear-gradient(135deg, #C71585, #8B008B)';
		} else {
			// Neutral gradient for other/unspecified
			return `linear-gradient(135deg, ${ageColor}, ${ageColor}cc)`;
		}
	}
	
	// Helper function to get icon based on gender and age
	function getUserIcon(gender: string | null | undefined, age: number | null | undefined) {
		if (!age || age < 13) return Baby;
		if (gender === 'male') return User;
		if (gender === 'female') return UserRound;
		return UserRoundSearch;
	}


</script>

<svelte:head>
	<title>{m.admin_title()} — Pantrypoints</title>
</svelte:head>




<div class="page-transition min-h-screen bg-slate-50 dark:bg-slate-900">
	{#if !data.isAuthenticated}
		<!-- Login -->
		<div class="flex min-h-screen items-center justify-center px-4 py-16">
			<div
				in:scale={{ start: 0.95, duration: 400 }}
				class="w-full max-w-sm rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-xl">
				<div class="mb-8 text-center">
					<div
						class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
						style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)">
						<Shield size={24} class="text-white" />
					</div>
					<h1 class="font-display text-2xl font-700 text-slate-900 dark:text-white">{m.admin_login_title()}</h1>
					<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{m.admin_login_subtitle()}</p>
				</div>

				{#if form?.error === 'wrong_password'}
					<div
						in:fly={{ y: -6, duration: 200 }}
						class="mb-4 rounded-xl bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
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
					}}>
					<div>
						<label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300" for="password">
							{m.admin_password_label()}
						</label>
						<div class="relative">
							<Lock size={15} class="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								required
								placeholder="••••••••"
								class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-10 text-sm text-slate-900 dark:text-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
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
					<h1 class="font-display text-3xl font-800 text-slate-900 dark:text-white">{m.admin_title()}</h1>
					<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Pantrypoints Admin</p>
				</div>
				<form method="POST" action="?/logout">
					<button
						type="submit"
						class="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:border-red-200 dark:hover:border-red-800 hover:text-brand-red dark:hover:text-red-400"
					>
						<LogOut size={15} />
						{m.admin_logout()}
					</button>
				</form>
			</div>

			<!-- Stats -->
			{#if data.stats}
				<div in:fly={{ y: 15, duration: 400, delay: 100 }} class="mb-8 grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm border border-slate-100 dark:border-slate-700">
						<div class="mb-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
							<Users size={15} class="text-brand-blue" />
							{m.admin_stat_total()}
						</div>
						<div class="font-display text-4xl font-800 text-slate-900 dark:text-white">{data.stats.total}</div>
					</div>
					<div class="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm border border-slate-100 dark:border-slate-700">
						<div class="mb-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
							<TrendingUp size={15} class="text-brand-green" />
							{m.admin_stat_recent()}
						</div>
						<div class="font-display text-4xl font-800 text-slate-900 dark:text-white">{data.stats.recent}</div>
					</div>
				</div>
			{/if}

			<!-- Users table -->
			<div
				in:fly={{ y: 20, duration: 400, delay: 200 }}
				class="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
			>
				<div class="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-700 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 class="font-display font-700 text-slate-900 dark:text-white">{m.admin_users_title()}</h2>
					<div class="relative max-w-xs">
						<Search size={14} class="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
						<input
							type="search"
							bind:value={searchQuery}
							placeholder={m.admin_search_placeholder()}
							class="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-1.5 pl-8 pr-3 text-sm text-slate-900 dark:text-white focus:border-brand-blue focus:outline-none"
						/>
					</div>
				</div>

				{#if filteredUsers.length === 0}
					<div class="py-16 text-center text-slate-400 dark:text-slate-500">
						<Users size={36} class="mx-auto mb-3 opacity-40" />
						<p class="text-sm">
							{searchQuery ? m.admin_no_results() : m.admin_no_users()}
						</p>
					</div>
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full min-w-[700px] text-sm">
							<thead class="bg-slate-50 dark:bg-slate-900/50 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
								<tr>
									<th class="px-6 py-3 text-left">{m.admin_col_name()}</th>
									<th class="px-6 py-3 text-left">{m.admin_col_email()}</th>
									<th class="px-6 py-3 text-left">{m.phone()}</th>
									<th class="px-6 py-3 text-left">{m.country()}</th>
									<th class="px-6 py-3 text-left">{m.city()}</th>
									<th class="px-6 py-3 text-left">{m.age()}</th>
									<th class="px-6 py-3 text-left">{m.admin_col_lang()}</th>
									<th class="px-6 py-3 text-left">Subject</th>
									<th class="px-6 py-3 text-left">Message</th>
									<th class="px-6 py-3 text-left">Source</th>
									<th class="px-6 py-3 text-left">Registered on</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-50 dark:divide-slate-700">




								{#each filteredUsers as user, i}
									<tr in:fly={{ y: 8, duration: 200, delay: i * 20 }}
										class="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">

										<td class="px-6 py-3.5">
											<div class="flex items-center gap-2.5">
												<div
													class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
													style="background: {getGenderColor(user.gender, user.age)}"
												>
													{#if user.gender === 'male'}
														<BicepsFlexed size={16} class="text-white" />
													{:else if user.gender === 'female'}
														<Flower2 size={16} class="text-white" />
													{:else}
														{#if user.age && user.age <= 12}
															<Baby size={16} class="text-white" />
														{:else}
															<UserRoundSearch size={16} class="text-white" />
														{/if}
													{/if}
												</div>
												<span class="font-medium text-slate-900 dark:text-white">{user.name}</span>
											</div>
										</td>

										<td class="px-6 py-3.5 text-slate-600 dark:text-slate-400">{user.email}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.phone ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.country ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.city ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.age ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.lang ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.subj ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.msg ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500 dark:text-slate-400">{user.source ?? '—'}</td>
										<!-- <td class="px-6 py-3.5">
											<span
												class="rounded-md px-2 py-0.5 text-xs font-medium"
												style={user.lang === 'zh'
													? 'background:#3c95d318; color:#3c95d3'
													: 'background:#00BD6C18; color:#00BD6C'}>
												{user.lang === 'zh' ? m.lang_zh() : 'EN'}
											</span>
										</td> -->
										<td class="px-6 py-3.5">
											<span class="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
												<Calendar size={12} />
												{formatDate(user.createdAt)}
											</span>
										</td>
									</tr>
								{/each}







							</tbody>
						</table>
					</div>
					<div class="border-t border-slate-100 dark:border-slate-700 px-6 py-3 text-right text-xs text-slate-400 dark:text-slate-500">
						{filteredUsers.length} {m.admin_records()}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
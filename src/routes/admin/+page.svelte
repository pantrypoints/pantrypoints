<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, scale } from 'svelte/transition';
	import { 
		Flower2, BicepsFlexed, Shield, LogOut, Users, TrendingUp, 
		Calendar, Search, Lock, Eye, EyeOff, Trash2, CheckSquare, Square,
		User, UserRound, Baby, UserRoundSearch 
	} from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';

	let { data, form } = $props();

	let loginSubmitting = $state(false);
	let showPassword = $state(false);
	let searchQuery = $state('');
	
	// Selection State
	let selectedIds = $state<number[]>([]);

	let filteredUsers = $derived(
		data.users?.filter((u) => 
			!searchQuery || 
			u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
			u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(u.country ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
			(u.city ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
			(u.subj ?? '').toLowerCase().includes(searchQuery.toLowerCase())
		) ?? []
	);

	// Toggle single selection
	function toggleSelect(id: number) {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter(i => i !== id);
		} else {
			selectedIds = [...selectedIds, id];
		}
	}

	// Toggle all filtered users
	function toggleAll() {
		if (selectedIds.length === filteredUsers.length && filteredUsers.length > 0) {
			selectedIds = [];
		} else {
			selectedIds = filteredUsers.map(u => u.id);
		}
	}

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

	function getGenderColor(gender: string | null | undefined, age: number | null | undefined): string {
		if (gender === 'male') {
			if (!age) return 'linear-gradient(135deg, #3c95d3, #2a7ab8)';
			if (age <= 19) return 'linear-gradient(135deg, #4aa3e0, #3c95d3)';
			if (age <= 39) return 'linear-gradient(135deg, #3c95d3, #2a7ab8)';
			if (age <= 59) return 'linear-gradient(135deg, #2a7ab8, #1a5a8a)';
			return 'linear-gradient(135deg, #1a5a8a, #0f3a5a)';
		} else if (gender === 'female') {
			if (!age) return 'linear-gradient(135deg, #FF69B4, #FF1493)';
			if (age <= 19) return 'linear-gradient(135deg, #FFB6C1, #FF69B4)';
			if (age <= 39) return 'linear-gradient(135deg, #FF69B4, #FF1493)';
			if (age <= 59) return 'linear-gradient(135deg, #FF1493, #DB7093)';
			return 'linear-gradient(135deg, #DB7093, #C71585)';
		}
		return 'linear-gradient(135deg, #94a3b8, #64748b)';
	}
</script>

<svelte:head>
	<title>{m.admin_title()} — Pantrypoints</title>
</svelte:head>

<div class="page-transition min-h-screen bg-slate-50 dark:bg-slate-900">
	{#if !data.isAuthenticated}
		<div class="flex min-h-screen items-center justify-center px-4 py-16">
			<div in:scale={{ start: 0.95, duration: 400 }} class="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
				<div class="mb-8 text-center">
					<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)">
						<Shield size={24} class="text-white" />
					</div>
					<h1 class="font-display text-2xl font-700 text-slate-900 dark:text-white">{m.admin_login_title()}</h1>
				</div>

				<form method="POST" action="?/login" use:enhance={() => { loginSubmitting = true; return async ({ update }) => { loginSubmitting = false; await update(); }; }}>
					<div class="space-y-4">
						<div>
							<label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300" for="password">{m.admin_password_label()}</label>
							<div class="relative">
								<Lock size={15} class="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" />
								<input id="password" name="password" type={showPassword ? 'text' : 'password'} required class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm focus:border-brand-blue focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
								<button type="button" onclick={() => (showPassword = !showPassword)} class="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
									{#if showPassword}<EyeOff size={15} />{:else}<Eye size={15} />{/if}
								</button>
							</div>
						</div>
						<button type="submit" disabled={loginSubmitting} class="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60" style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)">
							{loginSubmitting ? '...' : m.admin_login_btn()}
						</button>
					</div>
				</form>
			</div>
		</div>
	{:else}
		<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<div in:fly={{ y: -15, duration: 400 }} class="mb-8 flex items-center justify-between">
				<div>
					<h1 class="font-display text-3xl font-800 text-slate-900 dark:text-white">{m.admin_title()}</h1>
					<p class="mt-1 text-sm text-slate-500">Pantrypoints Admin Hub</p>
				</div>
				<form method="POST" action="?/logout">
					<button type="submit" class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-red-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
						<LogOut size={15} /> {m.admin_logout()}
					</button>
				</form>
			</div>

			<div in:fly={{ y: 20, duration: 400, delay: 200 }} class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
				
				<div class="flex flex-col gap-4 border-b border-slate-100 px-6 py-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
					<div class="flex items-center gap-4">
						<h2 class="font-display font-700 text-slate-900 dark:text-white">{m.admin_users_title()}</h2>
						
						{#if selectedIds.length > 0}
							<form method="POST" action="?/delete" use:enhance={() => {
								return async ({ update }) => {
									selectedIds = [];
									await update();
								};
							}}>
								{#each selectedIds as id}<input type="hidden" name="ids" value={id} />{/each}
								<button 
									type="submit" 
									in:fly={{ x: -10, duration: 200 }}
									class="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white dark:bg-red-900/20"
								>
									<Trash2 size={14} />
									Delete {selectedIds.length}
								</button>
							</form>
						{/if}
					</div>

					<div class="relative max-w-xs">
						<Search size={14} class="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
						<input type="search" bind:value={searchQuery} placeholder={m.admin_search_placeholder()} class="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-sm focus:border-brand-blue focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
					</div>
				</div>

				{#if filteredUsers.length === 0}
					<div class="py-16 text-center text-slate-400">
						<Users size={36} class="mx-auto mb-3 opacity-40" />
						<p class="text-sm">{searchQuery ? m.admin_no_results() : m.admin_no_users()}</p>
					</div>
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full min-w-[1000px] text-sm">
							<thead class="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
								<tr>
									<th class="w-12 px-6 py-3">
										<button type="button" onclick={toggleAll} class="text-slate-400 hover:text-brand-blue">
											{#if selectedIds.length === filteredUsers.length && filteredUsers.length > 0}
												<CheckSquare size={18} class="text-brand-blue" />
											{:else}
												<Square size={18} />
											{/if}
										</button>
									</th>
									<th class="px-6 py-3 text-left">{m.admin_col_name()}</th>
									<th class="px-6 py-3 text-left">{m.admin_col_email()}</th>
									<th class="px-6 py-3 text-left">{m.phone()}</th>
									<th class="px-6 py-3 text-left">{m.country()}</th>
									<th class="px-6 py-3 text-left">{m.age()}</th>
									<th class="px-6 py-3 text-left">Subject</th>
									<th class="px-6 py-3 text-left">Source</th>
									<th class="px-6 py-3 text-left">Date</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-50 dark:divide-slate-700">
								{#each filteredUsers as user, i (user.id)}
									<tr class="transition-colors {selectedIds.includes(user.id) ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}">
										<td class="px-6 py-3.5">
											<button type="button" onclick={() => toggleSelect(user.id)} class="text-slate-400">
												{#if selectedIds.includes(user.id)}
													<CheckSquare size={18} class="text-brand-blue" />
												{:else}
													<Square size={18} />
												{/if}
											</button>
										</td>
										<td class="px-6 py-3.5">
											<div class="flex items-center gap-2.5">
												<div class="flex h-8 w-8 items-center justify-center rounded-full text-white" style="background: {getGenderColor(user.gender, user.age)}">
													{#if user.gender === 'male'}<BicepsFlexed size={14} />{:else if user.gender === 'female'}<Flower2 size={14} />{:else}<UserRoundSearch size={14} />{/if}
												</div>
												<span class="font-medium text-slate-900 dark:text-white">{user.name}</span>
											</div>
										</td>
										<td class="px-6 py-3.5 text-slate-600 dark:text-slate-400">{user.email}</td>
										<td class="px-6 py-3.5 text-slate-500">{user.phone ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500">{user.country ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500">{user.age ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500">{user.subj ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-500">{user.source ?? '—'}</td>
										<td class="px-6 py-3.5 text-slate-400">
											<span class="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(user.createdAt)}</span>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<div class="border-t border-slate-100 px-6 py-3 text-right text-xs text-slate-400 dark:border-slate-700">
						{filteredUsers.length} {m.admin_records()}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
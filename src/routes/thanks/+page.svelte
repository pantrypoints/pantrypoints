<!-- <script lang="ts">
  import { page } from '$app/stores';
  
  $: name = $page.url.searchParams.get('name') || 'there';
  $: email = $page.url.searchParams.get('email') || '';
</script>

<div class="flex justify-center items-center min-h-[60vh] p-4">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center">

    <div class="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
      <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      Thank You, {name}!
    </h1>
    
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      Your registration has been submitted successfully.
    </p>
    
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
      A confirmation email has been sent to <strong>{email}</strong>
    </p>
    
    <a href="/help" class="inline-flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
      Return to Help Center
    </a>
  </div>
</div> -->


<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { CheckCircle, ArrowLeft, Home } from 'lucide-svelte';

  // Svelte 5 uses $props() for data, though we aren't passing any here
  let { data } = $props();
</script>

<svelte:head>
  <title>Thank You! — Pantrypoints</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
  <div 
    class="max-w-md w-full text-center"
    in:fade={{ duration: 400 }}
  >
    <!-- Animated Icon Container -->
    <div 
      in:fly={{ y: 20, duration: 600, delay: 100 }}
      class="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-brand-green rounded-full mb-8"
    >
      <CheckCircle size={40} strokeWidth={2.5} />
    </div>

    <!-- Text Content -->
    <h1 
      in:fly={{ y: 20, duration: 600, delay: 200 }}
      class="font-display text-4xl font-900 text-slate-900 mb-4"
    >
      Thank You!
    </h1>
    
    <p 
      in:fly={{ y: 20, duration: 600, delay: 300 }}
      class="text-lg text-slate-500 mb-10 leading-relaxed"
    >
      Your submission has been received. We’ll review the details and get back to you shortly.
    </p>

    <!-- Action Buttons -->
    <div 
      in:fly={{ y: 20, duration: 600, delay: 400 }}
      class="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <a 
        href="/" 
        class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-green text-white font-bold rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-200 active:scale-95"
      >
        <Home size={18} />
        Back to Home
      </a>
      
      <a 
        href="/news" 
        class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        <ArrowLeft size={18} />
        View News
      </a>
    </div>

    <!-- Decorative Background Element -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl opacity-50"></div>
    </div>
  </div>
</div>

<style>
  /* Custom font or colors if not defined in tailwind.config.js */
  :global(.font-display) {
    font-family: 'Inter', sans-serif; /* Replace with your brand font */
  }
  
  .text-brand-green {
    color: #00BD6C;
  }
  
  .bg-brand-green {
    background-color: #00BD6C;
  }
</style>
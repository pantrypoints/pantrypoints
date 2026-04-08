<script lang="ts">
  import { page } from '$app/stores';
  
  $: name = $page.url.searchParams.get('name') || 'there';
  $: email = $page.url.searchParams.get('email') || '';
</script>

<div class="flex justify-center items-center min-h-[60vh] p-4">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center">
    <!-- Success Icon -->
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
</div>
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
    }),
  ],
});


// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';
// import { paraglide } from '@inlang/paraglide-js/adapter-vite';
// // import { paraglide } from '@inlang/paraglide-js/vite'; // ← plain JS, no SvelteKit URL routing
// // import { paraglide } from '@inlang/paraglide-js/dist/vite/index.js';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     sveltekit(),
//     paraglide({
//       project: './project.inlang',
//       outdir: './src/lib/paraglide',
//     }),
//   ],
// });







// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';
// import tailwindcss from '@tailwindcss/vite';
// import { paraglide } from '@inlang/paraglide-sveltekit/vite';

// export default defineConfig({
// 	plugins: [
// 		tailwindcss(), 
// 		paraglide({
// 			project: './project.inlang', 
// 			outdir: './src/lib/paraglide'
// 		}),
// 		sveltekit()
// 	]
// });


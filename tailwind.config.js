20:18:41.350 Running build in Washington, D.C., USA (East) – iad1
20:18:41.350 Build machine configuration: 2 cores, 8 GB
20:18:41.475 Cloning github.com/Ronnie04NYC/propaganda-index (Branch: main, Commit: 38a17ca)
20:18:41.476 Previous build caches not available.
20:18:41.664 Cloning completed: 189.000ms
20:18:42.056 Running "vercel build"
20:18:42.467 Vercel CLI 48.10.5
20:18:43.062 Installing dependencies...
20:18:58.739 npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
20:18:59.964 
20:18:59.965 added 202 packages in 17s
20:18:59.965 
20:18:59.966 44 packages are looking for funding
20:18:59.966   run `npm fund` for details
20:19:00.009 Running "npm run build"
20:19:00.118 
20:19:00.120 > propaganda-exposure-index@1.0.2 build
20:19:00.120 > tsc && vite build
20:19:00.121 
20:19:03.728 [36mvite v5.4.21 [32mbuilding for production...[36m[39m
20:19:03.785 transforming...
20:19:04.122 [32m✓[39m 3 modules transformed.
20:19:04.123 [31mx[39m Build failed in 370ms
20:19:04.124 [31merror during build:
20:19:04.124 [31m[vite:css] [postcss] Invalid scope depth at end of file: 1[31m
20:19:04.125 file: [36m/vercel/path0/index.css:undefined:NaN[31m
20:19:04.125     at parseTopLevel (/vercel/path0/node_modules/sucrase/dist/parser/traverser/statement.js:95:11)
20:19:04.125     at parseFile (/vercel/path0/node_modules/sucrase/dist/parser/traverser/index.js:17:35)
20:19:04.126     at parse (/vercel/path0/node_modules/sucrase/dist/parser/index.js:26:35)
20:19:04.126     at getSucraseContext (/vercel/path0/node_modules/sucrase/dist/index.js:95:30)
20:19:04.126     at transform (/vercel/path0/node_modules/sucrase/dist/index.js:38:28)
20:19:04.127     at Object.transform (/vercel/path0/node_modules/tailwindcss/lib/lib/load-config.js:38:43)
20:19:04.127     at /vercel/path0/node_modules/jiti/dist/jiti.js:1:247465
20:19:04.127     at opts.transform.Object.assign.Object.assign.Object.assign.legacy (/vercel/path0/node_modules/jiti/dist/jiti.js:1:247286)
20:19:04.127     at transform (/vercel/path0/node_modules/jiti/dist/jiti.js:1:247408)
20:19:04.128     at evalModule (/vercel/path0/node_modules/jiti/dist/jiti.js:1:250828)[39m
20:19:04.142 Error: Command "npm run build" exited with 1
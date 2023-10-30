import { sveltekit } from '@sveltejs/kit/vite'
import dotenvExpand from 'dotenv-expand'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // This check is important!
  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '')
    dotenvExpand.expand({ parsed: env })
  }
  return {
    plugins: [sveltekit()],
  }
})

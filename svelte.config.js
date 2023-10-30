import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      server: {
        fs: {
          // Allow serving files from one level up to the project root
          allow: ['..']
        }
      }
    }
  },
  preprocess: vitePreprocess(),
}

export default config

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';
import { transformerNotationDiff, transformerCompactLineOptions } from '@shikijs/transformers';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter({
				themes: ['catppuccin-mocha'],
				langs: ['javascript', 'typescript'],
				transformers: [transformerNotationDiff()]
			});
			await highlighter.loadLanguage('javascript', 'typescript');
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'catppuccin-mocha',
					transformers: [transformerNotationDiff()]
				})
			);
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
	extensions: ['.svelte', '.md'],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

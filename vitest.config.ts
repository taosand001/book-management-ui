import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
	viteConfig,
	defineConfig({
		// options
		test: {
			environment: 'jsdom',
			setupFiles: ['./vitest.setup.ts', 'vitest-localstorage-mock'],
			mockReset: false,
			testTimeout: 30000,
			reporters: ['junit', 'json', 'verbose'],
			outputFile: {
				junit: './junit-report.xml',
				json: './json-report.json',
			},
		},
	})
);

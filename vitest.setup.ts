import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach } from 'vitest';

afterEach(() => {
	cleanup();
});

afterAll(() => {
	cleanup();
});

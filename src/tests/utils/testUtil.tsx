/* eslint-disable react-refresh/only-export-components */
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import { testStore } from './testStore';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={testStore}>
			<ChakraProvider>
				<MemoryRouter>{children}</MemoryRouter>
			</ChakraProvider>
		</Provider>
	);
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

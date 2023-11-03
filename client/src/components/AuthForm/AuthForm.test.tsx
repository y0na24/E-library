import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'

import { AuthFormHeader } from './AuthFormHeader'
import { AuthFormBody } from './AuthFormBody'

import { renderWithCard } from '../../lib/tests/helpers/renderWithCard'
import { routerConfig } from '../../routes'

describe('AuthForm module', () => {
	test('form header title', () => {
		const testTitle = 'Login'

		const { getByTestId } = renderWithCard(<AuthFormHeader title={testTitle} />)

		expect(getByTestId('form-title')).toHaveTextContent(testTitle)
	})

	test('form body input value', () => {
		const onChange = jest.fn()
		let errors = { username: 'error', password: '' }
		let inputFields = { username: 'y0na24', password: '' }

		const { getByTestId } = renderWithCard(
			<AuthFormBody
				onChange={onChange}
				errors={errors}
				inputFields={inputFields}
			/>
		)

		const input = getByTestId('username-input') as HTMLInputElement

		expect(input.value).toBe('y0na24')
	})

	test('form footer link and button', async () => {
		const router = createMemoryRouter(routerConfig, {
			initialEntries: ['/auth/login'],
		})

		const { getByTestId } = render(<RouterProvider router={router} />)
		const formBtn = getByTestId('form-btn')

		expect(formBtn).toHaveTextContent('Login')

		fireEvent.click(getByTestId('form-link'))

		expect(formBtn).toHaveTextContent('Sign Up')
	})
})

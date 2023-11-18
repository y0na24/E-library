import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { authActions } from '../store/slices/authSlice'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3000/',
	credentials: 'include',
	prepareHeaders: (headers: Headers, { getState }: { getState: any }) => {
		const token = getState().auth.token

		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}

		return headers
	},
})

const baseQueryWithReauth = async (
	args: string | FetchArgs,
	api: BaseQueryApi | any,
	extraOptions: {}
) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error && 'originalStatus' in result.error) {
		if (result.error.originalStatus === 403) {
			console.log('sending refresh token')

			const refreshResult = await baseQuery('/refresh', api, extraOptions)

			if (refreshResult.data) {
				const user = api.getState().auth.user

				api.dispatch(
					authActions.setCredentials({
						accessToken: refreshResult.data as string,
						user,
					})
				)

				result = await baseQuery(args, api, extraOptions)
			}
		} else {
			api.dispatch(authActions.logOut())
		}
	}

	return result
}

export const apiService = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}),
})

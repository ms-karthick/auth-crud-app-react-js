import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UserAuthApi = createApi({
    reducerPath: 'UserAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/'}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'register',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
        loginUser: builder.mutation({
            query: (user) => {
              return {
                url: 'login',
                method: 'POST',
                body: user,
                headers: {
                  'Content-type': 'application/json',
                }
              }
            }
          }),
          logoutUser: builder.mutation({
            query: ({ token }) => {
              return {
                url: 'logout',
                method: 'POST',
                body: {},
                headers: {
                  'authorization': `Bearer ${token}`,
                }
              }
            }
          }),
          getLoggedUser: builder.query({
            query: (token) => {
              return {
                url: 'loggeduser',
                method: 'GET',
                headers: {
                  'authorization': `Bearer ${token}`,
                }
              }
            }
          }),
            
    }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,useGetLoggedUserQuery, useChangeUserPasswordMutation,useSendPasswordResetEmailMutation,useResetPasswordMutation } = UserAuthApi
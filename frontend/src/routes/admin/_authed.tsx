import { useAppSession } from '@/utils/session'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createMiddleware, createServerFn } from '@tanstack/react-start'
import { setCookie, getCookie } from '@tanstack/react-start/server'

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  let result = null
  try {
    result = await fetch('http://localhost:3001/auth/verify', {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + getCookie('jwt'),
      },
    })

    if (result?.status >= 400) return next() // invalid token
    return next({ context: { user: result && result.json() } })
  } catch (err) {
    console.log(Error('Fetch faile'), err)
    return next()
  }
})

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    let result = await fetch('http://localhost:3001/auth/login', {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })

    // server err inculded
    if (result.status >= 400) {
      return {
        error: true,
        userNotFound: true,
        message: 'Admin not found',
      }
    }

    let _data = await result.json()
    //set jwt token
    setCookie('jwt', _data.token)
    // Create a session
    const session = await useAppSession()

    // Store the user's email in the session | currently useless
    await session.update({
      email: data.email,
      jwtToken: _data.token,
    })
    return { success: true }
  })

export const Route = createFileRoute('/admin/_authed')({
  beforeLoad: async ({ serverContext }) => {
    const user = await serverContext?.user

    if (!user) {
      throw redirect({
        to: '/admin/login',
      })
    }

    return { user }
  },
  server: {
    middleware: [authMiddleware],
  },
})

import { Auth } from '@/components/Auth'
import { useMutation } from '@/hooks/useMutation'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { loginFn } from './_authed'

export const Route = createFileRoute('/admin/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (ctx.data?.success) {
        router.navigate({ href: '/admin/dashboard', reloadDocument: true })
        console.log('redirect to dashboard')
      }
    },
  })

  return (
    <Auth
      actionText="Login"
      status={loginMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement)

        loginMutation.mutate({
          data: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          },
        })
      }}
      afterSubmit={
        loginMutation.data ? (
          <>
            <div className="text-red-400">{loginMutation.data.message}</div>
          </>
        ) : null
      }
    />
  )
}

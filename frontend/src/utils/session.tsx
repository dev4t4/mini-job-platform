import { useSession } from '@tanstack/react-start/server'

type SessionUser = {
  name: string
  email: string
  jwtToken: string
}

export function useAppSession() {
  return useSession<SessionUser>({
    password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
  })
}

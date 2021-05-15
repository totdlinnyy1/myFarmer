import {useEffect} from 'react'
import Router from 'next/router'
import useSWR from 'swr'

type useUser = {
  redirectTo?: string | boolean
  redirectIfFound?: boolean
}

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
}: useUser = {}) {
  const {data: user, mutate: mutateUser} = useSWR('/api/user')

  useEffect(() => {
    if (!redirectTo || !user) return

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo as string)
    }
  }, [user, redirectIfFound, redirectTo])

  return {user, mutateUser}
}

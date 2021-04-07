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
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return {user, mutateUser}
}

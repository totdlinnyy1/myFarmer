type response = {
  name?: string
  lastname?: string
  avatar?: string
  email?: string
  phone?: string
  role?: string
  _id?: string
  hash?: string
  salt?: string
  response?: any
  data?: any
  message?: string
}

export default async function fetcher(
  ...args: [input: RequestInfo, init?: RequestInit]
) {
  try {
    const response = await fetch(...args)

    const data: response = await response.json()

    if (response.ok) {
      return data
    }

    const error: response = new Error(response.statusText)
    error.response = data
    error.data = data.data
    throw error
  } catch (error) {
    if (!error.data) {
      error.data = {message: error.message}
    }
    throw error
  }
}

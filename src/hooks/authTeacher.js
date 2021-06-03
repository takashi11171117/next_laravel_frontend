import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware } = {}) => {
  const router = useRouter()

  const { data: user, error, revalidate } = useSWR('/api/teacher', () =>
    axios
      .get('/api/teacher')
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status != 409) throw error

        router.push('/accounts/teacher/verify-email')
      })
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }) => {
    await csrf()

    axios
      .post('/teacher/register', props)
      .catch((error) => {
        if (error.response.status != 422) throw error

        setErrors(Object.values(error.response.data.errors))
      })
      .then(() => revalidate())
  }

  const login = async ({ setErrors, ...props }) => {
    await csrf()

    axios
      .post('/teacher/login', props)
      .catch((error) => {
        if (error.response.status != 422) throw error

        setErrors(Object.values(error.response.data.errors))
      })
      .then(() => revalidate())
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf()

    axios
      .post('/teacher/forgot-password', { email })
      .catch((error) => {
        if (error.response.status != 422) throw error

        setErrors(Object.values(error.response.data.errors))
      })
      .then((response) => setStatus(response.data.status))
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    axios
      .post('/teacher/reset-password', {
        token: router.query.token,
        ...props
      })
      .catch((error) => {
        if (error.response.status != 422) throw error

        setErrors(Object.values(error.response.data.errors))
      })
      .then((response) => setStatus(response.data.status))
  }

  const resendEmailVerification = ({ setStatus }) => {
    axios.post('/teacher/email/verification-notification').then((response) => setStatus(response.data.status))
  }

  const logout = () => {
    axios.post('/teacher/logout').then(() => {
      revalidate()

      window.location.pathname = '/accounts/teacher/login'
    })
  }

  useEffect(() => {
    if (middleware == 'guest' && user) router.push('/mypage/teacher/dashboard')
    if (middleware == 'auth' && error) router.push('/accounts/teacher/login')
  }, [user, error])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout
  }
}

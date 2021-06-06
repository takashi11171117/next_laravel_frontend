import useSWR from 'swr'
import axios from '@/lib/axios'

export const usePayment = () => {
  const { data: intent } = useSWR('/api/subscription', () =>
    axios
      .get('/api/subscription')
      .then((res) => res.data.intent)
      .catch((error) => {
        console.log(error)
      })
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const subscribe = async (paymentMethod, plan) => {
    await csrf()

    const url = '/api/subscription/subscribe'
    const params = {
      payment_method: paymentMethod,
      plan
    }
    console.log(plan)
    axios
      .post(url, params)
      .then(() => {
        location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    intent,
    subscribe
  }
}

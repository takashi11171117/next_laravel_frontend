import { Elements as StripeElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { usePayment } from '@/hooks/payment'
import AppLayout from '@/components/Layouts/AppLayout'
import CheckoutForm from '@/components/CheckoutForm'

const Dashboard = () => {
  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

  const { intent } = usePayment()
  console.log(intent)

  return (
    <AppLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
      <StripeElements stripe={promise}>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <CheckoutForm />
              </div>
            </div>
          </div>
        </div>
      </StripeElements>
    </AppLayout>
  )
}

export default Dashboard

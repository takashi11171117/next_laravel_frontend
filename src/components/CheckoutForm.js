import { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { Constants } from '@/common/constants'
import { usePayment } from '@/hooks/payment'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [plan, setPlan] = useState('price_1JLlg4FqmpxMq4bk7Oxd6HSG')
  const [cardHolderName, setCardHolderName] = useState()
  const { subscribe } = usePayment()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (elements == null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: cardHolderName
      }
    })

    if (error) {
      console.log(error)
    }

    subscribe(paymentMethod, plan)
  }

  return (
    <>
      <form onSubmit={async (e) => await handleSubmit(e)}>
        <div>
          <select value={plan} onChange={(e) => setPlan(e.target.value)}>
            {Object.keys(Constants.billingPlanType).map((key) => {
              return <option value="key">{Constants.billingPlanType[key]}</option>
            })}
          </select>
        </div>
        <div>
          <input
            type="text"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            placeholder="名義人（半角ローマ字）"
          />
        </div>
        <div>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <div>
          <button type="submit">課金する</button>
        </div>
      </form>
    </>
  )
}

export default CheckoutForm

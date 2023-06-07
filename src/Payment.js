import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch("https://evisa-backend.adaptable.app/config");
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    };

    fetchConfig();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch("https://evisa-backend.adaptable.app/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };

    createPaymentIntent();
  }, []);

  return (
    <>
      <h1>E VISA FEE</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm/>
        </Elements>
      )}
    </>
  );
}

export default Payment;

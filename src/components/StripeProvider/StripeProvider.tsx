import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Children, ReactNode } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

const StripeProvider = ({children}: {children: ReactNode}) => {
        return (
                <Elements stripe={stripePromise}> {children}
                        
                </Elements>
        );
};

export default StripeProvider;
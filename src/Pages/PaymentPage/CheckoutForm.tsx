import {
        CardElement,
        useElements,
        useStripe,
      } from "@stripe/react-stripe-js";
      import { useEffect, useState } from "react";
      import useAxiosSecure from "@/components/hooks/useAxiosSecure";
      import { Booking } from "@/Types/BookingInfo";
      import { motion, AnimatePresence } from "framer-motion";
      import Swal from "sweetalert2";
      import { useNavigate } from "react-router-dom";
      
      type Props = { booking: Booking };
      
      const CheckoutForm = ({ booking }: Props) => {
        const stripe = useStripe();
        const elements = useElements();
        const axiosSecure = useAxiosSecure();
        const navigate = useNavigate();
      
        const [clientSecret, setClientSecret] = useState("");
        const [loading, setLoading] = useState(false);
        const [submitted, setSubmitted] = useState(false);
      
        // Get clientSecret on load
        useEffect(() => {
          axiosSecure
            .post("/create-payment-intent", { price: booking.price })
            .then((res) => {
              setClientSecret(res.data.clientSecret);
            });
        }, [booking.price, axiosSecure]);
      
        const handleSubmit = async (e: React.FormEvent) => {
                console.log('çlicked payment1')
          e.preventDefault();
          if (!stripe || !elements) return;
          console.log('çlicked payment')
      
          setLoading(true);
      
          const card = elements.getElement(CardElement);
          if (!card) return;
      
          const { paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
          });
      
          const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod?.id,
          });
      
          if (paymentIntent?.status === "succeeded") {
            await axiosSecure.post("/payments", {
              bookingId: booking._id,
              transactionId: paymentIntent.id,
            });
      
            setSubmitted(true); // trigger exit animation
      
            setTimeout(() => {
              Swal.fire({
                title: "Payment Successful!",
                text: "Your booking has been confirmed.",
                icon: "success",
                confirmButtonText: "Go to My Bookings",
              }).then(() => {
                navigate("/dashboard/my-bookings");
              });
            }, 500);
          } else {
            Swal.fire("Payment Failed", "Something went wrong.", "error");
          }
      
          setLoading(false);
        };
      
        return (
          <AnimatePresence>
            {!submitted && (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-lg mx-auto bg-base-100 p-6 rounded-lg shadow-xl border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h2
                  className="text-xl font-bold text-center mb-4 text-primary"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Complete Your Payment
                </motion.h2>
      
                <div className="space-y-2">
                  <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    Card Information
                  </label>
                  <motion.div
                    className="bg-base-200 p-4 border rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#32325d",
                            fontFamily: "Inter, sans-serif",
                            "::placeholder": {
                              color: "#a0aec0",
                            },
                          },
                          invalid: {
                            color: "#fa755a",
                          },
                        },
                      }}
                    />
                  </motion.div>
                </div>
      
                <motion.button
                  type="submit"
                  disabled={!stripe || !clientSecret || loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn w-full btn-success text-white font-semibold border-none focus:ring-2 focus:ring-green-400 dark:bg-green-500"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    `Pay $${booking.price}`
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        );
      };
      
      export default CheckoutForm;
      
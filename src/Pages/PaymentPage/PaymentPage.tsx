// src/pages/PaymentPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { Booking } from "@/Types/BookingInfo";
import CheckoutForm from "./CheckoutForm";

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const axiosSecure = useAxiosSecure();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (id) {
      axiosSecure.get(`/bookings/${id}`).then((res) => setBooking(res.data));
    }
  }, [id, axiosSecure]);

  if (!booking) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Payment for {booking.packageName}</h2>
      <CheckoutForm booking={booking} />
    </div>
  );
};

export default PaymentPage;

import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  console.log("booking", booking);
  console.log("bookingError", error);

  return { booking, error, isLoading };
}

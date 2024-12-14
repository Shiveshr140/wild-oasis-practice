import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// export function useCheckin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const {
//     mutate: checkin,
//     error,
//     isLoading,
//   } = useMutation({
//     mutationFn: (bookingId) =>
//       updateBooking(bookingId, {
//         status: "checked-in",
//         isPaid: true,
//       }),
//     onSuccess: (data) => {
//       toast.success(`Booking #${data.id} successfully checked in`);
//       queryClient.invalidateQueries({ active: true });
//       navigate("/dashboard");
//     },
//   });

//   return { checkin, isLoading, error };
// }

////************************ add breakfast

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: checkin,
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/dashboard");
    },
  });

  return { checkin, isLoading, error };
}

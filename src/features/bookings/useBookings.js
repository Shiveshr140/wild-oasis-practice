import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

//// in useQuery I have added filter as depedency array to re-fetch the data when click other filters
export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  // Filter
  const filter =
    !filterValue || filterValue === "null"
      ? null
      : { field: "status", value: filterValue };

  // SortBy
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { isLoading, error, bookings };
}

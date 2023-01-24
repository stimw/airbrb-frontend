import { axios } from "@/libs/axios";
import { Listing, ListingDetails, Bookings } from "@/features/listing/types";
import { Schema as CreateHostedListingType } from "@/features/listing/components/CreateForm";

type GetListingsResponse = {
  listings: Listing[];
};

type GetListingDetailsResponse = {
  listing: ListingDetails;
};

export const createHostedListing = (data: CreateHostedListingType) =>
  axios.post("/listings/new", data);

export const deleteHostedListing = (id: number) =>
  axios.delete(`/listings/${id}`);

export const getListings = () =>
  axios.get<GetListingsResponse>("/listings").then((res) => res.data.listings);

export const getListingDetails = (id: number) =>
  axios
    .get<GetListingDetailsResponse>(`/listings/${id}`)
    .then((res) => res.data);

export const updateHostedListing = (
  id: number,
  data: CreateHostedListingType
) => {
  return axios.put(`/listings/${id}`, data);
};

type PublishMutationProps = {
  availability: {
    startDate: string;
    endDate: string;
  }[];
};

export const publishHostedListing = (id: number, data: PublishMutationProps) =>
  axios.put(`/listings/publish/${id}`, data);

export const unpublishHostedListing = (id: number) =>
  axios.put(`/listings/unpublish/${id}`);

export type CreateBooking = {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalPrice: number;
};

export const createBooking = (id: number, data: CreateBooking) =>
  axios.post(`/bookings/new/${id}`, data);

type GetBookingsResponse = {
  bookings: Bookings;
};

export const getBookings = () => axios.get<GetBookingsResponse>("/bookings");

export const deleteBooking = (id: number) => axios.delete(`/bookings/${id}`);

export const acceptBooking = (id: number) =>
  axios.put(`/bookings/accept/${id}`);

export const declineBooking = (id: number) =>
  axios.put(`/bookings/decline/${id}`);

export type Review = {
  review: { user: string; comment: string; rating: number };
};

export const writeReview = (
  bookingId: number,
  listingId: number,
  data: Review
) => axios.put(`/listings/${listingId}/review/${bookingId}`, data);

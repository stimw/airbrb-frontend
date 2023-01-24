export type Listing = {
  id: number;
  title: string;
  owner: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: number;
    country: string;
  };
  thumbnail: {
    dataURL: string;
  }[];
  price: number;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
};

export type Listings = Listing[];

export type ListingDetails = {
  title: string;
  owner: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: number;
    country: string;
  };
  thumbnail: {
    dataURL: string;
  }[];
  price: number;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
  published: boolean;
  postedOn: string;
  availability: {
    startDate: string;
    endDate: string;
  }[];
  metadata: {
    propertyType: string;
    bedrooms: {
      single: number;
      double: number;
      queen: number;
      king: number;
    }[];
    bathrooms: number;
    amenities: {
      wifi: boolean;
      shower: boolean;
      tv: boolean;
      parking: boolean;
      pool: boolean;
      firstAid: boolean;
    };
    images: {
      dataURL: string;
    }[];
  };
};

export type ListingDetailsWithId = ListingDetails & {
  id: number;
};

export type CardProps = {
  listing: ListingDetails;
};

export type Booking = {
  id: number;
  owner: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalPrice: number;
  listingId: string;
  status: string;
};

export type Bookings = Booking[];

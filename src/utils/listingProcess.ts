import { ListingDetailsWithId } from "@/features/listing/types";

export const upperCaseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

type PropertyType = ListingDetailsWithId["metadata"]["propertyType"];
type address = ListingDetailsWithId["address"];
type bedrooms = ListingDetailsWithId["metadata"]["bedrooms"];
type amenities = ListingDetailsWithId["metadata"]["amenities"];
type reviews = ListingDetailsWithId["reviews"];

export const propertyTypeToString = (p: PropertyType) => {
  switch (p) {
    case "apartment":
      return "Apartment";
    case "house":
      return "House";
    case "uniqueSpace":
      return "Unique Space";
  }
  return "";
};

export const amenitiesToArray = (a: amenities) => {
  const amenitiesArray = [];
  if (a.wifi) amenitiesArray.push("Wifi");
  if (a.shower) amenitiesArray.push("Shower");
  if (a.tv) amenitiesArray.push("TV");
  if (a.parking) amenitiesArray.push("Parking");
  if (a.pool) amenitiesArray.push("Pool");
  if (a.firstAid) amenitiesArray.push("First Aid");
  return amenitiesArray;
};

export const addressToString = (address: address) =>
  `${address.street}, ${address.city}, ${address.state} ${address.postcode}, ${address.country}`;

export const addressToStringBySpace = (address: address) =>
  `${address.street} ${address.city} ${address.state} ${address.postcode} ${address.country}`;

export const addressToStringShort = (address: address) =>
  `${address.city}, ${address.state} ${address.postcode}`;

export const bedroomsToString = (bedrooms: bedrooms) => {
  let result = 0;
  bedrooms.forEach((bedroom) => {
    const { single, double, queen, king } = bedroom;
    result += single + double + queen + king;
  });
  return `${bedrooms.length} bedroom${bedrooms.length > 1 ? "s" : ""} · ${
    result > 0 ? `${result} bed${result > 1 ? "s" : ""}` : "beds"
  }`;
};

export const bathsToString = (baths: number) =>
  ` · ${baths} bathroom${baths > 1 ? "s" : ""}`;

export const amenitiesToString = (amenities: amenities) => {
  const result = [];
  if (amenities.wifi) result.push("WiFi");
  if (amenities.tv) result.push("TV");
  if (amenities.shower) result.push("Shower");
  if (amenities.parking) result.push("Parking");
  if (amenities.pool) result.push("Pool");
  if (amenities.firstAid) result.push("First Aid");
  return ` · ${result.join(" · ")}`;
};

export const reviewsAverage = (reviews: reviews) => {
  let result = 0;
  reviews.forEach((review) => {
    result += review.rating;
  });
  return Math.round(result / reviews.length);
};

export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
});

export const checkNumberBetween = (num: number, min: number, max: number) =>
  num >= min && num <= max;

import React from "react";
import ImageGallery from "react-image-gallery";
import { Box } from "@chakra-ui/react";
import { ListingDetails } from "@/features/listing/types";

import "react-image-gallery/styles/css/image-gallery.css";
import "./ImageView.css";

type Props = {
  listing: ListingDetails;
};

type Images = {
  original: string;
  thumbnail: string;
}[];

export const ImageView = (props: Props) => {
  const { listing } = props;
  const images: Images = [];
  images.push({
    original: listing.thumbnail[0].dataURL,
    thumbnail: listing.thumbnail[0].dataURL,
  });
  if (listing.metadata.images) {
    listing.metadata.images.forEach((image) => {
      images.push({
        original: image.dataURL,
        thumbnail: image.dataURL,
      });
    });
  }

  return (
    <Box
      alignSelf="center"
      border="1px"
      borderColor="gray.100"
      p={2}
      borderRadius="2xl"
      w="100%"
    >
      <ImageGallery
        items={images}
        thumbnailPosition="bottom"
        showFullscreenButton={false}
      />
    </Box>
  );
};

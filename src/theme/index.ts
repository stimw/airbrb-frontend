import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    fonts: {
      heading: `Nunito, sans-serif`,
      body: `Nunito, sans-serif`,
    },
    colors: {
      brand: {
        50: "#ffd7de",
        100: "#ffc4ce",
        200: "#ffaebc",
        300: "#ff93a7",
        400: "#ff718b",
        500: "#ff395d",
        600: "#cb2d49",
        700: "#791b2c",
        800: "#400c17",
        900: "#1b0207",
      },
    },
    styles: {
      global: {
        body: {
          color: "gray.800",
        },
      },
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    components: {
      Input: {
        defaultProps: {
          focusBorderColor: "brand.400",
        },
      },
      NumberInput: {
        defaultProps: {
          focusBorderColor: "brand.400",
        },
      },
      Text: {
        defaultProps: {
          color: "gray.600",
        },
      },
      Select: {
        defaultProps: {
          focusBorderColor: "brand.400",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);

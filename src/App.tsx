import { AppRoutes } from "@/routes";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme";
import tokenHandler from "@/utils/tokenHandler";
import { atom } from "jotai";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";

import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const queryClient = new QueryClient({
  // queryCache: new QueryCache({
  //   onError: (error) => popErrorToast("error"),
  // }),
  // mutationCache: new MutationCache({
  //   onError: (error) => console.log("queryclient error"),
  // }),
});

export const isLoginAtom = atom(tokenHandler.getToken().token !== null);
export const loginAtom = atom(null, (get, set) => {
  set(isLoginAtom, true);
});

export const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools /> */}
          <ScrollToTop
            smooth
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bottom: "80px",
              right: "20px",
            }}
            component={<IoIosArrowUp size={30} />}
          />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
};

export default App;

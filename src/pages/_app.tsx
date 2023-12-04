import { ApiError } from "@/apis";
import { Authenticator, ModalProvider } from "@/components";
import { modalStore } from "@/stores";
import "@/styles/globals.css";
import {
  ChakraProvider,
  baseTheme,
  createStandaloneToast,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

const { ToastContainer, toast } = createStandaloneToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (!(error instanceof ApiError) || query.meta?.ignoreError) return;
      modalStore.getState().openAlert({
        title: "Error",
        content: error.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      if (!mutation.meta?.successMessage) return;
      toast({
        title: "Success",
        description: mutation.meta.successMessage,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error, variables, context, mutation) => {
      if (!(error instanceof ApiError) || mutation.meta?.ignoreError) return;
      toast({
        title: "Failed",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  }),
});

const theme = extendTheme(
  {
    colors: {
      primary: baseTheme.colors.teal,
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <Authenticator />
        <ModalProvider />
        <ToastContainer />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

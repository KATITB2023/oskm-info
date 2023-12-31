import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { MapProvider } from "react-map-gl";
import { api } from "~/utils/api";
import theme from "~/styles/theme";
import Fonts from "~/styles/fonts";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <Fonts />
      <ChakraProvider theme={theme}>
        <MapProvider>
          <Component {...pageProps} />
        </MapProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

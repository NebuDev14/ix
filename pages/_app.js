import "../styles/globals.css";

import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <div className="content">
          {Component.Layout ? (
            <Component.Layout>
              <Component {...pageProps} />
            </Component.Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;

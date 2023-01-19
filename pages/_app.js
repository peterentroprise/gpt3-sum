import Head from "next/head";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Retrieve GPT3 Demo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;

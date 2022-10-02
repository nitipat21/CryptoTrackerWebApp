import { Html, Head, Main, NextScript } from 'next/document';
import { GoogleFonts } from "next-google-fonts";

export default function Document() {
  return (
    <Html>
      <Head>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
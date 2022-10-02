import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/free-brands-svg-icons'
import '@fortawesome/free-regular-svg-icons'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  useEffect(()=>{
    setPageLoaded(true);
  },[])

  return pageLoaded ? <Component {...pageProps} /> : null;
}

export default MyApp

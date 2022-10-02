import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/free-brands-svg-icons'
import '@fortawesome/free-regular-svg-icons'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import { wrapper } from '../store/store';
import { Provider } from "react-redux";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  const { store, props } = wrapper.useWrappedStore(pageProps);
  
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  useEffect(()=>{
    setPageLoaded(true);
  },[])

  return pageLoaded ?
  <Provider store={store}>
    <Component {...props.pageProps} />
  </Provider> 
  : null;
}

export default MyApp;

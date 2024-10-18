import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import client from '../client';
import '@/styles/globals.css';
import '../styles/shared.module.css';
import '../styles/layout.css';
import '../styles/custom-properties.css';
import LoadingSpinner from '@/components/Loading';

const siteConfigQuery = `
  *[_type == "site-config"] {
    ...,
    logo {asset->{extension, url}},
    pageIcon {asset->{extension, url}},
    mainNavigation {
      ...,
      navItens[] -> {
        ...,
      },
      socialLinks[] {
        ...,
        socialLogo {asset->{extension, url}}
      },
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
`

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeComplete);

    // Stop loading when component is mounted
    setLoading(false);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <Component {...pageProps} />
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // Add site config from sanity
  const config = await client.fetch(siteConfigQuery);
  if (config) {
    pageProps.config = config;
  }
  return { pageProps };
};

export default App;

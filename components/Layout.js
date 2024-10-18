import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import GoogleAnalytics from "@/components/GoogleAnalytics";
import {LogoJsonLd} from 'next-seo'
import {TailwindIndicator} from '@/components/TailwindIndicator'
import Header from './Header'
import Footer from './Footer'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from "next/router";
import { SpeedInsights } from '@vercel/speed-insights/react'

function Layout(props) {
  const router = useRouter()
  const {config, children} = props

  if (!config) {
    console.error('Missing config')
    return <div>Missing config</div>
  }

  const {title, mainNavigation, footerNavigation, footerText, logo, url, pageIcon} = config
  const logoUrl = logo && logo.asset && logo.asset.url
  const pageIconUrl = pageIcon && pageIcon.asset && pageIcon.asset.url
  const navItems = useMemo(() => mainNavigation.navItens.map((item) => item), [mainNavigation.navItens])
  const socialLinks = useMemo(() => mainNavigation.socialLinks.map((item) => ({
    url: item.url,
    title: item.title.toUpperCase(),
    urlLogo: item.socialLogo && item.socialLogo.asset && item.socialLogo.asset.url,
  })), [mainNavigation])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, viewport-fit=cover" />
        <meta charSet="utf-8" />
        <link rel="icon" href={pageIconUrl ? pageIcon.asset.url : '/logo.png'} type="image/x-icon" />
      </Head>
        <div className="container" style={{paddingLeft: 0, paddingRight: 0}}>
          <Header title={title} navItems={navItems} socialLinks={socialLinks} logo={logo} />
            <div className="content bg-[#46295a] bg-stripe-gradient">{children}</div>
          <Footer navItems={footerNavigation} text={footerText} />
          {logoUrl && url && <LogoJsonLd url={url} logo={logoUrl} />}
        </div>
      {process.env.NODE_ENV === 'development' ? (
        <>
          <TailwindIndicator />
        </>
      ) : (
        <>
          <Analytics mode='production' framework='next'/>
          <GoogleAnalytics />
          <SpeedInsights route={router.pathname} />
        </>
      )}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  config: PropTypes.shape({
    title: PropTypes.string,
    mainNavigation: PropTypes.shape({
      navItens: PropTypes.arrayOf(PropTypes.object),
    }),
    footerNavigation: PropTypes.arrayOf(PropTypes.object),
    footerText: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    url: PropTypes.string,
  }),
}

export default Layout

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {withRouter} from 'next/router'
import SVG from 'react-inlinesvg'
import styles from './Header.module.css'
import HamburgerIcon from './icons/Hamburger'
import {getPathFromSlug, slugParamToPath} from '../utils/urls'
import backgroundImageHeader from '../public/background-image-header.jpg'
import Image from 'next/image'

// prints "/_next/static/media/file.a9727b5d.txt"

class Header extends Component {
  state = {showNav: false, backgroundImage: ''}

  static baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin

  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.shape({
        slug: PropTypes.string,
      }),
      events: PropTypes.any,
    }),
    title: PropTypes.string,
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.arrayOf(PropTypes.string),
        hash: PropTypes.shape({
          hashField: PropTypes.shape({
            field: PropTypes.string,
            value: PropTypes.string,
          }),
        }),
      })
    ),
    socialLinks: PropTypes.arrayOf(
      PropTypes.shape({url: PropTypes.string, title: PropTypes.string, urlLogo: PropTypes.string})
    ),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
      logo: PropTypes.string,
    }),
  }

  componentDidMount() {
    const {router} = this.props
    router.events.on('routeChangeComplete', this.hideMenu)
  }

  componentWillUnmount() {
    const {router} = this.props
    router.events.off('routeChangeComplete', this.hideMenu)
  }

  hideMenu = () => {
    this.setState({showNav: false})
  }

  handleMenuToggle = () => {
    const {showNav} = this.state
    this.setState({
      showNav: !showNav,
    })
  }

  renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={logo.asset.url} className={styles.logo} />
    }

    return <img src={logo.asset.url} alt={logo.title} className={styles.logo} />
  }

  render() {
    const {title = 'Missing title', navItems, router, logo, socialLinks} = this.props
    const {showNav} = this.state

    this.backgroundImage = new URL(`${backgroundImageHeader.src}`, Header.baseUrl).href

    return (
      <div className={styles.wrapper} style={{backgroundImage: `url(${this.backgroundImage})`}}>
        <div className={styles.root} data-show-nav={showNav}>
          <h1 className={styles.branding}>
            <Link href={'/'}>
              <a title={title}>{this.renderLogo(logo)}</a>
            </Link>
          </h1>
          <nav className={styles.nav}>
            <ul className={styles.navItems}>
              <ul className={styles.socialItems}>
              {socialLinks &&
                socialLinks.map((item) => (
                  <li key={item.title} className={styles.socialItem}>
                    <a href={item.url} target="_blank">
                      <Image
                        width={24}
                        height={24}
                        src={item.urlLogo}
                        alt={item.title}
                      />
                    </a>
                  </li>
                ))}
              </ul>
              {navItems &&
                navItems.map((item) => {
                  const {slug, title, _id, hash} = item
                  const linkFields = {
                    titleField:
                      hash && hash.hashField.field && hash.hashField.value
                        ? hash.hashField.field
                        : title,
                    isActive: slug ? slugParamToPath(router.query.slug) === slug.current : false,
                    href:
                      hash && hash.hashField.field && hash.hashField.value
                        ? hash.hashField.value
                        : getPathFromSlug(slug.current),
                  }
                  const {titleField, href, isActive} = linkFields
                  const titleCapsLock = titleField.toUpperCase()
                  return (
                    <li key={_id} className={styles.navItem} onClick={this.hideMenu}>
                      <Link href={href}>
                        <a data-is-active={isActive ? 'true' : 'false'} aria-current={isActive}>
                          {titleCapsLock}
                        </a>
                      </Link>
                    </li>
                  )
                })}
            </ul>
            <button className={styles.showNavButton} onClick={this.handleMenuToggle}>
              <HamburgerIcon className={styles.hamburgerIcon} strokeColor="black" />
            </button>
          </nav>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)

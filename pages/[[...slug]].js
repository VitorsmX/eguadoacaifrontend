import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import {NextSeo} from 'next-seo'
import PropTypes from 'prop-types'
import React from 'react'

import client from '../client'
import Layout from '../components/Layout'
import RenderSections from '../components/RenderSections'
import {getSlugVariations, slugParamToPath} from '../utils/urls'

const pageFragment = groq`
...,
content[] {
  ...,
  _type == "testimonials" => {
      testimonials[]{
          ...,
          video{
            asset->{
              extension,
              url
            }
          }
        }
      },
  _type == "videoSection" => {
    ...,
    video{
      asset->{
        extension,
        url
      }
    }  
  },
  cta {
    ...,
    route->
  },
  ctas[] {
    ...,
    route->
  }
}`

/**
 * Fetches data for our pages.
 *
 * The [[...slug]] name for this file is intentional - it means Next will run this getServerSideProps
 * for every page requested - /, /about, /contact, etc..
 * From the received params.slug, we're able to query Sanity for the route coresponding to the currently requested path.
 */
export const getServerSideProps = async ({params}) => {
  try {
    const slug = slugParamToPath(params?.slug)
    let data

    if (slug === '') {
      data = await client
        .fetch(
          groq`
          *[_type == "site-config"][0]{
            frontpage -> {
              ${pageFragment}
            }
          }
        `
        )
        .then((res) => (res?.frontpage ? {...res.frontpage, slug} : undefined))
    } else {
      data = await client
        .fetch(
          groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
            page-> {
              ${pageFragment}
            }
          }`,
          {possibleSlugs: getSlugVariations(slug)}
        )
        .then((res) => (res?.page ? {...res.page, slug} : undefined))
    }

    return {
      props: data || {},
    }
  } catch (error) {
    console.error('Erro ao coletar dados da página:', error)
    return {
      notFound: true,
    }
  }
}

const builder = imageUrlBuilder(client)

const LandingPage = (props) => {
  const {
    title = 'Missing title',
    description,
    disallowRobots,
    openGraphImage,
    content = [],
    config = {},
    slug,
  } = props

  const openGraphImages = openGraphImage
    ? [
        {
          url: builder.image(openGraphImage).width(800).height(600).url(),
          width: 800,
          height: 600,
          alt: title,
        },
        {
          // Facebook recommended size
          url: builder.image(openGraphImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          // Square 1:1
          url: builder.image(openGraphImage).width(600).height(600).url(),
          width: 600,
          height: 600,
          alt: title,
        },
      ]
    : []

  return (
    <Layout config={config}>
      <NextSeo
        title={config.siteTitle}
        titleTemplate={`${config.siteTitle}`}
        description={description}
        canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: openGraphImages,
        }}
        noindex={disallowRobots}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  )
}

LandingPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  disallowRobots: PropTypes.bool,
  openGraphImage: PropTypes.any,
  content: PropTypes.any,
  config: PropTypes.any,
}

export default LandingPage

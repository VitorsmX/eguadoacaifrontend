import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2021-03-25',
})

export default client

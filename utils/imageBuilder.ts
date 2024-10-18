import client from '@/client'
import imageUrlBuilder from '@sanity/image-url'
import buildUrlWithSize from './buildUrlWithSize'
import buildUrlPerDefault from './buildUrlPerDefault'
type ImageFormat = 'jpg' | 'pjpg' | 'png' | 'webp'

function imageBuilder(source: string, width?: number, height?: number, format?: ImageFormat) {
  const sizeResolver =
    (!width && !height) || !width || !height
      ? {
          widthResolved: 1000,
          heightResolved: 1000,
        }
      : {
          widthResolved: width,
          heightResolved: height,
        }

  let imageUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHNJREFUKFOdkLEKwCAMRM/JwUFwdPb/v8RPEDcdBQcHJyUt0hQ6hGY6Li8XEhVjXM45aK3xVXNOtNagcs6LRAgB1toX23tHSgkUpEopyxhzGRw+EHljjBv03oM3KJYP1lofkJoHJs3T/4Gi1aJjxO+RPnwDur2EF1gNZukAAAAASUVORK5CYII='

  let formatResolver = format || 'webp'

  const imageBuilder = imageUrlBuilder(client)

  const url =
    source && width
      ? buildUrlWithSize(
          source,
          formatResolver,
          imageBuilder,
          sizeResolver.widthResolved,
          sizeResolver.heightResolved
        )
      : buildUrlPerDefault(source, formatResolver, imageBuilder)

  imageUrl = url

  return imageUrl
}

export default imageBuilder

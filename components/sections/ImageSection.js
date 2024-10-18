import React, {memo} from 'react'
import PropTypes from 'prop-types'
import styles from './ImageSection.module.css'
import SimpleBlockContent from '../SimpleBlockContent'
import Cta from '../Cta'
import imageBuilder from '@/utils/imageBuilder'
import Image from 'next/image'

const ImageSection = memo((props) => {
  const {heading, label, text, image, cta} = props

  if (!image) {
    return null
  }

  const imageUrl = imageBuilder(image, 2000, 1000, "png")

  return (
    <div className={styles.root}>
      <figure className={styles.content}>
      <a href={cta?.link}>
        <Image
          src={imageUrl}
          alt={`${heading}`}
          width={2000}
          height={1000}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHNJREFUKFOdkLEKwCAMRM/JwUFwdPb/v8RPEDcdBQcHJyUt0hQ6hGY6Li8XEhVjXM45aK3xVXNOtNagcs6LRAgB1toX23tHSgkUpEopyxhzGRw+EHljjBv03oM3KJYP1lofkJoHJs3T/4Gi1aJjxO+RPnwDur2EF1gNZukAAAAASUVORK5CYII="
          loading="lazy"
          objectFit="contain"
          className={styles.image}
        />
        </a>
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.captionBox}>
              <div className={styles.label}>{label}</div>
              <h2 className={styles.title}>{heading}</h2>
              {text && <SimpleBlockContent blocks={text} />}
              {cta && cta.route && <Cta {...cta} />}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  )
})

ImageSection.displayName = 'ImageSection'

ImageSection.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.array,
  image: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  backgroundImage: PropTypes.string,
  tagline: PropTypes.string,
  cta: PropTypes.object,
}

export default ImageSection

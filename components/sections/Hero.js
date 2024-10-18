import { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './Hero.module.css'
import SimpleBlockContent from '../SimpleBlockContent'
import Cta from '../Cta'
import imageBuilder from '@/utils/imageBuilder'

const Hero = memo((props) => {
  if(!props || !props.heading) {
    return null
  }
  const {heading, backgroundImage, tagline, ctas} = props
  console.log(heading)

  const style = backgroundImage
    ? {
        backgroundImage: `url("${imageBuilder(backgroundImage, 1600, 1500, "jpg")}")`,
      }
    : {}

  return (
    <div id="Inicio" className={styles.root} style={style}>
      <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>{heading}</h1>
        <div className={styles.tagline}>{tagline && <SimpleBlockContent blocks={tagline} />}</div>
        {ctas && (
          <div className={styles.ctas}>
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  )
})

Hero.displayName = "Hero"

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  tagline: PropTypes.array,
  ctas: PropTypes.arrayOf(PropTypes.object),
}

export default Hero

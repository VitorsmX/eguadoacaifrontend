import PropTypes from 'prop-types'
import ScrollingLogos from '../ScrollingLogos'
import styles from '@/components/sections/Brands.module.css'
import {memo, useEffect} from 'react'

const Brands = memo((props) => {

  useEffect(() => {
    const textElement = document.querySelector('.text-reflex');
    textElement.addEventListener('mouseenter', () => {
      const reflexElement = document.createElement('div');
      reflexElement.classList.add('reflex');
      textElement.appendChild(reflexElement);
    })

    textElement.addEventListener('mouseleave', () => {
      const reflexElement = document.querySelector('.reflex');
      reflexElement.remove();
    })
  }, []);

  const {headingBrands, imageList} = props
  const headingText = headingBrands ? headingBrands.toUpperCase() : 'Marcas'
  return (
    <div className={styles.root}>
    <div className={styles.title}>
      <div className={styles.textReflex}>
        <h1 className={'text-reflex'}>{headingText}</h1>
      </div>
    </div>
      <ScrollingLogos imagesList={imageList}/>
    </div>
  )
})

Brands.displayName = "Brands"
Brands.propTypes = {}

export default Brands;
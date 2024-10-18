import React, {memo, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import styles from './Promotions.module.css'
import imageBuilder from '@/utils/imageBuilder'
import Image from 'next/image'
import Cta from '../Cta'
import ZoomModal from '../ZoomModal'
import ServicesCarousel from './Services'

const Promotions = memo((props) => {
  const {title, products, cta} = props
  const productsResolved = useMemo(() => products && products._type === 'promotionProduct' ? products : products.filter(product => product._type === 'promotionProduct').map(product => ({...product, _type: 'promotionProduct'}) ), [products]) 
  const titleServices = props?.titleServices || 'Facilidades/ Serviços'
  const serviceCards = props.products.filter(service => service.titleService && service.descriptionService && service.imageService?.asset?._ref).map((service) => {
    return(
      {
        title: service.titleService,
        description: service.descriptionService,
        image: service.imageService?.asset?._ref,
        cta: service.ctaService
      }
    )
  })
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (product) => {
    setIsOpen(true)
    setSelectedProduct(product)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedProduct(null)
  }

  const nextImageSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length)
  }

  const prevImageSlide = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length
    )
  }

  const nextProductSlide = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % productsResolved.length)
  }

  const prevProductSlide = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex - 1 + productsResolved.length) % productsResolved.length)
  }

  const currentProduct = productsResolved[currentProductIndex]
  const imageUrls = useMemo(() => {
    return currentProduct.images.map((image) => imageBuilder(image.asset._ref, 1000, 1000, 'png'))
  }, [currentProduct])
  const imageUrl = (isOpen && selectedProduct) ? imageBuilder(selectedProduct.images[currentImageIndex].asset._ref, 2000, 2000, 'png') : ''

  return (
    <div className={styles.promotionsContainer} id='promotions1'>
      <h1 className={styles.promotionsTitle}>{title}</h1>
      <div className="relative w-full flex justify-center items-center">
        {currentProduct && (
          <div
            className="flex flex-col items-center justify-center border border-solid border-gray-400 bg-[#4b3650] rounded-lg overflow-hidden shadow-md w-64 cursor-pointer hover:scale-[1.02] transition-all duration-500 px-6 flex-grow-[0.3] text-gray-200"
            onClick={() => openModal(currentProduct)}
          >
          <div className='flex justify-center bg-white p-4 w-full h-fit'>
            <div className="relative w-64 h-64">
              <Image
                src={imageUrls[0]}
                alt={currentProduct.productName}
                layout="fill"
                className="object-contain"
              />
            </div>
          </div>
            <div className="p-4 flex flex-col">
              <h2 className="text-xl font-bold mb-2">{currentProduct.productName}</h2>
              <p className="text-gray-200 mb-4">{currentProduct.description}</p>
              <p className="text-lg font-semibold text-green-400">
                <strong>Preço:</strong> R$ {currentProduct.price}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={prevProductSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-5 rounded-full shadow-md font-bold text-3xl text-black"
        >
          ‹
        </button>
        <button
          onClick={nextProductSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-5 rounded-full shadow-md font-bold text-3xl text-black"
        >
          ›
        </button>
      </div>
      {isOpen && selectedProduct && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center items-center w-full h-64 text-white">
              {selectedProduct.images.length > 1 && (
                <button
                  onClick={prevImageSlide}
                  className="flex items-center justify-center absolute left-16 sm:left-96 top-[30%] transform -translate-y-1/2 bg-white p-5 text-2xl leading-none rounded-full shadow-md text-center text-black"
                >
                  ‹
                </button>
              )}
              <ZoomModal
                src={imageUrl}
                alt={selectedProduct.title}
              />
              {console.log(selectedProduct.images.length)}
              {selectedProduct.images.length > 1 && (
                <button
                  onClick={nextImageSlide}
                  className="flex items-center justify-center absolute right-16 sm:right-96 top-[30%] transform -translate-y-1/2 bg-white p-5 text-2xl leading-none rounded-full shadow-md text-center text-black"
                >
                  ›
                </button>
              )}
            </div>
            <h2 className={styles.selectedProductName + " text-center"}>{selectedProduct.productName}</h2>
            <div className={styles.productSupplier}>
              <a
                href={
                  selectedProduct.supplier.contact.includes('http://www.') ||
                  selectedProduct.supplier.contact.includes('https://www.')
                    ? selectedProduct.supplier.contact
                    : 'https://www.' + selectedProduct.supplier.contact
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedProduct.supplier.name}
              </a>
            </div>
            {selectedProduct.category &&
              selectedProduct.category.map((categoryItem, index) => (
                <p className={styles.productCategory} key={index}>
                  {categoryItem}
                </p>
              ))}
            <p className={styles.productDescription}>{selectedProduct.description}</p>
            <p className='text-green-500'>
              <strong className='text-green-400'>Preço:</strong> R$ {selectedProduct.price}
            </p>
            <button className={styles.closeBtn} onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
      {serviceCards && serviceCards.length > 0 && (
        <ServicesCarousel title={titleServices} services={serviceCards} />
      )}
      {cta && <Cta {...cta} />}
    </div>
  )
})

Promotions.displayName = 'Promotions'

Promotions.propTypes = {}

export default Promotions

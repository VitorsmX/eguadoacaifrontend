// components/TestimonialsSection.jsx
import React, {memo} from 'react'
import propTypes from 'prop-types'
import VideoPlayer from '../VideoPlayer'

const Testimonials = memo((props) => {
  if (!props || !props.testimonials) {
    return null
  }

//   const player = new Plyr('#player', {
//     controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
//     disableContextMenu: true
// });

  const {title, subtitle, testimonials} = props

  return (
    <section className="py-16">
      <div className="container w-5/6 mx-auto text-center">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {subtitle && <p className="text-xl mb-8">{subtitle}</p>}
        <div className="grid grid-cols-1 gap-8">
          {testimonials &&
            testimonials.length > 0 &&
            testimonials.map((testimonial) => {
              return (
                <div
                  key={testimonial._key}
                  className="flex flex-col justify-center items-center bg-[#351947c0] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                
                  <VideoPlayer videoUrl={ testimonial.video.asset.url } />
                  <p className="text-lg italic mb-2 mx-5">{testimonial.preview}</p>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-300">{testimonial.knownFor}</p>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'

Testimonials.propTypes = {
  props: propTypes.shape({
    title: propTypes.string,
    subtitle: propTypes.string,
    testimonials: propTypes.arrayOf(
      propTypes.shape({
        _key: propTypes.string,
        name: propTypes.string,
        knownFor: propTypes.string,
        preview: propTypes.string,
        video: propTypes.shape({
          thumbnail: propTypes.string,
        }),
      })
    ),
  }),
}

export default Testimonials

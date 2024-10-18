import React, {memo, useMemo} from 'react'
import PropTypes from 'prop-types'
import Cta from '../Cta'
import imageBuilder from '@/utils/imageBuilder'
import VideoPlayer from '../VideoPlayer'

const VideoSection = memo((props) => {
  const {heading, label, video, preview, cta} = props

  if (!video) {
    return null
  }

  const videoUrl = video.asset.url
  const previewImageUrl = useMemo(() => imageBuilder(preview.asset._ref, 1200, 800, 'png'), [preview.asset._ref])

  return (
    <section className='py-5 bg-[#4d295eb6] bg-stripe-gradient backdrop-blur-md shadow-xl'>
    <div className="flex flex-col justify-center items-center w-full gap-y-7 mb-5 pb-4 rounded-lg">
      <div className="flex flex-col w-full justify-center items-center gap-y-5 p-3">
        {heading && <h2 className="text-3xl font-bold">{heading}</h2>}
        {label && <div className="text-xl font-extralight">{label}</div>}
        <VideoPlayer videoUrl={videoUrl} thumbnail={previewImageUrl} />
      </div>
      {cta && <Cta {...cta} />}
    </div>
    </section>
  )
})

VideoSection.displayName = 'VideoSection'

VideoSection.propTypes = {}

export default VideoSection

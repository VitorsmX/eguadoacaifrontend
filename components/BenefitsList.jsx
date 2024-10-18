import imageBuilder from '@/utils/imageBuilder'
import Image from 'next/image'
import {memo} from 'react'

const BenefitsList = memo(({benefitsList = []}) => {
  return (
    <>
      {benefitsList.map((item, index) => {
        const imageUrl = imageBuilder(item.icon.asset._ref, 200, 200, 'jpg')
        return (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center justify-center space-x-8 bg-[#462e53] p-6 rounded-lg shadow-md h-fit max-h-[300px] hover:scale-[1.02] transition-all duration-300"
          >
            <Image
              src={imageUrl}
              alt={`Item ${index + 1}: ${item.title}`}
              width={150}
              height={150}
              placeholder='blur'
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHNJREFUKFOdkLEKwCAMRM/JwUFwdPb/v8RPEDcdBQcHJyUt0hQ6hGY6Li8XEhVjXM45aK3xVXNOtNagcs6LRAgB1toX23tHSgkUpEopyxhzGRw+EHljjBv03oM3KJYP1lofkJoHJs3T/4Gi1aJjxO+RPnwDur2EF1gNZukAAAAASUVORK5CYII="
              loading="lazy"
              objectFit="contain"
              className="w-32 h-32 rounded-lg m-3"
            />
            <div className="flex flex-col gap-y-3">
              <h2 className="text-2xl">{item.title}</h2>
              <p className="text-lg">{item.description}</p>
            </div>
          </div>
        )
      })}
    </>
  )
})

BenefitsList.displayName = 'BenefitsList'
export default BenefitsList

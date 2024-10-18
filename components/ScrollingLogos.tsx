import Image from "next/image";
import Marquee from "react-fast-marquee";
import styles from './sections/Brands.module.css'
import { memo, useMemo, useState } from "react";
import imageBuilder from "@/utils/imageBuilder";

const ScrollingLogos = memo((images: { imagesList: any }) => {

  const [sizeShadow, setSizeShadow] = useState(0)

  const { imagesList } = images

  const imageUrls = useMemo(() => imagesList
    ? imagesList.map((image: any) => imageBuilder(image.asset._ref, 120, 120, 'png'))
    : [], [imagesList])

  return (
  <section className={`flex items-center justify-center mx-auto w-4/5 md:max-w-4xl lg:max-w-7xl px-0 md:px-6 lg:px-8 py-10` + ` ${styles.scroller}`} style={{boxShadow: `0 0 ${sizeShadow || 0}px 0 rgba(0, 0, 0, 0.7) inset`, transition: "all 0.5s ease-in-out"}} onMouseEnter={() => setSizeShadow(15)} onMouseLeave={() => setSizeShadow(0)}>
      <Marquee direction="left" autoFill speed={17} pauseOnHover>
        {imageUrls.map((image: any, index: number) => {
          return (
          <div className="mx-6 text-gray-500" key={index}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', width: '100px', height: '100px' }}>
              <Image
              src={image}
              alt={`Item ${index + 1}: "Marca famosa"`}
              width={150}
              height={150}
              placeholder='blur'
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHNJREFUKFOdkLEKwCAMRM/JwUFwdPb/v8RPEDcdBQcHJyUt0hQ6hGY6Li8XEhVjXM45aK3xVXNOtNagcs6LRAgB1toX23tHSgkUpEopyxhzGRw+EHljjBv03oM3KJYP1lofkJoHJs3T/4Gi1aJjxO+RPnwDur2EF1gNZukAAAAASUVORK5CYII="
              loading="lazy"
              objectFit="contain"
              className="bg-white border border-gray-500"
            />
            </div>
          </div>
          )
        })}
      </Marquee>
    </section>
  );
});

ScrollingLogos.displayName = "ScrollingLogos"
export default ScrollingLogos;

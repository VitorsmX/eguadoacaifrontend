import { ImageUrlBuilder as BuilderType } from "@sanity/image-url/lib/types/builder";

type ImageFormat = 'jpg' | 'pjpg' | 'png' | 'webp';
const buildUrlWithSize = (sourceRef: string, formatRef: ImageFormat, builderRef: BuilderType, widthRef?: number, heightRef?: number) => {
    return (widthRef && heightRef && builderRef) &&
    builderRef.image(sourceRef)
    .width(widthRef)
    .height(heightRef)
    .format(formatRef)
    .quality(100)
    .crop("center")
    .fit("fill")
    .url() || ""
}

export default buildUrlWithSize;
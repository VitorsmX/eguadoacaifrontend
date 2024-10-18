import { ImageUrlBuilder as BuilderType } from "@sanity/image-url/lib/types/builder";
type ImageFormat = 'jpg' | 'pjpg' | 'png' | 'webp';
const buildUrlPerDefault = (sourceRef: string, formatRef: ImageFormat, builderRef:BuilderType) => {
    return (builderRef) && builderRef
    .image(sourceRef)
    .format(formatRef)
    .quality(100)
    .crop("center")
    .fit("fill")
    .url()
}

export default buildUrlPerDefault;
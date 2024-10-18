import { buildFileUrl } from '@sanity/asset-utils';

export const fileBuilder = (assetRef) => {
    const assetId = /(file|asset)-(.*)-(mp4|avi|mkv)/.exec(assetRef)[2];
    const extension = /(file|asset)-(.*)-(mp4|avi|mkv)/.exec(assetRef)[3];
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "123456"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
    return buildFileUrl({assetId, extension}, {projectId, dataset});
};

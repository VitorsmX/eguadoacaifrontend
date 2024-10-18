import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, thumbnail }) => {
  return (
    <div className="w-fit max-sm:h-[60vh] sm:h-96 min-w-[33%] max-sm:min-w-[80%] rounded-lg mb-4" onContextMenu={(e) => e.preventDefault()}>
      <ReactPlayer 
        url={videoUrl} 
        controls
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            }
          }
        }}
        light={`${thumbnail || '/images/video-thumb.png'}`}
        className="rounded-lg w-56 object-contain"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;

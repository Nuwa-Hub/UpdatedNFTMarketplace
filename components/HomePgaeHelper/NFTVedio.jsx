import React, { useEffect, useRef } from "react";

const NFTVedio = () => {
  const videoRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      videoRef.current.play();
    }, 200);
  }, []);

  return (
    <div className="flex items-center justify-center max-h-screen h-24 sm:h-screen">
      <video
        ref={videoRef}
        src="https://firebasestorage.googleapis.com/v0/b/marketplace2-1c44b.appspot.com/o/vedio1.mp4?alt=media&token=7dea5623-9f00-492c-8be2-dd79f8742867"
        className="w-full h-screen"
        autoplay
        muted={false}
        loop
      />
    </div>
  );
};

export default NFTVedio;

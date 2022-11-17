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
        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/vedio1.mp4?alt=media&token=d3b69aa1-f0a2-4f3b-abb8-de28d69f24e1"
        className="w-full h-screen"
        autoplay
        muted
        loop
      />
    </div>
  );
};

export default NFTVedio;

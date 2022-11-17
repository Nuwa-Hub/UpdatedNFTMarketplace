import React, { useEffect, useRef } from "react";

const MarketVedio = () => {
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
        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/vedio2.mp4?alt=media&token=0a31867b-fee9-4570-a471-e2e091bc5d25"
        className="w-full h-screen"
        autoplay
        muted
        loop
      />
    </div>
  );
};

export default MarketVedio;

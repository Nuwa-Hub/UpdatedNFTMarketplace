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
        src="https://firebasestorage.googleapis.com/v0/b/marketplace2-1c44b.appspot.com/o/vedio2.mp4?alt=media&token=a07e9d4b-1569-4fbe-b2de-43da358e860e"
        className="w-full h-screen"
        autoplay
        muted
        loop
      />
    </div>
  );
};

export default MarketVedio;

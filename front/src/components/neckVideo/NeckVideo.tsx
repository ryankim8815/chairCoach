import React, { useRef, useEffect,useState } from "react";
import * as S from "./NeckVideoStyle";
const NeckVideo = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          let video: any = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((e: any) => {
          console.log(e);
        });
    };
    useEffect(() => {
      getVideo();
    }, [videoRef]);
  return (
    <div>
      <S.CameraCont ref={videoRef}>
    
    </S.CameraCont>;
    </div>
  )
}

export default NeckVideo






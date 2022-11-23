import React, { useRef, useEffect, useState } from "react";
import * as S from "./NeckVideoStyle";
const NeckVideo = ({ time,step,setStep }: any) => {
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

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo: any = photoRef.current;
    console.log(video);
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(()=>{
    takePhoto()
  },[step])

  return (
    <div>
     

      <S.CameraCont onClick={takePhoto} ref={videoRef}></S.CameraCont>
      <canvas ref={photoRef} /> 
    </div>
  );
};

export default NeckVideo;

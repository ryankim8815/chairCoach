import React, { useRef, useEffect, useState } from "react";
import * as S from "./NeckInspectionStyle";
const NeckInspection = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [time, setTime] = useState(5);

  const startTimer = () => {
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer)
    }, 5000);
  };

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
    <S.InspectionLayout>
      <S.UpperCont>

      <S.OutTimer>
        <S.InnerTimer>
          <S.Title>{time}</S.Title>
        </S.InnerTimer>
      </S.OutTimer>
      <S.Btn onClick={()=>{
        startTimer();
      }}>촬영 시작</S.Btn>
      </S.UpperCont>
     

      <S.MainCont>
        <S.ImgCont />
        <S.CameraCont ref={videoRef}></S.CameraCont>
      </S.MainCont>
    </S.InspectionLayout>
  );
};

export default NeckInspection;

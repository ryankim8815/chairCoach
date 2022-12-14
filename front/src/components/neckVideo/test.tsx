import { useRef, useEffect, useState } from "react";
import * as S from "./NeckVideoStyle";
import * as Api from "../../api/api";
import axios from "axios";
import {drawKeypoints, drawSkeleton} from '../../pages/aiStretching/util';
import * as posenet from "@tensorflow-models/posenet";
import * as poseDetection from "@tensorflow-models/pose-detection";

require("@tensorflow/tfjs");

const NeckVideo1 = ({ time, step, setStep }: any) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video: any = webcamRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((e: any) => {
        alert("비디오 접근을 허용해주세요.");
      });
  };
  const takePhoto = async () => {
    const width = 414;
    const height = width / (16 / 9);
    let video: HTMLVideoElement | null = webcamRef.current;
    let photo: HTMLCanvasElement | null = canvasRef.current;
    //null일 경우 대비해 return 처리
    if (!photo || !video) return;
    console.log(video);
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");

    //null일 경우 대비
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    const file = await new Promise<File>((resolve) => {
      if (!photo) return;
      photo.toBlob(async (blob) => {
        if (!blob) return;
        resolve(
          new File([blob], "screenshot", {
            type: "image/jpeg",
          })
        );
      });
    });
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const res = await axios({
      method: "post",
      url: `http://localhost:5003/neck`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

 
  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    takePhoto();
  }, [step]);

  return (
    <div>
      <S.CameraCont ref={webcamRef}></S.CameraCont>
      <S.CanvasResultCon>
        <canvas ref={canvasRef} />
      </S.CanvasResultCon>
    </div>
  );
};

export default NeckVideo1;

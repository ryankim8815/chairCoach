import React, { useEffect, useRef, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import * as S from "./NeckVideoStyle";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../../pages/aiStretching/util";
import * as poseDetection from "@tensorflow-models/pose-detection";
import axios from "axios";

require("@tensorflow/tfjs");

const NeckVideo = ({ time, step, setStep, playInspection }: any) => {
  console.log(playInspection);
  const webcamRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inclination, setInclination] = useState(0);

  const detectWebCamFeed = async (detector: poseDetection.PoseDetector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      (webcamRef.current as any).video.readyState === 4
    ) {
      const video = (webcamRef.current as any).video;
      const videoWidth = (webcamRef.current as any).video.videoWidth;
      const videoHeight = (webcamRef.current as any).video.videoHeight;
      (webcamRef.current as any).video.width = videoWidth;
      (webcamRef.current as any).video.height = videoHeight;
      const pose = await detector.estimatePoses(video, {});
      let dataArr: any = [];
      const dataToSend = pose[0].keypoints.slice(0, 11);
      if (dataToSend) {
        dataToSend.forEach((item) => {
          dataArr.push(item.x);
          dataArr.push(item.y);
          dataArr.push(item.score);
        });
      }
      // console.log(dataToSend[2].y - dataToSend[6].y);
      const getInclination = () => {
        (dataToSend[3].score as number) > (dataToSend[4].score as number)
          ? setInclination(
              (dataToSend[3].y - dataToSend[5].y) /
                (dataToSend[3].x - dataToSend[5].y)
            )
          : setInclination(
              (dataToSend[4].y - dataToSend[6].y) /
                (dataToSend[4].x - dataToSend[6].y)
            );
      };
      if (playInspection.current === true) {
        getInclination();
        playInspection.current = false;
      }
      drawResult(pose, video, videoWidth, videoHeight, canvasRef);

      requestAnimationFrame(() => {
        detectWebCamFeed(detector);
      });
    }
  };
  console.log(inclination);
  const takePhoto = async () => {
    const width = 640;
    const height = 480;
    let video: HTMLVideoElement | null = (webcamRef.current as any).video;
    let photo: HTMLCanvasElement | null = canvasRef.current;
    //null일 경우 대비해 return 처리
    if (!photo || !video) return;
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
  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );

    requestAnimationFrame(() => detectWebCamFeed(detector));
  };
  runMovenet();
  const drawResult = (
    pose: any,
    video: any,
    videoWidth: number,
    videoHeight: number,
    canvas: any
  ) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose[0]["keypoints"], 0.3, ctx, videoWidth);
    drawSkeleton(pose[0]["keypoints"], 0.3, ctx, videoWidth);
    console.log(pose[0]["keypoints"]);
  };

  useEffect(() => {
    if (step === 0) return;
    takePhoto();
  }, [step]);
  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          objectFit: "fill",
          marginLeft: "4%",
          zIndex: "9",
          width: 640,
          height: 480,
        }}
      />
      <S.CanvasResultCon>
        <canvas ref={canvasRef} />
      </S.CanvasResultCon>
    </div>
  );
};

export default NeckVideo;

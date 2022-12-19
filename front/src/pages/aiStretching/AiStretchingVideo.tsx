import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./util";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { Socket, io } from "socket.io-client";
import * as S from "../../components/neckVideo/NeckVideoStyle";
import NeckInspection from "./../neckInspection/NeckInspection";
require("@tensorflow/tfjs");

interface AiStretchingVideoProps {
  tempref: any;
}

const AiStretchingVideo = ({ tempref }: AiStretchingVideoProps) => {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices: any) =>
      setDevices(mediaDevices.filter(({ kind }: any) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const socketUrl = "ws://localhost:5001";
  const socketUrl = "wss://kdt-ai5-team04.elicecoding.com:5002";
  const socket = io(socketUrl as string);

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
      const pose = await detector.estimatePoses(video);
      let dataArr: any = [];
      if (!pose[0].keypoints) return;
      const dataToSend = pose[0].keypoints.slice(0, 11);
      if (dataToSend) {
        dataToSend.forEach((item) => {
          dataArr.push(item.x);
          dataArr.push(item.y);
          dataArr.push(item.score);
        });
      }
      const dataArr2: { [name: string]: number[] } = {};
      dataArr2.xy_coord = dataArr;

      socket.emit("model", dataArr2);
      socket.on("model", (message) => {
        if (message === tempref.current) {
          // console.log("1", message == temp);
          return;
        }
        tempref.current = message;
      });

      drawResult(pose, video, videoWidth, videoHeight, canvasRef);
      requestAnimationFrame(() => {
        detectWebCamFeed(detector);
      });
    }
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
  };
  useEffect(() => {
    if (!webcamRef.current?.video) return;

    webcamRef.current.video.addEventListener("loadeddata", (e) => {
      const video = e.target as HTMLVideoElement;
      if (video.readyState === 4) {
        runMovenet();
      }
    });
    return webcamRef.current.video.removeEventListener("loadeddata", (e) => {
      const video = e.target as HTMLVideoElement;
      if (video.readyState === 4) {
        runMovenet();
      }
    });
  }, [runMovenet]);

  return (
    <div>
      <S.WebcamWrap>
        <S.WebcamBtnWrap>
          {devices.map((device, key) => (
            <button
              key={(device as any).deviceId}
              onClick={() => setDeviceId((device as any).deviceId)}
            >
              {(device as any).label || `Device ${key + 1}`}
            </button>
          ))}
        </S.WebcamBtnWrap>
        <Webcam
          mirrored
          ref={webcamRef}
          audio={false}
          videoConstraints={{ deviceId }}
        />
        <S.CanvasResultCon>
          <canvas ref={canvasRef} />
        </S.CanvasResultCon>
      </S.WebcamWrap>
    </div>
  );
};

export default React.memo(AiStretchingVideo);

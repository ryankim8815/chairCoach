import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import * as posenet from "@tensorflow-models/posenet";
import * as S from "./NeckVideoStyle";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../../pages/aiStretching/util";
import * as poseDetection from "@tensorflow-models/pose-detection";
import axios from "axios";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";
require("@tensorflow/tfjs");

const NeckVideo = ({
  time,
  step,
  setStep,
  playInspection,
}: {
  time: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  playInspection: MutableRefObject<boolean>;
}) => {
  const [deviceId, setDeviceId] = useState();
  const [devices, setDevices] = useState([]);
  const handleDevices = React.useCallback(
    //타입을 모르겠음..
    (mediaDevices: any) =>
      setDevices(mediaDevices.filter(({ kind }: any) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  const user = useRecoilValue(userState);
  const today = new Date();
  const token = sessionStorage.getItem("userToken");
  const currentTime =
    today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
  console.log(playInspection);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inclination, setInclination] = useState(0);

  const detectWebCamFeed = async (detector: poseDetection.PoseDetector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = (webcamRef.current as any).video.videoWidth;
      const videoHeight = (webcamRef.current as any).video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      const pose = await detector.estimatePoses(video, {});
      let dataArr = [];
      const dataToSend = pose[0].keypoints.slice(0, 11);
      if (dataToSend) {
        dataToSend.forEach((item) => {
          dataArr.push(item.x);
          dataArr.push(item.y);
          dataArr.push(item.score);
        });
      }
      //4y=>120
      // console.log(dataToSend[4].x, dataToSend[6].x);
      const getInclination = () => {
        (dataToSend[3].score as number) > (dataToSend[4].score as number)
          ? setInclination(
              Math.abs(
                (dataToSend[3].y - dataToSend[5].y) /
                  (dataToSend[3].x - dataToSend[5].x)
              )
            )
          : setInclination(
              Math.abs(
                (dataToSend[4].y - dataToSend[6].y) /
                  (dataToSend[4].x - dataToSend[6].x)
              )
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

  const takePhoto = async () => {
    if (webcamRef.current === null) return;
    const width = 640;
    const height = 480;
    let video: HTMLVideoElement | null = webcamRef.current.video;
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
          new File([blob], `${currentTime}.jpg`, {
            type: "image/png",
          })
        );
      });
    });
    console.log(file);
    //이미지를 formdata로 보내면 잘못된 type, file로 보내면 파일 제한 조건 확인.
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    let info = formData.get("file");
    console.log(info);
    const res = await axios({
      method: "post",
      url: `http://localhost:5003/necks/${user?.id}`,
      data: {
        file: file,
        result: inclination.toFixed(2),
        score: 70,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    console.log(res);
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
  console.log(inclination);
  useEffect(() => {
    if (step === 0) return;
    takePhoto();
  }, [step]);
  useEffect(() => {
    if (!webcamRef.current?.video) return;

    webcamRef.current.video.addEventListener("loadeddata", (e) => {
      const video = e.target as HTMLVideoElement;
      if (video.readyState === 4) {
        runMovenet();
      }
    });
    webcamRef.current.video.removeEventListener("loadeddata", (e) => {
      const video = e.target as HTMLVideoElement;
      if (video.readyState === 4) {
        runMovenet();
      }
    });
  }, [runMovenet]);
  return (
    <div>
      <S.WebcamWrap>
        <S.BtnWrap>
          {devices.map((device, key) => (
            <button
              style={{ backgroundColor: "#403E56" }}
              key={(device as any).deviceId}
              onClick={() => setDeviceId((device as any).deviceId)}
            >
              {(device as any).label || `Device ${key + 1}`}
            </button>
          ))}
        </S.BtnWrap>
        <Webcam ref={webcamRef} videoConstraints={deviceId} audio={false} />
        <S.CanvasResultCon>
          <canvas ref={canvasRef} />
        </S.CanvasResultCon>
      </S.WebcamWrap>
    </div>
  );
};

export default NeckVideo;

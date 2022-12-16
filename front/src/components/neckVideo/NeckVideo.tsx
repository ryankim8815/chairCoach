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
import { constraints } from "@tensorflow/tfjs";
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
  const atoken = sessionStorage.getItem("accessToken");
  console.log(atoken);
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
  const user = useRecoilValue(userState);
  const today = new Date();
  const token = sessionStorage.getItem("userToken");
  const currentTime =
    today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inclination, setInclination] = useState(0);
  const [score, setScore] = useState(0);
  const [angle, setAngle] = useState(0);
  const getScore = () => {
    if (inclination >= 5) {
      setScore(100);
    } else {
      setScore(Math.floor(inclination * 20));
    }
  };
  const media = navigator.mediaDevices.getUserMedia;
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
      const getInclination = () => {
        if ((dataToSend[3].score as number) > (dataToSend[4].score as number)) {
          setInclination(
            Math.abs(
              (dataToSend[3].y - dataToSend[5].y) /
                (dataToSend[3].x - dataToSend[5].x)
            )
          );
        } else {
          setInclination(
            Math.abs(
              (dataToSend[4].y - dataToSend[6].y) /
                (dataToSend[4].x - dataToSend[6].x)
            )
          );
        }
      };
      const getAngle = () => {
        if ((dataToSend[3].score as number) > (dataToSend[4].score as number)) {
          var rad = Math.atan2(
            dataToSend[3].y - dataToSend[5].y,
            dataToSend[3].x - dataToSend[5].x
          );
          setAngle((rad * 180) / Math.PI);
        } else {
          var rad = Math.atan2(
            dataToSend[4].y - dataToSend[6].y,
            dataToSend[4].x - dataToSend[6].x
          );
          setAngle((rad * 180) / Math.PI);
        }
      };
      if (playInspection.current === true) {
        getInclination();
        //useEffect 때리자
        getAngle();
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
          new File([blob], `${currentTime}.png`, {
            type: "image/png",
          })
        );
      });
    });
    //이미지를 formdata로 보내면 잘못된 type, file로 보내면 파일 제한 조건 확인.
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios({
      method: "post",
      url: `https://kdt-ai5-team04.elicecoding.com:5000/necks/${user?.id}`,
      data: {
        file: file,
        result: Math.abs(angle),
        score: Math.floor(Math.abs(angle)),
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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
  useEffect(() => {
    if (step === 0) return;
    if (step === 1) return;
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
  console.log(step);
  return (
    <div>
      <S.WebcamWrap>
        <S.BtnWrap>
          {devices.map((device, key) => (
            <button
              key={(device as any).deviceId}
              onClick={() => setDeviceId((device as any).deviceId)}
            >
              {(device as any).label || `Device ${key + 1}`}
            </button>
          ))}
        </S.BtnWrap>
        <Webcam
          mirrored
          ref={webcamRef}
          videoConstraints={{ deviceId }}
          audio={false}
        />
        <S.CanvasResultCon>
          <canvas ref={canvasRef} />
        </S.CanvasResultCon>
      </S.WebcamWrap>
    </div>
  );
};

export default NeckVideo;

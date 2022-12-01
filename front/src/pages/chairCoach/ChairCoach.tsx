
import {useRef} from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import {drawKeypoints, drawSkeleton} from './util'
import * as poseDetection from '@tensorflow-models/pose-detection';

let count = 0;
require('@tensorflow/tfjs')
const ChairCoach = () => {
  const webcamRef=useRef(null);
  const canvasRef= useRef(null);

  const detectWebCamFeed = async (detector:poseDetection.PoseDetector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      (webcamRef.current as any).video.readyState === 4
    ) {
      const video =(webcamRef.current as any).video;
      const videoWidth = (webcamRef.current as any).video.videoWidth;
      const videoHeight = (webcamRef.current as any).video.videoHeight;
      (webcamRef.current as any).video.width = videoWidth;
      (webcamRef.current as any).video.height = videoHeight;
      const pose = await detector.estimatePoses(video, {
      });
      console.log('좌표값',pose[0].keypoints.slice(0,11))
      console.log(count++)
      drawResult(pose, video, videoWidth, videoHeight, canvasRef);

      requestAnimationFrame(() => {detectWebCamFeed(detector)})
    }
  };

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );

    requestAnimationFrame(() => detectWebCamFeed(detector))
    // setInterval(() => {
    //   detectWebCamFeed(detector)
    // }, 100)
  };
  runMovenet();

  const drawResult = (pose:any, video:any, videoWidth:number, videoHeight:number, canvas:any) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose[0]["keypoints"], 0.3, ctx, videoWidth);
    drawSkeleton(pose[0]["keypoints"], 0.3, ctx, videoWidth);
  };

  return (
    <div>
      <Webcam
      ref={webcamRef}
      style={{
        position: "absolute",
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex:9,
        width: 640,
        height: 480,
      }}
      />
       <canvas
       ref={canvasRef}
      style={{
        position: "absolute",
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex:9,
        width: 640,
        height: 480,
      }}
      />
    </div>
  );
};

export default ChairCoach;
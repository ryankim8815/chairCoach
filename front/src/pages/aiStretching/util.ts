/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
 import * as posenet from "@tensorflow-models/posenet";

 const color = "purple";
 const lineWidth = 3;
 const r = 6;
 
 export function drawPoint(ctx:CanvasRenderingContext2D, y:number, x:number, r:number, color:string, videoWidth:number) {
   ctx.beginPath();
   ctx.arc(x, y, r, 0, 2 * Math.PI);
   ctx.fillStyle = color;
   ctx.fill();
 }
 
 export function drawKeypoints(
   keypoints:any,
   minConfidence:number,
   ctx:CanvasRenderingContext2D,
   videoWidth:number,
   scale = 1
 ) {
   for (let i = 0; i < keypoints.length; i++) {
     const keypoint = keypoints[i];
 
     if (keypoint.score < minConfidence) {
       continue;
     }
     const x = videoWidth-(videoWidth - keypoint.x);
     const y = keypoint.y;
     drawPoint(ctx, y * scale, x * scale, r, color, videoWidth);
   }
 }
 
 function toTuple(y:any, x:any) {
   return [y, x];
 }
 
 export function drawSegment([ay, ax]:any, [by, bx]:any, color:string, scale:number, ctx:CanvasRenderingContext2D) {
   ctx.beginPath();
   ctx.moveTo(ax * scale, ay * scale);
   ctx.lineTo(bx * scale, by * scale);
   ctx.lineWidth = lineWidth;
   ctx.strokeStyle = color;
   ctx.stroke();
 }
 
 export function drawSkeleton(
   keypoints:any,
   minConfidence:number,
   ctx:CanvasRenderingContext2D,
   videoWidth:number,
   scale = 1
 ) {
   const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
     keypoints,
     minConfidence
   );
 
   adjacentKeyPoints.forEach((keypoints) => {
     drawSegment(
       toTuple((keypoints[0]as any).y, videoWidth-(videoWidth - (keypoints[0]as any).x)),
       toTuple((keypoints[1]as any).y, videoWidth-(videoWidth - (keypoints[1]as any).x)),
       color,
       scale,
       ctx
     );
   });
 }

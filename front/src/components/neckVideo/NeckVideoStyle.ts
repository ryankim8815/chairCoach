import styled from "styled-components";

export const CameraCont = styled.video`
  position: absolute;
  width: 120%;
  height: 60vh;
  object-fit: fill;
  margin-left: 4%;
  /* z-index: 9; */
`;

export const WebcamWrap = styled.div`
  position: relative;

  video {
    object-fit: fill;
    width: 640px;
    height: 480px;
  }
`;
export const BtnWrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 12;
`;

export const CanvasResultCon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 640px;
  height: 480px;
  object-fit: fill;
  /* z-index: 9; */
`;

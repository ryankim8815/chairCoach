import styled from "styled-components";

export const CameraCont = styled.video`
  position: absolute;
  width: 120%;
  height: 60vh;
  object-fit: fill;
  margin-left: 4%;
`;

export const WebcamWrap = styled.div`
  position: relative;

  video {
    object-fit: fill;
    width: 640px;
    height: 480px;
  }
`;
export const WebcamBtnWrap = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
  z-index: 12;

  button {
    display: block;
    padding: 2px 4px;
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: saturate(180%) blur(5px);
    color: #835dfe;
  }

  button + button {
    margin-top: 1px;
  }
`;

export const CanvasResultCon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 640px;
  height: 480px;
  object-fit: fill;
`;

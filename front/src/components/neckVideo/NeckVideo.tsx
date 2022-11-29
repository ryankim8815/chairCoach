import{ useRef, useEffect, useState } from "react";
import * as S from "./NeckVideoStyle";
import * as Api from '../../api/api'
import axios from "axios";


const NeckVideo = ({ time,step,setStep }: any) => {
  const videoRef = useRef(null);
  const photoRef = useRef<HTMLCanvasElement|null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
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
        alert('비디오 접근을 허용해주세요.')
      });
  };
  const takePhoto = async() => {
    const width = 414;
    const height = width / (16 / 9);
    let video: HTMLVideoElement|null = videoRef.current;
    let photo: HTMLCanvasElement|null= photoRef.current;
    //null일 경우 대비해 return 처리
    if(!photo || !video) return;
    console.log(video);
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");

    //null일 경우 대비
    if(!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    let file: File;
    const blob= photo.toBlob(async(blob)=>{
      if(!blob) return;
      file= new File([blob],'screenshot',{
        type: 'image/jpeg'
      } )
      console.log(file)
      const formData=new FormData();
      formData.append('file',file);
      const res=await axios({
        method: "post",
        url: `http://localhost:5003/neck`,
        data: formData,
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(res)
    },'image/png')
    setHasPhoto(true);
  };
  useEffect(() => {
    getVideo();
  }, []);

  useEffect(()=>{
    takePhoto()
  },[step])

  return (
    <div>
      <S.CameraCont onClick={takePhoto} ref={videoRef}></S.CameraCont>
      <S.CanvasResultCon>
          <canvas ref={photoRef} /> 
      </S.CanvasResultCon>
    </div>
  );
};

export default NeckVideo;

import React, { useEffect } from "react";
import * as S from "./MainStyle";
import * as B from "../../styles/BtnStyle";
import Banner from "./Banner";
import IntroduceLayout from "./IntroduceLayout";
import { notifyMe } from "../../components/alarm/Alarm";
import ExplainLayout from "./ExplainLayout";
import SelectLayout from "./SelectLayout";

const Main = () => {
  useEffect(()=>{
    setInterval(()=>{
    notifyMe()
    },1800000)
  },[])
  return (
    <S.MainLayout>
      <Banner />
      <IntroduceLayout />
      <ExplainLayout />
      <SelectLayout />
    </S.MainLayout>
  );
};

export default Main;

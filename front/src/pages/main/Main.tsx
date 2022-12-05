import React, { useEffect } from "react";
import * as S from "./MainStyle";
import Banner from "./Banner";
import IntroduceLayout from "./IntroduceLayout";
import ExplainLayout from "./ExplainLayout";
import SelectLayout from "./SelectLayout";
import { notifyMe } from "../../components/alarm/Alarm";
const Main = () => {
  const minutes = 60 * 1000;
  useEffect(() => {
    setInterval(() => {
      notifyMe();
    }, 30 * minutes);
  }, []);
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

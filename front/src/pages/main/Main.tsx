import React, { useEffect } from "react";
import Banner from "./Banner";
import IntroduceLayout from "./IntroduceLayout";
import ImportantText from "./ImportantText";
import ExplainLayout from "./ExplainLayout";
import SelectLayout from "./SelectLayout";
import { notifyMe } from "../../components/alarm/Alarm";
import * as S from "./MainStyle";

const Main = () => {
  useEffect(() => {
    setInterval(() => {
      notifyMe();
    }, 1800000);
  }, []);

  return (
    <S.MainLayout>
      <Banner />
      <IntroduceLayout />
      <ImportantText/>
      <ExplainLayout />
      <SelectLayout />
    </S.MainLayout>
  );
};

export default Main;

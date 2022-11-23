import React from "react";
import * as S from "./MainStyle";
import * as B from "../../styles/BtnStyle";
import Banner from "./Banner";
import IntroduceLayout from "./IntroduceLayout";
import ExplainLayout from "./ExplainLayout";
import SelectLayout from "./SelectLayout";

const Main = () => {
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

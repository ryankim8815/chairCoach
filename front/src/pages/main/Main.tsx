import React from "react";
import * as S from "./MainStyle";
import * as B from "../../styles/BtnStyle";
import Banner from "./Banner";
import IntroduceLayout from "./IntroduceLayout";

const Main = () => {
  return (
    <S.MainLayout>
      <Banner />
      <IntroduceLayout />
    </S.MainLayout>
  );
};

export default Main;

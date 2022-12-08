import React, { useEffect, useState } from "react";
import * as S from "./MyPageStyle";
import MyChairReport from "./components/myChairReport/MyChairReport";
import TurtleNeckResult from "./components/turtleNeckResult/TurtleNeckResult";

const MyPage = () => {
  const user_id = sessionStorage.getItem("user_id");

  const curTime = new Date();
  const curYear = curTime.getFullYear();

  return (
    <S.MyPageLayout>
      <div className="inner">
        <MyChairReport year={curYear} user_id={user_id} />
        <TurtleNeckResult />
      </div>
    </S.MyPageLayout>
  );
};

export default MyPage;

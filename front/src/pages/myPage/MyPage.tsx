import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import * as S from "./MyPageStyle";
import userState from "./../../atoms/user";
import MyChairReport from "./components/myChairReport/MyChairReport";
import TurtleNeckResult from "./components/turtleNeckResult/TurtleNeckResult";

const MyPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const curTime = new Date();
  const curYear = curTime.getFullYear();
  return (
    <S.MyPageLayout>
      <div className="inner">
        <MyChairReport year={curYear} user_id={user && user.id} />
        <TurtleNeckResult year={curYear} user_id={user && user.id} />
      </div>
    </S.MyPageLayout>
  );
};

export default MyPage;

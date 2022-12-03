import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import userState from "../../atoms/user";
import * as S from "./MyPageStyle";
import * as Api from "../../api/api";
import MyChairReport from "../../components/myChairReport/MyChairReport";
import TurtleNeckResult from "../../components/turtleNeckResult/TurtleNeckResult";

const MyPage = () => {
  const [user, setUser] = useRecoilState(userState);

  const [myChairReport, setMyChairReport] = useState([]);
  const [turtleNeckResult, setTurtleNeckResult] = useState([]);
  useEffect(() => {
    try {
      Api.get("body").then((res) => setMyChairReport(res.data));
      console.log(myChairReport);
    } catch (e) {
      console.error(e);
    }
  }, []);

  console.log(turtleNeckResult);
  return (
    <S.MyPageLayout>
      <div className="inner">
        <MyChairReport />
        <TurtleNeckResult />
      </div>
    </S.MyPageLayout>
  );
};

export default MyPage;

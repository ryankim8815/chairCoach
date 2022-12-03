import React from "react";
import { useState } from "react";
import * as S from "./MyPageStyle";
import * as Api from "../../api/api";
import MyChairReport from "../../components/myChairReport/MyChairReport";
import TurtleNeckResult from "../../components/turtleNeckResult/TurtleNeckResult";

const MyPage = () => {
  const [turtleNeckResult, setTurtleNeckResult] = useState([]);

  // try{
  //   const res = Api.get("necks");
  // }
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

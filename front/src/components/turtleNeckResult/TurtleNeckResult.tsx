import React from "react";
import styled from "styled-components";
import * as S from "../myChairReport/MyChairReportStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TurtleNeckResultChart from "./TurtleNeckResultChart";

const ReportLayout = styled(S.ReportLayout)`
  padding-top: 64px;
  .flex {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
`;

const TurtleNeckResultImage = styled.div`
  width: 320px;
  height: 320px;
  //background: url() no-repeat center;
  //background-size: contain;
  background-color: gray;
  margin-right: 20px;
`;

const ContentLayout = styled(S.ContentLayout)`
  max-width: 840px;
  margin-top: 0;
`;

const TurtleNeckResult = () => {
  return (
    <ReportLayout>
      <S.Text fontSize={24} fontWeight={500}>
        거북목 진단 결과
      </S.Text>
      <div className="flex">
        <TurtleNeckResultImage />
        <ContentLayout>
          <div className="inner">
            <S.GraphBox>
              <MdKeyboardArrowLeft size={32} />
              <S.YearText fontSize={20} fontWeight={500}>
                2022년
              </S.YearText>
              <MdKeyboardArrowRight size={32} />
              <div className="graph">
                <TurtleNeckResultChart />
              </div>
            </S.GraphBox>
          </div>
        </ContentLayout>
      </div>
    </ReportLayout>
  );
};

export default TurtleNeckResult;

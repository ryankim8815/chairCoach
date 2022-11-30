import React from "react";
import * as S from "./MyChairReportStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";
import MyChairReportChart from "./MyChairReportChart";
const MyChairReport = () => {
  return (
    <S.ReportLayout>
      <S.Text fontSize={24} fontWeight={500}>
        마이 체어 리포트
      </S.Text>
      <S.ContentLayout>
        <div className="inner">
          <S.InfoBox>
            <S.SelectButton>일</S.SelectButton>
            <S.SelectButton>월</S.SelectButton>
            <div className="totalTime">
              <S.Text fontSize={16} fontWeight={500}>
                총 운동시간(분)
              </S.Text>
              <S.TotalTimeIconBox>
                <BsFillClockFill size={32} />
                <S.TotalTimeNumber fontSize={24} fontWeight={700}>
                  500
                </S.TotalTimeNumber>
              </S.TotalTimeIconBox>{" "}
            </div>
          </S.InfoBox>
          <S.GraphBox>
            <MdKeyboardArrowLeft size={32} />
            <S.YearText fontSize={20} fontWeight={500}>
              2022년
            </S.YearText>
            <MdKeyboardArrowRight size={32} />
            <div className="graph">
              <MyChairReportChart />
            </div>
          </S.GraphBox>
        </div>
      </S.ContentLayout>
    </S.ReportLayout>
  );
};

export default MyChairReport;

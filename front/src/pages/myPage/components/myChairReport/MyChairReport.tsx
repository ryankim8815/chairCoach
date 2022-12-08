import React, { useEffect, useState } from "react";
import * as S from "./MyChairReportStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";
import MyChairReportChart from "./MyChairReportChart";
import * as Api from "../../../../api/api";

export interface MyChairReportProps {
  chart?: string;
  year?: number;
  user_id?: string | null;
  data?: number[];
}
const MyChairReport = ({ year, user_id }: MyChairReportProps) => {
  const [chart, setChart] = useState<string>("year");

  const onClickYearButton = () => {
    setChart("year");
    getYearData();
  };
  const onClickWeekButton = () => {
    setChart("week");
    getWeekData();
  };

  const initYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const initWeekData = [0, 0, 0, 0, 0, 0, 0];
  const curYearData = initYearData;
  const curWeekData = initWeekData;

  // 마이체어리포트 유저 운동기록 조회
  const getYearData = async () => {
    try {
      const res = await Api.get(`bodies/${user_id}/${year}`);
      const data = res.data.list;
      for (let obj of data) {
        const month = Number(obj.month.split("-")[1]);
        curYearData[month - 1] = Number(obj.duration);
        //console.log(curYearData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getWeekData = async () => {
    try {
      const res = await Api.get(`bodies/${user_id}/${year}/48`);
      const data = res.data.list;
      console.log(data);
      for (let obj of data) {
        const month = Number(obj.month.split("-")[1]);
        curYearData[month - 1] = Number(obj.duration);
        //console.log(curYearData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getYearData();
  });

  return (
    <S.ReportLayout>
      <S.Text fontSize={24} fontWeight={500}>
        마이 체어 리포트
      </S.Text>
      <S.ContentLayout>
        <div className="inner">
          <S.InfoBox>
            <S.SelectButton onClick={onClickYearButton}>Year</S.SelectButton>
            <S.SelectButton onClick={onClickWeekButton}>Week</S.SelectButton>
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
              {year}년
            </S.YearText>
            <MdKeyboardArrowRight size={32} />
            <div className="graph">
              <MyChairReportChart chart={chart} data={curYearData} />
            </div>
          </S.GraphBox>
        </div>
      </S.ContentLayout>
    </S.ReportLayout>
  );
};

export default MyChairReport;

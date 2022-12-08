import React, { useEffect, useState } from "react";
import * as S from "./MyChairReportStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";
import MyChairReportChart from "./MyChairReportChart";
import * as Api from "../../../../api/api";
import { E } from "chart.js/dist/chunks/helpers.core";

export interface MyChairReportProps {
  chart?: string;
  year?: number;
  user_id?: string | null;
  data?: number[];
}
const MyChairReport = ({ year, user_id }: MyChairReportProps) => {
  const yearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const weekData = [0, 0, 0, 0, 0, 0, 0];

  const [chart, setChart] = useState<string>("year");
  const [data, setData] = useState<number[]>(yearData);

  console.log(chart, data);

  const onClickYearButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChart("year");
    getYearData();
  };
  const onClickWeekButton = () => {
    setChart("week");
    getWeekData();
  };

  useEffect(() => {
    getYearData();
    //getWeekData();
  }, []);

  // 마이체어리포트 유저 운동기록 조회
  const getYearData = async () => {
    try {
      const res = await Api.get(`bodies/${user_id}/${year}`);
      //console.log(data);
      for (let obj of res.data.list) {
        const month = Number(obj.month.split("-")[1]);
        yearData[month - 1] = Number(obj.duration);
        //console.log(curYearData);
      }
      setData(yearData);
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
        let dayOfWeek = new Date(obj.date).getDay();
        console.log(dayOfWeek);
        switch (dayOfWeek) {
          // 일요일 ~ 월요일
          case 0:
            weekData[6] = obj.duration;
            break;
          case 1:
            weekData[0] = obj.duration;
            break;
          case 2:
            weekData[1] = obj.duration;
            break;
          case 3:
            weekData[2] = obj.duration;
            break;
          case 4:
            weekData[3] = obj.duration;
            break;
          case 5:
            weekData[4] = obj.duration;
            break;
          case 6:
            weekData[5] = obj.duration;
            break;
        }
        //curWeekData[month - 1] = Number(obj.duration);
        console.log(weekData);
      }
      setData(weekData);
    } catch (err) {
      console.error(err);
    }
  };

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
              <MyChairReportChart chart={chart} data={data} />
            </div>
          </S.GraphBox>
        </div>
      </S.ContentLayout>
    </S.ReportLayout>
  );
};

export default MyChairReport;

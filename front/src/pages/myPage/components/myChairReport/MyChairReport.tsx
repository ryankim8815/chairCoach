import React, { useEffect, useState } from "react";
import * as S from "./MyChairReportStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";
import MyChairReportChart from "./MyChairReportChart";
import * as Api from "../../../../api/api";

export interface MyChairReportProps {
  timeInfo?: string;
  year?: number;
  user_id?: string | null;
  data?: number[];
}
const MyChairReport = ({ year, user_id }: MyChairReportProps) => {
  const yearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const weekData = [0, 0, 0, 0, 0, 0, 0];

  const [timeInfo, setTimeInfo] = useState<string>("year");
  const [data, setData] = useState<number[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [curYear, setCurYear] = useState<number>(year!);
  //const [curWeek, setCurWeek] = useState<number | null>(null);

  const onClickYearButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTimeInfo("year");
    getYearData();
  };
  const onClickWeekButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTimeInfo("week");
    getWeekData();
  };

  const onClickPrevButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (timeInfo === "year") setCurYear((prev) => prev - 1);
    //else if (timeInfo === "week") setCurWeek((prev) => prev - 1);
    getYearData();
  };

  const onClickNextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (timeInfo) setTimeInfo("week");
    getWeekData();
  };
  useEffect(() => {
    getYearData();
  }, []);

  useEffect(() => {
    setCurYear(year!);
  }, [year]);

  // 마이체어리포트 유저 운동기록 조회
  const getYearData = async () => {
    try {
      const res = await Api.get(`bodies/${user_id}/${year}`);

      for (let obj of res.data.list) {
        const month = Number(obj.month.split("-")[1]);
        yearData[month - 1] = Number(obj.duration);
      }
      let sum = yearData.reduce((sum, v) => {
        return sum + v;
      }, 0);
      setData(yearData);
      setTotal(sum);
    } catch (err) {
      console.error(err);
    }
  };

  const getWeekData = async () => {
    try {
      const res = await Api.get(`bodies/${user_id}/${year}/48`);
      for (let obj of res.data.list) {
        let dayOfWeek = new Date(obj.date).getDay();
        switch (dayOfWeek) {
          // 일요일 ~ 월요일
          case 0:
            weekData[6] = Number(obj.duration);
            break;
          case 1:
            weekData[0] = Number(obj.duration);
            break;
          case 2:
            weekData[1] = Number(obj.duration);
            break;
          case 3:
            weekData[2] = Number(obj.duration);
            break;
          case 4:
            weekData[3] = Number(obj.duration);
            break;
          case 5:
            weekData[4] = Number(obj.duration);
            break;
          case 6:
            weekData[5] = Number(obj.duration);
            break;
        }
      }
      let sum = weekData.reduce((sum, v) => {
        return sum + v;
      }, 0);
      setData(weekData);
      setTotal(sum);
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
                  {total}
                </S.TotalTimeNumber>
              </S.TotalTimeIconBox>{" "}
            </div>
          </S.InfoBox>
          <S.GraphBox>
            <S.ShiftButton>
              <MdKeyboardArrowLeft size={32} />
            </S.ShiftButton>
            <S.YearText fontSize={20} fontWeight={500}>
              {year}년
            </S.YearText>
            <S.ShiftButton>
              <MdKeyboardArrowRight size={32} />
            </S.ShiftButton>
            <div className="graph">
              {data && <MyChairReportChart timeInfo={timeInfo} data={data} />}
            </div>
          </S.GraphBox>
        </div>
      </S.ContentLayout>
    </S.ReportLayout>
  );
};

export default MyChairReport;

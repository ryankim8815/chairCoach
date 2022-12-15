import React, { useEffect, useState } from "react";
import * as S from "./MyChairReportStyle";
import {
  MdElectricalServices,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
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
  const [timeInfo, setTimeInfo] = useState<string>("year");
  const [data, setData] = useState<number[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [curYear, setCurYear] = useState<number>(year!);
  const [curWeek, setCurWeek] = useState<number>(50);
  const [isSelected, SetIsSelected] = useState<number[]>([1, 0]);
  //const [curWeek, setCurWeek] = useState<number | null>(null);

  const onClickYearButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTimeInfo("year");
    SetIsSelected([1, 0]);
    getYearData();
  };
  const onClickWeekButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTimeInfo("week");
    SetIsSelected([0, 1]);
    getWeekData();
  };

  const onClickPrevButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (timeInfo === "year") {
      setCurYear((prev) => prev - 1);
      getYearData();
    } else if (timeInfo === "week") {
      setCurWeek((prev) => prev - 1);
      getWeekData();
    }
  };

  const onClickNextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (timeInfo === "year") {
      setCurYear((prev) => prev + 1);
      getYearData();
    } else if (timeInfo === "week") {
      setCurWeek((prev) => prev + 1);
      getWeekData();
    }
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
      const res = await Api.get(`bodies/${user_id}/${curYear}`);
      if (res.data.list.length) {
        const newData = new Array(12).fill(0);
        for (let obj of res.data.list) {
          let month = Number(obj.month.split("-")[1]);
          let duration = Math.round(Number(obj.duration) / 60);
          newData[month - 1] = duration;
        }

        let sum = newData.reduce((sum, v) => {
          return sum + v;
        }, 0);
        setData(newData);
        setTotal(sum);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const getWeekData = async () => {
    try {
      const res = await Api.get(`bodies/${user_id}/${year}/${curWeek}`);
      if (res.data.list.length) {
        const newData = new Array(7).fill(0);
        for (let obj of res.data.list) {
          let dayOfWeek = new Date(obj.date).getDay();
          let totalMiniute = Math.round(Number(obj.duration) / 60);
          if (dayOfWeek === 0) newData[6] = totalMiniute;
          else {
            newData[dayOfWeek - 1] = totalMiniute;
          }
        }
        let sum = newData.reduce((sum, v) => {
          return sum + v;
        }, 0);
        setData(newData);
        setTotal(sum);
      }
      console.log(res);
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
            <S.SelectButton
              onClick={onClickYearButton}
              className={isSelected[0] ? "active" : ""}
            >
              Year
            </S.SelectButton>
            <S.SelectButton
              onClick={onClickWeekButton}
              className={isSelected[1] ? "active" : ""}
            >
              Week
            </S.SelectButton>
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
            <S.ShiftButton onClick={onClickPrevButton}>
              <MdKeyboardArrowLeft size={32} />
            </S.ShiftButton>
            <S.YearText fontSize={20} fontWeight={500}>
              {curYear}년
            </S.YearText>
            <S.ShiftButton onClick={onClickNextButton}>
              <MdKeyboardArrowRight size={32} />
            </S.ShiftButton>
            <div className="graph">
              {data ? (
                <MyChairReportChart timeInfo={timeInfo} data={data} />
              ) : (
                <div>마이 체어 리포트 데이터가 없습니다.</div>
              )}
            </div>
          </S.GraphBox>
        </div>
      </S.ContentLayout>
    </S.ReportLayout>
  );
};

export default MyChairReport;

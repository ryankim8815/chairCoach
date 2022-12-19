import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../myChairReport/MyChairReportStyle";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineCollectionsBookmark,
} from "react-icons/md";
import TurtleNeckResultChart from "./TurtleNeckResultChart";
import * as Api from "../../../../api/api";
import good from "../../../../assets/img/good.png";
import bad from "../../../../assets/img/bad.png";
import middle from "../../../../assets/img/middle.png";

const ReportLayout = styled(S.ReportLayout)`
  padding-top: 64px;
  .flex {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
`;

const TurtleNeckResultImage = styled.div<TurtleNeckResultProps>`
  width: 200px;
  height: 200px;
  //background-color: gray;
  background: ${(props) => `url(${props.img}) no-repeat top center`};
  background-size: contain;
  margin: 80px 80px 0 60px;
`;

const ContentLayout = styled(S.ContentLayout)`
  max-width: 840px;
  margin-top: 0;
`;

export interface TurtleNeckResultProps {
  user_id?: string | null;
  year?: number;
  data?: number[];
  img?: string;
}
const TurtleNeckResult = ({ year, user_id }: TurtleNeckResultProps) => {
  const [data, setData] = useState<number[] | null>(null);
  const [img, setImage] = useState<string | null>(null); // data 없을때 디폴트 이미지 필요!
  const [curYear, setCurYear] = useState<number>(year!);
  /**
   * 선택한 년도에 따라 월별 거북목 점수 데이터를 변경하는 함수
   */
  const getData = async () => {
    try {
      const res = await Api.get(`necks/${user_id}/${curYear}`);
      if (res.data.list.length) {
        const data = new Array(12).fill(0);
        for (let obj of res.data.list) {
          const month = Number(obj.month.split("-")[1]);
          const avg = Number(obj.avg);
          data[month - 1] = avg;
        }
        getImage(data);
        setData(data);
      } else {
        setData(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 선택한 년도의 평균 거북목 점수를 계산하고, 그 점수에 따라 이미지 상태를 변경하는 함수(good, middle, bad)
   * @param data 선택한 년도의 월별 거북목 평균 점수가 들어있는 배열
   */
  const getImage = (data: number[]) => {
    let sum = data.reduce((sum, v) => {
      return sum + v;
    }, 0);
    let avg = sum / data.length;

    if (avg < 40) setImage(good);
    else if (avg >= 40 && avg < 70) setImage(middle);
    else if (avg >= 70) setImage(bad);
  };

  const onClickPrevButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurYear((prev) => prev - 1);
  };

  const onClickNextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurYear((prev) => prev + 1);
  };
  useEffect(() => {
    getData();
  }, [curYear]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <ReportLayout>
      <S.Text fontSize={24} fontWeight={500}>
        거북목 진단 결과
      </S.Text>
      <div className="flex">
        {img && <TurtleNeckResultImage img={img} />}
        <ContentLayout>
          <div className="inner">
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
                  <TurtleNeckResultChart data={data} />
                ) : (
                  <div>거북목 진단 결과 데이터가 없습니다.</div>
                )}
              </div>
            </S.GraphBox>
          </div>
        </ContentLayout>
      </div>
    </ReportLayout>
  );
};

export default TurtleNeckResult;

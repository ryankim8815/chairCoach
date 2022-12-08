import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../myChairReport/MyChairReportStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
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
  margin: 60px 80px 0 60px;
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
  const temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [data, setData] = useState(temp);
  //const initYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //let curYearData = initYearData;
  let img = middle; // default 값 변경 필요

  //const [data, setData] = useState<number[]>(curYearData);

  const getData = async () => {
    try {
      const res = await Api.get(`necks/${user_id}`);
      // const data = res.data.list;
      // console.log(data);
      for (let obj of res.data.list) {
        const month = Number(obj.month.split("-")[1]);
        temp[month - 1] = Number(obj.avg);
        //console.log(curYearData);
      }
      setData(temp);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ReportLayout>
      <S.Text fontSize={24} fontWeight={500}>
        거북목 진단 결과
      </S.Text>
      <div className="flex">
        <TurtleNeckResultImage img={img} />
        <ContentLayout>
          <div className="inner">
            <S.GraphBox>
              <MdKeyboardArrowLeft size={32} />
              <S.YearText fontSize={20} fontWeight={500}>
                2022년
              </S.YearText>
              <MdKeyboardArrowRight size={32} />
              <div className="graph">
                <TurtleNeckResultChart data={data} />
              </div>
            </S.GraphBox>
          </div>
        </ContentLayout>
      </div>
    </ReportLayout>
  );
};

export default TurtleNeckResult;

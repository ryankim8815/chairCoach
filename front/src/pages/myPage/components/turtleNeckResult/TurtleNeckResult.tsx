import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../myChairReport/MyChairReportStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TurtleNeckResultChart from "./TurtleNeckResultChart";
import * as Api from "../../../../api/api";

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
  background-color: gray;
  margin-right: 20px;
`;

const ContentLayout = styled(S.ContentLayout)`
  max-width: 840px;
  margin-top: 0;
`;

export interface TurtleNeckResultProps {
  user_id?: string | null;
  year?: number;
  data?: number[];
}
const TurtleNeckResult = ({ year, user_id }: TurtleNeckResultProps) => {
  const initYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let curYearData = initYearData;

  //const [data, setData] = useState<number[]>(curYearData);

  const getData = async () => {
    try {
      const res = await Api.get(`necks/${user_id}`);
      const data = res.data.list;
      console.log(data);
      // for (let obj of res.data.list) {
      //   const month = Number(obj.month.split("-")[1]);
      //   curYearData[month - 1] = Number(obj.duration);
      //   //console.log(curYearData);
      // }
      // setData(curYearData);
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

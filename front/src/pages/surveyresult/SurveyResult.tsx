import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  HalfBox,
  IconImg,
  Percent,
  RecommendBox,
  ResultBox,
  ResultContainer,
  SubTitle,
  TextBox,
  Title,
  TitleBox,
} from "./SurveyResultStyle";
import result1 from '../../assets/img/result1.png'
import result2 from '../../assets/img/result2.png'
import result3 from '../../assets/img/result3.png'

const SurveyResult = () => {
  const location = useLocation();
  const point:number = location.state.point;
  
  
  return (
    <ResultContainer>
      <TitleBox>
        <Title>자가진단 결과</Title>
      </TitleBox>
      <ResultBox>
        <HalfBox>
          <TextBox>
            <SubTitle>
              설문 조항 결과에 따르면, name님의 거북목 위험도는 <Percent>{point * 10}%</Percent>
              입니다!
            </SubTitle>
          </TextBox>
        </HalfBox>
        <HalfBox style={{marginRight:129}}>
            {
                point>=7
                ? <IconImg src={result1}/>
                : ( point>=4
                    ? <IconImg src={result2}/>
                    : <IconImg src={result3}/>)
            }
            
        </HalfBox>
      </ResultBox>
      <RecommendBox>
        
      </RecommendBox>
    </ResultContainer>
  );
};

export default SurveyResult;

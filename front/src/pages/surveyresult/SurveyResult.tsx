import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    BoldLetter,
    BtnBox,
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
import * as S from '../../styles/BtnStyle'


const SurveyResult = () => {
  const location = useLocation();
  const point:number = location.state.point;
  const navigate=useNavigate();
  
  
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
                ? <IconImg src={result3}/>
                : ( point>=4
                    ? <IconImg src={result2}/>
                    : <IconImg src={result1}/>)
            }
            
        </HalfBox>
      </ResultBox>
      <RecommendBox>
        <SubTitle><BoldLetter>CHAIR COACH</BoldLetter>의 <BoldLetter>정밀진단</BoldLetter>을 받아볼까요?</SubTitle>
        <BtnBox>
      <S.CheckBtn onClick={()=>{
        navigate('/chaircoach')
      }} size='small' check='true'>네</S.CheckBtn>
      <S.CheckBtn size='small' check='false'>아니오</S.CheckBtn>
      </BtnBox>
      </RecommendBox>
      
    </ResultContainer>
  );
};

export default SurveyResult;

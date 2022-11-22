import React from "react";
import * as S from "./AboutNeckStyle";
import aboutNeck1 from "../../assets/img/aboutneck1.png";
import aboutNeck2 from "../../assets/img/aboutneck2.png";
import aboutNeck3 from "../../assets/img/aboutneck3.png";
import { useNavigate } from "react-router-dom";
const AboutNeck = () => {
  const navigate = useNavigate();
  return (
    <S.WholePage>
        <div className='inner'>
      <S.TitleBox>
        <S.Title>
          <S.Bold>거북목 증후군</S.Bold>에 대해 알아보아요.
        </S.Title>
      </S.TitleBox>
      <S.MainContents>
        <S.Content>
          <S.SizedImg src={aboutNeck1} />
          <S.TextBox>
            <S.SubTitle>거북목에는 다양한 원인이 있어요!</S.SubTitle>
            <S.Text>
              <ul style={{ listStyleType: "disc", marginLeft: 18 }}>
                <li>무리한 운동이나 과도한 업무</li>
                <li>컴퓨터와 스마트폰을 나쁜 자세로 장시간 사용</li>
                <li>높은 베개를 사용하는 경우</li>
                <li>목에 무거운 목걸이, 카드지갑을 걸고 다니는 경우</li>
              </ul>
              등 다양한 원인이 있어요.
            </S.Text>
          </S.TextBox>
        </S.Content>
        <S.Content>
          <S.TextBox>
            <S.SubTitle>미리 예방해 보아요!</S.SubTitle>
            <S.Text>
              일자 형태의 목은 목에 가해지는 압력을 흡수하기 어려워
              <br />
              추가판 질환의 발생확률이 높아져요!
            </S.Text>
          </S.TextBox>
          <S.SizedImg src={aboutNeck2} />
        </S.Content>
        <S.Content>
          <S.SizedImg src={aboutNeck3} />
          <S.TextBox>
            <S.SubTitle>가장 중요한 예방법은 바른자세!</S.SubTitle>
            <S.Text>
              간단한 스트레칭과 운동만으로도 거북목 예방이 가능해요!
              <br />
              여러분의 Personal Coach
              <br />
              <S.Bold>CHAIR COACH</S.Bold>가 도와드릴게요!
            </S.Text>
          </S.TextBox>
        </S.Content>
      </S.MainContents>
      <S.ChioceBox>
        <S.Title>
          <S.Bold>거북목 진단</S.Bold>
          <S.BtnBox>
            <S.ChoiceBtn
              onClick={() => {
                navigate("/necksurvey");
              }}
            >
              <S.BtnText>
                <S.SubTitle>거북목증후군 자가진단 테스트</S.SubTitle>
                <S.Text>
                  간단한 설문 테스트를 통해
                  <br />
                  거북목 증후군을 자가진단해 볼 수 있습니다.
                </S.Text>
              </S.BtnText>
            </S.ChoiceBtn>
            <S.ChoiceBtn
              onClick={() => {
                navigate("/chaircoach");
              }}
            >
              <S.BtnText>
                <S.SubTitle>체어코치 AI를 통한 거북목 진단</S.SubTitle>
                <S.Text>
                  웹캠을 이용한 AI 진단을 통해
                  <br /> 거북목 여부를 정확하게 진단해볼 수 있습니다.
                </S.Text>
              </S.BtnText>
            </S.ChoiceBtn>
          </S.BtnBox>
        </S.Title>
      </S.ChioceBox>
      </div>
    </S.WholePage>
  );
};

export default AboutNeck;

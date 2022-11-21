import React from "react";
import styled from "styled-components";
import * as S from "./MainStyle";
import illustration from "../../assets/image/main_illustration.png";

const TitleText = styled(S.Text)`
  padding-top: 120px;
`;

const Image = styled.div`
  width: 435px;
  height: 320px;
  margin: 0 auto;
  background-image: url(${illustration});
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 100px;
`;

const TextBox = styled.div`
  padding-top: 50px;
`;

const IntroduceLayout = () => {
  return (
    <S.ContentBox height={970}>
      {/* <S.Logo></S.Logo> */}
      <TitleText fontWeight={400} fontSize={32}>
        하루 종일 책상에 앉아있는 당신,
      </TitleText>
      <br />
      <S.Text fontWeight={700} fontSize={32}>
        CHAIR COACH
        <S.Text fontWeight={400} fontSize={32}>
          를 시작하세요!
        </S.Text>
      </S.Text>
      <Image />
      <TextBox>
        <S.Text fontWeight={400} fontSize={20} lineHeight={29}>
          스트레칭 파트너 <S.Text fontWeight={700}>CHAIR COACH</S.Text>는
        </S.Text>
        <br />
        <S.Text fontWeight={400} fontSize={20} lineHeight={29}>
          지친 당신을 위해
        </S.Text>
        <br />
        <S.Text fontWeight={400} fontSize={20} lineHeight={29}>
          다양한 스트레칭 동작을 준비했어요
        </S.Text>
      </TextBox>
    </S.ContentBox>
  );
};

export default IntroduceLayout;

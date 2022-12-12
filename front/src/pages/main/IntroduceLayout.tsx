import React from "react";
import styled from "styled-components";
import * as S from "./MainStyle";
import illustration from "../../assets/image/main_illustration.png";

const Image = styled.div`
  width: 100%;
  height: 320px;
  margin: 100px auto;
  background: url(${illustration}) no-repeat center;
  background-size: contain;
`;

const TextBox = styled.span`
  margin-top: 50px;
`;

const IntroduceLayout = () => {
  return (
    <S.SectionLayout>
      {/* <S.Logo></S.Logo> */}
      <S.Text fontWeight={400} fontSize={32} lineHeight={40}>
        하루 종일 책상에 앉아있는 당신,
      </S.Text>
      <S.Text fontWeight={700} fontSize={32} lineHeight={40}>
        CHAIR COACH
        <S.InlineText fontWeight={400} fontSize={32} lineHeight={40}>
          를 시작하세요!
        </S.InlineText>
      </S.Text>

      <Image />

      <TextBox>
        <S.Text fontWeight={400} fontSize={20} lineHeight={29}>
          스트레칭 파트너{" "}
          <S.InlineText fontWeight={700}>CHAIR COACH</S.InlineText>는
        </S.Text>
        <S.Text fontWeight={400} fontSize={20} lineHeight={29}>
          지친 당신을 위해
        </S.Text>
        <S.Text fontWeight={400} fontSize={20} lineHeight={29}>
          다양한 스트레칭 동작을 준비했어요
        </S.Text>
      </TextBox>
    </S.SectionLayout>
  );
};

export default IntroduceLayout;

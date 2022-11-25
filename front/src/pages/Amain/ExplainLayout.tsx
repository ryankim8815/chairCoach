import React from "react";
import styled from "styled-components";
import * as S from "./MainStyle";
import { BsCheckLg } from "react-icons/bs";
import { SiActigraph } from "react-icons/si";
import { IoAlarm } from "react-icons/io5";

const LogoLayout = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 80px;
`;
const LogoBox = styled.div`
  width: 190px;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  margin: 0 100px;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
`;

const LogoText = styled(S.Text)`
  padding-top: 40px;
  margin: 0 auto;
`;

const ExplainText = styled(S.Text)`
  padding-top: 16px;
  color: #999;
`;

const ExplainLayout = () => {
  return (
    <S.SectionLayout>
      <S.Text fontWeight={400} fontSize={32} lineHeight={40}>
        모니터 속 스트레칭 파트너&nbsp;
        <S.InlineText fontWeight={700} fontSize={32} lineHeight={40}>
          CHAIR COACH
          <S.InlineText fontWeight={400} fontSize={32} lineHeight={40}>
            는
          </S.InlineText>
        </S.InlineText>
      </S.Text>

      <LogoLayout>
        <LogoBox>
          <Logo>
            <SiActigraph size="40" color="white" />
          </Logo>
          <LogoText fontSize={24} fontWeight={700}>
            STRETCH
          </LogoText>
          <ExplainText fontSize={16} fontWeight={400} lineHeight={20}>
            AI 실시간 자세 교정을 통해 <br />
            정확한 자세를 알려드려요
          </ExplainText>
        </LogoBox>

        <LogoBox>
          <Logo>
            <BsCheckLg size="40" color="white" />
          </Logo>
          <LogoText fontSize={24} fontWeight={700}>
            DIAGNOSE
          </LogoText>
          <ExplainText fontSize={16} fontWeight={400} lineHeight={20}>
            당신의 거북목 여부를
            <br /> 체크해보세요
          </ExplainText>
        </LogoBox>

        <LogoBox>
          <Logo>
            <IoAlarm size="40" color="white" />
          </Logo>
          <LogoText fontSize={24} fontWeight={700}>
            ALARM
          </LogoText>
          <ExplainText fontSize={16} fontWeight={400} lineHeight={20}>
            주기적으로 스트레칭 시간을 <br />
            알려드려요!
          </ExplainText>
        </LogoBox>
      </LogoLayout>
    </S.SectionLayout>
  );
};

export default ExplainLayout;

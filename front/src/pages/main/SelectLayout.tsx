import React from "react";
import styled from "styled-components";
import * as S from "./MainStyle";
import * as B from "../../styles/BtnStyle";
import stretching from "../../assets/image/main_stretching.png";
import neck from "../../assets/image/main_neck.png";
import { useNavigate } from "react-router-dom";

export interface SelectStyledProps {
  image: string;
}

const SectionLayout = styled(S.SectionLayout)`
  max-width: 100%;
  background-color: #f1edfc;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin: 93px auto 0 auto;
`;
const ContentBox = styled.div`
  width: 570px;
  height: 436px;
  text-align: left;
  background-color: white;
  :hover {
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
  }
  margin: 0 20px;
`;

const Image = styled.div<SelectStyledProps>`
  width: 570px;
  height: 280px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`;

const TitleText = styled(S.Text)`
  margin-top: 32px;
  margin-left: 40px;
`;

const Text = styled(S.Text)`
  margin-top: 20px;
  margin-left: 40px;
`;
const SelectLayout = () => {
  const navigate=useNavigate();
  return (
    <SectionLayout>
      <S.Text fontWeight={400} fontSize={32} lineHeight={40}>
        오늘부터{" "}
        <S.InlineText fontWeight={700} fontSize={32} lineHeight={40}>
          CHAIR COACH
        </S.InlineText>
        <S.InlineText fontWeight={400} fontSize={32} lineHeight={40}>
          를 시작해보세요!
        </S.InlineText>
      </S.Text>

      <ContentLayout>
        <ContentBox>
          <Image image={stretching} />
          <TitleText fontSize={24} fontWeight={500}>
            체어코치와 함께하는 AI 스트레칭
          </TitleText>
          <Text fontSize={16} fontWeight={400} lineHeight={24}>
            목, 어깨, 허리, 올인원 총 4가지의 코스를 <br />
            AI와 함께 경험할 수 있습니다.
          </Text>
        </ContentBox>

        <ContentBox onClick={()=>{
          navigate('/aboutneck')
        }}>
          <Image image={neck} />
          <TitleText fontSize={24} fontWeight={500}>
            자가설문과 AI를 통한 거북목 진단
          </TitleText>
          <Text fontSize={16} fontWeight={400} lineHeight={24}>
            자가설문과 웹캠을 이용한 AI 진단을 통해 <br />
            거북목 여부를 진단해볼 수 있습니다.
          </Text>
        </ContentBox>
      </ContentLayout>
    </SectionLayout>
  );
};

export default SelectLayout;

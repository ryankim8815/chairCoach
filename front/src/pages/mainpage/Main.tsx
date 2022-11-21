import React from "react";
import * as S from "./MainStyle";

const Main = () => {
  return (
    <>
      <S.MainLayout>
        <S.MainBanner>
          <S.BannerContent>
            <S.BannerText>
              오늘도 근무 중인 당신에게, <br />
            </S.BannerText>
            <S.BannerText>CHAIR COACH</S.BannerText>
            <S.BannerButton>체어코치 하러가기</S.BannerButton>
          </S.BannerContent>
        </S.MainBanner>
        <S.ContentBox height={970}>
          <S.Logo></S.Logo>
          <S.Text fontWeight={400} fontSize={32}>
            하루 종일 책상에 앉아있는 당신,
          </S.Text>
          <br />
          <S.Text fontWeight={700} fontSize={32}>
            CHAIR COACH
          </S.Text>
          <S.Text fontWeight={400} fontSize={32}>
            를 시작하세요!
          </S.Text>
        </S.ContentBox>
      </S.MainLayout>
    </>
  );
};

export default Main;

import React from "react";
import * as S from "./MainStyle";

const IntroduceLayout = () => {
  return (
    <section>
      <S.TitleText lineHeight={true}>
        하루 종일 책상에 앉아있는 당신,<br />
        <span>CHAIR COACH</span>를 시작하세요!
      </S.TitleText>

      <S.IntroduceImage />

      <S.IntroduceText>
        스트레칭 파트너 <span>CHAIR COACH</span>는<br />
        지친 당신을 위해<br />
        다양한 스트레칭 동작을 준비했어요.
      </S.IntroduceText>
    </section>
  );
};

export default IntroduceLayout;

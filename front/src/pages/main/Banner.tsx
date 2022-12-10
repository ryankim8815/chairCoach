import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MainStyle";
import * as B from "../../styles/BtnStyle";

const Banner = forwardRef<HTMLDivElement>((props, ref) => {
  const navigate = useNavigate();

  return (
    <S.MainBanner>
      <div className="inner">
        <S.BannerContent ref={ref}>
          <h2>
            오늘도 근무 중인 당신에게,<br />
            <span>CHAIR COACH</span>
          </h2>
          <B.MiddleBtn hover="true" onClick={() => navigate("/chaircoach")}>
              체어코치 하러가기
          </B.MiddleBtn>
        </S.BannerContent>
      </div>
    </S.MainBanner>
  );
});

export default Banner;

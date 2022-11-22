import React from "react";
import * as S from "./NeckGuideStyle";
import notification1 from '../../assets/img/notification1.jpg'
import notification2 from '../../assets/img/notification2.jpg'
import notification4 from '../../assets/img/notification4.jpg'
import { useNavigate } from "react-router-dom";

const NeckGuide = () => {
    const navigate=useNavigate();
  return (
    <S.NotificationLayout>
      <div className="inner">
        <S.TextBox>
          <S.TitleText>
            체어코치의 AI 코치 서비스는 <S.Bold>웹캠이 필요한 서비스</S.Bold>
            입니다.
            <br />
            아래 <S.Bold>주의사항을 확인</S.Bold>해주세요!
          </S.TitleText>
        </S.TextBox>
        <S.MiddleCont>
          <S.Card>
            <S.SubTitleText>1. 웹캠</S.SubTitleText>
            <S.Image src={notification1} />
            <S.Text>웹캠이 정상적으로 설치/연결되었는지<br/>확인해주세요.</S.Text>
          </S.Card>
          <S.Card>
          <S.SubTitleText>2. 밝기</S.SubTitleText>
            <S.Image src={notification2} />
            <S.Text>어두운 곳에서는 인식이 어려워요.<br/>밝은 곳에서 촬영해주세요.</S.Text>
          </S.Card>
        </S.MiddleCont>
        <S.LowCont>
          <S.Card>
          <S.SubTitleText>3. 촬영 각도</S.SubTitleText>
            <S.Image src={notification1} />
            <S.Text>위 사진과 유사한 각도로 촬영해주세요<br/>자세가 부정확하면 인식을 하기 어려워요.</S.Text>
          </S.Card>
          <S.Card>
          <S.SubTitleText>4. 촬영시점</S.SubTitleText>
            <S.Image src={notification4} />
            <S.Text>하단의 확인 완료 버튼을 누르시면,<br/>10초후에 촬영이 완료됩니다.</S.Text>
          </S.Card>
        </S.LowCont>
        <S.Btn onClick={()=>{
            navigate('/neckinspection')
        }}>확인 완료</S.Btn>
      </div>
    </S.NotificationLayout>
  );
};

export default NeckGuide;

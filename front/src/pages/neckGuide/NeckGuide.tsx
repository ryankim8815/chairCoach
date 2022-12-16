import * as S from "./GuideStyle";
import * as B from "../../styles/BtnStyle";
import { useNavigate } from "react-router-dom";

const NeckGuide = () => {
  const navigate = useNavigate();
  return (
    <S.NotificationLayout>
      <div className="inner">
        <S.TitleText>
          체어코치의 AI 코치 서비스는 <span>웹캠이 필요한 서비스</span>입니다.
          <br />
          아래 <span>주의사항을 확인</span>해주세요!
        </S.TitleText>

        <S.MiddleCont>
          <S.Card>
            <S.SubTitleText>1. 웹캠</S.SubTitleText>
            <S.Image1 />
            <S.Text>
              웹캠이 정상적으로
              <br />
              설치/연결되었는지 확인해주세요.
            </S.Text>
          </S.Card>

          <S.Card>
            <S.SubTitleText>2. 밝기</S.SubTitleText>
            <S.Image2 />
            <S.Text>
              어두운 곳에서는 인식이 어려워요.
              <br />
              밝은 곳에서 촬영해주세요.
            </S.Text>
          </S.Card>

          <S.Card>
            <S.SubTitleText>3. 촬영 각도</S.SubTitleText>
            <S.Image3 />
            <S.Text>
              알맞은 자세 각도로 촬영해주세요.
              <br />
              자세가 정확해야 인식을 해요.
            </S.Text>
          </S.Card>

          <S.Card>
            <S.SubTitleText>4. 촬영 시점</S.SubTitleText>
            <S.Image4 />
            <S.Text>
              하단의 확인 완료 버튼을 누르시면,
              <br />
              10초후에 촬영이 완료됩니다.
            </S.Text>
          </S.Card>
        </S.MiddleCont>

        <B.MiddleBtn
          hover="true"
          onClick={() => {
            navigate("/neckinspection");
          }}
        >
          확인 완료
        </B.MiddleBtn>
      </div>
    </S.NotificationLayout>
  );
};

export default NeckGuide;

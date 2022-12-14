import styled, {css} from "styled-components";
import notification1 from "../../assets/img/notification1.jpg";
import notification2 from "../../assets/img/notification2.jpg";
import notification4 from "../../assets/img/notification4.jpg";

const imgWrap = css`
  margin: 16px 0 32px 0;
  height: 152px;
  border: 1px solid ${({ theme }) => theme.colors.mainLight};
  border-radius: 2px;
  overflow: hidden;
`;

export const NotificationLayout = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};
  background: linear-gradient(108.15deg, #8C63FF 1.69%, #936CFF 8.1%, #AC8EFF 33.75%, #D1C2FD 96.37%);
  color:#fff;
  .inner {
    padding: 120px 0;
  }

  button{
    display: block;
    margin: 64px auto 0 auto;
  }
`;

export const TitleText = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.title};
  line-height: 1.25;
  text-align: center;

  span{
    font-weight: 700;
  }
`;
export const SubTitleText = styled.strong`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: 700;
`;
export const Text = styled.p`
  line-height: 1.25;
`;

export const MiddleCont = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 20px;
  margin-top: 64px;
`;
export const Card = styled.div`
  padding: 28px 24px 72px 24px;
  width: 285px;
  border: 1px solid ${({ theme }) => theme.colors.mainLight};
  border-radius: 2px;
  background: rgba(241, 237, 252, 0.2);
  box-shadow: 0px 4px 20px rgba(64, 62, 86, 0.2);
`;

export const Image1 = styled.div`
  ${imgWrap}
  background: url(${notification1}) no-repeat center;
  background-size: cover;
`;
export const Image2 = styled.div`
  ${imgWrap}
  background: url(${notification2}) no-repeat center;
  background-size: cover;
`;
export const Image3 = styled.div`
  ${imgWrap}
  background: url(${notification1}) no-repeat center;
  background-size: cover;
`;
export const Image4 = styled.div`
  ${imgWrap}
  background: url(${notification4}) no-repeat center;
  background-size: cover;
`;

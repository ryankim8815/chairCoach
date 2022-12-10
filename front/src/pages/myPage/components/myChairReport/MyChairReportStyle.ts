import styled from "styled-components";

interface MyChairReportStyleProps {
  fontWeight?: number;
  fontSize?: number;
}

export const ReportLayout = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

export const Text = styled.div<MyChairReportStyleProps>`
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => `${props.fontSize}px`};
  line-height: 1.25;
`;
export const TitleText = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 1.25;
`;

export const ContentLayout = styled.div`
  background-color: #fff;
  max-width: 1180px;
  height: 320px;
  margin-top: 20px;
  .inner {
    padding: 32px 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const SelectButton = styled.button`
  width: 60px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.greyBtnBg};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};

  transition: all 0.3s;

  &:hover {
    border: none;
    background: ${({ theme }) => theme.colors.main};
    color: #fff;
  }
  margin-right: 8px;
`;

export const InfoBox = styled.div`
  .totalTime {
    margin-top: 56px;
  }
`;

export const GraphBox = styled.div`
  width: 755px;
  //height: 32px;
  float: right;
  text-align: center;
  .graph {
    margin-top: 30px;
  }
`;

export const YearText = styled(Text)`
  display: inline-block;
  margin: 0 40px;
`;

export const TimeText = styled(Text)`
  margin-top: 56px;
`;

export const TotalTimeIconBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

export const TotalTimeNumber = styled(Text)`
  margin-left: 16px;
`;

export const ShiftButton = styled.button`
  width: 32px;
  height: 32px;
`;

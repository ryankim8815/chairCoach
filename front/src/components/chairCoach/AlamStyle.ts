import styled from "styled-components";

export const AlarmCon = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  justify-content: space-between;
  padding: 40px 48px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.mainMoreLight};
`;

export const AlarmTextWrap = styled.div`
  line-height: 1.25;
  h2{
    margin-bottom: 20px;
    font-size: ${({ theme }) => theme.fontSize.title};
    span{
      font-weight: 700;
    }
  }
`;

export const AlarmSettingsWrap = styled.div`
  padding: 40px 32px;
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  border-radius: 4px;
  background: #fff;

  &>div{
    ${({ theme }) => theme.common.flexCenter};
    justify-content: space-between;

    p{
      font-weight: 500;
      font-size: ${({ theme }) => theme.fontSize.subTitle};
    }
  }

  ul{
    ${({ theme }) => theme.common.flexCenter};
    margin-top: 32px;
    li+li{
      margin-left: 20px;
    }
  }
`;

export const ToggleBtnBox = styled.div`
  label{
    position: relative;
    display: block;
    width: 48px;
    height: 24px;
    border-radius: 30px;
    background: ${({ theme }) => theme.colors.greyBorder};
    cursor: pointer;
    transition: all .4s;

    span{
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      left: 4px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      transition: all .4s;
    }
  }

  input[type=checkbox]:checked + label{
    background: ${({ theme }) => theme.colors.main};

    span{
      left: calc(100% - 22px);
    }
  }
`;
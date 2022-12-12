import styled from "styled-components";

export const ResignMembershipLayout = styled.div`
  ${({ theme }) => theme.common.flexCenter};

  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(49, 48, 58, 0.6);
`;

export const ResignMembershipContent = styled.div`
  padding: 64px 0;
  width: 600px;
  border-radius: 4px;
  background: #fff;
  text-align: center;

  h3 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.title};
    line-height: 1.25;

    span {
      color: ${({ theme }) => theme.colors.main};
    }
  }

  & > p {
    margin: 24px 0 40px;
    line-height: 1.25;
  }

  strong {
    display: block;
    margin-top: 80px;
    font-weight: 500;
    font-size: 20px;
  }
`;

export const InputWrap = styled.div`
  margin: 0 auto;
  width: 400px;
  text-align: left;

  p {
    font-weight: 500;
    margin-bottom: 8px;
  }
`;

export const btnWrap = styled.div`
  margin-top: 40px;

  button + button {
    margin-left: 20px;
  }

  position: inherit;
`;
